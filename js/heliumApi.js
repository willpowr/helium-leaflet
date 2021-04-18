const axios = require('axios');

exports.getHotspotsAroundLocation = async (lat, lon, dist) => {

    const config = {
        method: 'get',
        url: `https://api.helium.io/v1/hotspots/location/distance?lat=${lat}&lon=${lon}&distance=${dist}`,
        headers: {}
    };

    try {
        const { data: response } = await axios(config) //use data destructuring to get data from the promise object
        return response
    }

    catch (error) {
        console.log(error);
    }

    // axios(config)
    //     .then(function (response) {
    //         return JSON.stringify(response.data);
    //     })
    //     .catch(function (error) {
    //         console.log(error);
    //     });
}