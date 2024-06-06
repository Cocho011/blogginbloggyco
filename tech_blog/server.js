const express = require("express");
const exphbs = require("express-handlebars");
const allRoutes = require("./controllers");
const session = require("express-session");
const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
require('dotenv').config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 3001; // Define the port

// Set up session configuration
const sess = {
    secret: process.env.DB_SESSION_SECRET,
    cookie: {
        maxAge: 0.5 * 60 * 60 * 1000 // Session expires after 30 minutes
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

app.use(session(sess)); // Use session middleware
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(express.json()); // Parse JSON bodies
app.use(express.static('public')); // Serve static files from the "public" directory

// Set up Handlebars as the template engine
const hbs = exphbs.create({});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Use the routes defined in the controllers
app.use("/", allRoutes);

// Sync the database and start the server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => {
        console.log("App listening on PORT " + PORT);
    });
});
