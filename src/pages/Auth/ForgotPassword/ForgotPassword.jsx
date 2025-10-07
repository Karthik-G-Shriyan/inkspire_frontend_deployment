import React, { useState } from "react";
import { toast } from "react-toastify";
import { FaEnvelope, FaLock, FaKey } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import { forgotPassword, resendOtp, resetPassword } from "../../../service/AuthService";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [step, setStep] = useState(1); // 1 = request OTP, 2 = verify & reset
  const [isResending, setIsResending] = useState(false);

  // ✅ Request OTP
  const handleRequestOtp = async () => {
    if (!email) return toast.error("Please enter your email.");
    try {
      const res = await forgotPassword({ email });
      toast.success(res.data.message || "OTP sent to your email!");
      setStep(2);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send OTP.");
    }
  };

  // ✅ Resend OTP
  const handleResendOtp = async () => {
    if (!email) return toast.error("Email is missing. Go back and enter your email.");
    setIsResending(true);
    try {
      const res = await resendOtp({ email });
      toast.success(res.data.message || "OTP resent successfully!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to resend OTP.");
    } finally {
      setIsResending(false);
    }
  };

  // ✅ Reset Password
  const handleResetPassword = async () => {
    if (!otp || !newPassword || !confirmPassword)
      return toast.error("All fields are required.");
    if (newPassword !== confirmPassword)
      return toast.error("Passwords do not match.");

    try {
      const res = await resetPassword({
        email,
        otp,
        newPassword,
      });
      toast.success(res.data.message || "Password reset successful!");
      setStep(1);
      setEmail("");
      setOtp("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid OTP or request failed.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
          Forgot Password
        </h2>

        {step === 1 ? (
          <>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Email Address
            </label>
            <div className="flex items-center border rounded-lg px-3 py-2 mb-4">
              <FaEnvelope className="text-gray-500 mr-2" />
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full outline-none"
              />
            </div>
            <button
              onClick={handleRequestOtp}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
            >
              Request OTP
            </button>
          </>
        ) : (
          <>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Enter OTP
              </label>
              <div className="flex items-center border rounded-lg px-3 py-2">
                <FaKey className="text-gray-500 mr-2" />
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full outline-none"
                />
              </div>
              {/* ✅ Resend OTP Button */}
              <button
                onClick={handleResendOtp}
                disabled={isResending}
                className="text-sm text-blue-600 hover:underline mt-2"
              >
                {isResending ? "Resending..." : "Resend OTP"}
              </button>
            </div>

            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                New Password
              </label>
              <div className="flex items-center border rounded-lg px-3 py-2">
                <FaLock className="text-gray-500 mr-2" />
                <input
                  type="password"
                  placeholder="New password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full outline-none"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <div className="flex items-center border rounded-lg px-3 py-2">
                <FaLock className="text-gray-500 mr-2" />
                <input
                  type="password"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full outline-none"
                />
              </div>
            </div>

            <button
              onClick={handleResetPassword}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition"
            >
              Reset Password
            </button>

            <button
              onClick={() => setStep(1)}
              className="w-full mt-3 bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 rounded-lg transition"
            >
              Back
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
