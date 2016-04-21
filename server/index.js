var express        = require('express'),
    exphbs         = require('express-handlebars'),
    logger         = require('morgan'),
    cookieParser   = require('cookie-parser'),
    bodyParser     = require('body-parser'),
    nodemailer     = require('nodemailer');
    methodOverride = require('method-override'),
    session        = require('express-session'),
    passport       = require('passport'),
    LocalStrategy  = require('passport-local'),
    conf           = require('./utilities/configUtil').configUtil,
    mysql          = require('./utilities/mysql-connector').connector;

//*******DEMONSTRATING CONFIG SETUP*********
conf.init();
//*****DEMONSTRATING MYSQL CONNECTION*******
db = conf.dbInfo;
mysql.createConnection(db.host, db.user, db.password, db.database);
mysql.queryAllAccounts();
mysql.closeConnection();
//******************************************

var config = require('./config.js'),    //config file contains all tokens and other private info
    funct  = require('./functions.js'); //funct file contains our helper functions for our Passport and database work

var app = express();

//===============PASSPORT===============
// Use the LocalStrategy within Passport to login/”signin” users.
passport.use('local-signin', new LocalStrategy(
  {passReqToCallback : true}, //allows us to pass back the request to the callback
  function(req, username, password, done) {
    funct.localAuth(username, password)
        .then(function (user) {
          if (user) {
            console.log("LOGGED IN AS: " + user.username);
            req.session.success = 'You are successfully logged in ' + user.username + '!';
            done(null, user);
          }
          if (!user) {
            console.log("COULD NOT LOG IN");
            req.session.error = 'Could not log user in. Please try again.'; //inform user could not log them in
            done(null, user);
          }
        })
        .fail(function (err){
          console.log(err.body);
        });
  }
));
// Use the LocalStrategy within Passport to register/"signup" users.
passport.use('local-signup', new LocalStrategy(
  {
    //allows us to pass back the request to the callback
    passReqToCallback : true
  },
  function submitAccountRequest(req, username, password, done) {
    funct.localReg(username, password)
      .then(function accountRequestSuccessful(user) {
        if (user) {
          console.log("REGISTERED: " + user.username);
          req.session.success = 'You are successfully registered and logged in ' + user.username + '!';
          done(null, user);
        }
        if (!user) {
          console.log("COULD NOT REGISTER");
          //inform user could not log them in
          req.session.error = 'That username is already in use, please try a different one.'; 
          done(null, user);
        }
      })
      .fail(function accountRequestFailed(err){
        console.log(err.body);
      });
  }
));

// Passport session setup.
passport.serializeUser(function(user, done) {
  console.log("serializing " + user.username);
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  console.log("deserializing " + obj);
  done(null, obj);
});
//===============EXPRESS================
// Configure Express
app.use(logger('combined'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(session({
    secret: 'supernova',
    saveUninitialized: true,
    resave: true
}));
app.use(passport.initialize());
app.use(passport.session());

// Session-persisted message middleware
app.use(function(req, res, next){
  var err = req.session.error,
      msg = req.session.notice,
      success = req.session.success;

  delete req.session.error;
  delete req.session.success;
  delete req.session.notice;

  if (err) res.locals.error = err;
  if (msg) res.locals.notice = msg;
  if (success) res.locals.success = success;

  next();
});

// Configure express to use handlebars templates
var hbs = exphbs.create({
    defaultLayout: 'main'
});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

//=============== ROUTES ===============
// This section will hold our Routes
//======================================
//displays our homepage
app.get('/', function(req, res){
  res.render('home', {user: req.user});
});

//displays our signup page
app.get('/signin', function(req, res){
  res.render('signin');
});

// ADMIN PAGES

// Send Account Invite Page
app.get('/admin/sendInvite', function(req, res) {
    res.render('admin/sendInvite');
});

// Send Account Invite Page
app.post('/admin/sendInvite/send', function(req, res) {
    // TODO fully implement and test nodemailer
    var email = req.body.email,
        transporter = nodemailer.createTransport('smtps://user%40gmail.com:pass@smtp.gmail.com');

    var mailOptions = {
        from: '"WFE Admin" <user@gmail.com>',
        to: email,
        subject: "You're Invited to Use the Wide-Field Ethnography Platform!",
        html: "<p>this is a test</p>"

    };

    // transporter.sendMail(mailOptions, function(err, info) {
    //     if (err) {
    //         return console.log(err);
    //     }
    //     console.log('Message sent:' + info.response);
    // });
    res.render('admin/inviteSent');
});


// ACCOUNT CREATION

// For users to create their account
app.get('/createAccount', function(req, res){
    // Invitees are sent a token query parameter
    var inviteToken = req.query.invite;

    // pass token along to form...

    res.render('account/createAccount');
});

// Creates the account
app.post('/createAccount/submit', function(req, res){
    var userInfo = req.body;

    // validateInput();         <-- for form inputs and checking the token
    // createAccount(userInfo); <-- for storing the user info into the database

    console.log(userInfo);
    res.redirect('/');  // probably redirect user to main UI
});

//sends the request through our local signup strategy, and if successful takes user to homepage, otherwise returns then to signin page
app.post('/account/submit-request', passport
  .authenticate('local-signup', {
    successRedirect: '/',
    failureRedirect: '/signin'
  })
);

//sends the request through our local login/signin strategy, and if successful takes user to homepage, otherwise returns then to signin page
app.post('/login', passport
  .authenticate('local-signin', {
    successRedirect: '/',
    failureRedirect: '/signin'
  })
);

//logs user out of site, deleting them from the session, and returns to homepage
app.get('/logout', function(req, res){
  var name = req.user.username;
  console.log("LOGGIN OUT " + req.user.username)
  req.logout();
  res.redirect('/');
  req.session.notice = "You have successfully been logged out " + name + "!";
});

//===============PORT=================
var port = process.env.PORT || 5000; //select your port or let it pull from your .env file
app.listen(port);
console.log("listening on " + port + "!");
