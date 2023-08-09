// import axios from 'axios';

// const URL = `https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson`;

// function retrievedData() {
//   console.log('Loading Application...');
//   let results: any;

//   const indexData = async () => {
//     try {
//       console.log('Retrieving data from the USGS API');

//       const EARTHQUAKES = await axios.get(`${URL}`, {
//         headers: {
//           'Content-Type': ['application/json', 'charset=utf-8'],
//         },
//       });

//       console.log('Data retrieved!');

//       results = EARTHQUAKES.data.features;

//       console.log('Indexing data...');

//       results.map(
//         async (results: any) => (
//           (earthquakeObject = {
//             place: results.properties.place,
//             time: results.properties.time,
//             tz: results.properties.tz,
//             url: results.properties.url,
//             detail: results.properties.detail,
//             felt: results.properties.felt,
//             cdi: results.properties.cdi,
//             alert: results.properties.alert,
//             status: results.properties.status,
//             tsunami: results.properties.tsunami,
//             sig: results.properties.sig,
//             net: results.properties.net,
//             code: results.properties.code,
//             sources: results.properties.sources,
//             nst: results.properties.nst,
//             dmin: results.properties.dmin,
//             rms: results.properties.rms,
//             mag: results.properties.mag,
//             magType: results.properties.magType,
//             type: results.properties.type,
//             longitude: results.geometry.coordinates[0],
//             latitude: results.geometry.coordinates[1],
//             depth: results.geometry.coordinates[2],
//           }),
//           await client.index({
//             index: 'earthquakes',
//             id: results.id,
//             body: earthquakeObject,
//             pipeline: 'earthquake_pipeline',
//           })
//         ),
//       );

//       if (EARTHQUAKES.data.length) {
//         indexData();
//       } else {
//         console.log('Data has been indexed successfully!');
//       }
//     } catch (err) {
//       console.log(err);
//     }

//     console.log('Preparing for the next round of indexing...');
//   };
//   indexData();
// }
