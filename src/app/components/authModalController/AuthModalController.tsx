'use client';
import React, { useState } from 'react';
import SignUpModal from '../signUpModal/SignUpModal';
import SignInModal from '../signInModal/SignInModal';

const AuthModalController = ({ onClose, showSignIn = false }: { onClose: () => void; showSignIn?: boolean }) => {
  const [showSignUp, setShowSignUp] = useState(!showSignIn); // Show SignUp by default if showSignIn is false
  const [isSignInVisible, setSignInVisible] = useState(showSignIn);

  const openSignUp = () => {
    setShowSignUp(true);
    setSignInVisible(false);
  };

  const openSignIn = () => {
    setShowSignUp(false);
    setSignInVisible(true);
  };

  const handleSignInSuccess = () => {
    setSignInVisible(false);
    onClose(); // Close the modal
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      ></div>
      <div className="relative bg-white rounded-lg shadow-lg w-96">
        {showSignUp ? (
          <SignUpModal
            onClose={onClose}
            onSwitchToSignIn={openSignIn}
          />
        ) : (
          <SignInModal
            onClose={onClose}
            onSwitchToSignUp={openSignUp}
            isVisible={isSignInVisible} // Ensure this is always a boolean
            onSignInSuccess={handleSignInSuccess}
          />
        )}
      </div>
    </div>
  );
};

export default AuthModalController;
