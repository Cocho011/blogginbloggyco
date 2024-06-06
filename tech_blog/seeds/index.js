const sequelize = require("../config/connection");
const { User, Blog, Comment } = require("../models");

const users = [
    { username: "delmy", password: "delmypassword" },
    { username: "julian", password: "julianpassword" },
    { username: "sebastian", password: "sebastianpassword" },
];

const blogs = [
    { title: "My first post", content: "meow", userId: 1 },
    { title: "My second post", content: "woof", userId: 1 },
    { title: "Julian's first post", content: "hi i'm Julian", userId: 2 },
    { title: "Sebastian's first post", content: "hi i'm Sebastian", userId: 3 },
];

const comments = [
    { body: "great post!", blogId: 1, userId: 1 },
    { body: "i agree!", blogId: 3, userId: 2 },
    { body: "well said!", blogId: 4, userId: 1 },
    { body: "happy monday!", blogId: 2, userId: 3 },
];

const plantSeeds = async () => {
    try {
        await sequelize.sync({ force: true });
        await User.bulkCreate(users, { individualHooks: true });
        await Blog.bulkCreate(blogs);
        await Comment.bulkCreate(comments);
        process.exit(0);
    } catch (err) {
        console.log(err);
    }
}

plantSeeds();
