$(document).ready(function () {

  $('#submit-search').on("click", function(event){
    event.preventDefault();

    const city =$("#city").val().trim(); // grab city from input
    const state = $("#state").val().trim();// grab stae from input
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
    client_secret: 'HJUZKDVMTBS30E3CH31HMCYWYIS4CIVTK25BGUQVKWLB2LPI',
    format: 'foursquare',
    version: '20170101',
    venuePhotos: 1
  };

  // ajaxHelpers.js

  function buildLocation (city, state) {
    city = encodeURIComponent(city);
    state = encodeURIComponent(state);
    // Template Strings
    return `${city},${state}`;
  }

  // function buildUrl(config, city, state) {
  //   // Destructuring
  //   const { base_url, endpoint, functionality, client_id, client_secret, format, version, venuePhotos } = config
  //   const location = buildLocation(city, state);
  //
  //   return `${base_url}/${endpoint}/${functionality}?near=${location}&client_id=${client_id}&client_secret=${client_secret}&v=${version}&m=${format}&venuePhotos=${venuePhotos}/`
  // }

  function buildUrl(config, city, state) {
  const {base_url, endpoint, functionality, client_id, client_secret, version, venuePhotos} = config
  const location = buildLocation(city, state)
  return `${base_url}/${endpoint}/${functionality}?near=${location}&client_id=${client_id}&client_secret=${client_secret}&v=${version}&venuePhotos=${venuePhotos}`
  }

  function doAjax(config, city, state) {
    const url = buildUrl(config, city, state);
    return fetch(url)
  };

// dynamically create divs after hitting search
  function buildInfo(){

      $("input[type=submit]").click(function(){
        $("<li />").html("item").appendTo(".results");
      })
  };
  // ===

  //1. build object
  const objWeWant ={
    name: 'Venue',
    photos: []
  }


  // 0. venue ids :: take response -> [venueIds]
  function getVenueIds (data) {
    console.log(data.response)
    const venueWrapperList = data.response.groups[0].items
    return venueWrapperList
             .map(venueWrapper => venueWrapper.venue)
             .map(venue => venue.id)
  }

  // 1. Build functions to request photos for a venue
  function requestPhotos(url) {
    // 2. Use map to turn list of venue ids into a list of urls to request
    venueIds.map(builPhotoUrl).map(url => fetch(url)).map(promise => {
      // pluck off photo information
      // get photo urls
      // build HTML
    })
  }

  function buildPhotoUrl (venueId) {
    const { base_url, endpoint, client_id, client_secret, version, venueId = getVenueIds()} = config
    return `${base_url}/${endpoint}/${venueId}/photos?client_id=${client_id}&client_secret=${client_secret}&v=${version}`
  }


});
