

$(document).on('keypress',function(e) {
    if(e.which == 13) {   
        var artist = encodeURIComponent($('.form-control').val().toLowerCase());
    localStorage.setItem('userInput', artist)
    if (artist!=="") {
    window.location.href="./index.html"
}

}
})


$("#button-addon2").on("click", function() {
   var artist = encodeURIComponent($('.form-control').val().toLowerCase());
    localStorage.setItem('userInput', artist)
    if (artist!=="") {
        window.location.href="./index.html"
    }
});