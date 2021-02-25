import express from "express";
import path from "path";
import passport from "passport";
const PORT = process.env.PORT || 3001;
const app = express();
require("dotenv").config();
const db = require("./models");
import routes from "./routes";
import LocalStrategy from './strategies/local';
import JWTStrategy from './strategies/jwt';

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Middleware
app.use(express.json())
app.use(passport.initialize());
app.use(passport.session());

passport.use(LocalStrategy);
passport.use(JWTStrategy);

routes(app);

// Send every request to the React app
// Define any API routes before this runs
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

db.sequelize.sync({}).then(function() {
  app.listen(PORT, function() {
    console.log(`🌎 ==> API server now on port ${PORT}!`);
  });
})
