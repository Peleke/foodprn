$(document).ready(function () {

  $('#submit-search').on("click", function(event){
    event.preventDefault();

    const city =$("#city").val().trim(); // grab city from input
    const state = $("#state").val().trim();// grab stae from input

    doAjax(config, city, state)
      .then(getVenueInfo)
      .then(info => info.map(venue => venue.id))
      .then(buildPhotoUrl)
      .then(requestPhotos)
      .then(getPhotoUrls)
      .catch(console.error)
  })
});
