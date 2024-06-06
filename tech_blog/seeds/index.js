const sequelize = require('../config/connection');
const { User, Blog, Comment } = require('../models');

// Define seed data for users
const users = [
    { username: 'delmy', password: 'delmypassword' },
    { username: 'julian', password: 'julianpassword' },
    { username: 'sebastian', password: 'sebastianpassword' }
];

// Define seed data for blogs
const blogs = [
    { title: 'My first post', content: 'meow', userId: 1 },
    { title: 'My second post', content: 'woof', userId: 1 },
    { title: 'Julian\'s first post', content: 'hi i\'m Julian', userId: 2 },
    { title: 'Sebastian\'s first post', content: 'hi i\'m Sebastian', userId: 3 }
];

// Define seed data for comments
const comments = [
    { body: 'great post!', blogId: 1, userId: 1 },
    { body: 'i agree!', blogId: 3, userId: 2 },
    { body: 'well said!', blogId: 4, userId: 1 },
    { body: 'happy monday!', blogId: 2, userId: 3 }
];

// Function to seed the database
const plantSeeds = async () => {
    try {
        await sequelize.sync({ force: true }); // Sync database with force true to reset it
        await User.bulkCreate(users, { individualHooks: true }); // Seed users with hooks to hash passwords
        await Blog.bulkCreate(blogs); // Seed blogs
        await Comment.bulkCreate(comments); // Seed comments
        process.exit(0); // Exit the process
    } catch (err) {
        console.log(err);
    }
};

plantSeeds(); // Call the function to seed the database
