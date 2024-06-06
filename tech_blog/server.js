const express = require("express");
const exphbs = require("express-handlebars");
const allRoutes = require("./controllers");
const session = require("express-session");
const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

const { User, Blog, Comment } = require("./models");

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Session middleware
const sess = {
    secret: process.env.DB_SESSION_SECRET,
    cookie: {
        maxAge: 0.5 * 60 * 60 * 1000 // 30 minutes
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};
app.use(session(sess));

// Handlebars
const hbs = exphbs.create({});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Routes
app.use("/", allRoutes);

// Syncing sequelize models and starting the Express app
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => {
        console.log("App listening on PORT " + PORT);
    });
});
