'use client';
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { db, storage } from '@/app/firebase/config';
import { updateDoc, doc, getDoc, setDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/app/firebase/config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

interface ProfileUpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileUpdateModal: React.FC<ProfileUpdateModalProps> = ({ isOpen, onClose }) => {
  const [user] = useAuthState(auth);
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    username: '',
    age: '',
    gender: '',
    address: '',
    contactNo: '',
    role: '',
    photoURL: ''
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [usernameError, setUsernameError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user && isOpen) {
        try {
          const userDoc = doc(db, 'users', user.uid);
          const docSnapshot = await getDoc(userDoc);

          if (docSnapshot.exists()) {
            setFormData({
              email: user.email || '',
              ...docSnapshot.data() as any
            });
          } else {
            console.log('No such document! Initializing with default values.');
            await setDoc(userDoc, {
              name: '',
              username: '',
              age: '',
              gender: '',
              address: '',
              contactNo: '',
              role: '',
              photoURL: ''
            });
            setFormData({
              email: user.email || '',
              name: '',
              username: '',
              age: '',
              gender: '',
              address: '',
              contactNo: '',
              role: '',
              photoURL: ''
            });
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchUserData();
  }, [user, isOpen]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImageFile(e.target.files[0]);
    }
  };

  const checkUsernameExists = async (username: string) => {
    if (!username) return false;

    const q = query(collection(db, 'users'), where('username', '==', username));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    setUsernameError('');

    try {
      const usernameExists = await checkUsernameExists(formData.username);
      if (usernameExists) {
        setUsernameError('Username already exists. Please choose another one.');
        setLoading(false);
        return;
      }

      let photoURL = formData.photoURL;

      if (imageFile) {
        // Upload image to Firebase Storage
        const imageRef = ref(storage, `user_images/${user.uid}/${imageFile.name}`);
        await uploadBytes(imageRef, imageFile);
        photoURL = await getDownloadURL(imageRef);
      }

      // Update Firestore with form data and photoURL
      const userDoc = doc(db, 'users', user.uid);
      await updateDoc(userDoc, {
        ...formData,
        photoURL
      });

      window.location.reload(); // Refresh the page after successful update
      onClose(); // Close the modal after successful update
    } catch (error) {
      console.error('Error updating profile:', error);
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
        <h2 className="text-2xl font-semibold mb-4">Update Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Display email as a non-editable field */}
          <div className="w-full p-2 border rounded bg-gray-100">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <p>{formData.email}</p>
          </div>

          {/* Image upload input */}
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">Profile Picture</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full p-2 border rounded bg-gray-100"
            />
          </div>

          {/* Display all other fields as editable */}
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          {usernameError && <p className="text-red-500 text-sm">{usernameError}</p>}
          <input
            type="number"
            name="age"
            placeholder="Age"
            value={formData.age}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="tel"
            name="contactNo"
            placeholder="Contact Number"
            value={formData.contactNo}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="">Select Role</option>
            <option value="trainer">Trainer</option>
            <option value="user">User</option>
          </select>
          <button
            type="submit"
            className="w-full bg-gray-700 text-white py-2 px-4 rounded-md shadow hover:bg-gray-600 transition-colors duration-200"
            disabled={loading}
          >
            {loading ? 'Updating...' : 'Update'}
          </button>
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

export default ProfileUpdateModal;
