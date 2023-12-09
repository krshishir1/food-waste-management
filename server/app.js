const express = require("express")
const app = express()
const mongoose = require("mongoose")
require("dotenv").config()

const cors = require("cors")

const organizationRouter = require("./routes/registerOrganization")
const countriesRouter = require("./routes/countriesApi")

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/auth/organization", organizationRouter)
app.use("/api/countries", countriesRouter)

mongoose.connect(process.env.DATABASE_URI)
    .then(() => app.listen(process.env.DEVELOPMENT_PORT, () => {
        console.log(`Server up and running`)
    }))
    .catch(err => console.log(err.message))