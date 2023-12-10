const axios = require("axios")
const Country = require('country-state-city').Country;
const State = require('country-state-city').State;
const City = require('country-state-city').City;

const Joi = require("joi")

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

        return {status: 200, results: countriesArr}


    } catch(err) {
        console.log(err.message)

        return {status: 500, errMsg: err.message}
    }
}

const getCitiesByStates = async (query) => {
    try {

        const schema = Joi.object({
            countryCode: Joi.string().required(),
            stateCode: Joi.string().required()
        })

        const {error} = schema.validate(query)

        const isValid = (error === undefined || null)
        if(!isValid) throw new Error(error.message)

        const cityArr = await City.getCitiesOfState(query.countryCode, query.stateCode)

        return {status: 200, results: cityArr}

    } catch(err) {
        console.log(err.message)

        return {status: 500, errMsg: err.message}
    }
}

const getLocalRestaurants = async (query) => {
    try {

        const schema = Joi.object({
            lat: Joi.number().required(),
            lon: Joi.number().required(),
            limit: Joi.number().optional().max(100),
            ofs: Joi.number().optional().max(500),
            radius: Joi.number().optional().max(100000)
        })

        const {error} = schema.validate(query)

        const isValid = (error === undefined || null)
        if(!isValid) throw new Error(error.message)

        // console.log(location)

        const request = {
            url: `https://api.tomtom.com/search/2/nearbySearch/.json`,
            params: {
                key: process.env.TOMTOM_API_KEY,
                lat: query.lat,
                lon: query.lon,
                categorySet: "7315",
                ofs: query.ofs || 0,
                limit: query.limit || 100,
                radius: query.radius || 10000,
            }
        }

        const {data} = await axios(request)

        const restaurantList = []

        data.results.forEach((res) => {
            let {type, score, dist, position, address, poi} = res;

            const {name, phone, url, timeZones, categories} = poi
            const {municipality, countrySubdivision, country, countryCode, freeformAddress} = address

            poi = {name, phone, url, timeZones, categories}
            address = {municipality, countrySubdivision, country, countryCode, freeformAddress}

            restaurantList.push({type, score, dist, position, address, poi})
        })

        return {status: 200, data: {results: restaurantList, summary: data.summary}}

    } catch(err) {
        console.log(err.message)

        return {status: 500, errMsg: err.message}
    }
}

module.exports = {
    getCountriesAndStates,
    getCitiesByStates,
    getLocalRestaurants
}