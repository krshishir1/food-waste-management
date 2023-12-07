const express = require("express")
const app = express()
const mongoose = require("mongoose")
require("dotenv").config()

app.use(express.urlencoded({ extended: true }))

mongoose.connect(process.env.DATABASE_URI)
    .then(() => app.listen(process.env.DEVELOPMENT_PORT, () => {
        console.log(`Server up and running`)
    }))
    .catch(err => console.log(err.message))