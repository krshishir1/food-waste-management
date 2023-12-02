import axios from "axios";

export default async function fetchNearbyPois(latitude, longitude) {

    try {

        if(!latitude || !longitude) return false;

        let radius = 10000;
    
        const {data} = await axios({
            method: "get",
            url: `https://api.tomtom.com/search/2/nearbySearch/.json`,
            headers: {
                "Content-Type": "application/json",
            },
            params: {
                // query: "pizza",
                key: "KoHlZZnxhCZKs4nHQdvI2KGv1pu12gyD", // not in production
                ext: "json",
                lat: latitude,
                lon: longitude,
                radius,
                limit: 100,
                categorySet: `7315`,
                view: "Unified",
                relatedPois: "off"
    
            },
        });

        return data;
    } catch(err) {
        console.log(err)

        return false;
    }

}