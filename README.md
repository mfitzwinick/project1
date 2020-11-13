
# Musicology READ.ME

# Description/Purpose

Musicology is a clean interface tool for music fans who want to easily review an artists’ discography, social media and upcoming events.  It is also a resource for those fans who are seeking new music by providing similar artist suggestions.


# Technologies Used

The site pulls information from the following server side APIs:

Spotify 
https://api.spotify.com/v1/search?q=
Taste Dive https://cors-anywhere.heroku.com/https://tastedive.com/api/similar?q=
Bands in Town 
(https://rest.bandsintown.com/artists/)
The Audio DB 
(https://theaudiodb.com/api/v1/)

The site also pulls from the following third-party APIs:

JQuery
Bootstrap with Popper.js

# Features

Musicology presents the user with a clean and simple UI home page that features a search input that allows the user to type in the artist of their choice.  The search button will link the user to a landing page that will populate with information about the requested artist.

The landing page features another search input for subsequent searches, as well as a sidebar of information on the left side of the page that will feature similar artists that are coded with clickable links to their information.  The middle of the page, and primary focus, will display the artist’s name and image.  Below the artist’s name are clickable tabs that will have discography, event and social media content specific to the requested artist.


# Functionality

The site is built with two html pages: home.html (home page) and index.html (landing page).  It links to a style.css page, and two script.js pages (script.js and spotify.js).   The JQuery library is used to make ajax calls to the server-side APIs.  The html skeleton is fairly simple including search inputs, buttons, image links, a jumbotron and tabs with content divs.

The script pages were divided into two files for organizational purposes and to accommodate size and scope of the internal code.  The spotify API ajax code was somewhat intricate, and ajax calls are nested in order to accommodate the need to update time-sensitive tokens.

For the user, the site is intentionally simple and easy to navigate.  The UX should be visually austere, and easily utilized.  Much in the way a google search is simple, the user only needs to input an artist name in order to get an the output of their desired artist information.




# Examples/Screenshots
