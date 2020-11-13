//MICHELE'S CODE FOR AUDIO DB AJAX PULL--------------
$(document).ready(function(){
  var audioDb = "https://theaudiodb.com/api/v1/json/1/searchalbum.php?s=daft_punk"
  var albumArray = [0, 1, 2, 3];
  var artistName=$("<p>").text(response.album.strAlbum);
  var albumStyle=$("<p>").text(response.album.strStyle);
  var yearReleased=$("<p>").text(response.album.intYearReleased);
  var albumDescription=$("<p>").text(response.album.strDescriptionEN);
  var albumArt=$("<img").attr("src", response.album.strAlbumThumb);
  $.each(albumArray, function(index, value){
    $("#discography").empty();
    for (i=0; i<4; i++)
    $("#discography").append(artistName, albumArt, albumStyle, yearReleased, albumDescription);
  });
});

function searchAudioDb(artist) {
  var audioDb = "https://theaudiodb.com/api/v1/json/1/searchalbum.php?s=daft_punk"
    $.ajax({
      url: audioDb,
      method: "GET"
    }).then(function(response) {
      console.log(response);
      // searchAudioDb(INPUT NAME HERE? _ DO I NEED TO MATCH MORGAN"S CODE?)
   
    });
    searchAudioDb();