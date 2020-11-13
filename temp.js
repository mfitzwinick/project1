
// https://rest.bandsintown.com/v4/artists/{{artist_name}}/?app_id=yOUrSuP3r3ven7aPp-id
// https://rest.bandsintown.com/v4/artists/{{artist_name}}/events/?app_id=yOUrSuP3r3ven7aPp-id

// var query = "pikachu"
// var pokemonImgEl = $("#pokemon-img");
// var pokemonDescriptionEl = $(".pokemon-description");
// var pokemonMovesEl = $(".pokemon-moves");
// function pokeSearch(query) {
//   var queryUrl = `https://pokeapi.co/api/v2/pokemon/${query}/`
// $.ajax({
//   url:  queryUrl,
//   method: "GET"
// }).then(function(pokemon) {
//   console.log(pokemon)
//  pokemonImgEl.attr("src", pokemon.sprites.front_default)
//   pokemonDescriptionEl.text("This pokemon is cool ---> " + pokemon.name.toUpperCase());
//   for(let i = 0; i < 4; i++) {
//   var ulEl = $("<ul>")
//   console.log(pokemon.moves[i].move.name)
//   ulEl.append(`<li>${pokemon.moves[i].move.name}</li>`);
//     pokemonMovesEl.append(ulEl);
//   }
// })
// };
// var submitButtonEl = $("#submit");
// submitButtonEl.on("click", function() {
//   // $(".pokemon-info").empty();
//   var inputEl = $("#pokemon").val();
//   pokeSearch(inputEl.toLowerCase());
// })