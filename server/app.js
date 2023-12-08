const express = require("express")
const app = express()
const mongoose = require("mongoose")
require("dotenv").config()

const organizationRouter = require("./routes/registerOrganization")

app.use(express.urlencoded({ extended: true }))

app.use("/auth/organization", organizationRouter)

mongoose.connect(process.env.DATABASE_URI)
    .then(() => app.listen(process.env.DEVELOPMENT_PORT, () => {
        console.log(`Server up and running`)
    }))
    .catch(err => console.log(err.message))