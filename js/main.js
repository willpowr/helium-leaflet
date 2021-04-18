
const { authenticate, getGeoLocations } = require('./googleSheets')
const L = require('leaflet')

const getGeos = async () => {
    await authenticate()
    const coords = await getGeoLocations()
    return coords.map(pair => pair.split(',').map(Number))
}

const getCircle = (lat, long, sizeMetres, color, fillColor) => {
    return L.circle([lat, long], sizeMetres, {
        color: color,
        fillColor: fillColor,
        fillOpacity: 0.5
    })
}

const addCircles = (map, coords) => {
    coords.forEach(coord => {
        getCircle(coord[0], coord[1], 300, 'green', 'green').addTo(map)
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

    L.marker([51.5, -0.09]).addTo(mymap)
        .bindPopup("<b>Hello world!</b><br />I am a popup.").openPopup();

    L.circle([51.4999307, -0.3050284], 300, {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5
    }).addTo(mymap).bindPopup("I am a circle.");

    addCircles(mymap, await getGeos())

    L.polygon([
        [51.509, -0.08],
        [51.503, -0.06],
        [51.51, -0.047]
    ]).addTo(mymap).bindPopup("I am a polygon.");


    var popup = L.popup();

    function onMapClick(e) {
        popup
            .setLatLng(e.latlng)
            .setContent("You clicked the map at " + e.latlng.toString())
            .openOn(mymap);
    }

    mymap.on('click', onMapClick);
}
