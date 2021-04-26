const {google} = require ('googleapis');
const keys = require ('./keys.json');

const client = new google.auth.JWT(keys.client_email, null, keys.private_key, [ 'https://www.googleapis.com/auth/spreadsheets' ]);
client.authorize(function (error, tokens) {
  if (error) {
    console.log(error);
  }
    console.log('connected…'),
    gsrun(client);


});

  // Sheets data
  async function gsrun(cl) { //cl for client
    const gsapi = google.sheets({ version: 'v4', auth: cl });
    const opt = {
      spreadsheetId: '1cH0VLuRxn886VMXB3-aNUe6nBvnViDU66nyxN8xGJIo',
      range:'Лист1'

    };
    let dataObtained = await gsapi.spreadsheets.values.get(opt);
    let dataOne = dataObtained.data.values[0]
    let dataArray = dataObtained.data.values
    await dataArray.shift()
    const objects = dataArray.map(
      student => Object.fromEntries(
        student.map((value, index) => [dataOne[index], value])
      )
    )
    console.log(objects)

  }

  // Name sheets
  async function gsrunDB(cl) { //cl for client
    const gsapi = google.sheets({ version: 'v4', auth: cl });
    const opt = {
      spreadsheetId: '1cH0VLuRxn886VMXB3-aNUe6nBvnViDU66nyxN8xGJIo',
    };
    let dataOb = (await gsapi.spreadsheets.get(opt)).data.sheets;
    let res = dataOb.map(({ properties: { title } }) => title)
    console.log(res);
  }









