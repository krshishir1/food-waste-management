const axios = require("axios")
const Country = require('country-state-city').Country;
const State = require('country-state-city').State;

// Api not working
// const countriesUrl = `https://countriesnow.space/api/v0.1/countries`

// axios not used
// const axiosInstance = axios.create({
//     baseURL: countriesUrl,
//     headers: {
//         "Content-Type": "application/json"
//     }
// })

const getCountriesAndStates = async () => {
    try {

        const countriesArr = await Country.getAllCountries().map((el) => {
            return {
                name: el.name,
                isocode: el.isoCode,
                phonecode: el.phonecode,
                latitude: el.latitude,
                longitude: el.longitude,
            }
        })

        countriesArr.forEach(async (country, i) => {
            const statesArr = []
            await State.getStatesOfCountry(country.isocode).forEach((state) => {
                // console.log(state)
                const {name, isoCode, latitude, longitude} = state
                const statesObj = {name, isoCode, latitude, longitude}
                statesArr.push(statesObj)
            })
            countriesArr[i].states = statesArr
        })

        return countriesArr


    } catch(err) {
        console.log(err.message)

        return null
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
    // getCitiesByStates
}