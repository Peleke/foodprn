$('#btn').on("click", function(event){
  const city = // grab city from input
  const state = // grab stae from input
  doAjax(config, city, state);
  // do your state/ui updates herej


  // 2. Dump that into a <pre></pre> tag on the page w/ JSON.stringify(mappedData, null, 4)
})

// ===

// config.json

// const & let
const config = {
  base_url: 'https://api.foursquare.com/v2',
  endpoint: 'venues',
  functionality: 'explore',
  client_id: 'KONYCKSGRS3NQ0BFNXGXPAIDMG0BF40ZC2ABKJCV5MLDJZOI',
  client_secret: 'RT1K2JJJGKRPOVCAT30JK45TVCVO11ZUTWKJNOT0PBVV0244',
  format: 'foursquare',
  version: '20170101'
};

// ajaxHelpers.js

function buildLocation (city, state) {
  city = encodeURIComponent(city);
  state = encodeURIComponent(state);

  // Template Strings
  return `${city},${state}`;
}

function buildUrl(config, city, state) {
  // Destructuring
  const { base_url, endpoint, functionality, client_id, client_secret, format, version } = config
  const location = buildLocation(city, state);

  return `${base_url}/${endpoint}/${functionality}?client_id=${client_id}&client_secret=${client_secret}&v=${version}&m=${format}&near=${location}`
}

function doAjax(config, city, state, success = console.log, fail = console.error) {
  const url = buildUrl(config, city, state);

  return fetch(url).then(success).catch(fail);
}

// ===


// 1. map response into data your app needs
// HINTS
map
{
  venueName: 'Name',
  photos: [...]
}
