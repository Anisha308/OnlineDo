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
      default:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
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
    role: { type: String, default: "user" },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  console.log(enteredPassword, 'enteredpassword');
  console.log(this.password);
  const res = await bcrypt.compare(enteredPassword, this.password);
  console.log(res);
  return res  
};
userSchema.pre("save", async function (next) {
  console.log('jjjjjjjjjjjjjjjj');
  if (!this.isModified("password")) {
    console.log('khjtttttttttttttttttt');
    return next();
  }
console.log('chakkaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
  const salt = await bcrypt.genSalt(10);
  console.log(salt,'salt');
  this.password = await bcrypt.hash(this.password, salt);
  console.log(this.password,'thispassword');
  next();
});

const User = mongoose.model("User", userSchema);

export default User;
