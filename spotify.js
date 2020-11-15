//function to get access_token
function getToken() {
    var queryURL = "https://accounts.spotify.com/api/token";

    $.ajax({
        crossDomain: true,
        headers:{"Content-Type": "application/x-www-form-urlencoded", "Authorization":"Basic "+ btoa("84470ac0bad94351a654756123d907b9:7e4ad19930474bdf85b28c14b541ceda")},
        url: queryURL,
        method: "POST",
        data:{"grant_type":"client_credentials"}
    }).then(function(response) {
        localStorage.setItem("token", response.access_token)
        localStorage.setItem("token-time", moment().format("HH:mm"))
    });
};

//access_token
var token = localStorage.getItem("token")

//current time
var nowTime = moment().format("HH:mm")

//last time token was created
var lastTokenTime = localStorage.getItem("token-time")
var timeDiff = parseInt(nowTime) - parseInt(lastTokenTime);

//compare nowTime to last
if(timeDiff >= 1 || timeDiff < 0 || lastTokenTime === null) {
    getToken();
}

// //on page load getAristData of localStorage(lastsearch)
var artistSearch = localStorage.getItem("lastSearch");
// console.log(artistSearch)
getArtistData(artistSearch);

//function to search artist
function getArtistData(artistSearch) {
    console.log(artistSearch)
    var queryURL1 = "https://api.spotify.com/v1/search?q=" + artistSearch + "&type=artist";
    //ajax call for searched artist Spotify ID 
        $.ajax({
            crossDomain: true,
            headers:{"Content-Type": "application/json", "Authorization":"Bearer " + token},
            url: queryURL1,
            method: "GET"
        }) .then(function(response) {

            //loop to make sure that we scrape the ID of the most popular search result
            var mostPopularFollowers = 0;
            var correctResultID = "";
            for(i of response.artists.items) {
                var followers = i.followers.total;
                if (followers > mostPopularFollowers) {
                    mostPopularFollowers = followers
                    correctResultID = i.id
                };
            };

            //ajax call to get artist data
            var queryURL11 = "https://api.spotify.com/v1/artists/" + correctResultID;
            $.ajax({
                crossDomain: true,
                headers:{"Content-Type": "application/json", "Authorization":"Bearer " + token},
                url: queryURL11,
                method: "GET"
            }) .then(function(response) {
                // console.log(response)
                $("#artist-name").text(response.name);
            });

            //ajax call to get artist's albums
            var queryURL12 = "https://api.spotify.com/v1/artists/" + correctResultID + "/albums";
            $.ajax({
                crossDomain: true,
                headers:{"Content-Type": "application/json", "Authorization":"Bearer " + token},
                url: queryURL12,
                method: "GET"
            }) .then(async function(response) {
                // console.log(response)
                $(".albums").css("visibility", "visible");
                for(var i = 0; i < 3; i++) {
                    $(".albumCover" + i).attr("src", response.items[i].images[i].url)
                    $(".albumYear" + i).html(response.items[i].release_date)
                    $(".albumTitle" + i).html(response.items[i].name)
                };


                //gets most recent 3 album IDs
                var albumID = []
                for (var i = 0; i < 3; i++) {
                    albumID.push(response.items[i].id)
                };

               
                //ajax call track information for most recent 3 albumID
                for(var i = 0; i < albumID.length; i++) {
                    var queryURL121 = "https://api.spotify.com/v1/albums/" + albumID[i] + "/tracks";
                    await $.ajax({
                        crossDomain: true,
                        headers:{"Content-Type": "application/json", "Authorization":"Bearer " + token},
                        url: queryURL121,
                        method: "GET"
                    }).then(function(response) {
                        $(".albumSongs").html("");
                        // console.log(response)
                        for (var j = 0; j < response.items.length; j++) {
                            // console.log(response.items[j].name)
                            // console.log(i)
                            // $(".albumSongs" + i).append("<h6 class='m-0 p-2'>" + (j + 1) + "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" + response.items[j].name + "</h6>")
                            $(".albumSongs0").append("<h6 class='m-0 p-2'>" + (j + 1) + "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" + response.items[j].name + "</h6>")
                            $(".albumSongs1").append("<h6 class='m-0 p-2'>" + (j + 1) + "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" + response.items[j].name + "</h6>")
                            $(".albumSongs2").append("<h6 class='m-0 p-2'>" + (j + 1) + "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" + response.items[j].name + "</h6>")

                        };
                    });
                };
                // var x = albumID.map((x, i) => {
                //     console.log(x)
                //     var queryURL121 = "https://api.spotify.com/v1/albums/" + albumID[i] + "/tracks";
                //     $.ajax({
                //         crossDomain: true,
                //         headers:{"Content-Type": "application/json", "Authorization":"Bearer " + token},
                //         url: queryURL121,
                //         method: "GET"
                //     }).then(x => {
                //         console.log(i + 1)
                //     });
                // });          
            });

            //ajax call to get artist's top 10 tracks
            var queryURL13 = "https://api.spotify.com/v1/artists/" + correctResultID + "/top-tracks?country=US";
            $.ajax({
                crossDomain: true,
                headers:{"Content-Type": "application/json", "Authorization":"Bearer " + token},
                url: queryURL13,
                method: "GET"
            }) .then(function(response) {
                // console.log(response)
                $(".popular").css("visibility", "visible");
                $(".popularSongs").html("");
                for(var i = 0; i < response.tracks.length; i++) {
                    $(".popularSongs").append("<h6 class='m-0 p-2'>" + (i + 1) + "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" + response.tracks[i].name + "</h6>");
                };
            });

            // //ajax call to get artist's top 3 most popular related artists
            // var queryURL14 = "https://api.spotify.com/v1/artists/" + correctResultID + "/related-artists";
            // $.ajax({
            //     crossDomain: true,
            //     headers:{"Content-Type": "application/json", "Authorization":"Bearer " + token},
            //     url: queryURL14,
            //     method: "GET"
            // }) .then(function(response) {
            //     // console.log(response)
            //     $(".card-border").css("visibility", "visible");
            //     for(var i = 0; i < 3; i++) {
            //         //uncompleted code to sort related artist list by popularity
            //         // var relArtists = [response.artists[i]]
            //         // console.log(relArtists)
            //         // console.log(responseArtistsI.sort(function(a,b) {
            //         //     return a.popularity - b.popularity
            //         // }));

            //         //changes domElem text to name of related artist
            //         var simArtistName = response.artists[i].name;
            //         var domElem = $('.card-title-'+ i);
            //         domElem.text(simArtistName);

            //         //changes imgAttr to src of related artist
            //         var simArtistImg = response.artists[i].images[0].url
            //         // console.log(simArtistImg)
            //         $(".img" + i).attr("src", simArtistImg)
                // };
            // });
        }); 
    };
    

//ajax calls for search
$(document).on('keypress',function(e) {
    let code = e.keyCode || e.which;
    if(code == 13) {
        var artistSearch = encodeURIComponent($('#search-nav').val().toLowerCase());
        var artistReg = encodeURIComponent($('#search-reg').val().toLowerCase());
        if(artistSearch === "") {
            artistSearch = artistReg;
        }
        localStorage.setItem('lastSearch', artistSearch);
        getArtistData(artistSearch);
    };
});

$(".relArtist").on("click", function(e) {
    e.preventDefault();
    var relArtistSearch = encodeURI($(this).text())
    localStorage.setItem('lastSearch', relArtistSearch);
    getArtistData(relArtistSearch)
    console.log(relArtistSearch)
});

 
