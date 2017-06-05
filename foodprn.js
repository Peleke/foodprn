$(document).ready(function () {

  $('#submit-search').on("click", function(event){
    // event.preventDefault();

    const city =$("#city").val().trim(); // grab city from input
    const state = $("#state").val().trim();// grab stae from input
    doAjax(config, city, state);

    // do your state/ui updates herej
    $(".wellDivContainer").append()
    // 2. Dump that into a <pre></pre> tag on the page w/ JSON.stringify(mappedData, null, 4)



  })

  // ===

  // create a config object that holds all 'permanent' information
  const config = {
    base_url: 'https://api.foursquare.com/v2',
    endpoint: 'venues',
    functionality: 'explore',
    client_id: 'CVPNGFU3BS4QLSNJUYEITIUAXWU3BLCE3B3GZ30NBAPRQMS2',
    client_secret: 'RA4WQVHK330LFHQRYFSEO1C0M5KJONNZQ1XJFX0QXIIKBSIK',
    format: 'foursquare',
    version: '20170101',
    venuePhotos: 1
  };


  // API Call #1
  // use encodeURIComponent to 'encode city and state and return result'
  function buildLocation (city, state) {
    city = encodeURIComponent(city);
    state = encodeURIComponent(state);
    // Template Strings
    return `${city},${state}`;
  }
  // calls buildLocation function and grabs returned result
  // creates the full URL used to make the API call
  function buildUrl(config, city, state) {
  const {base_url, endpoint, functionality, client_id, client_secret, version, venuePhotos} = config
  const location = buildLocation(city, state)
  return `${base_url}/${endpoint}/${functionality}?near=${location}&client_id=${client_id}&client_secret=${client_secret}&v=${version}&venuePhotos=${venuePhotos}`
  }


  // API call using 'fetch'
  // calls buildUrl function and grabs returned URL
  function doAjax(config, city, state) {
    const url = buildUrl(config, city, state)
    return fetch(url).then(function(response){
      return response.json();
    });
  };
  // ===
  //store JSON object response in a variable
  var data = doAjax(config, city, state);

  // get venue name
  function getVenueNames (data) {
    const venueWrapperList = data.response.groups[0].items
    return venueWrapperList
             .map(venueWrapper => venueWrapper.venue)
             .map(venue => venue.name)
  }

  // get venue ratings
  function getVenueNames (data) {
    const venueWrapperList = data.response.groups[0].items
    return venueWrapperList
             .map(venueWrapper => venueWrapper.venue)
             .map(venue => venue.rating)
  }

  // 0. venue ids :: take response -> [venueIds]
  // get venue ID
  function getVenueIds (data) {
    console.log(data.response)
    const venueWrapperList = data.response.groups[0].items
    return venueWrapperList
             .map(venueWrapper => venueWrapper.venue)
             .map(venue => venue.id)
  }
  //store JSON object response in a variable
  var venueId = getVenueIds(data)

  function buildPhotoUrl (venueId) {
    const {base_url, endpoint, client_id, client_secret, version} = config
    return photoURL = venueId
              .map(urls => `${base_url}/${endpoint}/'+venueId +'/photos?client_id=${client_id}&client_secret=${client_secret}&v=${version}`)
  }

  // API call #2
  // 1. Build functions to request photos for a venue
  function requestPhotos(url) {
    // 2. Use map to turn list of venue ids into a list of urls to request
    venueIds.map(builPhotoUrl).map(url => fetch(url)).map(promise => function(response){return response.json()}).map(
      // pluck off photo information
      // get photo urls
      // build HTML
    )


  }

  //build array of objects
  const objWeWant ={
    name: 'Venue',
    photos: []
  }


});
