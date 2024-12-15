import Footer from '@/app/components/Footer';
import Navbar from '@/app/components/Navbar';
import React, { useEffect, useState } from 'react';

const About = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check if dark mode preference exists in localStorage
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    setIsDark(isDarkMode);

    // Apply dark class to the html element
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !isDark;
    setIsDark(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());

    // Toggle dark class on the html element
    document.documentElement.classList.toggle('dark', newDarkMode);
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <Navbar isDark={isDark} toggleDarkMode={toggleDarkMode} />
      <div className="container mx-auto py-6 px-8">
        <h1 className="text-4xl font-bold text-center mb-6">About Us</h1>
        <div className="space-y-4">
          <p className="text-lg">
            Welcome to <strong>Qnagenius</strong>, where creativity meets innovation. We specialize in building solutions that inspire, connect, and make a difference. Whether you&apos;re looking for groundbreaking designs, state-of-the-art technology, or reliable services, you&apos;ve come to the right place.
          </p>
          <p className="text-lg">
            Our journey began with a vision to bring ideas to life. Over the years, we&apos;ve grown into a team of passionate professionals committed to delivering excellence in everything we do. With expertise in areas ranging from web development to cutting-edge AI solutions, we aim to empower businesses and individuals to achieve their goals.
          </p>
          <p className="text-lg">
            At the heart of our mission is a dedication to our customers. We believe in fostering lasting relationships built on trust, transparency, and a shared drive for success. Whether you&apos;re a small startup or an established enterprise, we are here to help you turn your dreams into reality.
          </p>
        </div>
        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-2">Our Values</h2>
          <ul className="list-disc pl-6 text-lg space-y-2">
            <li><strong>Innovation:</strong> Continuously pushing the boundaries of what&apos;s possible.</li>
            <li><strong>Quality:</strong> Striving for excellence in every project and interaction.</li>
            <li><strong>Collaboration:</strong> Working closely with clients and partners to create impactful solutions.</li>
            <li><strong>Integrity:</strong> Upholding the highest standards of ethics and professionalism.</li>
          </ul>
        </div>
        <div className="mt-6 text-center">
          <p className="text-lg">
            Ready to start your journey with us? <strong>Let&apos;s create something amazing together.</strong>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
