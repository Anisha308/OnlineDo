import React from "react";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../firebase";
import apiInstance from "../../Api";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "../Slices/authSlice";

const OAuth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      const res = await apiInstance.post(`/api/users/google`, {
        name: result.user.displayName,
        email: result.user.email,
        photo: result.user.photoURL,
      });
      const data = res.data; // Use res.data directly

      if (data) {
        dispatch(setCredentials(data));
        navigate("/home");
      }
    } catch (error) {
      console.error(error, "error in google ");
    }
  };
  return (
    <button
      type="button"
      onClick={handleGoogleClick}
      className="w-full  flex justify-center bg-gradient-to-r  hover:bg-gradient-to-l hover:from-gray-100 hover:to-indigo-200 text-black-100 p-4 mt-7  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500"
    >
      Continue with Google
    </button>
  );
};

export default OAuth;
