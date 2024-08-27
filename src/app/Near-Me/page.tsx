"use client";
import AuthModalController from "@/app/components/authModalController/AuthModalController";
import Footer from "@/app/components/footer/Footer";
import Navbar from "@/app/components/navbar/Navbar";
import React from "react";
import { motion } from "framer-motion";

const Page = () => {
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
      <Navbar showSearch={true} onOpenModal={handleOpenSignInModal} />
      <div
        className="flex flex-col min-h-screen relative"
        style={{
          backgroundImage: `url('/background_2.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="absolute inset-0 flex flex-col items-start justify-center p-8 ">
          {/* Semi-transparent overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>

          {/* Main Heading */}
          <motion.h1
            className="relative text-white text-6xl font-extrabold leading-tight mb-4 z-10"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Discover Your Perfect Gym
          </motion.h1>

          {/* Main Quote */}
          <motion.blockquote
            className="relative text-white text-3xl font-semibold leading-tight mb-6 z-10"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <p>Empower Your Fitness Journey:</p>
            <p>Choose, Change, and Conquer with Our Gym Passes</p>
          </motion.blockquote>

          {/* Subheadline */}
          <motion.h2
            className="relative text-white text-2xl font-medium leading-tight mb-6 z-10"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            Join Today and Experience Ultimate Flexibility
          </motion.h2>

          {/* Call-to-Action Button */}
          <motion.button
            onClick={handleOpenSignInModal}
            className="relative bg-blue-500 text-white text-lg font-bold py-3 px-6 rounded-lg shadow-lg z-10 hover:bg-blue-600 transition duration-300"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            Get Started
          </motion.button>
        </div>
      </div>
      <Footer />
      {showAuthModal && (
        <AuthModalController
          onClose={handleCloseModal}
          showSignIn={showSignIn}
        />
      )}
    </>
  );
};

export default Page;
