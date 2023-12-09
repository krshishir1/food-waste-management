const axios = require("axios")

const countriesUrl = `https://countriesnow.space/api/v0.1/countries`

const getCountriesAndStates = async () => {
    try {

        const request = {
            baseURL: countriesUrl,
            url: "/states",
            method: "get"
        }

        const {data} = await axios(request)

        if(Array.isArray(data.data)) {
            return data.data
        }

        return false

    } catch(err) {
        console.log(err.message)

        return false
    }
}

module.exports = {
    getCountriesAndStates,
}