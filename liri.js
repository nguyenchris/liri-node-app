require("dotenv").config();

const inquirer = require('inquirer');
const Spotify = require('node-spotify-api');
const request = require('request');
const moment = require('moment');
const axios = require('axios');
const keys = require('./keys');

const spotify = new Spotify(keys.spotify);

const command = process.argv[2].toLowerCase();
const commandData = process.argv.slice(3).join(" ");


if (command) {
    if (command === `concert-this`) {
        getArtistEvents();
    } else if (command === `spotify-this-song`) {
        console.log(`\nSearching for song info...`);
        getSpotifySong();
    } else {
        console.log('Unknown Command!');
        console.log(`Available commands: concert-this, 'spotify-this-song', 'movie-this', do-what-it-says'`)
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
            console.log(error);
        });
}

function printEventData(data) {
    const name = `Venue: ${data.venue.name}`
    const location = `Location: ${data.venue.city}, ${data.venue.country}`;
    const date = `Date: ${moment(data.datetime).calendar()}`
    console.log('========================');
    console.log(name);
    console.log(location);
    console.log(date);
};



function getSpotifySong() {
    spotify
        .search({
            type: 'track',
            query: commandData,
            limit: 1
        })
        .then(response => {
            // console.log(response.tracks.items[0].artists);
            const artist = `${response.tracks.items[0].artists[0].name}`
            const song = response.tracks.items[0].name;
            const preview = `${response.tracks.items[0].artists[0].external_urls.spotify}`
            const album = `${response.tracks.items[0].album.name}`

            console.log(`======================`)
            console.log(`\nArtist(s): ${artist}\nSong Name: ${song}\nPreview Link: ${preview}\nAlbum: ${album}\n`);

        })
        .catch(error => {
            console.log('Unable to find that song!');
        });
}