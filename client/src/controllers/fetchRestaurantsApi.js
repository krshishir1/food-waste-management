import axios from "axios";
// import 'dotenv/config'

const axiosConfig = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL + "/api/search"
})

const get_countries = async () => {
    try {

        const {status, data} = await axiosConfig.get("/countries")

        // console.log(data)

        return data.results

    } catch(err) {
        console.log(err.message)
    }
}

const get_cities = async function(countryCode, stateCode) {
    try {
        const {data} = await axiosConfig.get("/cities", {
            params: {
                countryCode, stateCode
            }
        })


        return data.results;
    } catch(err) {
        console.log(err.message)
    }
}

const get_restaurants = async function(details) {
    try {

        const {latitude, longitude, radius} = details

        const {data} = await axiosConfig.get("/restaurants", {
            params: {
                lat: Number(latitude),
                lon: Number(longitude),
                radius: radius * 1000
            }
        })

        // const {summary, results} = data

        console.log(data)

    } catch(err) {
        console.log(err.message)
    }
}
 
export default {
    get_countries,
    get_cities,
    get_restaurants
}