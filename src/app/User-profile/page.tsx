'use client';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/app/firebase/config';
import { useRouter } from 'next/navigation';
import Navbar from '../components/navbar/Navbar';

const Profile = () => {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-black text-white">
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
      <Navbar showSearch={false} onOpenModal={() => {}} />
      <div className="min-h-screen bg-gray-900 text-white flex flex-col pt-16"> {/* Increased pt-24 for more top padding */}
        <header className="text-white p-6 shadow-md">
          <div className="container mx-auto">
            <h1 className="text-4xl  font-bold">User Profile</h1>
          </div>
        </header>
        <main className="flex-grow container mx-auto p-6">
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-lg mx-auto">
            <h2 className="text-3xl font-semibold mb-4">Profile Details</h2>
            <div className="mb-6">
              <p className="text-gray-300 mb-2"><strong>Email:</strong> {user.email}</p>
              {/* Add more user details here if needed */}
            </div>
            <button
              onClick={handleLogout}
              className="w-full bg-red-600 text-white py-2 px-4 rounded-md shadow hover:bg-red-500 transition-colors duration-200"
            >
              Logout
            </button>
          </div>
        </main>
      </div>
    </>
  );
};

export default Profile;
