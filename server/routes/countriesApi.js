const countriesApi = require("../controllers/countriesData")

const express = require("express")
const router = express.Router()
const Joi = require("joi")

router.get("/countries", async (req, res) => {
    try {

        const data = await countriesApi.getCountriesAndStates()

        if(!data) return res.status(404).json({message: "No data found"})

        res.status(200).json({data})

    } catch(err) {
        
        res.status(500).json({message: err.message})
    }
})

router.get("/cities", async (req, res) => {
    try {
        const data = await countriesApi.getCitiesByStates(req.query)

        if(!data) return res.status(404).json({message: "No cities found"})

        res.status(200).json({data})
    } catch(err) {
        res.status(500).json({message: err.message})
    }
})

router.get("/restaurants", async (req, res) => {
    try {

        const {status, errMsg, results} = await countriesApi.getLocalRestaurants(req.query)

        if(errMsg) return res.status(status).json({errMsg})
        return res.status(status).json({results})

    } catch(err) {
        return res.status(500).json({errMsg: err.message})
    }
})


module.exports = router