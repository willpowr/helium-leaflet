
const { getReferralLocations } = require('./referrals')
const { getHotspotsAroundLocation } = require('./heliumApi')
const L = require('leaflet')

const getGeos = async (coords) => {
    
    return coords
}

const getCircle = (lat, long, sizeMetres, color, fillColor) => {
    return L.circle([lat, long], sizeMetres, {
        color: color,
        fillColor: fillColor,
        fillOpacity: 0.5
    })
}

const addCircles = (map, coords, color) => {
    console.log(coords)
    coords.forEach(coord => {
        getCircle(coord[0], coord[1], 300, color, color).addTo(map)
    })
}

exports.showMap = async () => {
    var mymap = L.map('mapid').setView([51.505, -0.09], 10);

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
        maxZoom: 18,
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
            'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1
    }).addTo(mymap);
    
    const networkHotspots = await getHotspotsAroundLocation(51.51782401166121, -0.12840809141604265, 60000)
    const  networkHotspotLocations = networkHotspots.data.map(hotspot => [hotspot.lat, hotspot.lng])
    addCircles(mymap, networkHotspotLocations, 'blue')

    addCircles(mymap, await getReferralLocations(), 'green')

    L.circle([51.4999307, -0.3050284], 300, {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5
    }).addTo(mymap).bindPopup("My box");
}
