import mongoose from "mongoose";

const friendsSchema = mongoose.Schema(
  {
    user1: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    user2: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    status: {
      type: String,
      enum: ["friends", "pending", "blocked"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Friends", friendsSchema);
