import { Schema, model } from "mongoose"

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: false,
    },
    gender: {
      type: String,
      required: false,
    },
    birthday: {
      type: Date,
      required: false,
    },
    address: {
      type: String,
      required: false,
    },
    phone: {
      type: Number,
      required: false,
    },
    bio: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin", "super_admin"],
      default: "user",
    },
    following: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    followers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    visibility: {
      type: String,
      enum: ["public", "private"],
      default: "public",
    },
    is_active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

const User = model("User", UserSchema)

export default User
