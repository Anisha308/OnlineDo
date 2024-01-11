import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    mobile: {
      type: Number,
    },
    profilephoto: {
      type: String, // or whatever type you are using for storing image URLs or file paths
      default: null,
    },
    password: {
      type: String,
      required: true,
    },
    Blocked: {
      type: Boolean,
      default: false,
    },
    otp: {
      type: String,
    },
    
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword,this.password)
}

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
   return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
next();
});

const User = mongoose.model("User", userSchema);

export default User;
