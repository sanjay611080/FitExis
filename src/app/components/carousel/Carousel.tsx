"use client";
import React, { useEffect, useState } from 'react';

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const videos = [
    'https://d1j25p53a9uhmz.cloudfront.net/assets/front_end/fitreserve-homepage-6381139ce66b974c90d9cda92d75ae5102f0dbefeac116793b8737f23563a724.mp4',
    'https://d1j25p53a9uhmz.cloudfront.net/assets/front_end/fitreserve-homepage-6381139ce66b974c90d9cda92d75ae5102f0dbefeac116793b8737f23563a724.mp4',
    'https://d1j25p53a9uhmz.cloudfront.net/assets/front_end/fitreserve-homepage-6381139ce66b974c90d9cda92d75ae5102f0dbefeac116793b8737f23563a724.mp4',
    'https://d1j25p53a9uhmz.cloudfront.net/assets/front_end/fitreserve-homepage-6381139ce66b974c90d9cda92d75ae5102f0dbefeac116793b8737f23563a724.mp4',
  ];

  // Automatically change video every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % videos.length);
    }, 3000);

    return () => clearInterval(interval); // Clear interval on component unmount
  }, [videos.length]);

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {videos.map((src, index) => (
        <div
          key={index}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-700 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
        >
          <video
            src={src}
            autoPlay
            muted
            loop
            className="w-full h-full object-cover"
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
