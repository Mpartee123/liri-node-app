// https://www.npmjs.com/package/node-spotify-api
// https://www.npmjs.com/package/axios
// http://www.omdbapi.com
// http://www.artists.bandsintown.com/bandsintown-api
// https://www.npmjs.com/package/moment
// https://www.npmjs.com/package/dotenv

// 9. Make it so liri.js can take in one of the following commands:
//
//     * `concert-this`
//
// * `movie-this`
//
// * `do-what-it-says`



require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);

spotify.search({type: 'track', query: 'All the Small Things'}, function (err, data) {
    if (err) {
        return console.log('Error occurred: ' + err);
    }
    var dataLoc = data.tracks.items[0];
    console.log(`
    Name: ${dataLoc.artists[0].name.toUpperCase()}
    Track: ${dataLoc.name}
    Album: ${dataLoc.album.name}
    Link: ${dataLoc.href}
    `);
});