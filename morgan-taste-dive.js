// MORGAN'S CODE, PLS DONT TOUCH
// var apiKey = 391053-Musicolo-DLE4BMNM
var tasteDive = 'https://cors-anywhere.herokuapp.com/https://tastedive.com/api/similar?q=drake&type=music&k=391053-Musicolo-DLE4BMNM'

var similarArray = [0, 1, 2];

$(document).on('keypress',function(e) {
    if(e.which == 13) {
        
        
        $.ajax({
            url: tasteDive,
            method: 'GET'
        }).then(function(response) {
            console.log(response);
            for (elem of similarArray) {
                var simArtist = response.Similar.Results[elem].Name;
                var domElem = $('.card-title-'+ elem);
                domElem.text(simArtist);
            }
        });


    }
});
