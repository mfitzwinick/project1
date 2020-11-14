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

// MORGAN'S CODE, PLS DONT TOUCH ----------------------- sorry I touched - nate
// var apiKey = 391053-Musicolo-DLE4BMNM

var similarArray = [0, 1, 2];

// Function to get similar artist names and imgs
function getRelArtist(artist) {
    
    var tasteDive = 'https://cors-anywhere.herokuapp.com/https://tastedive.com/api/similar?q=' + artist + '&type=music&k=391053-Musicolo-DLE4BMNM';
    
    var urlArray = [];
    // var imgArray = [];

    // Ajax call to 'taste-dive' API to get names of similar artists
    $.ajax({
        url: tasteDive,
        method: 'GET'
    }).then(function(response) {
        // console.log(response);
        // Pasting the similar artists name to each dom element
        $(".card-border").css("visibility", "visible");
        for (elem of similarArray) {
            // console.log(response.Similar.Results[elem]?.Name)
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
};

// Key down event for 'return' key to run getRelArtist
$(document).on('keypress',function(e) {

    if(e.which == 13) {
        var artist = encodeURIComponent($('#search-nav').val().toLowerCase());
        var artistReg = encodeURIComponent($('#search-reg').val().toLowerCase());
        if(artist === "") {
            artist = artistReg;
        }
        localStorage.setItem('lastSearch', artist);
        getRelArtist(artist);
    }
});

// Click event to get similar artist data
$(".relArtist").on("click", function(e) {
    e.preventDefault();
    var relArtistData = encodeURI($(this).text())
    localStorage.setItem('lastSearch', relArtistData);
    getRelArtist(relArtistData)
    // console.log(relArtistData)
});


// Function to get events data 
function getEvents(artist) {
    var bandsInTown = "https://rest.bandsintown.com/artists/" + artist + "?app_id=codingbootcamp";
        $('#artist-name').addClass('animate__animated animate__fadeInRight');
        // Ajax call to Bandsintown
        $.ajax({
            url: bandsInTown,
            method: "GET"
        }).then(function(res1) {
            //console.log(res1);

            // Getting and pasting artist name into Jumbotron
            $("#artist-name").text(res1.name);
            
            
            // Upcoming events Count
            var upcomingEventCount = res1.upcoming_event_count;
            if (upcomingEventCount === 0) {
                $('#event-count').text('Sorry, this artist has no upcoming events');
            }
            else {
                $('#event-count').text('Number of Upcoming Events: ' + upcomingEventCount);
            }
            
            var jumboImg = res1.image_url;
            // console.log(jumboImg);
            $('.jumbotron-image').attr('style', 'background: '+ "linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), " + "url(" + jumboImg + ")");

             // if artist has a fb page, a clickable fb icon will appear in the social tab and redirects you in a new tab
            if (res1.facebook_page_url === '') {
                console.log('No Facebook link available');
                $("fb-logo").empty();
                $("#fbA").empty();
                return;
            }
            else {
                var fbURL = res1.facebook_page_url;
                console.log(fbURL);
                $('#fb-logo').attr({
                    src:'imgs/fb-logo.jpg',
                    width: 120,
                    height: 120
                });
                $('#fb-logo').wrap($('<a id = "fbA"/>').attr({href:fbURL, target:'_blank'})).parent();
            }
        });
}

// Key press to run getEvents
$(document).on('keypress',function(e) {
    if(e.which == 13) {
        var artist = encodeURIComponent($('#search-nav').val().toLowerCase());
        var artistReg = encodeURIComponent($('#search-reg').val().toLowerCase());
        if(artist === "") {
            artist = artistReg;
        }
        getEvents(artist);
    }
});

// Click event to get related artist events
$(".relArtist").on("click", function(e) {
    e.preventDefault();
    var relArtistEvents = encodeURI($(this).text())
    getEvents(relArtistEvents)
    // console.log(relArtistEvents)
});


// Function to get socials 
function getSocials(artist) {
    var mmIdURL = 'https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/artist.search?q_artist=' + artist + '&format=json&page_size=1&apikey=b5e0240f05d26723cb7f94f92190760f';
    // Ajax call to Musixmatch
    $.ajax({
        url: mmIdURL,
        method: 'GET'
    }).then(function(res2) {
        var dater = (JSON.parse(res2));
        // console.log(dater);
        // console.log(dater.message.body.artist_list[0].artist.artist_name)

        // Creating Link to Artist Twitter
        if (dater.message.body.artist_list[0].artist.artist_twitter_url === '') {
            console.log('No Twitter link Available');
            $('#twitter-logo').empty();
            $("#twitterA").empty();
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
            $('#twitter-logo').wrap($('<a id = "twitterA"/>').attr({href:twitterURL, target:'_blank'})).parent();
        };

        // Artist Alias
        var aliasArray = dater.message.body.artist_list[0].artist.artist_alias_list;
        // console.log(dater.message.body.artist_list[0].artist.artist_alias_list)
        if (aliasArray === []) {
            console.log('Artist has no known alias');
            $('#alias-list').empty();
            return;
        }
        else {
            $('#alias-list').text('This artist may also go by: ');
            $('#alias-list').attr('style', 'margin-bottom:8px');
            for (elem of aliasArray) {
                var aliasName = $('<p>').text('- ' + elem.artist_alias);
                aliasName.attr('style', 'font-size:1rem'),
                aliasName.attr('style', 'padding:8px'),
                $('#alias-list').append(aliasName);
            };
        };

    });
};

// Connecting artist twitter to social tab
$(document).on('keypress',function(e) {
    if(e.which == 13) {
        var artist = encodeURIComponent($('.search').val().toLowerCase());
        var artistReg = encodeURIComponent($('#search-reg').val().toLowerCase());
        if(artist === "") {
            artist = artistReg;
        }
        getSocials(artist);
    }
});

// Click event to get related artist socials
$(".relArtist").on("click", function(e) {
    e.preventDefault();
    var relArtistSocials = encodeURI($(this).text())
    getSocials(relArtistSocials)
    // console.log(relArtistSocials)
});

// ----------------------------------------------------------------------------------------------
// Please add your final working code below and section it off