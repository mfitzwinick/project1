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
if(timeDiff > 1 || timeDiff <= 0 || lastTokenTime === null) {
    getToken();
}

//ajax calls for search
$(document).on('keypress',function(e) {
    let code = e.keyCode || e.which;
    if(code == 13) {
        var artistSearch = $('.search').val().toLowerCase().trim();
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
                console.log(response)
            });

            //ajax call to get artist's albums
            var queryURL12 = "https://api.spotify.com/v1/artists/" + correctResultID + "/albums";
            $.ajax({
                crossDomain: true,
                headers:{"Content-Type": "application/json", "Authorization":"Bearer " + token},
                url: queryURL12,
                method: "GET"
            }) .then(function(response) {
                console.log(response)

                //gets most recent 10 album IDs
                var albumID = []
                //@team not sure if we wanted recent 10 or all albums so included both code here
                //gets all albums minus album_group: "appears_on"
                // for(i of response.items){
                //     if(i.album_group === "single")
                //     albumID.push(i.id)
                // };
                for (var i = 0; i < 10; i++) {
                    albumID.push(response.items[i].id)
                }

                //loop to ajax call track information for each albumID
                for(i of albumID) {
                    var queryURL121 = "https://api.spotify.com/v1/albums/" + i + "/tracks";
                    $.ajax({
                        crossDomain: true,
                        headers:{"Content-Type": "application/json", "Authorization":"Bearer " + token},
                        url: queryURL121,
                        method: "GET"
                    }) .then(function(response) {
                        console.log(response)
                    });
                }
            });

            //ajax call to get artist's top tracks
            var queryURL13 = "https://api.spotify.com/v1/artists/" + correctResultID + "/top-tracks?country=US";
            $.ajax({
                crossDomain: true,
                headers:{"Content-Type": "application/json", "Authorization":"Bearer " + token},
                url: queryURL13,
                method: "GET"
            }) .then(function(response) {
                console.log(response)
            });

            //ajax call to get artist's related artists
            var queryURL14 = "https://api.spotify.com/v1/artists/" + correctResultID + "/related-artists";
            $.ajax({
                crossDomain: true,
                headers:{"Content-Type": "application/json", "Authorization":"Bearer " + token},
                url: queryURL14,
                method: "GET"
            }) .then(function(response) {
                console.log(response)
            });
        }); 
    };
});

