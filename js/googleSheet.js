const { GoogleSpreadsheet } = require('google-spreadsheet');

const doc = new GoogleSpreadsheet('1IoIabHVGONxSG2mlip7CiYi0MS8KGe4F2dW1OnjfqPg');

// https://theoephraim.github.io/node-google-spreadsheet/#/getting-started/authentication
const creds = require('../config/secret/helium-311010-cd25337b10cf.json'); // the file saved above

const authenticate = async () => {
    await doc.useServiceAccountAuth(creds);

    // or preferably, loading that info from env vars / config instead of the file
    // await doc.useServiceAccountAuth({
    //   client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    //   private_key: process.env.GOOGLE_PRIVATE_KEY,
    // });

    // example using impersonation - NOTE: your service account must have "domain-wide delegation" enabled
    // see https://developers.google.com/identity/protocols/oauth2/service-account#delegatingauthority
    // await doc.useServiceAccountAuth(creds, 'hwillj@gmail.com');

    await doc.loadInfo(); // loads document properties and worksheets
    console.log(doc.title);

    const sheet = doc.sheetsById['0']; // or use doc.sheetsById[id] or doc.sheetsByTitle[title]
    console.log(sheet.title);
    console.log(sheet.rowCount);

    const rows = await sheet.getRows();

    rows.forEach(row => console.log(row.Address))
}

authenticate()
