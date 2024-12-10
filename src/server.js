import express from "express"
import "dotenv/config"
import { dbConnection } from "./database/db.js"
import router from "./routes/router.js"
import cors from "cors"
const app = express()

app.use(cors())

//parse body

app.use(express.json())

const PORT = process.env.PORT || 3001

// API ROUTES

app.get("/api/healthy", (req, res) => {
  res.status(200).json({ success: true, message: "server is healthy" })
})

app.use("/api", router)

//app.use(router)

// if don't write nothing inside (), the path change to => localhost:3500/auth/login

dbConnection()
  .then(() => {
    console.log("Database connected")
    app.listen(PORT, () => {
      console.log(`server is running localhost:${PORT}`)
    })
  })

  .catch((error) => {
    console.log(error)
  })
