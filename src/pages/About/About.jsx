import React, { useState } from "react";
import { Link } from "react-router-dom";

const stats = [
  { label: "Active Writers", value: "10K+", icon: "✍️" },
  { label: "Published Articles", value: "50K+", icon: "📚" },
  { label: "Monthly Readers", value: "1M+", icon: "👥" },
  { label: "Countries Reached", value: "150+", icon: "🌍" },
];

const values = [
  {
    icon: "💡",
    title: "Innovation",
    description: "We embrace new ideas and technologies to enhance the writing experience."
  },
  {
    icon: "🤝",
    title: "Community",
    description: "Building meaningful connections between writers and readers worldwide."
  },
  {
    icon: "🎯",
    title: "Quality",
    description: "Committed to maintaining high standards in content and user experience."
  },
  {
    icon: "🌱",
    title: "Growth",
    description: "Supporting continuous learning and development for all our users."
  },
];

const notificationSteps = [
  {
    id: 1,
    icon: "✍️",
    title: "Author Publishes",
    description: "When an author publishes a new post, our system automatically detects it.",
    color: "from-blue-500 to-indigo-600"
  },
  {
    id: 2,
    icon: "📧",
    title: "Email Triggered",
    description: "An instant email notification is generated and prepared for all followers.",
    color: "from-purple-500 to-pink-600"
  },
  {
    id: 3,
    icon: "👥",
    title: "Followers Notified",
    description: "All followers receive a personalized email with the new post details.",
    color: "from-green-500 to-emerald-600"
  },
  {
    id: 4,
    icon: "🔔",
    title: "Stay Connected",
    description: "Readers never miss content from their favorite authors and stay engaged.",
    color: "from-orange-500 to-red-600"
  },
];

const About = () => {
  const [hoveredStep, setHoveredStep] = useState(null);

  return (
    <section className="w-full bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-purple-600 to-blue-600 text-white py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>
        
        <div className="relative max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fadeIn">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-pink-200">Inkspire</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-100 leading-relaxed">
            Where ideas flourish and stories come alive. We're building a community that celebrates creativity, knowledge, and the power of words.
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 -mt-12 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg p-6 text-center transform hover:scale-105 transition-all duration-300 hover:shadow-xl"
            >
              <div className="text-4xl mb-2">{stat.icon}</div>
              <div className="text-3xl md:text-4xl font-bold text-purple-600 mb-1">
                {stat.value}
              </div>
              <div className="text-gray-600 text-sm md:text-base">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Story Section */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6 text-gray-800">Our Story</h2>
            <p className="text-lg text-gray-600 mb-4 leading-relaxed">
              Inkspire was born from a simple belief: everyone has a story worth telling. In 2020, a small group of writers and developers came together with a vision to create a platform where voices could be heard, ideas could spread, and communities could thrive.
            </p>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Today, we're proud to host thousands of writers from around the world, sharing their unique perspectives on topics ranging from technology and science to art and culture. Our platform continues to evolve, driven by the needs of our vibrant community.
            </p>
            <div className="flex gap-4">
              <button className="px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors duration-300 shadow-md hover:shadow-lg">
                Join Our Community
              </button>
              <button className="px-6 py-3 border-2 border-purple-600 text-purple-600 rounded-lg font-semibold hover:bg-purple-50 transition-colors duration-300">
                Learn More
              </button>
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-gradient-to-br from-purple-400 to-blue-400 rounded-2xl p-8 shadow-2xl transform hover:rotate-1 transition-transform duration-300">
              <div className="bg-white rounded-xl p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-2xl">
                    🎨
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Creative Freedom</h3>
                    <p className="text-sm text-gray-600">Express yourself without limits</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-2xl">
                    🚀
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Easy Publishing</h3>
                    <p className="text-sm text-gray-600">Share your work instantly</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center text-2xl">
                    🌟
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Engaged Audience</h3>
                    <p className="text-sm text-gray-600">Connect with passionate readers</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border-t-4 border-purple-600">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4 text-3xl">
                🎯
              </div>
              <h2 className="text-3xl font-bold mb-4 text-gray-800">Our Mission</h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                To empower writers and readers with a platform that fosters learning, creativity, and meaningful connections. We believe in democratizing content creation and making quality writing accessible to everyone.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border-t-4 border-blue-600">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 text-3xl">
                🔭
              </div>
              <h2 className="text-3xl font-bold mb-4 text-gray-800">Our Vision</h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                To become the go-to community for quality blogs and knowledge sharing, inspiring millions around the globe. We envision a world where every voice matters and every story finds its audience.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Core Values */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-gray-800">Our Core Values</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            These principles guide everything we do and shape the Inkspire community
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
            >
              <div className="text-5xl mb-4">{value.icon}</div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">{value.title}</h3>
              <p className="text-gray-600 leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Email Notification Feature Section */}
      <div className="bg-gradient-to-b from-gray-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold mb-4">
              ⚡ Featured Technology
            </div>
            <h2 className="text-4xl font-bold mb-4 text-gray-800">Smart Email Notifications</h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Stay connected with your favorite authors! Our intelligent notification system ensures you never miss new content from the writers you follow.
            </p>
          </div>

          {/* How It Works */}
          <div className="mb-16">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {notificationSteps.map((step, index) => (
                <div
                  key={step.id}
                  className="relative"
                  onMouseEnter={() => setHoveredStep(step.id)}
                  onMouseLeave={() => setHoveredStep(null)}
                >
                  {/* Connection Line */}
                  {index < notificationSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-20 left-[60%] w-full h-0.5 bg-gradient-to-r from-purple-300 to-blue-300 z-0" />
                  )}
                  
                  <div className={`relative bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-2xl ${
                    hoveredStep === step.id ? 'scale-105 -translate-y-2' : ''
                  }`}>
                    <div className={`h-2 bg-gradient-to-r ${step.color}`} />
                    <div className="p-6">
                      <div className={`w-16 h-16 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center text-3xl mb-4 shadow-lg transform transition-transform duration-300 ${
                        hoveredStep === step.id ? 'rotate-12' : ''
                      }`}>
                        {step.icon}
                      </div>
                      <div className="text-sm font-bold text-purple-600 mb-2">Step {step.id}</div>
                      <h3 className="text-xl font-bold text-gray-800 mb-3">{step.title}</h3>
                      <p className="text-gray-600 leading-relaxed text-sm">{step.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Feature Highlights */}
          <div className="bg-gradient-to-br from-purple-500 to-blue-600 rounded-3xl p-8 md:p-12 text-white shadow-2xl">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-3xl font-bold mb-6">Why Email Notifications Matter</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      ⚡
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">Instant Updates</h4>
                      <p className="text-white/90 text-sm">Get notified immediately when your favorite authors publish new content.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      🎯
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">Personalized Experience</h4>
                      <p className="text-white/90 text-sm">Receive customized emails with content tailored to your interests.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      🔗
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">Stay Engaged</h4>
                      <p className="text-white/90 text-sm">Build stronger connections with authors and never miss important updates.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      ⚙️
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">Full Control</h4>
                      <p className="text-white/90 text-sm">Manage your notification preferences anytime from your account settings.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                  <div className="bg-white rounded-xl p-6 shadow-xl">
                    <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-200">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                        A
                      </div>
                      <div className="flex-1">
                        <div className="font-bold text-gray-800 text-sm">New Post from Author Name</div>
                        <div className="text-gray-500 text-xs">Just now</div>
                      </div>
                    </div>
                    <h4 className="font-bold text-gray-800 mb-2">📧 You have a new post!</h4>
                    <p className="text-gray-600 text-sm mb-4">
                      Check out the latest article: "Understanding Modern Web Development"
                    </p>
                    <button className="w-full py-2 bg-gradient-to-r from-purple-500 to-blue-600 text-white rounded-lg font-semibold text-sm hover:shadow-lg transition-shadow">
                      Read Article
                    </button>
                  </div>
                  
                  {/* Floating notification badges */}
                  <div className="absolute -top-4 -right-4 w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg animate-pulse">
                    3
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-xl text-gray-100 mb-8">
            Join thousands of writers and readers in our growing community
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/create-post">
              <button className="px-8 py-4 bg-white text-purple-600 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors duration-300 shadow-lg hover:shadow-xl">
                Start Writing Today
              </button>
            </Link>
            <Link to="/explore">
              <button className="px-8 py-4 border-2 border-white text-white rounded-lg font-bold text-lg hover:bg-white/10 transition-colors duration-300">
                Explore Articles
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;