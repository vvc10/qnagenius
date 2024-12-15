'use client'
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";

const TechnicianNotification = () => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="relative bg-white rounded-xl shadow-2xl p-8 max-w-lg text-center transform transition-all scale-100 hover:scale-105">
        {/* FontAwesome Circle Check Icon */}
        <div className="flex items-center justify-center mb-6">
          <FontAwesomeIcon
            icon={faCircleCheck}
            style={{ color: "#0047c2", fontSize: "4rem" }} // Custom color and size
          />
        </div>

        {/* Notification Content */}
        <h2 className="text-2xl font-extrabold text-blue-900 mb-4">
          Technician Assigned Successfully!
        </h2>
        <p className="text-lg text-gray-700">
          Our technician will visit your site within <span className="font-bold">24 hours</span>. 
          For any queries, please call:
          <span className="text-blue-600 font-semibold"> +1-800-123-4567</span>.<br />
        </p>

        {/* Action Button */}
        <button
          onClick={handleClose}
          className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
        >
          Got it!
        </button>
      </div>
    </div>
  );
};

export default TechnicianNotification;
