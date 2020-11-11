
//genius api

// var artist = 
// var title = 
var queryUrl = "https://api.lyrics.ovh/v1/beyonce/halo"


$.ajax({
    url:  queryUrl,
    method: "GET"
  }).then(function(response) {
    console.log(response)
  });

