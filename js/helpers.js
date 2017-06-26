  function buildLocation (city, state) {
    city = encodeURIComponent(city);
    state = encodeURIComponent(state);
    return `${city},${state}`;
  }

  function buildUrl(config, city, state) {
    const {base_url, endpoint, functionality, client_id, client_secret, version, venuePhotos} = config
    const location = buildLocation(city, state)
    return `${base_url}/${endpoint}/${functionality}?near=${location}&client_id=${client_id}&client_secret=${client_secret}&v=${version}&venuePhotos=${venuePhotos}`
  }


  function doAjax(config, city, state) {
    const url = buildUrl(config, city, state)
    return fetch(url).then(function(response){
      return response.json();
    });
  };

  function getVenueInfo (data) {
   const venueWrapperList = data.response.groups[0].items
   return venueWrapperList
            .map(venueWrapper => venueWrapper.venue)
            .map(venue => {
              return {id: venue.id, name: venue.name, rating: venue.rating}
            })
 }

function getVenueId (data) {
  const venueWrapperList = data.response.groups[0].items
  return venueWrapperList
            .map(venueWrapper => venueWrapper.venue)
            .map(venue => venue.id)
}

function buildPhotoUrl (venueId) {
  const {base_url, endpoint, client_id, client_secret, version} = config
  return photoURL = venueId
            .map(venueId => `${base_url}/${endpoint}/${venueId}/photos?client_id=${client_id}&client_secret=${client_secret}&v=${version}`)
}

function requestPhotos(urls) {
  return urls
    .map(url => fetch(url))
    .map(promise =>
      promise
        .then(response => response.json()
      ))
}

function getPhotoUrls (photoPromises) {
  return photoPromises
    .map(promise => 
      promise
        .then(response => response.response.photos.items)
        .then(photos => photos.map(photo => `${photo.prefix}original${photo.suffix}`))
        .then(console.log))
}
