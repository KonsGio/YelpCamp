<div id="top"></div>



<!-- PROJECT LOGO -->
<br />
<div align="center">
 <a href="https://github.com/KonsGio/YelpCamp">
    <img src="/cloudinary/icon.png" alt="Logo" width="150" height="120">
  </a>
<h3 align="center">YelpCamp </h3>
  <p align="center">
   YelpCamp is a web application that allows users to browse and review campgrounds, as well as create their own campground listings.
  <a href="https://kgio-yelp-camp.herokuapp.com"><strong>&nbsp;YelpCamp</strong></a>
    <br />
    <a href="https://github.com/KonsGio/YelpCamp"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://kgio-yelp-camp.herokuapp.com">View Demo</a>
    ·
    <a href="https://github.com/YelpCamp/issues">Report Bug</a>
    ·
    <a href="https://github.com/issues">Request Feature</a>
  </p>
</div>


<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

[![https://kgio.dev][product-screenshot]](https://kgio.dev)
YelpCamp is a full-stack web application that I developed using Node.js, Express, MongoDB, and Bootstrap. Inspired by the popular Yelp platform, YelpCamp allows users to browse and review campgrounds, as well as create their own campground listings.

The application includes many features such as user authentication, authorization, and password encryption, which ensure the security of the users' personal information. Users can search for campgrounds by location or name, view detailed campground information, including images and reviews, and add their own reviews and ratings.

Additionally, the application includes a feature-rich campground creation form, which allows users to create their own campgrounds, complete with descriptions, images, and location details. The campground listings are displayed in an interactive map and can be filtered by various attributes such as price and rating.

Overall, YelpCamp is a robust and engaging web application that provides a complete and interactive experience for users interested in finding, reviewing, and creating campgrounds
<p align="right">(<a href="#top">back to top</a>)</p>



### Built With

This is the final project from Colt Steele's "The Web Developer Bootcamp 2022". In this project, I exercised my learnings in:

- **HTML**

- **CSS** (Bootstrap)

- **JavaScript** (EJS, Node.JS, Express)

- **MongoDB** + Mongoose

- **APIs** (REST)

- **MVC** architecture

And practiced working with tools that I have never had any experience before, like:

- **Passport** for authentication, authorization and cryptography

- **JOI** for data validation

- and **EJS Mate** made my development process a lot faster with boilerplating


### Check this out

* [![KGIO.DEV][SITE]][SITE-url]
* [![LinkedIn][linkedin-shield]][linkedin-url]
<p align="right">(<a href="#top">back to top</a>)</p>




<div align="center">
  <h1>🏕️ YelpCamp 🌲</h1>
</div>

<div align="center">
  <h2>- Development Process -</h2>
</div>

## Initial Setup

- [x] Add Landing Page
- [x] Add Campgrounds Page that lists all campgrounds

## Each Campground has:

- [x] Name
- [x] Image

## Layout and Basic Styling

- [x] Create our header and footer partials
- [x] Add in Bootstrap

## Creating New Campgrounds

- [x] Setup new campground POST route
- [x] Add in body-parser
- [x] Setup route to show form
- [x] Add basic unstyled form

## Style the campgrounds page

- [x] Add a better header/title
- [x] Make campgrounds display in a grid

## Style the Navbar and Form

- [x] Add a navbar to all templates
- [x] Style the new campground form

## Add Mongoose

- [x] Install and configure Mongoose
- [x] Setup campground model
- [x] Use campground model inside of our routes

## Show Page

- [x] Review the RESTful routes we've seen so far
- [x] Add description to our campground model
- [x] Show db.collection.drop()
- [x] Add a show route/template

## Refactor Mongoose Code

- [x] Create a models directory
- [x] Use module.exports
- [x] Require everything correctly
    
## Add Seeds File

- [x] Add a seeds.js file
- [x] Run the seeds file every time the server starts

## Add the Comment model

- [x] Make our errors go away
- [x] Display comments on campground show page

## Comment New/Create

- [x] Discuss nested routes
- [x] Add the comment new and create routes
- [x] Add the new comment form

## Style Show Page

- [x] Add sidebar to show page
- [x] Display comments nicely

## Finish Styling Show Page

- [x] Add public directory
- [x] Add custom stylesheet

## Auth Pt. 1 - Add User Model

- [x] Install all packages needed for auth
- [x] Define User model

## Auth Pt. 2 - Register

- [x] Cconfigure Passport
- [x] Add register routes
- [x] Add register template

## Auth Pt. 3 - Login

- [x] Add login routes
- [x] Add login template

## Auth Pt. 4 - Logout/Navbar

- [x] Add logout route
- [x] Prevent user from adding a comment if not signed in
- [x] Add links to navbar

## Auth Pt. 5 - Show/Hide Links

- [x] Show/hide auth links in navbar

## Refactor The Routes

- [x] Use Express router to reoragnize all routes

## Users + Comments

- [x] Associate users and comments
- [x] Save author's name to a comment automatically

## Users + Campgrounds

- [x] Prevent an unauthenticated user from creating a campground
- [x] Save username + id to newly created campground

## Editing Campgrounds

- [x] Add method override
- [x] Add edit route for campgrounds
- [x] Add link to edit page
- [x] Add update route

## Deleting Campgrounds

- [x] Add destroy route
- [x] Add delete button

## Authorization (permission)

- [x] User can only edit his/her campgrounds
- [x] User can only delete his/her campgrounds
- [x] Hide/Show edit and delete buttons

## Editing comments

- [x] Add edit route for comments
- [x] Add edit template
- [x] Add edit button
- [x] Add update route

## Deleting comments

- [x] Add destroy route
- [x] Add delete button

## Authorization part 2: Comments

- [x] User can only edit his/her comments
- [x] User can only delete his/her comments
- [x] Hide/Show edit and delete buttons
- [x] Refactor middleware

## Adding in flash

- [x] Demo working version
- [x] Install and configure connect-flash
- [x] Add bootstrap alerts to header

<!-- LICENSE -->
## License

Distributed under the Apache License 2.0. See `LICENSE.txt` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Konstantinos Giovanitsas - <a href="mailto:konstantinos.giovanitsas@yahoo.com">Send me an email</a>

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/konstantinos-giovanitsas-10b511150/
[product-screenshot]: /cloudinary/image_2023-02-19_151455887.png
[SITE]: https://img.shields.io/badge/kgio.dev-0A0A0A?style=for-the-badge&logo=dev.to&logoColor=white
[SITE-url]: https://www.kgio.dev
