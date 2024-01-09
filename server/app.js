const express = require("express")
const app = express()
const mongoose = require("mongoose")
require("dotenv").config()

const cors = require("cors")

const organizationRouter = require("./routes/registerOrganization")
const countriesRouter = require("./routes/countriesApi")
const organization = require("./routes/organization")

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/auth/organization", organizationRouter)
app.use("/api/search", countriesRouter)
app.use("/api", organization)

app.get("/", (req, res) => {
    res.send("Hello world")
    console.log("Everything is working alright")
})

mongoose.connect(process.env.DATABASE_URI)
    .then(() => app.listen(process.env.DEVELOPMENT_PORT, () => {
        console.log(`Server up and running`)
    }))
    .catch(err => console.log(err.message))