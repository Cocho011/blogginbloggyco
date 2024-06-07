const express = require("express");
const exphbs = require("express-handlebars");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const sequelize = require("./config/connection");
//const allRoutes = require("./controllers");
const allRoutes = require("./controllers/index.js");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3001;

// Set up session with Sequelize store
const sess = {
    secret: process.env.DB_SESSION_SECRET,
    cookie: {
        maxAge: 1800000, // 30 minutes
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize,
    }),
};

// Middleware to handle session
app.use(session(sess));

// Middleware to parse JSON and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up Handlebars.js as the template engine
const hbs = exphbs.create({});
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// Serve static files from the "public" directory
app.use(express.static("public"));

// Use all routes defined in controllers
app.use("/", allRoutes);

// Error handling middleware
/*
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
*/
// Sync Sequelize models to the database, then start the server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => {
        console.log(`App listening on PORT ${PORT}`);
    });
});
