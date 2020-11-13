// var screenHeight = window.screen.height
// var screenWidth = window.screen.width
// var bigSide = $(".big-side")
// var smallSide = $(".small-side");
// $(window).resize(function(e) {
//     if(e.target.innerWidth < 1200) {
//         bigSide.addClass("none");
//         smallSide.removeClass("none");
//     } else {
//         bigSide.removeClass("none");
//         smallSide.addClass("none");
//     }
// })

// MORGAN'S CODE, PLS DONT TOUCH ----------------------
// var apiKey = 391053-Musicolo-DLE4BMNM

var similarArray = [0, 1, 2];

// Key down event for 'return' key
$(document).on('keypress',function(e) {

    if(e.which == 13) {
        
        var artist = encodeURIComponent($('.search').val().toLowerCase());
        var tasteDive = 'https://cors-anywhere.herokuapp.com/https://tastedive.com/api/similar?q=' + artist + '&type=music&k=391053-Musicolo-DLE4BMNM';
        
        var urlArray = [];
        // var imgArray = [];

        // Ajax call to 'taste-dive' API to get names of similar artists
        $.ajax({
            url: tasteDive,
            method: 'GET'
        }).then(function(response) {
            console.log(response);
            // Pasting the similar artists name to each dom element
            for (elem of similarArray) {
                var simArtist = response.Similar.Results[elem].Name;
                var domElem = $('.card-title-'+ elem);
                domElem.text(simArtist);

                var simArtist = encodeURIComponent(simArtist);
                var simImgURL = "https://rest.bandsintown.com/artists/" + simArtist + "?app_id=codingbootcamp";

                urlArray.push(simImgURL);
            }
            //  Ajax call to 'Bandsintown' API for the photos of similar artists 
            $.ajax({
                url: urlArray[0],
                method: "GET",
            }).then(function(res) {
                $('#sim-artist-img-0').attr('src', res.image_url);
            });

            $.ajax({
                url: urlArray[1],
                method: "GET",
            }).then(function(res) {
                $('#sim-artist-img-1').attr('src', res.image_url);
            });

            $.ajax({
                url: urlArray[2],
                method: "GET",
            }).then(function(res) {
                $('#sim-artist-img-2').attr('src', res.image_url);
            });
            
        });
    }
});

// -------------------------------------------------------------
// Please add your final working code below and section it off