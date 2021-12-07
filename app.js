// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");
const cookieParser = require('cookie-parser')



const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// session configuration

const session = require('express-session');
const MongoStore = require('connect-mongo');
const DB_URL = "mongodb+srv://admin:kxH3kK0yBHQez3nQ@cluster0.pppja.mongodb.net/MapMusicAdmin" || "mongodb://localhost/MapMusicAdmin";

app.use(
	session({
		secret: 'somesecret',
		// for how long is the user logged in -> this would be one day 	
		cookie: { maxAge: 1000 * 60 * 60 * 24 },
		resave: true,
		saveUninitialized: false,
		store: MongoStore.create({
			mongoUrl: DB_URL
		})
	})
)


// 👇 Start handling routes here
// Contrary to the views version, all routes are controlled from the routes/index.js
const dbArtistCalls = require("./routes/dbArtistCalls")
app.use("/db", dbArtistCalls)

const fetchTokens = require("./routes/fetchTokens");
app.use("/token", fetchTokens);

const spotifyArtistCalls = require("./routes/spotifyArtistCalls")
app.use("/spotifyArtistCalls", spotifyArtistCalls)

const spotifyUserCalls = require("./routes/spotifyUserCalls")
app.use("/spotifyUserCalls", spotifyUserCalls)


// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
