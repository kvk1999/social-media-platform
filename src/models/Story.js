import mongoose from "mongoose";

const storySchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
    expiration: { type: Date, required: true },
  },
  { timestamps: true }
);

const Story = mongoose.model("Story", storySchema);

export default Story;
