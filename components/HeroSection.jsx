"use client";
import React from "react";

export const Herosection = () => {
  return (
    <div className="hero bg-base-200 min-h-auto px-4 py-16 mt-0 flex  items-center text-center   ">
      <div className="hero-content">
        <img
          src="/Hero.jpg"
          alt="Legal assistance illustration"
          className="max-w-xs md:max-w-sm rounded-xl shadow-2xl mb-6 hover-scale-120 hover:scale-110 transition-transform duration-300"
        />
      </div>
      <div className="content ml-10  ">
        <div className="w-full h-full flex justify-center items-center">
          <h1 id="typewriter" className="text-4xl font-bold"></h1>
        </div>

        <h1 className="text-5xl md:text-5xl font-bold mb-4">
          NyayAI: Legal Help for Every Citizen
        </h1>
        <p className="text-lg md:text-xl text-gray-700 mb-6 leading-relaxed">
          <strong>Justice. Simplified. Accessible. AI-Powered.</strong>
          <br />
          NyayAI is your intelligent legal companion –<br />
          ✅ Instant legal help with our AI chatbot
          <br />✅ Consult and appoint verified lawyers with{" "}
          <strong>NyayMitr</strong>
          <br />
          ✅ Explore your rights with our smart legal database
          <br />
          <br />
          <em>Empowering Every Citizen with the Law.</em>
          <br />
          🔍 Start your legal journey now.
        </p>
      </div>
    </div>
  );
};
