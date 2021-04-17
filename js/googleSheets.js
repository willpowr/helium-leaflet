const { GoogleSpreadsheet } = require('google-spreadsheet');

const doc = new GoogleSpreadsheet('1IoIabHVGONxSG2mlip7CiYi0MS8KGe4F2dW1OnjfqPg');

// https://theoephraim.github.io/node-google-spreadsheet/#/getting-started/authentication
const creds = require('../config/secret/helium-311010-cd25337b10cf.json'); // the file saved above

const authenticate = async () => {
    await doc.useServiceAccountAuth(creds);
    await doc.loadInfo();
    console.log(doc.title);
}

const getGeoLocations = async () => {
    const sheet = doc.sheetsById['0']; 
    const rows = await sheet.getRows();
    return rows.map(row => row.geoLocation)
}

const listGeos = async () => {
    await authenticate()
    console.log(await getGeoLocations())
}

listGeos()