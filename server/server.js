"use strict";

const AuthRoutes = require("./routes/Routes");
const NoAuthRoutes = require("./routes/NoAuthRoutes");
const users = require("./dao/userDAO");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const db = require("./dao/db");


//dao instancies
const userDaoInstance = new users(db.db)


/*** Passport-related imports ***/
const passport = require("passport");
const LocalStrategy = require("passport-local");
const session = require("express-session");

/*** INIT EXPRESS ***/
const PORT = 3001;
const app = new express();

/*** MIDDLEWARES ***/
app.use(morgan("dev"));
app.use(express.json());

/*** CORS CONFIGURATION ***/
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};
app.use(cors(corsOptions));

/*** PASSPORT SET UP LOCAL STRATEGY ***/
passport.use(new LocalStrategy(async function verify(username, password, cb) {
  const user = await userDaoInstance.getUser(username, password)
  if(!user)
    return cb(null, false, 'Incorrect username or password.');
    
  return cb(null, user);
}));

/*** AUTHENTICATION FUNCIONALOTIES ***/

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (user, cb) { 
  return cb(null, user);
});

const isLoggedIn = (req, res, next) => {
  if(req.isAuthenticated()) {
    return next();
  }
  return res.status(401).json({error: 'Not authorized'});
}

app.use(session({
  secret: "shhhhh... it's big chungus!",
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.authenticate('session'));


/*** SESSION APIs ***/

// POST /api/sessions
app.post('/api/sessions', passport.authenticate('local'), (req, res) => {
  res.status(201).json(req.user);
});

// GET /api/sessions/current
app.get('/api/sessions/current', (req, res) => {
  if(req.isAuthenticated()) {
    res.json(req.user);}
  else
    res.status(401).json({error: 'Not authenticated'});
});

// DELETE /api/session/current
app.delete('/api/sessions/current', (req, res) => {
  req.logout(() => {
    res.end();
  });
});

//routes
app.use("/unauth", NoAuthRoutes)
app.use("/auth", isLoggedIn, AuthRoutes)

//other commands
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}/`)
);

module.exports = app;