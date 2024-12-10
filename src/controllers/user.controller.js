import User from "../models/User.js"
import Post from "../models/Post.js"

export const getUsers = async (req, res) => {
  try {
    const showUser = await User.find().select("-password")
    res.status(201).json({
      success: true,
      message: "Users retrieved succesfully",
      data: showUser,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Users can't be founded",
      error: error,
    })
  }
}
export const getProfile = async (req, res) => {
  try {
    const userId = req.tokenData.userId

    const showProfile = await User.findById({
      _id: userId,
    }).select("-password")
    // .select("-password, -role") //avoid two key/value

    res.status(201).json({
      success: true,
      message: "Profile registered succesfully",
      data: showProfile,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Profile can't founded",
      error: error,
    })
  }
}
export const updateProfile = async (req, res) => {
  try {
    const userId = req.tokenData.userId
    const { name, gender, birthday, address, phone, bio } = req.body

    const updatedProfile = await User.findOneAndUpdate(
      {
        _id: userId,
      },
      {
        name: name,
        gender: gender,
        birthday: birthday,
        address: address,
        phone: phone,
        bio: bio,
      },
      {
        new: true,
      }
    )

    res.status(201).json({
      success: true,
      message: "Profile updated succesfully",
      data: updatedProfile,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Profile can't update",
      error: error,
    })
  }
}

export const getUserByEmailOrName = async (req, res) => {
  try {
    //
    const { email, name } = req.query // Retrieve email and name from query parameters

    // Build the query object based on provided email and name
    const query = {}

    if (email) {
      // If email is provided, add it to the query object
      query.email = new RegExp(email, "i") // Case-insensitive partial matching for email
    }

    if (name) {
      // If name is provided, add it to the query object
      query.name = new RegExp(name, "i") // Case-insensitive partial matching for name
    }
    const showUser = await User.find(query).select("-password")
    if (showUser == "") {
      return res.status(404).json({
        success: false,
        message: "User/s not found",
      })
    }

    res.status(201).json({
      success: true,
      message: "User founded succesfully",
      //  `${ query.email ? "Email founded succesfully" : "Name founded succesfully"  }`,
      data: showUser,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "User can't founded",
      error: error,
    })
  }
}

export const deleteMoreThanOneUser = async (req, res) => {
  try {
    const { usersId } = req.body

    const userToDelete = await User.find({
      _id: { $in: usersId },
      role: "user",
    })

    const postByUserToDelete = await Post.find({
      userId: { $in: usersId },
    })

    if (!userToDelete.length) {
      return res.status(501).json({
        success: false,
        message: "User/s cannot be removed",
      })
    }
    //To delete use the same filter to fetch only users that his role = "user".

    const postResult = await Post.deleteMany({
      userId: { $in: usersId },
    })

    const result = await User.deleteMany({
      _id: { $in: usersId },
      role: "user",
    })
    // // delete users thats his "_id" exist and his role is "user"

    if (!result.deletedCount) {
      return res.status(404).json({
        success: false,
        message: "User/s not deleted",
      })
    }
    res.status(201).json({
      success: true,
      message: "User deleted succesfully",
      deletedCountUser: result.deletedCount,
      deletedCountPost: postResult.deletedCount,
      data: userToDelete,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "User can't deleted",
      error: error,
    })
  }
}
export const deleteUser = async (req, res) => {
  try {
    const idToDelete = req.params.id

    const deleteUser = await User.findOneAndDelete({
      _id: idToDelete,
    })

    if (!deleteUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      })
    }
    res.status(201).json({
      success: true,
      message: "User deleted succesfully",
      data: {
        name: deleteUser.name,
        email: deleteUser.email,
        role: deleteUser.role,
        is_active: deleteUser.is_active,
        id: deleteUser._id,
      },
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "User can't deleted",
      error: error,
    })
  }
}
