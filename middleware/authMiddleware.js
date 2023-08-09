const User = require('../models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;

    // check if token exists & is verified
    if(token){
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if(err){
                console.log(err.message);
                res.redirect('/login');
            } else {
                console.log(decodedToken);
                next();
            }
        })

    } else {
        res.redirect('/login');
    }
}


//  check current user
const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;

    // check if token is there...
    if(token){
        jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
            if(err){
                console.log(err.message);
                res.locals.user = null;
                next();
            } else {
                const user = await User.findById( decodedToken.id );
                //  'locals' are items you set and which are then available to all your views
                res.locals.user = user;
                next();
            }
        })
    } else {
        res.locals.user = null;
        next();
    }
}

module.exports = { requireAuth, checkUser };