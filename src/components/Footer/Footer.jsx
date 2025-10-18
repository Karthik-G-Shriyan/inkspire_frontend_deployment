import React from "react";
import { Facebook, Twitter, Instagram, Github, Mail, MapPin, Phone, Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-300 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
      </div>

      <div className="relative">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Brand Section */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-white">Inkspire</h2>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                Inspire. Learn. Share. Your daily dose of blogs and ideas that spark creativity and knowledge.
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                <span>Made with passion</span>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full"></span>
                Quick Links
              </h3>
              <ul className="space-y-3">
                {["Home", "About Us", "Blog", "Categories", "Authors", "Contact"].map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-2 group"
                    >
                      <span className="w-0 h-0.5 bg-blue-500 group-hover:w-4 transition-all duration-200"></span>
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-gradient-to-b from-purple-500 to-pink-600 rounded-full"></span>
                Resources
              </h3>
              <ul className="space-y-3">
                {["Privacy Policy", "Terms of Service", "Cookie Policy", "FAQ", "Support", "Guidelines"].map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-2 group"
                    >
                      <span className="w-0 h-0.5 bg-purple-500 group-hover:w-4 transition-all duration-200"></span>
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact & Social */}
            <div>
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-gradient-to-b from-green-500 to-teal-600 rounded-full"></span>
                Get in Touch
              </h3>
              
              {/* Contact Info */}
              <div className="space-y-3 mb-6">
                <a href="mailto:hello@inkspire.com" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors duration-200 group">
                  <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center group-hover:bg-blue-600 transition-colors duration-200">
                    <Mail className="w-4 h-4" />
                  </div>
                  <span className="text-sm">hello@inkspire.com</span>
                </a>
                <a href="tel:+1234567890" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors duration-200 group">
                  <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center group-hover:bg-green-600 transition-colors duration-200">
                    <Phone className="w-4 h-4" />
                  </div>
                  <span className="text-sm">+1 (234) 567-890</span>
                </a>
                <div className="flex items-start gap-3 text-gray-400">
                  <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <span className="text-sm">123 Blog Street<br/>San Francisco, CA 94102</span>
                </div>
              </div>

              {/* Social Links */}
              <div>
                <p className="text-sm font-semibold text-white mb-3">Follow Us</p>
                <div className="flex items-center gap-3">
                  {[
                    { Icon: Facebook, color: "hover:bg-blue-600", label: "Facebook" },
                    { Icon: Twitter, color: "hover:bg-sky-500", label: "Twitter" },
                    { Icon: Instagram, color: "hover:bg-pink-600", label: "Instagram" },
                    { Icon: Github, color: "hover:bg-gray-700", label: "Github" }
                  ].map(({ Icon, color, label }) => (
                    <a
                      key={label}
                      href="#"
                      aria-label={label}
                      className={`w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center transition-all duration-200 ${color} hover:scale-110 hover:shadow-lg group`}
                    >
                      <Icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors duration-200" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Newsletter Section */}
          <div className="border-t border-gray-800 pt-8 mb-8">
            <div className="max-w-xl mx-auto text-center">
              <h3 className="text-xl font-bold text-white mb-2">Stay Updated</h3>
              <p className="text-gray-400 text-sm mb-4">
                Subscribe to our newsletter for the latest posts and updates
              </p>
              <div className="flex gap-2 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
                <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 transform hover:scale-105 shadow-lg">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 pt-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-gray-500 text-sm">
                &copy; {currentYear} <span className="text-white font-semibold">Inkspire</span>. All rights reserved.
              </p>
              <div className="flex items-center gap-6 text-sm">
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Privacy</a>
                <span className="text-gray-700">•</span>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Terms</a>
                <span className="text-gray-700">•</span>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Cookies</a>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>Crafted with</span>
                <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" />
                <span>by Inkspire Team</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;