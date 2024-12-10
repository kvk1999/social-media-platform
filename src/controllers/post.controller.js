import Post from "../models/Post.js"
import handleError from "../errors/handleError.js"

export const createPost = async (req, res) => {
  try {
    const userId = req.tokenData.userId
    const { content } = req.body

    if (content === "" || !content) {
      throw new Error("Content required")
    }

    const newPost = await Post.create({
      userId,
      content,
    })

    res.status(201).json({
      success: true,
      message: "Post created succesfully",
      data: newPost,
    })
  } catch (error) {
    if (error.message === "Content required") {
      return handleError(res, error.message, 400)
    }

    handleError(res, "Post can't be created", 500)
  }
}

export const deleteMoreThanOnePost = async (req, res) => {
  try {
    const { postsId } = req.body

    const postToDelete = await Post.find({ _id: { $in: postsId } })

    if (!postToDelete.length) {
      return res.status(404).json({
        success: false,
        message: "Post/s cannot be found in data base",
      })
    }
    const result = await Post.deleteMany({
      _id: { $in: postsId },
    })

    if (!result.deletedCount) {
      return res.status(404).json({
        success: false,
        message: "Post/s not deleted",
      })
    }
    res.status(201).json({
      success: true,
      message: "Post deleted succesfully",
      deletedCount: result.deletedCount,
      data: postToDelete,
    })
  } catch (error) {
    if (error.message === "Not found post to delete") {
      return handleError(res, error.message, 400)
    }
    handleError(res, "ERROR", 500)
  }
}

export const deletePost = async (req, res) => {
  try {
    const { id } = req.params
    const userId = req.tokenData.userId

    const getPost = await Post.findOne({
      _id: id,
      userId: userId,
    })

    if (!getPost) {
      console.log("this post not belong to you")
      throw new Error("Not found post to delete or this post not belong to you")
    }
    const postToDelete = await Post.deleteOne({
      _id: id,
    })
    res.status(201).json({
      success: true,
      message: "Post deleted succesfully",
      postDeleted: getPost,
      data: postToDelete,
    })
  } catch (error) {
    if (error.message === "Not found post to delete") {
      return handleError(res, error.message, 400)
    }
    handleError(res, "ERROR", 500)
  }
}

export const updatePost = async (req, res) => {
  try {
    const { content } = req.body
    const { id } = req.params
    const userId = req.tokenData.userId
    console.log("---------STARTING!!!!!!!!-------------")

    console.log(content, "lo enviado a modif")
    console.log("----------xxxxxxxxxxxxxxxxxx------------")

    console.log(id, "el post a modif")

    const postToUpdate = await Post.findOne({
      _id: id,
      userId: userId,
    })
    console.log("---------xx------------")
    if (!postToUpdate) {
      return res.status(400).json({
        success: false,
        message: "Not found post to update or this post not belong to you",
      })
    }
    console.log(postToUpdate, "el que quiero actualizar..")
    if (!postToUpdate) {
      return res.status(400).json({
        success: false,
        message: "Not found post to update",
      })
    }

    const updatePost = await Post.findOneAndUpdate(
      {
        userId: userId,
      },
      {
        content: content,
      },
      {
        new: true,
      }
    )
    console.log("----------------------")
    console.log(updatePost, "el actualizado!")

    res.status(201).json({
      success: true,
      message: "Post updated succesfully",
      data: updatePost,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Post can't be updeted",
      error: Error,
    })
  }
}

export const getOwnPosts = async (req, res) => {
  try {
    const userId = req.tokenData.userId

    const getMyPost = await Post.find({
      userId: userId,
    })

    if (getMyPost.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Not found post to show",
      })
    }

    res.status(201).json({
      success: true,
      message: "Post retrieved succesfully",
      data: getMyPost,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Post can't be retrieved",
      error: Error,
    })
  }
}

export const getPosts = async (req, res) => {
  try {
    const getUsersPost = await Post.find()
      .populate({
        path: "userId",
        select: "email name role",
      })
      .sort({ createdAt: -1 })
    // get all post that's exist
    if (getUsersPost.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Not found post to show",
      })
    }

    res.status(201).json({
      success: true,
      message: "Post retrieved succesfully",
      data: getUsersPost,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Post can't be retrieved",
      error: Error,
    })
  }
}

export const getPostById = async (req, res) => {
  try {
    const { id } = req.params

    const findPostById = await Post.findOne({
      _id: id,
    })

    if (!findPostById) {
      return res.status(400).json({
        success: false,
        message: "Not found post to show",
      })
    }

    res.status(201).json({
      success: true,
      message: "Post retrieved succesfully",
      data: findPostById,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Post can't be retrieved",
      error: Error,
    })
  }
}

export const getAnyUserPost = async (req, res) => {
  try {
    const userId = req.params.id
    const getMyPost = await Post.find({
      userId: userId,
    })

    if (getMyPost.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Not found post to show",
      })
    }

    res.status(201).json({
      success: true,
      message: "Post retrieved succesfully",
      data: getMyPost,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Post can't be retrieved",
      error: Error,
    })
  }
}

export const putLikeAndDislike = async (req, res) => {
  try {
    const { userId } = req.tokenData
    const id = req.params.userId
    const getMyPost = await Post.findById({
      _id: id,
    }).populate({ path: "userId", select: "email name" })
    if (!getMyPost) {
      throw new Error("Post not found")
    }

    //Check if exist the userId in 'Likes'
    const isInArray = getMyPost.likes.includes(userId)
    if (isInArray) {
      const index = getMyPost.likes.indexOf(userId)
      getMyPost.likes.splice(index, 1)
      await getMyPost.save()
    } else {
      getMyPost.likes.push(userId)
      await getMyPost.save()
    }

    res.status(201).json({
      success: true,
      message: "Update like succesfully",
      data: getMyPost,
    })
  } catch (error) {
    if (error.message === "Post not found") {
      return handleError(res, error.message, 400)
    }
    handleError(res, "ERROR", 500)
  }
}
