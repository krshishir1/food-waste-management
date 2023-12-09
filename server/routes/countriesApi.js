const countriesApi = require("../controllers/countriesData")

const express = require("express")
const router = express.Router()

router.get("/", async (req, res) => {
    try {

        const data = await countriesApi.getCountriesAndStates()

        if(!data) throw new Error("Error getting countries and states")

        res.status(200).json({data})

    } catch(err) {
        console.log(err.message)

        res.status(500).json({message: err.message})
    }
})


module.exports = router