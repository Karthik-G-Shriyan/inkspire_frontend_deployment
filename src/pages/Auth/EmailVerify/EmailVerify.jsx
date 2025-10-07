// src/pages/Auth/EmailVerify/EmailVerify.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { resendOtp, verifyEmailOtp } from "../../../service/AuthService"; // ✅ we'll define this


const EmailVerify = () => {
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [isResending, setIsResending] = useState(false);
  


  useEffect(() => {
    const savedEmail = sessionStorage.getItem("email");
    if (!savedEmail) {
      // Prevent access if email isn’t set
      navigate("/register");
    } else {
      setEmail(savedEmail);
    }
  }, [navigate]);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    // simple validation
    if (otp.length < 4) {
      toast.error("Please enter a valid OTP");
      return;
    }

    setLoading(true);
    try {
      const response = await verifyEmailOtp({ email, otp }); // call backend
      if (response.status === 200) {
        toast.success("Email verified successfully!");
        navigate("/login"); 
      } else {
        toast.error("Invalid OTP. Please try again.");
      }
    } catch (error) {
      toast.error("Verification failed. Please try again.");
      console.error("Email verification error:", error);
    } finally {
      setLoading(false);
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

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Verify Your Email</h2>
        <form onSubmit={onSubmitHandler} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Enter OTP
            </label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="mt-1 block w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
              placeholder="Enter the OTP sent to your email"
              required
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

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Verifying..." : "Verify Email"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmailVerify;
