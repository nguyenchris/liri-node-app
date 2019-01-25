# LIRI-Node-App

## Overview

LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a _Language_ Interpretation and Recognition Interface. LIRI is a command line node app that takes in parameters and gives you back data. 

![](images/liri-movie.gif)

## Getting Started

1. Sign up for API keys
    * [Spotify](https://developer.spotify.com/)

## Installation

> Clone

```shell
$ git clone https://github.com/nguyenchris/liri-node-app.git
```

> Install with npm

```shell
$ npm install
```

> Create .env file at root directory and values with your API keys

```js
# Spotify API keys

SPOTIFY_ID=your-spotify-id
SPOTIFY_SECRET=your-spotify-secret
```


### Commands

1. `concert-this <artist name here>`

     * Name of the venue
     * Venue location
     * Date of the Event

2. `spotify-this-song <song name here>`

     * Artist(s)
     * The song's name
     * A preview link of the song from Spotify
     * The album that the song is from

3. `movie-this <movie name here>`

    * Title of the movie.
    * Year the movie came out.
    * IMDB Rating of the movie.
    * Rotten Tomatoes Rating of the movie.
    * Country where the movie was produced.
    * Language of the movie.
    * Plot of the movie.
    * Actors in the movie.

4. `do-what-it-says`

    * Prints random song information from random.txt


### Examples

1. `node liri.js concert-this <artist/band name here>`
![](images/liri-concert.gif)

2. `node liri.js spotify-this-song <song name here>`
![](images/liri-spotify.gif)

3. `node liri.js movie-this <movie name here>`
![](images/liri-movie.gif)

4. `node liri.js do-what-it-says`
![](images/liri-dowhat.gif)



### Author
[Chris Nguyen](https://github.com/nguyenchris)


