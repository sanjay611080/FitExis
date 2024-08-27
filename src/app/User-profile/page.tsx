'use client';
import React, { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '@/app/firebase/config';
import { doc, getDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import Navbar from '../components/navbar/Navbar';
import ProfileUpdateModal from '@/app/components/profileUpdateModal/ProfileUpdateModal';
import Footer from '@/app/components/footer/Footer';

const Profile: React.FC = () => {
  const [user, loading] = useAuthState(auth);
  const [profile, setProfile] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

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
      }
    };

    fetchUserProfile();
  }, [user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (!user) {
    router.push('/');
    return null;
  }

  const handleLogout = async () => {
    await auth.signOut();
    router.push('/');
  };

  return (
    <>
      <Navbar showSearch={false} onOpenModal={() => setIsModalOpen(true)} />

      <div className="min-h-screen bg-gray-100 text-black flex flex-col items-center py-10 px-4">
        {/* Header */}
        <header className="w-full text-black shadow-md py-4 mb-6 mt-10">
          <h1 className="text-center text-3xl font-bold">User Profile</h1>
        </header>
        
        {/* Profile Info */}
        <main className="w-full max-w-4xl flex flex-col md:flex-row items-start gap-8 px-4 py-8">
          {/* User Info Section */}
          <div className="w-full md:w-1/3 flex flex-col items-center md:items-start">
            <div className="w-32 h-32 rounded-full bg-gray-300 flex items-center justify-center mb-6">
              <img
                src={profile?.photoURL || '/default-profile.png'}
                alt="Profile"
                className="object-cover w-full h-full rounded-full"
              />
            </div>
            <div className="text-center md:text-left">
              <p className="text-xl text-black mb-2"><strong>Name:</strong> {profile?.name || 'Name Not Provided'}</p>
              <p className="text-xl text-black mb-2"><strong>Gender:</strong> {profile?.gender || 'Gender Not Provided'}</p>
              <p className="text-lg text-black"><strong>Age:</strong> {profile?.age || 'Age Not Provided'}</p>
            </div>
          </div>
          <div className="flex-1">
            <div className="space-y-2 mb-6">
              <p className="text-gray-700"><strong>Email:</strong> {user.email}</p>
              <p className="text-gray-700"><strong>Username:</strong> {profile?.username || 'N/A'}</p>
              <p className="text-gray-700"><strong>Address:</strong> {profile?.address || 'N/A'}</p>
              <p className="text-gray-700"><strong>Contact Number:</strong> {profile?.contactNo || 'N/A'}</p>
              <p className="text-gray-700"><strong>Role:</strong> {profile?.role || 'N/A'}</p>
            </div>
            <div className="flex flex-col gap-4 mt-6">
              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md shadow hover:bg-blue-700 transition-colors duration-300"
              >
                Update Profile
              </button>
              <button
                onClick={handleLogout}
                className="w-full bg-red-600 text-white py-2 px-4 rounded-md shadow hover:bg-red-700 transition-colors duration-300"
              >
                Logout
              </button>
            </div>
          </div>
        </main>
      </div>
      <ProfileUpdateModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <Footer />
    </>
  );
};

export default Profile;
