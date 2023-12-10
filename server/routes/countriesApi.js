const countriesApi = require("../controllers/countriesData")

const express = require("express")
const router = express.Router()

router.get("/countries", async (req, res) => {
    try {

        const {status, errMsg, results} = await countriesApi.getCountriesAndStates()

        if(errMsg) throw new Error(errMsg)

        res.status(status).json({results})

    } catch(err) {
        
        res.status(500).json({errMsg: err.message})
    }
})

router.get("/cities", async (req, res) => {
    try {
        const {status, results, errMsg} = await countriesApi.getCitiesByStates(req.query)
        if(errMsg) throw new Error(errMsg)

        res.status(status).json({results})
    } catch(err) {
        res.status(500).json({errMsg: err.message})
    }
})

router.get("/restaurants", async (req, res) => {
    try {

        const {status, errMsg, data} = await countriesApi.getLocalRestaurants(req.query)

        if(errMsg) return res.status(status).json({errMsg})
        return res.status(status).json({data})

    } catch(err) {
        return res.status(500).json({errMsg: err.message})
    }
})


module.exports = router