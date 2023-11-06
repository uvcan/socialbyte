const express=require('express');
const app=express();
const port=8000;
const expressLayouts=require('express-ejs-layouts');
const db=require('./config/mongoose');
const cookieParser=require('cookie-parser');
//used for session cookie
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');
const session=require('express-session');
const MongoStore = require('connect-mongo');

const sassMiddleware=require('node-sass-middleware');
app.use(sassMiddleware({
    src:'./assets/scss',
    dest:'./assets/css',
    debug:true,
    outFile:'extended',
    prefix:'/css'
}));


//Reading through the post request
app.use(express.urlencoded({ extended: true }));

//Use cookie
app.use(cookieParser());

//Use static file
app.use(express.static('./assets'));


//Use ejs layout
app.use(expressLayouts);
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);



//set up the view engine
app.set('view engine','ejs');
app.set('views','./views');



app.use(session({
    name:'socialByte',
    //TO DO Late at the time of production
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie:{
        maxAge:(1000 * 60 * 100)
    },
    store: new MongoStore ({
        // mongooseConnection:db,
        mongoUrl:'mongodb://127.0.0.1:27017/socilaByte_devlopment',
        //autoRemove:disabled
    },
    function(err){
        if(err){
            console.log(err || 'Connect mongo set up ok');
        }
    })   
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

//Use express router
app.use('/',require('./routes'));

app.listen(port,function(err){
    if(err){
        consolelog(`Error in starting the application ${err}`);
    }
    console.log(`Server is running on port : ${port}`);
});