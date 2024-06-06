## CMS Style Blog Site

## Description

This project is a CMS-style blog site, similar to WordPress, where developers can publish their blog posts and comment on other developers' posts. It is built using Node.js, Express.js, Sequelize, Handlebars.js, and MySQL. The application follows the MVC paradigm and uses express-session for authentication. The site is fully functional with options to sign up, log in, create, update, delete posts, and comment on posts. For this challenge, I concentrated more on ensuring successful functionality. For future improvements, I will add actual tech posts and comments. 

Deployed site URL: 

Screenshots of deployed app: 

![Homepage](<tech_blog/assets/Tech Blog Home Screenshot.png>) 

![Dashboard](<tech_blog/assets/Tech Blog Dashboard and Create a New Post Screenshot.png>) 

![Login](<tech_blog/assets/Tech Blog Login Screenshot.png>) 

![Signup](<tech_blog/assets/Tech Blog Signup Screenshot.png>)



## Table of Contents


- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [Seeding the Database](#seeding-the-database)
- [File Structure](#file-structure)
- [Testing Instructions](#testing-instructions)
- [Collaboration Guidelines](#collaboration-guidelines)
- [License](#license)
- [Questions](#questions)

## Technologies

- JavaScript
- Node.js
- Sequelize
- MySQL2
- Express
- Dotenv
- Handlebars.js
- bcrypt
- express-session
- connect-session-sequelize

## Installation

1. Clone the repository to your local machine
2. Navigate to the project directory
3. Install the required dependencies using npm install
4. Create a .env file in the root of your project and add the necessary environment variables
5. Set up the database using MySQL

## Usage

1. Start server by running: npm start
2. For development mode (with automatic restarts) run: npm run dev
3. Check if server is running on: http://localhost:3001

## Seeding the Database

1. Ensure your database is set up and that a '.env'file is configured
2. Run the seed command: npm run seed

## File Structure

![alt text](<tech_blog/assets/File Structure for CMS Style Blog Site.png>)

### Comments on the File Structure

1. config/connection.js: Contains the Sequelize connection configuration.
2. controllers/: Contains controllers for handling the business logic of each model.
- api/: Contains API routes for users, blogs, and comments.
- frontendRoutes.js: Handles rendering of pages.
3. models/: Contains model definitions for Sequelize.
- User.js: Defines the user model.
- Blog.js: Defines the blog model.
- Comment.js: Defines the comment model.
- index.js: Initializes and associates the models.
4. public/: Contains public assets such as CSS and client-side JavaScript.
- js/: Contains client-side JavaScript files.
5. seeds/: Contains seeding scripts for populating the database with initial data.
- index.js: Runs all seed scripts.
6. views/: Contains Handlebars templates for rendering pages.
7. .env: Contains environment variables.
8. .gitignore: Specifies files to ignore in version control.
9. package.json: Lists project dependencies and scripts.
10. README.md: Documentation for the project.
11. server.js: The main entry point for the server.


## Testing the Application

1. Navigate through the application to ensure all pages display correctly.
2. Sign up as a new user to test the registration functionality.
3. Log in with the created user credentials to test the login functionality.
4. Create a blog post to ensure posts can be created.
5. View the created blog post to ensure it displays correctly.
6. Add a comment to a blog post to test the commenting functionality.
7. Update a blog post to ensure updates are saved.
8. Delete a blog post to ensure posts can be deleted.
9. Log out to test the logout functionality.

## Collaboration Guidelines

1. Clone starter code
2. Submit a pull request (new features will be merged once they are reviewed and approved)

## License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
<br>
This repository is licensed under the MIT license.

## Questions

For questions or concerns about this project, please contact: Carolina Ochoa

Email:cocho011@fiu.edu
GitHub Username: Cocho011
GitHub Profile: https://github.com/Cocho011