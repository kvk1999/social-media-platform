import { Router } from "express"
import authRoutes from "./auth.routes.js"
import usersRoutes from "./users.routes.js"
import postsRoutes from "./posts.routes.js"

const router = Router()

// define auth route

router.use("/auth", authRoutes) //Ready Auth endpoints

// define users route and (inside) post route

router.use("/users", usersRoutes)

// Ready : Get All Use ,get profile, update profile

// Post
router.use("/posts", postsRoutes)

export default router
