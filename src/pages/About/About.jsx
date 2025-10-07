// src/components/AboutUs.jsx
import React from "react";

const teamMembers = [
  { id: 1, name: "Alice Johnson", role: "Founder & CEO", img: "/team1.jpg" },
  { id: 2, name: "Bob Smith", role: "Lead Developer", img: "/team2.jpg" },
  { id: 3, name: "Carol Lee", role: "Content Manager", img: "/team3.jpg" },
];

const About = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      {/* Page Heading */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
        <p className="text-gray-600 text-lg md:text-xl">
          Inkspire is your platform to explore, learn, and share ideas through engaging blogs and articles. We aim to inspire creativity and learning every day.
        </p>
      </div>

      {/* Mission & Vision */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="bg-blue-50 p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-2">Our Mission</h2>
          <p className="text-gray-700">
            To empower writers and readers with a platform that fosters learning, creativity, and meaningful connections.
          </p>
        </div>
        <div className="bg-blue-50 p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-2">Our Vision</h2>
          <p className="text-gray-700">
            To become the go-to community for quality blogs and knowledge sharing, inspiring millions around the globe.
          </p>
        </div>
      </div>

      {/* Team Section */}
      <div>
        <h2 className="text-3xl font-bold mb-6 text-center">Meet the Team</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="bg-white p-6 rounded-lg shadow text-center"
            >
              <img
                src={member.img}
                alt={member.name}
                className="w-32 h-32 mx-auto rounded-full object-cover mb-4"
              />
              <h3 className="text-xl font-semibold">{member.name}</h3>
              <p className="text-gray-500">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
