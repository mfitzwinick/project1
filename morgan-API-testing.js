// MORGAN'S CODE, PLS DONT TOUCH
// taste-dive apiKey = 391053-Musicolo-DLE4BMNM

// var similarArray = [0, 1, 2];

// // Key down event for 'return' key
// $(document).on('keypress',function(e) {
//     if(e.which == 13) {
        
//         var artist = encodeURIComponent($('.search').val().toLowerCase());
//         var tasteDive = 'https://cors-anywhere.herokuapp.com/https://tastedive.com/api/similar?q=' + artist + '&type=music&k=391053-Musicolo-DLE4BMNM';
        
//         var urlArray = [];
//         // var imgArray = [];


//         // Ajax call to 'taste-dive' API to get names of similar artists
//         $.ajax({
//             url: tasteDive,
//             method: 'GET'
//         }).then(function(response) {
//             console.log(response);
//             // Pasting the similar artists name to each dom element
//             for (elem of similarArray) {
//                 var simArtist = response.Similar.Results[elem].Name;
//                 var domElem = $('.card-title-'+ elem);
//                 domElem.text(simArtist);

//                 var simArtist = encodeURIComponent(simArtist.toLowerCase());
//                 var simImgURL = "https://rest.bandsintown.com/artists/" + simArtist + "?app_id=codingbootcamp";

//                 urlArray.push(simImgURL);
//             }
//             //  Ajax call to 'Bandsintown' API for the photos of similar artists 
//             $.ajax({
//                 url: urlArray[0],
//                 method: "GET",
//             }).then(function(res) {
//                 $('#sim-artist-img-0').attr('src', res.image_url);
//             });

//             $.ajax({
//                 url: urlArray[1],
//                 method: "GET",
//             }).then(function(res) {
//                 $('#sim-artist-img-1').attr('src', res.image_url);
//             });

//             $.ajax({
//                 url: urlArray[2],
//                 method: "GET",
//             }).then(function(res) {
//                 $('#sim-artist-img-2').attr('src', res.image_url);
//             });
            
//         });
//     }
// });


            // ------------- CODE THAT WE TRIED ----------------
            // var simImg= [];
            // var domImg = [];
            // var fetchImg = [];
            // for (i=0; i < urlArray.length; i++) {
            //     fetchImg = urlArray[i];
            //     $.ajax({
            //         url: fetchImg[i],
            //         method: "GET"
            //     }).then(function(res) {
            //         console.log(res.image_url);
            //         simImg[i] = res.image_url;
            //         domImg[i] = $('#sim-artist-img-'+ urlArray.indexOf(i));
            //         console.log(domImg[i]);
            //         domImg[i].attr('src', simImg[i]);
            //         imgArray.push(simImg[i]);
            //         console.log(imgArray);
            //     });
            // }


            // ----------------- CODE THAT I ORIGINALLY TRIED --------------------
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


// Ajax call to Bandsintown
$(document).on('keypress',function(e) {
    if(e.which == 13) {
        var artist = encodeURIComponent($('.search').val().toLowerCase());
        var bandsInTown = "https://rest.bandsintown.com/artists/" + artist + "?app_id=codingbootcamp";
        $('#artist-name').addClass('animate__animated animate__fadeInRight');
        $.ajax({
            url: bandsInTown,
            method: "GET"
        }).then(function(response) {
            console.log(response);

            // Getting and pasting artist name into Jumbotron
            $("#artist-name").text(response.name);
            
            var jumboImg = response.image_url;
            console.log(jumboImg);
            $('.jumbotron-image').attr('style', 'background-image:' + "url(" + jumboImg + ")");

             // if artist has a fb page, a clickable fb icon will appear in the social tab and redirects you in a new tab
            if (response.facebook_page_url === '') {
                console.log('No Facebook link available');
                return;
            }
            else {
                var fbURL = response.facebook_page_url;
                console.log(fbURL);
                $('#fb-logo').attr({
                    src:'imgs/fb-logo.jpg',
                    width: 120,
                    height: 120
                });
                $('#fb-logo').wrap($('<a />').attr({href:fbURL, target:'_blank'})).parent();
            }
        });
    }
});

// $('#artist-name').removeClass('animate__animated animate__fadeInRight');



        // var artistURL = $("<a>").attr("href", response.url).append(artistName);
        // var artistImage = $("<img>").attr("src", response.thumb_url);
        // var trackerCount = $("<h2>").text(response.tracker_count + " fans tracking this artist");
        // var upcomingEvents = $("<h2>").text(response.upcoming_event_count + " upcoming events");
        // var goToArtist = $("<a>").attr("href", response.url).text("See Tour Dates");

        // // Empty the contents of the artist-div, append the new artist content
        // $("#artist-div").empty();
        // $("#artist-div").append(artistURL, artistImage, trackerCount, upcomingEvents, goToArtist);

// Testing MusixMatch API
// musixmatch apiKey = b5e0240f05d26723cb7f94f92190760f


// Getting artist ID from name

$(document).on('keypress',function(e) {
    if(e.which == 13) {
        var artist = encodeURIComponent($('.search').val().toLowerCase());
        var mmIdURL = 'https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/artist.search?q_artist=' + artist + '&format=json&page_size=1&apikey=b5e0240f05d26723cb7f94f92190760f';

        $.ajax({
            url: mmIdURL,
            method: 'GET'
        }).then(function(res2) {
            var dater = (JSON.parse(res2));
            console.log(dater);
            console.log(dater.message.body.artist_list[0].artist.artist_name)

            // Creating Link to Artist Twitter
            if (dater.message.body.artist_list[0].artist.artist_twitter_url === '') {
                console.log('No Twitter link Available');
                return;
            }
            else {
                var twitterURL = dater.message.body.artist_list[0].artist.artist_twitter_url;
                console.log(twitterURL);
                $('#twitter-logo').attr({
                    src:'imgs/twitter-logo.png',
                    width: 120,
                    height: 120
                });
                $('#twitter-logo').wrap($('<a />').attr({href:twitterURL, target:'_blank'})).parent();
            }

        })
    }
});
