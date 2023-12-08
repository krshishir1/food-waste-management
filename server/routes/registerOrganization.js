const express = require("express")
const router = express.Router()
const Joi = require("joi")

const Organization = require("../models/organization")

// Register new organization
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

// Getting organization by email
router.get("/", async (req, res) => {
    try {

        const {email} = req.query

        const validEmailSchema = Joi.string().email()
        
        await validEmailSchema.validateAsync(email)

        const result = await Organization.findOne({
            orgEmail: email
        }).select({password: 0})


        res.status(200).json({data: result})

    } catch(err) {

        if(err.message.includes("email")) {
            return res.status(401).json({message: "Email invalid"})
        }

        res.status(500).json({error: err})
    }
})





module.exports = router