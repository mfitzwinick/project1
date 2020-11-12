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

//current time
var nowTime = moment().format("HH:mm")

//last time token was created
var lastTokenTime = localStorage.getItem("token-time")

//compare nowTime to last
if(nowTime - lastTokenTime > 1 || lastTokenTime === null) {
    getToken();
}

// sample ajax call
// var queryURL = "https://api.spotify.com/v1/tracks/2TpxZ7JUBn3uw46aR7qd6V";
//     $.ajax({
//         crossDomain: true,
//         headers:{"Content-Type": "application/json", "Authorization":"Bearer" + token},
//         url: queryURL,
//         method: "GET"
//     }).then(function(response) {
//         console.log(response)
//     });

