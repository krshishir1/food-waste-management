const express = require("express")
const router = express.Router()

const Organization = require("../models/organization")

router.post("/register", async (req, res) => {
    try {
        const {orgName} = req.body

        const organization = new Organization(req.body)
        await organization.save()

        res.status(201).json({message: `New Organization ${orgName} created`})

    } catch (err) {

        const errors = err.errors
        const validationErrors = []

        if(err.name === "ValidationError") {
            for(let key in errors) {
                validationErrors.push({type: key, message: errors[key].message})
            }

            return res.status(400).json({type: "validation", errors: validationErrors})
        }

        if(err.message.indexOf("duplicate key error") !== -1) {
            return res.status(401).json({type: "DuplicateEmail", message: "Email already exists"})
        }

        res.status(500).json({message: err.message})
    }
})

module.exports = router