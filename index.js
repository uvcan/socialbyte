const express=require('express');
const app=express();
const port=8000;
const expressLayouts=require('express-ejs-layouts');
const db=require('./config/mongoose');

//Use static file
app.use(express.static('./assets'));


//Use ejs layout
app.use(expressLayouts);
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

//Use express router
app.use('/',require('./routes'));

//set up the view engine
app.set('view engine','ejs');
app.set('views','./views');

app.listen(port,function(err){
    if(err){
        consolelog(`Error in starting the application ${err}`);
    }
    console.log(`Server is running on port : ${port}`);
});