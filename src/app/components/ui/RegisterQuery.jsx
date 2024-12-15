"use client";
import React, { useState } from "react";
import axios from "axios"; // For backend communication

const RegisterQuery = () => {
  const [queryData, setQueryData] = useState({
    queryType: "",
    queryDescription: "",
    visitDate: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQueryData({ ...queryData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("/api/register-query", queryData);
      console.log("Query registered successfully:", response.data);
      // Handle success actions (e.g., show a success message)
    } catch (error) {
      console.error("Error registering query:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-[#605CFF99] h-[100vh]">
      <div className="w-full max-w-[400px] bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-center mb-6">Register Your Query</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="queryType"
              className="block text-lg font-medium text-gray-700"
            >
              Query Type
            </label>
            <select
              name="queryType"
              id="queryType"
              value={queryData.queryType}
              onChange={handleChange}
              className="w-full h-12 px-4 border border-gray-300 rounded-lg"
            >
              <option value="">Select Query Type</option>
              <option value="General">General Query</option>
              <option value="Technical">Technical Issue</option>
              <option value="Support">Support Query</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="queryDescription"
              className="block text-lg font-medium text-gray-700"
            >
              Query Description
            </label>
            <textarea
              name="queryDescription"
              id="queryDescription"
              rows="4"
              value={queryData.queryDescription}
              onChange={handleChange}
              placeholder="Describe your query"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            ></textarea>
          </div>
          <div className="mb-4">
            <label
              htmlFor="visitDate"
              className="block text-lg font-medium text-gray-700"
            >
              Visit Date
            </label>
            <input
              type="date"
              name="visitDate"
              id="visitDate"
              value={queryData.visitDate}
              onChange={handleChange}
              className="w-full h-12 px-4 border border-gray-300 rounded-lg"
            />
          </div>
          <button
            type="submit"
            className="w-full h-12 bg-[#605CFF] text-white text-lg font-medium rounded-lg mt-4"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterQuery;