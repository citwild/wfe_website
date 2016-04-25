var express = require('express'),
    exphbs = require('express-handlebars'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    nodemailer = require('nodemailer'),
    methodOverride = require('method-override'),
    session = require('express-session'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    ConfigUtil = require('./utilities/configUtil'),
    DB = require('./utilities/db/db'),
    UserAccount = require('./utilities/models/userAccount'),
    AuthUtil = require('./utilities/account/authUtil');

//************CONFIGURE SERVER**************
var appConfig = new ConfigUtil.init();
var db = new DB();
dbinfo = appConfig.dbInfo;
db.createPool(dbinfo.host, dbinfo.user, dbinfo.password, dbinfo.database);
//******************************************

// DB EXAMPLES
// db.getAllAccounts().then(function (rows) {
//     // nothing
// }).catch(function (err) {
//     console.log(err.message);
//     console.log(err.stack);
// });
// db.getAccountByEmail('test@test.com');
// var user = new UserAccount({
//    first_name:'Tester',
//    last_name:'Test',
//    email:'funtest@test.com',
//    password:'password',
//    permissions:'test'
// });
// db.insertAccount(user.data);

var config = require('./config.js'),    //config file contains all tokens and other private info
    funct = require('./functions.js'); //funct file contains our helper functions for our Passport and database work

var app = express();

//===============PASSPORT===============
// Login: Local Strategy
passport.use('login', new LocalStrategy(
    {
        usernameField: 'email',
        passReqToCallback: true
    },
    function (req, username, password, done) {
        AuthUtil.validatePassword(username, password, db)
            .then(function (user) {
                if (user) {
                    var usersName = user.first_name + " " + user.last_name;
                    req.session.success = 'You are successfully logged in ' + usersName + '!';
                    done(null, user);
                } else {
                    req.session.error = 'Could not log user in. Please try again.';
                    done(null, user);
                }
            });
    }
));
// Register: Local Strategy
passport.use('local-signup', new LocalStrategy(
    {
        passReqToCallback: true
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
            .fail(function accountRequestFailed(err) {
                console.log(err.body);
            });
    }
));

// Passport session setup
passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (obj, done) {
    done(null, obj);
});

// Include with routes to ensure authentication
function isLoggedIn(req, res, next) {
    if (req.user)
        next();
    else
        res.redirect('/');
}

//===============EXPRESS================
// Configure Express
app.use(logger('combined'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(session({
    secret: 'supernova',
    saveUninitialized: true,
    resave: true
}));
app.use(passport.initialize());
app.use(passport.session());

// Session-persisted message middleware
app.use(function (req, res, next) {
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
//displays entry page, requesting sign-in
app.get('/', function (req, res) {
    res.render('signin');
});

//displays main page for authenticated users
app.get('/home', isLoggedIn, function (req, res) {
    res.render('home', {
        user: req.user
    });
});

// ADMIN PAGES

// Send Account Invite Page
app.get('/admin/crudUser', isLoggedIn, function (req, res) {
    res.render('admin/crudUser');
});

// Add user data to database
app.post('/admin/createUser', isLoggedIn, function(req, res) {
    var user;
    console.log(req.body);
    if (req.body.password === req.body.password_confirmed) {
        user = new UserAccount();
        user.setData(req.body);
        db.insertAccount(user.data)
            .then(function () {
                req.session.success = 'User successfully added!';
            }).catch(function (err) {
                req.session.error = 'There was an error adding the user. Please try again.';
                console.log(err.message);
                console.log(err.stack);
            });
    } else {
        req.session.error = 'The two passwords provided to not match. Please try again.';
    }
    res.redirect('/admin/crudUser');
});

// Send Account Invite Page
app.post('/admin/sendInvite/send', isLoggedIn, function (req, res) {
    // TODO fully implement and test nodemailer
    var email = req.body.email,
        transporter = nodemailer.createTransport('smtps://user%40gmail.com:pass@smtp.gmail.com');

    var mailOptions = {
        from    : '"WFE Admin" <user@gmail.com>',
        to      : email,
        subject : "You're Invited to Use the Wide-Field Ethnography Platform!",
        html    : "<p>this is a test</p>"
    };

    // transporter.sendMail(mailOptions, function(err, info) {
    //     if (err) {
    //         return console.log(err);
    //     }
    //     console.log('Message sent:' + info.response);
    // });
    res.render('admin/inviteSent');
});


//sends the request through our local login/signin strategy, and if successful takes user to homepage, otherwise returns then to signin page
app.post('/login',
    passport.authenticate('login', {
        successRedirect: '/home',
        failureRedirect: '/'
    })
);

//logs user out of site, deleting them from the session, and returns to homepage
app.get('/logout', function (req, res) {
    var name = req.user.username;
    req.logout();
    res.redirect('/');
    req.session.notice = "You have successfully been logged out " + name + "!";
});

//===============PORT=================
var port = process.env.PORT || 5000; //select your port or let it pull from your .env file
app.listen(port);
console.log("listening on " + port + "!");
