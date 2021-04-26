const {google} = require ('googleapis');
const keys = require ('./keys.json');

const client = new google.auth.JWT(keys.client_email, null, keys.private_key, [ 'https://www.googleapis.com/auth/spreadsheets' ]);
client.authorize(async function (error, tokens) {
  if (error) {
    console.log(error);
  }
});
  // for data
  const array = {};
  gsrunDB(client)
    .then(async (list) => {
      for (const item of list) {
        const result = await gsrun(client,item);
        array[item] = result;
      }
      console.log(array);
    })

  // Sheets data
  async function gsrun(cl, name) { //cl for client
    const gsapi = google.sheets({ version: 'v4', auth: cl });
    const opt = {
      spreadsheetId: '1cH0VLuRxn886VMXB3-aNUe6nBvnViDU66nyxN8xGJIo',
      range: name,
    };
    const dataObtained = await gsapi.spreadsheets.values.get(opt);
    const dataOne = dataObtained.data?.values?.[0]
    const dataArray = dataObtained.data.values
    await dataArray?.shift()
    const objects = dataArray?.map(
      student => Object.fromEntries(
        student.map((value, index) => [dataOne[index], value])
      )
    )
    return objects
  }

  // Name sheets
  async function gsrunDB(cl) { //cl for client
    const gsapi = google.sheets({ version: 'v4', auth: cl });
    const opt = {
      spreadsheetId: '1cH0VLuRxn886VMXB3-aNUe6nBvnViDU66nyxN8xGJIo',
    };
    const dataOb = (await gsapi.spreadsheets.get(opt)).data.sheets;
    const res = dataOb.map(({ properties: { title } }) => title)
    return res
  }









