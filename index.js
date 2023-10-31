const express=require('express');
const app=express();
const port=8000;


//Use express router
app.use('/',require('./routes'));



app.listen(port,function(err){
    if(err){
        consolelog(`Error in starting the application ${err}`);
    }
    console.log(`Server is running on port : ${port}`);
});