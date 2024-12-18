/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'
import AuthModalController from '../../components/authModalController/AuthModalController'

const page = () => {
  const [showAuthModal, setShowAuthModal] = React.useState(false);
  const [showSignIn, setShowSignIn] = React.useState(false);

  const handleOpenSignInModal = () => {
    setShowSignIn(true);
    setShowAuthModal(true);
  };

  const handleOpenSignUpModal = () => {
    setShowSignIn(false);
    setShowAuthModal(true);
  };

  const handleCloseModal = () => {
    setShowAuthModal(false);
  };

  return (
    <>
      <Navbar showSearch={true} onOpenModal={handleOpenSignInModal}/>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Coming Soon</h1>
        <p className="text-lg text-gray-700 mb-8">We’re working hard to finish this page. Stay tuned!</p>
        <div className="flex justify-center">
          <svg
            className="w-16 h-16 text-blue-500 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 12a8 8 0 1116 0A8 8 0 014 12zm8-8v4m0 0v4m0-4h4m-4 0H8"
            />
          </svg>
        </div>
      </div>
    </div>
    <Footer/>
    {showAuthModal && (
        <AuthModalController
          onClose={handleCloseModal}
          showSignIn={showSignIn}
        />
      )}
    </>
  )
}

export default page
