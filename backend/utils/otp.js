import otpGenerator from "otp-generator";

// Generate a 6-digit OTP
const generateOTP = () => {
  const otp = otpGenerator.generate(4, {
    upperCase: false,
    specialChars: false,
    alphabets: true,
  });
  return otp;
};

export default generateOTP;
