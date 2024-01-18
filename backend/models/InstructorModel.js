import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const instructorSchema = mongoose.Schema(
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
      required: true,
    },
    experience: {
      type: Number,
      required: true,
    },
    jobrole: {
      type: String,
      required: true,
    },
    profilephoto: {
      type: String, // or whatever type you are using for storing image URLs or file paths
    },
    companyname: {
      type: String,
      required: true,
    },
    experienceCertificateFile: {
      type: String,
    },
    idProof: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    rejected: {
      type: Boolean,
      default:false,
    },
    rejectReason: {
      type: String,
      // required:true,
    },
    role: { type: String, default: "instructor" },

    Blocked: {
      type: Boolean,
      default: false,
    },
    courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
  },
  {
    timestamps: true,
  }
);

instructorSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

instructorSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const Instructor = mongoose.model("Instructor", instructorSchema);

export default Instructor;
