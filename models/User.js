import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone: { type: String, required: true, trim: true },
    dob: { type: Date, required: true },
    passwordHash: { type: String, required: true },
    approved: { type: Boolean, default: false },
    profilePicture: { type: String, default: "" },
    feedback: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
