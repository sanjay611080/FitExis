'user client'
import React, { useState, useEffect } from 'react';
import { db } from '@/app/firebase/config'; // Import your Firebase config
import { doc, getDoc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/app/firebase/config';

const UserProfile: React.FC = () => {
  const [user] = useAuthState(auth);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user) {
        try {
          const userDoc = doc(db, 'users', user.uid);
          const docSnapshot = await getDoc(userDoc);

          if (docSnapshot.exists()) {
            setProfile(docSnapshot.data());
          } else {
            console.log('No such document!');
            // Optionally initialize with default values if needed
            setProfile({
              name: '',
              username: '',
              age: '',
              gender: '',
              address: '',
              contactNo: '',
              role: '',
            });
          }
        } catch (error) {
          console.error('Error fetching user profile:', error);
        }
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [user]);

  if (loading) return <div>Loading...</div>;

  if (!profile) return <div>No profile data available</div>;

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">User Profile</h1>
      <div className="mb-4">
        <strong>Email:</strong> {user?.email || 'N/A'}
      </div>
      <div className="mb-4">
        <strong>Name:</strong> {profile.name || 'N/A'}
      </div>
      <div className="mb-4">
        <strong>Username:</strong> {profile.username || 'N/A'}
      </div>
      <div className="mb-4">
        <strong>Age:</strong> {profile.age || 'N/A'}
      </div>
      <div className="mb-4">
        <strong>Gender:</strong> {profile.gender || 'N/A'}
      </div>
      <div className="mb-4">
        <strong>Address:</strong> {profile.address || 'N/A'}
      </div>
      <div className="mb-4">
        <strong>Contact Number:</strong> {profile.contactNo || 'N/A'}
      </div>
      <div className="mb-4">
        <strong>Role:</strong> {profile.role || 'N/A'}
      </div>
    </div>
  );
};

export default UserProfile;
