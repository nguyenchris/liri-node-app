require("dotenv").config();

const inquirer = require('inquirer');
const Spotify = require('node-spotify-api');
const request = require('request');
const moment = require('moment');
const axios = require('axios');
const keys = require('./keys');
const fs = require('fs');

const spotify = new Spotify(keys.spotify);

const command = process.argv[2].toLowerCase();
let commandData = process.argv.slice(3).join(" ");


if (command) {
    if (command === `concert-this`) {
        getArtistEvents();
    } else if (command === `spotify-this-song`) {
        console.log(`\nSearching for song info...`);
        getSpotifySong();
    } else if (command === `movie-this`) {
        console.log(`\nSearching for ${commandData} movie information...`)
        getMovieData();
    } else if (command === `do-what-it-says`) {
        runRandomTxt();
    }
    
    else {
        console.log(`\nUnknown Command!\n`);
        console.log(`\nAvailable commands: concert-this, spotify-this-song, movie-this, or do-what-it-says\n`)
    }
}


function getArtistEvents() {
    axios.get(`https://rest.bandsintown.com/artists/${commandData}/events?app_id=codingbootcamp`)
        .then(response => {
            const arr = response.data;
            console.log(`\n${commandData.toUpperCase()}'S NEXT UPCOMING EVENTS\n`);
            arr.map(printEventData);
        })
        .catch(error => {
            console.log(`\nSorry! I couldn't find any events for ${commandData}\n`);
        });
};

function printEventData(data) {
    const name = `Venue: ${data.venue.name}`
    const location = `Location: ${data.venue.city}, ${data.venue.country}`;
    const date = `Date: ${moment(data.datetime).calendar()}`
    console.log('========================');
    console.log(`\n${name}\n${location}\n${date}\n`);
};



function getSpotifySong() {
    spotify.search({
            type: 'track',
            query: commandData,
            limit: 1
        })
        .then(response => {
            const artist = `${response.tracks.items[0].artists[0].name}`
            const song = response.tracks.items[0].name;
            const preview = `${response.tracks.items[0].artists[0].external_urls.spotify}`
            const album = `${response.tracks.items[0].album.name}`

            console.log(`\n======================`)
            console.log(`\nArtist(s): ${artist}\nSong Name: ${song}\nPreview Link: ${preview}\nAlbum: ${album}\n`);
        })
        .catch(error => {
            console.log(`\nUnable to find that song, so here's a song that could be found!\n`);
            commandData = `Ace of Base - The Sign`
            getSpotifySong();
        });
};


function getMovieData() {
    axios.get(`http://www.omdbapi.com/?apikey=trilogy&t=${commandData}`)
        .then(response => {
            const data = response.data;
            const rottenRating = data.Ratings.find(rating => {
                return rating.Source === 'Rotten Tomatoes'
            });

            console.log(`\n======================\n`);
            console.log(`Title: ${data.Title}\nYear: ${data.Year}\nIMDB Rating: ${data.imdbRating}\nRotten Tomatoes Rating: ${rottenRating.Value}\nCountry Produced: ${data.Country}\nLanguage: ${data.Language}\nPlot: ${data.Plot}\nActors: ${data.Actors}\n`);
        })
        .catch(error => {
            console.log(`\nSorry, couldn't find any movie information!\n\nHow about this movie?`)
            commandData = `Mr. Nobody`
            getMovieData();
        })
};

function runRandomTxt() {
    fs.readFile('random.txt', 'utf8', (err, data) => {
        const arr = data.split(',');
        commandData = arr[1];
        getSpotifySong();
    })
}
