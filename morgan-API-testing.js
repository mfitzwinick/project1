// MORGAN'S CODE, PLS DONT TOUCH
// var apiKey = 391053-Musicolo-DLE4BMNM

var similarArray = [0, 1, 2];

$(document).on('keypress',function(e) {
    if(e.which == 13) {
        
        var artist = encodeURIComponent($('.search').val().toLowerCase());
        var tasteDive = 'https://cors-anywhere.herokuapp.com/https://tastedive.com/api/similar?q=' + artist + '&type=music&k=391053-Musicolo-DLE4BMNM';
        
        var urlArray = [];
        // var imgArray = [];

        $.ajax({
            url: tasteDive,
            method: 'GET'
        }).then(function(response) {
            console.log(response);
            for (elem of similarArray) {
                var simArtist = response.Similar.Results[elem].Name;
                var domElem = $('.card-title-'+ elem);
                domElem.text(simArtist);

                var simArtist = encodeURIComponent(simArtist);
                var simImgURL = "https://rest.bandsintown.com/artists/" + simArtist + "?app_id=codingbootcamp";

                urlArray.push(simImgURL);
            }

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



            // for (item of urlArray) {
            //     var fetchImg = item;
            //     $.ajax({
            //         url: fetchImg,
            //         method: "GET"
            //     }).then(function(res) {
            //         console.log(res.image_url);
            //         var simImg = res.image_url;
            //         var domImg = $('#sim-artist-img-'+ urlArray.indexOf(item));
            //         console.log(domImg);
            //         domImg.attr('src', simImg);
            //         imgArray.push(simImg);
            //         console.log(imgArray);
            //     });
            // }
    

// --------------------------------- BANDSINTOWN---------------

// var simArtist
// var queryURL = "https://rest.bandsintown.com/artists/" + simArtist + "?app_id=codingbootcamp";
//         $.ajax({
//             url: queryURL,
//             method: "GET"
//         }).then(function(response) {
//             console.log(response);
//             var simImg = response.image_url;
//             $('.card-img-top').attr('src', simImg);
//         });

// $(document).on('keypress',function(e) {
//     if(e.which == 13) {
//         var artist = encodeURIComponent($('.search').val().toLowerCase());
//         var queryURL = "https://rest.bandsintown.com/artists/" + artist + "?app_id=codingbootcamp";
//         $.ajax({
//             url: queryURL,
//             method: "GET"
//         }).then(function(response) {
//             console.log(response);

//             $("#artist-name").text(response.name);
//         });
//     }
// });



            // var artistURL = $("<a>").attr("href", response.url).append(artistName);
            // var artistImage = $("<img>").attr("src", response.thumb_url);
            // var trackerCount = $("<h2>").text(response.tracker_count + " fans tracking this artist");
            // var upcomingEvents = $("<h2>").text(response.upcoming_event_count + " upcoming events");
            // var goToArtist = $("<a>").attr("href", response.url).text("See Tour Dates");

            // // Empty the contents of the artist-div, append the new artist content
            // $("#artist-div").empty();
            // $("#artist-div").append(artistURL, artistImage, trackerCount, upcomingEvents, goToArtist);