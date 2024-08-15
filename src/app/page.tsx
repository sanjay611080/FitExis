// pages/index.tsx
/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React from "react";
import Navbar from "./components/navbar/Navbar";
import Carousel from "./components/carousel/Carousel";
import Homepage from "./components/homepage/Homepage";
import Footer from "./components/footer/Footer";
import AuthModalController from "./components/authModalController/AuthModalController";
// import SignUpModal from './components/signUpModal/SignUpModal';

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
    <div className="relative">
      <Navbar showSearch={false} onOpenModal={handleOpenSignInModal} />
      <Carousel />
      <Homepage />
      <Footer />
      {showAuthModal && (
        <AuthModalController
          onClose={handleCloseModal}
          showSignIn={showSignIn}
        />
      )}{" "}
    </div>
  );
};

export default Page;
