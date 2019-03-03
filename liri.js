let search = process.argv[2];
let term = process.argv.slice(3).join(" ");

function concert() {
    const axios = require('axios');
    const moment = require('moment');
    let keys = require("./keys.js");
    const appId = keys.concert.appId;
    const queryURL = `https://rest.bandsintown.com/artists/${term}/events?app_id=`+appId;

    axios.get(queryURL)
        .then(function (response) {

            for (i=0;i<5;i++){
                let venueLocation = "";
                let callbackInfo=response.data[i];
                if (callbackInfo.venue.region){
                            venueLocation = `${callbackInfo.venue.city}, ${callbackInfo.venue.region}`;
                        } else venueLocation = `${callbackInfo.venue.city}, ${callbackInfo.venue.country}`;
                let date = moment(new Date(callbackInfo.datetime)).format('LL');
                console.log(`
            Artist:${term.toUpperCase()}
            Venue: ${callbackInfo.venue.name}
            Location: ${venueLocation}
            Date: ${date}
             `);
            }

        })
        .catch(function (error) {
            console.log(error);
        });
}

function spotify() {
    require("dotenv").config();
    let keys = require("./keys.js");
    let Spotify = require('node-spotify-api');

    let spotify = new Spotify(keys.spotify);

    spotify.search({type: 'track', query: term}, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        let dataLoc = data.tracks.items[0];
        console.log(`
            Name: ${dataLoc.artists[0].name.toUpperCase()}
            Track: ${dataLoc.name}
            Album: ${dataLoc.album.name}
            Link: ${dataLoc.href}
                        `);
    });
}
function movie() {
    require("dotenv").config();
    let keys = require("./keys.js");
    var axios = require("axios");
    let query = process.argv.slice(3).join("+");
    const apiKey = keys.omdb.apiKey;

    axios.get("http://www.omdbapi.com/?apikey="+apiKey+"&t=" + query)
        .then(function (response) {
            let callbackData=response.data;
            console.log(`
            Title: ${callbackData.Title}
            Year: ${callbackData.Year}
            Rating: ${callbackData.Rated}
            Imdb: ${callbackData.imdbRating}
            Rotten Tomatoes: ${callbackData.Ratings[2].Value}
            Produced In: ${callbackData.Country}
            Language: ${callbackData.Language}
            Plot: ${callbackData.Plot}
            Actors: ${callbackData.Actors}
            `)
        })
        .catch(function (error) {
          console.log(error);
        });
}

switch (search) {

    case 'spotify-this-song':
        spotify();
        break;
    case 'concert-this':
        concert();
        break;
    case'movie-this':
        movie();
        break;

    default:
        console.log(`
        Please enter a command with the following format:
            spotify-this-song  'song name'
            concert-this 'artist name'
            movie-this 'movie title'
            do-what-it-says (this will run the commands from the random.txt file)
        `);
}


