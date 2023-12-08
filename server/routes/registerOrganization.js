const express = require("express")
const router = express.Router()

const Organization = require("../models/organization")

router.post("/register", async (req, res) => {
    try {

        console.log("Hello")

        const {orgName} = req.body

        const organization = new Organization(req.body)
        await organization.save()

        res.status(201).json({message: `New Organization ${orgName} created`})

    } catch (err) {
        res.status(400).json({message: err})
    }
})

module.exports = router