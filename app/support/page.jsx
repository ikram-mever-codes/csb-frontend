"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaArrowCircleLeft } from "react-icons/fa";
import { toast } from "react-toastify";
import { useGlobalContext } from "../ContextProvider";

const SupportPage = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useGlobalContext();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      toast.loading("Sending Message...");
      const response = await fetch("https://formspree.io/f/mkgwdvey", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      setLoading(false);
      toast.dismiss();
      if (response.ok) {
        toast.success("Thanks for Submitting  your Message.");
      }
    } catch (err) {
      setLoading(false);
      toast.dismiss();
      toast.error(err.message);
    }
  };
  useEffect(() => {
    if (user) {
      setFormData({
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        message: "",
      });
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f1f4fa]">
      <div className="w-full max-w-lg bg-white p-8 shadow-lg rounded-lg">
        <h2 className="text-2xl flex justify-center items-center gap-[10px] font-bold text-center text-[#B82724] mb-6">
          <Link href="dashboard">
            <FaArrowCircleLeft />
          </Link>
          Contact Support
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col">
            <label
              htmlFor="name"
              className="text-sm font-semibold text-gray-700 mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B82724]"
              required
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="text-sm font-semibold text-gray-700 mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B82724]"
              required
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="message"
              className="text-sm font-semibold text-gray-700 mb-2"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B82724] h-32 resize-none"
              required
            />
          </div>
          <button
            disabled={loading}
            type="submit"
            className="w-full disabled:cursor-not-allowed bg-gradient-to-r from-[#E36C40] to-[#B82724] text-white font-bold py-3 rounded-lg hover:bg-gradient-to-l transition-all"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default SupportPage;
