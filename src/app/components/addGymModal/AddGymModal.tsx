import React, { useState, ChangeEvent, FormEvent } from 'react';
import { db, storage } from '@/app/firebase/config';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/app/firebase/config';

interface AddGymModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddGymModal: React.FC<AddGymModalProps> = ({ isOpen, onClose }) => {
  const [user] = useAuthState(auth);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    location: '',
    facilities: [] as string[], // Array to hold facility options
  });
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Handle changes for text inputs and select elements
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    // Handle checkboxes separately
    if (type === 'checkbox' && name === 'facilities') {
      // Make sure e.target is an HTMLInputElement
      const target = e.target as HTMLInputElement;
      setFormData(prev => ({
        ...prev,
        facilities: target.checked
          ? [...prev.facilities, value]
          : prev.facilities.filter(facility => facility !== value),
      }));
    } else {
      // Handle other inputs
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  // Handle file input changes
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImageFiles(Array.from(e.target.files));
    }
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    setError('');

    try {
      // Upload images and get their URLs
      const imageUrls: string[] = [];
      for (const file of imageFiles) {
        const imageRef = ref(storage, `user_gyms/${user.uid}/${file.name}`);
        await uploadBytes(imageRef, file);
        const url = await getDownloadURL(imageRef);
        imageUrls.push(url);
      }

      // Add gym to Firestore in a user-specific collection
      await addDoc(collection(db, `user_gyms/${user.uid}/gyms`), {
        ...formData,
        images: imageUrls,
      });

      onClose(); // Close the modal after successful addition
    } catch (error) {
      console.error('Error adding gym:', error);
      setError('Failed to add gym. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 top-12 bg-black bg-opacity-50 flex items-center justify-center overflow-y-auto px-4 py-6 md:px-6 md:py-8">
      <div className="bg-white p-6 md:p-8 shadow-lg max-w-lg w-full max-h-full overflow-auto relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors duration-200"
        >
          &times;
        </button>
        <h2 className="text-2xl font-semibold mb-4">Add Gym</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Image upload input */}
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">Gym Photos</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="w-full p-2 border rounded bg-gray-100"
            />
          </div>

          {/* Gym details */}
          <input
            type="text"
            name="name"
            placeholder="Gym Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <textarea
            name="description"
            placeholder="Gym Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="location"
            placeholder="Gym Location"
            value={formData.location}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />

          {/* Facilities selection */}
          <fieldset className="w-full">
            <legend className="block text-sm font-medium text-gray-700 mb-1">Facilities</legend>
            {['AC', 'Locker', 'Parking', 'Water Cooler', 'WiFi'].map(facility => (
              <label key={facility} className="inline-flex items-center mr-4">
                <input
                  type="checkbox"
                  name="facilities"
                  value={facility}
                  checked={formData.facilities.includes(facility)}
                  onChange={handleChange}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <span className="ml-2 text-gray-700">{facility}</span>
              </label>
            ))}
          </fieldset>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full bg-gray-700 text-white py-2 px-4 rounded-md shadow hover:bg-gray-600 transition-colors duration-200"
            disabled={loading}
          >
            {loading ? 'Adding...' : 'Add Gym'}
          </button>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="button"
            onClick={onClose}
            className="w-full mt-2 bg-gray-600 text-white py-2 px-4 rounded-md shadow hover:bg-gray-500 transition-colors duration-200"
          >
            Close
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddGymModal;
