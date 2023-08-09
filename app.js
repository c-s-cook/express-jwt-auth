const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const { requireAuth, checkUser } = require('./middleware/authMiddleware');

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = process.env.MONGO_URI;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));


// routes
app.get('*', checkUser);
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', requireAuth, (req, res) => res.render('smoothies'));
app.use(authRoutes);


// cookies
app.get('/set-cookies', (req, res) => {

  // res.setHeader('Set-Cookie', 'newUser=true');
  // now using cookieParser...
  res.cookie('newUser', false);
  res.cookie('isEmployee', true, {
    // optional cookie paramaters...

    // set when the cookie expires (otherwise it will delete when session closes)
    maxAge: 1000 * 60 * 60 * 24,
    
    //  only send when using HTTPS connection (which is what we should do when setting for Auth purposes)
    secure: false,

    // only let the server / HTTP protocal access the cookie (no client-side JavaScript)
    httpOnly: true
  });

  res.send('You got the cookies!');


});


app.get('/read-cookies', (req, res) => {

  const cookies = req.cookies;
  console.log(cookies.newUser);

  res.json(cookies);

});