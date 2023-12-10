const countriesApi = require("../controllers/countriesData")

const express = require("express")
const router = express.Router()
const Joi = require("joi")

router.get("/", async (req, res) => {
    try {

        const data = await countriesApi.getCountriesAndStates()

        if(data === null) return res.status(404).json({message: "No cities found"})

        res.status(200).json({data})

    } catch(err) {
        console.log(err.message)

        res.status(500).json({message: err.message})
    }
})

router.get("/cities", async (req, res) => {
    try {
        const schema = Joi.object({
            country: Joi.string().required(),
            state: Joi.string().required()
        })

        const {error} = schema.validate(req.query)

        // console.log(error)

        const isValid = error === undefined || null

        if(!isValid) return res.status(400).json({message: "Invalid request"})

        const data = await countriesApi.getCitiesByStates(req.query)

        if(!data) return res.status(404).json({message: "No cities found"})

        res.status(200).json({data})
    } catch(err) {
        console.log(err.message)

        res.status(500).json({message: err.message})
    }
})


module.exports = router