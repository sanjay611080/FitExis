"use client";
import Image from 'next/image';
import React from 'react';

const features = [
  {
    imgSrc: '/background_1.jpg',
    heading: 'Flexible Memberships',
    description: 'Choose from daily, weekly, or monthly gym memberships that fit your schedule and budget. Enjoy the flexibility to work out at your convenience.',
  },
  {
    imgSrc: '/background_2.jpg',
    heading: 'Find Gyms Nearby',
    description: 'Use our app to locate gyms in your area. View gym photos, descriptions, and available facilities. Find the perfect gym that suits your needs.',
  },
  {
    imgSrc: '/background_3.jpg',
    heading: 'Book & Pay Online',
    description: 'Easily book gym sessions and make payments through our secure platform. Manage your bookings and payments all in one place, hassle-free.',
  },
];

const Features = () => {
  return (
    <div className="py-16 bg-gray-100">
      <div className="text-center px-4 mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Your All-in-One Fitness Solution Platform
        </h1>
        <p className="text-lg text-gray-600">
          Your gym success starts with the right tools. Our easy-to-use, connected suite offers the smartest solutions for any need.
        </p>
      </div>

      <div className="flex flex-col md:flex-row justify-between px-4 gap-4">
        {features.map((feature, index) => (
          <div key={index} className="flex-1 bg-white shadow-lg rounded-lg overflow-hidden">
            <Image src={feature.imgSrc} alt={feature.heading} width={500} height={300} className="w-full h-64 object-cover" />
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">{feature.heading}</h2>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
