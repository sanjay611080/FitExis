"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slides = [
    '/background_1.png',
    '/background_2.jpg',
    '/background_3.png',
    '/background_4.jpg',
  ];

  // Automatically change slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval); // Clear interval on component unmount
  }, [slides.length]);

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {slides.map((src, index) => (
        <div
          key={index}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-700 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
        >
          <Image
            src={src}
            alt={`Slide ${index + 1}`}
            layout="fill"
            objectFit="cover"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 flex items-center justify-center text-center text-white bg-black bg-opacity-60 p-8 md:p-12 lg:p-16">
            <div className="max-w-3xl">
              <h2 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
                Empower Your Journey
              </h2>
              <p className="text-lg md:text-xl font-light leading-relaxed">
                “Every step, every rep, every drop of sweat brings you closer to your best self. Elevate your fitness game and embrace the change.”
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Carousel;
