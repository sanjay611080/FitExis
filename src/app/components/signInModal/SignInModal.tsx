'use client';
import React, { useEffect, useState } from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/navigation';
import { auth } from '@/app/firebase/config';
import { sendPasswordResetEmail } from 'firebase/auth';

const SignInModal = ({
  onClose,
  onSwitchToSignUp,
  isVisible,
  onSignInSuccess,
}: {
  onClose: () => void;
  onSwitchToSignUp: () => void;
  isVisible: boolean;
  onSignInSuccess: () => void; // Callback for sign-in success
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signInWithEmailAndPassword, userCredential, loading, error] = useSignInWithEmailAndPassword(auth);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (userCredential?.user) {
      if (userCredential.user.emailVerified) {
        onSignInSuccess(); // Notify parent on successful sign-in
        router.push('/'); // Redirect to homepage
      } else {
        // Sign-out the user if email is not verified
        auth.signOut();
        alert('Please verify your email address before signing in.');
      }
    }
  }, [userCredential, onSignInSuccess, router]);

  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(email, password);
      setEmail('');
      setPassword('');
    } catch (e) {
      console.error('Sign In Error:', e);
    }
  };

  const handlePasswordReset = async () => {
    try {
      await sendPasswordResetEmail(auth, resetEmail);
      alert('Password reset email sent! Please check your inbox.');
      setResetEmail('');
      setShowResetPassword(false); // Close the reset password view
    } catch (e) {
      console.error('Password Reset Error:', e);
      alert('Failed to send password reset email. Please try again.');
    }
  };

  if (!isVisible) return null; // Don't render if modal is not visible

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative p-8 bg-transparent text-white border border-white border-opacity-30 rounded-lg shadow-lg max-w-sm w-full mx-4 sm:mx-6 md:mx-8 lg:mx-10">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-white hover:text-gray-300 transition-colors duration-200"
        >
          &times;
        </button>
        <h1 className="text-3xl font-semibold mb-6 text-center">
          {showResetPassword ? 'Reset Password' : 'Sign In'}
        </h1>

        {/* Conditional rendering of forms */}
        {!showResetPassword ? (
          <>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 mb-4 bg-white text-black rounded outline-none placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 transition-colors duration-200"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 mb-4 bg-white text-black rounded outline-none placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 transition-colors duration-200"
            />
            <button
              onClick={handleSignIn}
              className="w-full p-3 bg-indigo-600 rounded hover:bg-indigo-500 transition-colors duration-200"
              disabled={loading}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </>
        ) : (
          <>
            <input
              type="email"
              placeholder="Enter your email"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              className="w-full p-3 mb-4 bg-white text-black rounded outline-none placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 transition-colors duration-200"
            />
            <button
              onClick={handlePasswordReset}
              className="w-full p-3 bg-indigo-600 rounded hover:bg-indigo-500 transition-colors duration-200"
            >
              Send Password Reset Email
            </button>
          </>
        )}

        {error && <p className="text-red-400 mt-4 text-center">{error.message}</p>}

        <p className="mt-4 text-center">
          {showResetPassword ? (
            <>
              Remembered your password?{' '}
              <button
                onClick={() => setShowResetPassword(false)}
                className="text-blue-400 hover:underline transition-colors duration-200"
              >
                Sign In here
              </button>
            </>
          ) : (
            <>
              Don’t have an account?{' '}
              <button
                onClick={onSwitchToSignUp}
                className="text-blue-400 hover:underline transition-colors duration-200"
              >
                Sign Up here
              </button>
            </>
          )}
        </p>

        {!showResetPassword && (
          <p className="mt-4 text-center">
            Forgot your password?{' '}
            <button
              onClick={() => setShowResetPassword(true)}
              className="text-blue-400 hover:underline transition-colors duration-200"
            >
              Reset it here
            </button>
          </p>
        )}
      </div>
    </div>
  );
};

export default SignInModal;
