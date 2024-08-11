"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slides = [
    '/background_1.jpg',
    '/background_2.jpg',
    '/background_3.jpg',
    '/background_4.jpg',
    // '/background_5.jpg'
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
            objectFit="cover" // Ensure the image covers the container without stretching
            className="object-cover"
            priority
          />
        </div>
      ))}
    </div>
  );
};

export default Carousel;
