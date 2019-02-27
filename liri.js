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
// * `spotify-this-song`
//
// * `movie-this`
//
// * `do-what-it-says`

require("dotenv").config();
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);