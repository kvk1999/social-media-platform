import bcrypt from "bcrypt"
import User from "../models/User.js"
import jwt from "jsonwebtoken"

export const register = async (req, res) => {
  try {
    const name = req.body.name
    const email = req.body.email
    const password = req.body.password

    if (password.length < 6 || password.length > 10) {
      return res.status(400).json({
        success: false,
        message: "Password must contain between 6 and 10 characters",
      })
    }

    const validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/
    if (!validEmail.test(email)) {
      return res.status(400).json({
        success: false,
        message: "format email invalid",
      })
    }

    const passwordEncrypted = bcrypt.hashSync(password, 5)

    const newUser = await User.create({
      name: name,
      email: email,
      password: passwordEncrypted,
    })
    res.status(201).json({
      success: true,
      message: "User registered succesfully",
      data: {
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        is_active: newUser.is_active,
        id: newUser._id,
      },
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "User cant be registered",
      error: error,
    })
  }
}

export const login = async (req, res) => {
  try {
    const email = req.body.email
    const password = req.body.password

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "email and password are mandatories",
      })
    }

    const validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/
    if (!validEmail.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Email format is not valid",
      })
    }

    const user = await User.findOne({
      email: email,
    })
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Email invalid or not logged",
      })
    }
    const isValidPassword = bcrypt.compareSync(password, user.password)
    if (!isValidPassword) {
      return res.status(400).json({
        success: false,
        message: "Email or password invalid",
      })
    }
    const token = jwt.sign(
      {
        userName: user.name,
        email: user.email,
        userId: user._id,
        roleName: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "2h",
      }
    )
    res.status(200).json({
      success: true,
      message: "User logged succesfully",
      token: token,
      email: email,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "User cant be logged",
      error: error,
    })
  }
}
