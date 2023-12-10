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

        return countriesArr


    } catch(err) {
        console.log(err.message)

        return null
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
        if(!isValid) return false

        const cityArr = City.getCitiesOfState(query.countryCode, query.stateCode)

        return cityArr.length ? cityArr : false

    } catch(err) {
        console.log(err)

        return false
    }
}

const getLocalRestaurants = async (query) => {
    try {

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
                radius: 10000,
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

        return restaurantList

    } catch(err) {
        console.log(err)

        return err
    }
}

module.exports = {
    getCountriesAndStates,
    getCitiesByStates,
    getLocalRestaurants
}