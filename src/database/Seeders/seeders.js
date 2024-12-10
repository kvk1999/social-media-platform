import User from "../../models/User.js"
import Post from "../../models/Post.js"
import mongoose from "mongoose"
import bcrypt from "bcrypt"
import "dotenv/config"

const userSeeder = async () => {
  try {
    mongoose.connect(process.env.MONGO_URI, {})

    console.log("Connected to MongoDB")

    await User.deleteMany({})

    const user = await User.create([
      {
        _id: new mongoose.Types.ObjectId("65eebde6af5c0f55427ff54e"),
        name: "admin",
        email: "admin@admin.com",
        password: bcrypt.hashSync("123456", 6),
        role: "admin",
      },
      {
        _id: new mongoose.Types.ObjectId("65eebde6af5c0f55427ff54f"),
        name: "superadmin",
        email: "superadmin@superadmin.com",
        password: bcrypt.hashSync("123456", 6),
        role: "super_admin",
      },
      {
        _id: new mongoose.Types.ObjectId("65ef8bf56801986a3dda66a6"),
        name: "user",
        email: "user@user.com",
        password: bcrypt.hashSync("123456", 6),
        role: "user",
        following: ["65eebde6af5c0f55427ff54e", "65eebde6af5c0f55427ff54f"],
        followers: ["65ef99191cab165c23b93315", "65ef98fd2294f6789077eed5"],
      },
      {
        _id: new mongoose.Types.ObjectId("65ef98fd2294f6789077eed5"),
        name: "user1",
        email: "user1@user.com",
        password: bcrypt.hashSync("123456", 6),
        role: "user",
        following: ["65eebde6af5c0f55427ff54e", "65eebde6af5c0f55427ff54f"],
        followers: [
          "65ef8bf56801986a3dda66a6",
          "65eebde6af5c0f55427ff54e",
          "65eebde6af5c0f55427ff54f",
        ],
      },
      {
        _id: new mongoose.Types.ObjectId("65ef99191cab165c23b93315"),
        name: "user2",
        email: "user2@user.com",
        password: bcrypt.hashSync("123456", 6),
        role: "user",
        following: ["65eebde6af5c0f55427ff54e", "65eebde6af5c0f55427ff54f"],
        followers: [
          "65ef98fd2294f6789077eed5",
          "65ef8bf56801986a3dda66a6",
          "65ef8bf56801986a3dda66a6",
        ],
      },
    ])

    console.log("User created")
  } catch (error) {
    console.log(error)
  }
}

const postSeeder = async () => {
  try {
    mongoose.connect(process.env.MONGO_URI, {})

    console.log("Connected to MongoDB")

    await Post.deleteMany({})

    const post = await Post.create([
      {
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
        userId: new mongoose.Types.ObjectId("65eebde6af5c0f55427ff54e"),
        // likes: ["65eebde6af5c0f55427ff54e", "65ef99191cab165c23b93315"],
        likes: [],
      },
      {
        content: "Praesent aliquam odio id nisi luctus bibendum",
        userId: new mongoose.Types.ObjectId("65eebde6af5c0f55427ff54f"),
        likes: [],
      },
      // {
      //   content:
      //     "Aenean iaculis ex sed ligula congue, vitae sollicitudin leo elementum",
      //   userId: new mongoose.Types.ObjectId("65ef99191cab165c23b93315"),
      //   // likes: [
      //   //   "65eebde6af5c0f55427ff54e",
      //   //   "65ef99191cab165c23b93315",
      //   //   "65eebde6af5c0f55427ff54f",
      //   // ],
      //   likes: [],
      // },
      {
        content:
          "Morbi risus nisi, luctus congue tristique at, rhoncus eu nisi",
        userId: new mongoose.Types.ObjectId("65ef99191cab165c23b93315"),
      },
    ])

    console.log("Posts created")
  } catch (error) {
    console.log(error)
  } finally {
    mongoose.disconnect()
  }
}

const executeSeeders = async () => {
  await userSeeder()
  await postSeeder()
}
executeSeeders()
