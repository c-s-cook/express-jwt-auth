# Express JWT Auth Framework
### Original code & tutorial by Shaun P. / The NetNinga

Shaun's video tutorial series --> https://www.youtube.com/playlist?list=PL4cUxeGkcC9iqqESP8335DA5cRFp8loyp

Shaun's original GitHub:
https://github.com/iamshaunjp/node-express-jwt-auth/

---
This branch of the repo contains all of the completed, working files for user sign up / login through JWT in Node.js / Express.js **with the expection** of the .env file.


### File Notes:


/controllers/authController.js
- JWT signing happens in here
- currently only puts a received MongoDB user._id in the payload
- current code includes a 'maxAge' var to expire the JWT after 3 days

/middleware/authMiddleware.js
- JWT verification happens here in requireAuth()
- checkUser() looks for user info and injects the email into *locals* for use by in the views - specifically ./views/header.js
- TO DO: try and incorporate this injection in the initial login / auth pass to remove another call the DB 


.env
 - MONGO_URI= (the URI for your MongoDB)
 - JWT_SECRET= (the secret for signing/validating the JWT signature)

<hr>

## CRSF Still Needed
Shaun mentions that JWT is useful for authentication but does not offer any protection from CSRF.  Recommended reading, here --> https://owasp.org/www-community/attacks/csrf

### Tutorial on CSRF:
https://levelup.gitconnected.com/how-to-implement-csrf-tokens-in-express-f867c9e95af0
