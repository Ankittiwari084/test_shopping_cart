const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');


const user = require(__dirname+'/route/user');
const product = require(__dirname+'/route/product');
const cart = require(__dirname+'/route/cart');



const app  = express();

// set for cros origin
app.use(cors());

// set bodyparser middleware.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

// set server side validation middleconste.
app.use(expressValidator());


app.use('/user',user);
app.use('/product',product);
app.use('/cart',cart);




// Catch all other routes and return the index file
app.get('*', (req, res) => {
   res.send("Server is runing...");
});


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
 });  

app.listen(3000,function(){
    console.log("Server is started! on port 3000.");
});