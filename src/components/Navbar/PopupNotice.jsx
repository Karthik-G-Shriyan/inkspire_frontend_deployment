import React, { useEffect, useState } from "react";
import { X, AlertCircle, Zap } from "lucide-react";

const PopupNotice = () => {
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem("noticeDismissed");
    if (!dismissed) {
      setTimeout(() => setVisible(true), 500);
    }
  }, []);

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem("noticeDismissed", "true");
    }, 300);
  };

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 bg-black/50 flex items-center justify-center z-50 transition-opacity duration-300 ${
        closing ? "opacity-0" : "opacity-100"
      }`}
    >
      <div
        className={`bg-gradient-to-br from-blue-50 to-white rounded-2xl shadow-2xl max-w-lg w-full mx-4 p-8 transform transition-all duration-300 ${
          closing ? "scale-95" : "scale-100"
        }`}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close notification"
        >
          <X size={20} />
        </button>

        {/* Header with Icon */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="bg-blue-100 p-2 rounded-lg">
            <AlertCircle className="text-blue-600" size={24} />
          </div>
          <h2 className="text-xl font-bold text-gray-900">Please Note</h2>
        </div>

        {/* Content */}
        <div className="space-y-4">
          <p className="text-gray-700 leading-relaxed text-center">
            Since this project is hosted on a free platform(Google cloud run), the first request
            may take up to <span className="font-semibold text-blue-600">30 seconds</span> to
            start the backend server.
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-600 bg-blue-50 rounded-lg p-3">
            <Zap size={18} className="text-blue-500 flex-shrink-0" />
            <span>It will be lightning fast after that! ⚡</span>
          </div>
        </div>

        {/* Button */}
        <button
          onClick={handleClose}
          className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-md hover:shadow-lg active:scale-95"
        >
          Got it, let's go!
        </button>
      </div>
    </div>
  );
};

export default PopupNotice;