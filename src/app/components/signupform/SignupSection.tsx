"use client";
import React, { useState } from "react";

const SignupSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    passType: "",
  });

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form data submitted:", formData);
  };

  return (
    <section className="bg-gray-100 py-12 px-4 md:px-8">
      <div className="container mx-auto text-center">
        <div className="mb-6">
          <p className="text-sm font-light text-gray-600">
            Experience the Fitness At FitExis Friendliest Gym Pass for all gyms
          </p>
        </div>
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Join FitExis Platform Today
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="max-w-full mx-auto">
          {/* Grid layout for form fields */}
          <div className="flex flex-col md:flex-row md:space-x-4 mb-4">
            <div className="flex-1 mb-4 md:mb-0">
              <label
                htmlFor="name"
                className="block text-left text-gray-700 mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black"
                style={{ minWidth: "200px" }}
              />
            </div>
            <div className="flex-1 mb-4 md:mb-0">
              <label
                htmlFor="email"
                className="block text-left text-gray-700 mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black"
                style={{ minWidth: "200px" }}
              />
            </div>
            <div className="flex-1 mb-4 md:mb-0">
              <label
                htmlFor="mobile"
                className="block text-left text-gray-700 mb-2"
              >
                Mobile Number
              </label>
              <input
                type="tel"
                id="mobile"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black"
                style={{ minWidth: "200px" }}
              />
            </div>
            <div className="flex-1 mb-4 md:mb-0">
              <label
                htmlFor="passType"
                className="block text-left text-gray-700 mb-2"
              >
                Choose Your Pass
              </label>
              <select
                id="passType"
                name="passType"
                value={formData.passType}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black"
                style={{ minWidth: "200px" }}
              >
                <option value="" disabled>
                  Select a pass
                </option>
                <option value="one_day">One Day Pass</option>
                <option value="weekly">Weekly Pass</option>
                <option value="monthly">Monthly Pass</option>
              </select>
              <style jsx>{`
                option {
                  color: black;
                }
              `}</style>
            </div>
          </div>
          <button
            type="submit"
            className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-black"
          >
            Get Started
          </button>
        </form>
      </div>
    </section>
  );
};

export default SignupSection;
