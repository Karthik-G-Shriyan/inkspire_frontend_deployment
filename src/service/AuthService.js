import axios from "axios";

const API_URL = "http://localhost:8080/api/users";

export const registerUser = async (data) => {
    try {
        const response = await axios.post(
            API_URL + "/register"
            , data
        );
        return response;
    }
    catch (error) {
        console.log("error while registering");
        throw error;
    }
}


export const loginUser = async (data) => {

    try {
        const response = await axios.post(
            API_URL + "/login", data
        );
        return response;
    }
    catch (error) {
        console.log("error while log in");
        throw error;
    }

}

export const verifyEmailOtp = async (data) => {

 try {
    const verifyEmailOtp =  await axios.post(
        API_URL + "/verify-email", data
    );
    return verifyEmailOtp;
}

  catch (error) {
    console.log("error while verifying email");
        throw error;
 }

};

// ✅ Forgot password
export const forgotPassword = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/forgot-password`, data);
    return response;
  } catch (error) {
    console.log("Error while requesting password reset:", error);
    throw error;
  }
};

// ✅ Resend OTP
export const resendOtp = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/resend-otp`, data);
    return response;
  } catch (error) {
    console.log("Error while resending OTP:", error);
    throw error;
  }
};

// ✅ Reset password
export const resetPassword = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/reset-password`, data);
    return response;
  } catch (error) {
    console.log("Error while resetting password:", error);
    throw error;
  }
};

