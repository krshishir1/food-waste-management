const axios = require("axios")

const countriesUrl = `https://countriesnow.space/api/v0.1/countries`

const axiosInstance = axios.create({
    baseURL: countriesUrl,
    headers: {
        "Content-Type": "application/json"
    }
})

const getCountriesAndStates = async () => {
    try {

        const {data} = await axiosInstance.get("/states")

        if(Array.isArray(data.data)) {
            return data.data
        }

        return false

    } catch(err) {
        console.log(err.message)

        return false
    }
}

// const getCitiesByStates = async (query) => {
//     try {

//         const request = 

//     } catch(err) {

//     }
// }

module.exports = {
    getCountriesAndStates,
}