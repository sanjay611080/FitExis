// components/ScrollToTopButton.tsx
'use client'
import React, { useEffect, useState } from 'react';
import { FaArrowUp } from 'react-icons/fa'; // You might need to install react-icons if you haven't already

const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const checkScrollTop = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else if (window.pageYOffset <= 300) {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', checkScrollTop);
    return () => window.removeEventListener('scroll', checkScrollTop);
  }, []);

  return (  
    <button
      onClick={scrollToTop}
      className={`fixed bottom-4 right-4 p-2 bg-white text-black rounded-full shadow-lg transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
      <FaArrowUp size={24} />
    </button>
  );
};

export default ScrollToTopButton;
