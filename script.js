// Shanni's MediaQuery 
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


// On page load run localStorage(artist)
var artist = localStorage.getItem("lastSearch");
getRelArtist(artist);
getEvents(artist);
getSocials(artist);

// MORGAN'S CODE, PLS DONT TOUCH -----------------------------------------------------------
// var apiKey = 391053-Musicolo-DLE4BMNM
var similarArray = [0, 1, 2];

function getRelArtist(artist) {
    var tasteDive = 'https://cors-anywhere.herokuapp.com/https://tastedive.com/api/similar?q=' + artist + '&type=music&k=391053-Musicolo-DLE4BMNM';
        
    var urlArray = [];

    // Ajax call to 'taste-dive' API to get names of similar artists
    $.ajax({
        url: tasteDive,
        method: 'GET'
    }).then(function(response) {
        // console.log(response);
        // Pasting the similar artists name to each dom element
        $(".card-border").css("visibility", "visible");
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
            $('.sim-artist-img-0').attr('src', res.image_url);
        });

        $.ajax({
            url: urlArray[1],
            method: "GET",
        }).then(function(res) {
            $('.sim-artist-img-1').attr('src', res.image_url);
        });

        $.ajax({
            url: urlArray[2],
            method: "GET",
        }).then(function(res) {
            $('.sim-artist-img-2').attr('src', res.image_url);
        });
            
    });
}

function getSocials(artist) {
    var bandsInTown = "https://rest.bandsintown.com/artists/" + artist + "?app_id=codingbootcamp";
    $('#artist-name').addClass('animate__animated animate__fadeInRight');
    $.ajax({
        url: bandsInTown,
        method: "GET"
    }).then(function(res1) {
        console.log(res1);

        var artist = res1.name;
        if (res1.facebook_page_url === '') {
            console.log('No Facebook link available');
            $('#fb-logo').removeAttr('src width height');
        }
        else {
            $('#follow-artist').html('Follow ' + artist + ' on social media:');
            var fbURL = res1.facebook_page_url;
            console.log(fbURL);
            $('#fb-logo').attr({
                src:'imgs/fb-logo.jpg',
                width: 120,
                height: 120
            });
            $('#fb-logo').wrap($('<a />').attr({href:fbURL, target:'_blank'})).parent();
        }
    });
    
    var mmIdURL = 'https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/artist.search?q_artist=' + artist + '&format=json&page_size=1&apikey=b5e0240f05d26723cb7f94f92190760f';
    $.ajax({
        url: mmIdURL,
        method: 'GET'
    }).then(function(res2) {
        var dater = (JSON.parse(res2));
        console.log(dater);
        
        if (dater.message.body.artist_list.length === 0) {
            $('#alias-list').empty();
            $('.alias').empty();
            $('#twitter-logo').removeAttr('src width height');
            return;
        }
        
        // Creating Link to Artist Twitter
        var artistPage = dater.message.body.artist_list[0].artist;

        if (artistPage.artist_twitter_url === '') {
            console.log('No Twitter link Available');
            $('#twitter-logo').removeAttr('src width height');
        }
        else {
            // $('#follow-artist').html('Follow ' + artist + ' on social media:');
            var twitterURL = artistPage.artist_twitter_url;
            console.log(twitterURL);
            $('#twitter-logo').attr({
                src:'imgs/twitter-logo.png',
                width: 120,
                height: 120
            });
            $('#twitter-logo').wrap($('<a />').attr({href:twitterURL, target:'_blank'})).parent();
        }
        
        // Artist Alias
        var aliasArray = artistPage.artist_alias_list;
        if (aliasArray.length === 0) {
            console.log('Artist has no known alias');
            $('#alias-list').empty();
            $('.alias').empty();
        }
        else {
            $('.alias').empty();
            var artist = artistPage.artist_name;
            $('#alias-list').text(artist + ' may also go by: ');
            for (elem of aliasArray) {
                var aliasName = $('<li>').text(elem.artist_alias);
                aliasName.css('style', 'font-size:1rem');
                aliasName.css({padding:8, margin:0});
                $('.alias').append(aliasName);
            }
        }
    });
}

function getEvents(artist) {
    var bandsInTown = "https://rest.bandsintown.com/artists/" + artist + "?app_id=codingbootcamp";
    $('#artist-name').addClass('animate__animated animate__fadeInRight');
    $.ajax({
        url: bandsInTown,
        method: "GET"
    }).then(function(res1) {
        console.log(res1);

        var artist = res1.name;
        // Getting and pasting artist name into Jumbotron
        $("#artist-name").text(artist);
        
        
        // Upcoming events Count
        var bitURL = res1.url
        var upcomingEventCount = res1.upcoming_event_count;
        $('#event-count').css({
            'text-align':'center',
            'margin-top':4
        });
        if (upcomingEventCount === 0) {
            $('#event-count').text('Sorry, this artist currently has no upcoming events. Please check back later for the newest updates.');
            $('#event-info').text('For information about past events/ If you would like to sign up to receive updates from this artist - please click below')
        }
        else {
            $('#event-count').text('Number of Upcoming Events: ' + upcomingEventCount);
            $('#event-info').text('To see upcoming events dates, locations, and ticket options - please click below')
            
        }
        $('#bit-link').attr({
            href:bitURL,
            target:'_blank'
        });
        var jumboImg = res1.image_url;
        // console.log(jumboImg);
        $('.jumbotron-image').attr('style', 'background: '+ "linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), " + "url(" + jumboImg + ")");
    });
}

$(document).on('keypress',function(e) {
    if(e.which == 13) {
        var artist = encodeURIComponent($('.search').val().toLowerCase());
        var artistReg = encodeURIComponent($('#search-reg').val().toLowerCase());
        if(artist === "") {
            artist = artistReg;
        }
        getRelArtist(artist);
        getSocials(artist);
        getEvents(artist);
    }
});

$('.relArtist').on('click', function(event) {
    event.preventDefault();
    var relArtist = $(this).text();
    console.log(relArtist);

    getRelArtist(relArtist);
    getSocials(relArtist);
    getEvents(relArtist);
});

// ----------------------------------------------------------------------------------------------
// Please add your final working code below and section it off