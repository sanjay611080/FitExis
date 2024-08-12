"use client";
import Image from "next/image";
import React from "react";
import SignupSection from "../signupform/SignupSection";
import { useInView } from "react-intersection-observer";

// Custom class for slide-in animation
const slideInClasses = 'transform translate-y-10 opacity-0';

const Features = () => {
  const { ref: featureRef, inView: featureInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: pageRef, inView: pageInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: userDetailsRef, inView: userDetailsInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: imageSectionRef, inView: imageSectionInView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <>
      {/*---------------------------------------------- Card Section  ---------------------------------*/}
      <div
        className={`py-16 bg-gray-50 transition-transform transition-opacity duration-1000 ease-in-out ${
          featureInView ? 'opacity-100 translate-y-0' : slideInClasses
        }`}
        ref={featureRef}
      >
        <div className="text-center px-4 mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Your All-in-One Fitness Solution
          </h1>
          <p className="text-lg md:text-xl text-gray-600">
            Discover flexible gym memberships, find gyms near you, and book and
            pay online. Transform your fitness journey with ease.
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-between px-4 gap-4">
          {/* Feature Cards */}
          <div className="flex-1 bg-white shadow-lg rounded-lg overflow-hidden transition-transform duration-500 hover:scale-105">
            <Image
              src="/gym.png"
              alt="Flexible Memberships"
              width={500}
              height={300}
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Flexible Memberships
              </h2>
              <p className="text-gray-600">
                Choose from daily, weekly, or monthly gym memberships that fit
                your schedule and budget. Enjoy the flexibility to work out at
                your convenience.
              </p>
            </div>
          </div>

          <div className="flex-1 bg-white shadow-lg rounded-lg overflow-hidden transition-transform duration-500 hover:scale-105">
            <Image
              src="/gym_2.png"
              alt="Find Gyms Nearby"
              width={500}
              height={300}
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Find Gyms Nearby
              </h2>
              <p className="text-gray-600">
                Use our app to locate gyms in your area. View gym photos,
                descriptions, and available facilities. Find the perfect gym
                that suits your needs.
              </p>
            </div>
          </div>

          <div className="flex-1 bg-white shadow-lg rounded-lg overflow-hidden transition-transform duration-500 hover:scale-105">
            <Image
              src="/gym_3.png"
              alt="Book & Pay Online"
              width={500}
              height={300}
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Book & Pay Online
              </h2>
              <p className="text-gray-600">
                Easily book gym sessions and make payments through our secure
                platform. Manage your bookings and payments all in one place,
                hassle-free.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/*------------------------------------- Page with text  ---------------------------------*/}
      <div
        className={`relative flex flex-col lg:flex-row h-[100vh] lg:h-[70vh] transition-transform transition-opacity duration-1000 ease-in-out ${
          pageInView ? 'opacity-100 translate-y-0' : slideInClasses
        }`}
        ref={pageRef}
      >
        {/* Image on the right side */}
        <div className="relative flex-1 overflow-hidden bg-black">
          <Image
            src="/photos/image.png" // Replace with your image path
            alt="Fitness Image"
            layout="fill"
            objectFit="cover"
            className="absolute top-0 right-0 h-full w-full"
          />
        </div>

        {/* Text content on the left side */}
        <div className="flex-1 flex flex-col justify-center p-8 bg-black">
          <div className="max-w-lg space-y-6">
            <h1 className="text-5xl font-bold text-white">FitExis</h1>
            <h2 className="text-3xl font-semibold text-white">
              One membership to India’s largest fitness network
            </h2>
            <h3 className="text-2xl text-white">
              Access over 500+ premium gyms and fitness centers
            </h3>
            {/* Uncomment the link when needed */}
            {/* <Link href="/get-pass">
              <button className="inline-block mt-6 px-6 py-3 border border-white text-white bg-transparent hover:bg-gray-200 hover:text-black rounded-lg transition duration-300">
                Get FitExis Pass
              </button>
            </Link> */}
          </div>
        </div>
      </div>

      {/*------------------------------------- User Details section ----------------------------*/}
      <div
        className={`transition-transform transition-opacity duration-1000 ease-in-out ${
          userDetailsInView ? 'opacity-100 translate-y-0' : slideInClasses
        }`}
        ref={userDetailsRef}
      >
        <SignupSection />
      </div>

      {/*----------------------------------------- Image section  -------------------------------*/}

      <div
        className={`flex flex-col lg:flex-row items-center p-8 lg:p-16  shadow-md transition-transform transition-opacity duration-1000 ease-in-out ${
          imageSectionInView ? 'opacity-100 translate-y-0' : slideInClasses
        }`}
        ref={imageSectionRef}
      >
        {/* Left Side Content */}
        <div className="flex-1 text-center lg:text-left mb-8 lg:mb-0">
          <h1 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800">
            Your Personalized Fitness Journey
          </h1>
          <p className="text-base md:text-lg mb-4 text-gray-600">
            Find gyms with memberships that fit your needs. Book sessions, track
            your progress, and receive personalized guidance.
          </p>
          <h2 className="text-xl md:text-2xl font-semibold mb-4 text-gray-700">
            Flexible Memberships
          </h2>
          <p className="text-base md:text-lg mb-6 text-gray-600">
            Access a variety of gyms with flexible options. Enjoy detailed
            descriptions, professional trainer profiles, and state-of-the-art
            facilities. Track your progress, watch fitness videos, and book
            classes with certified trainers. Transform your fitness journey
            today!
          </p>
          {/* <Link href="/book-pass">
            <button className="inline-block px-6 py-3 bg-gray-800 text-white font-semibold rounded-lg hover:bg-black">
              Book a Pass
            </button>
          </Link> */}
        </div>

        {/* Right Side Image */}
        <div className="flex-1 flex justify-center">
          <Image
            src="/photos/traineeimg.png"
            alt="Trainer with a client"
            width={400} // Adjusted width
            height={300} // Adjusted height
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>
    </>
  );
};

export default Features;
