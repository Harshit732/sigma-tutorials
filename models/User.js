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
    passwordHash: { type: String, default: "" },
    googleId: { type: String, default: "" },
    approved: { type: Boolean, default: false },
    profilePicture: { type: String, default: "" },
    feedback: { type: String, default: "" },
    package: {
      packageId: { type: String, default: "" },
      name: { type: String, default: "" },
      totalMocks: { type: Number, default: 0 },
      assignedAt: { type: Date, default: null },
    },
    // Note: any route that queries with .lean() will skip these defaults
    // entirely (lean bypasses Mongoose document hydration) — none do today.
    mocks: {
      type: [
        {
          number: { type: Number, required: true },
          status: { type: String, enum: ["pending", "uploaded", "analyzed"], default: "pending" },
          omrImage: { type: String, default: "" },
          uploadedAt: { type: Date, default: null },
          analyzedAt: { type: Date, default: null },
          answers: {
            type: [
              {
                q: { type: Number, required: true },
                right: { type: Boolean, default: false },
                code: { type: String, enum: ["V", "B", "K", "E", "F", "S", "T", ""], default: "" },
                _id: false,
              },
            ],
            default: [],
          },
          mentorAlert: {
            triggered: { type: Boolean, default: false },
            reason: { type: String, default: "" },
          },
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
