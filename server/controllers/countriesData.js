const axios = require("axios")
const Country = require('country-state-city').Country;

const countriesUrl = `https://countriesnow.space/api/v0.1/countries`

const axiosInstance = axios.create({
    baseURL: countriesUrl,
    headers: {
        "Content-Type": "application/json"
    }
})

const getCountriesAndStates = async () => {
    try {

        const {data} = Country.getAllCountries

        return Array.isArray(data.data) ? data.data : null

    } catch(err) {
        console.log(err.message)

        return false
    }
}

const getCitiesByStates = async (query1) => {
    try {

        // const {country} = query

        const query = '{\n    "country": "Nigeria",\n    "state": "Lagos"\n}';

        // const {data} = await axios.post("https://countriesnow.space/api/v0.1/countries/state/cities", {
        //     data: JSON.stringify({country})
        // })

        return Array.isArray(data.data) ? data.data : null

    } catch(err) {
        console.log(err)

        return false
    }
}

module.exports = {
    getCountriesAndStates,
    getCitiesByStates
}