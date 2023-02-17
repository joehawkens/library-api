// CONSTANTS / LIBRARIES ==============================================
require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT;
const db = require('./db');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');


// OAUTH ==============================================================
// var findOrCreate = require('mongoose-findorcreate');
// const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

// app.set('view enginer', 'ejs');
// app.use(session({
//     resave: false,
//     saveUninitialized: true,
//     secret: 'SECRET'
// }));

// app.use(passport.initialize());
// app.use(passport.session());



// ROUTES =============================================================
app.use(express.json()); // This express middleware places parsed data in req.


//  BOOKS ROUTER
const booksRouter = require('./routes/books');
app.use('/books', booksRouter);

// AUTHORS ROUTER
const authorsRouter = require('./routes/authors');
const passport = require('passport');
app.use('/authors', authorsRouter);




// CONNECTION TO SERVER/DB ===============================================

db.connectDB(() => {

    app.listen(PORT, () => console.log("Server started."))
    // console.log(swag.swaggerDocs)

})


// SWAGGER DOCUMENTATION ======================================================

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'Library API',
            version: '1.0.0'
        },
    },
    apis: ['./routes/books.js', './routes/authors.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));


module.exports = {
    swaggerDocs,
    swaggerOptions
}
