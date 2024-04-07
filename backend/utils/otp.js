import otpGenerator from "otp-generator";

const generateOTP = () => {
  const otp = otpGenerator.generate(4, {
    upperCase: false,
    specialChars: false,
    alphabets: true,
  });
  return otp;
};

export default generateOTP;
