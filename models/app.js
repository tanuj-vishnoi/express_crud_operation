var express = require('express')
var app = express();
let PORT = require('./config/properties.js').PORT
var bodyParser = require('body-parser');
let dbconnection = require('./config/dbconnection.js')
var log = require('morgan')('dev');
var herosRoutes = require('./heroapi/hero.routes');

var bodyParserJSON = bodyParser.json();
var bodyParserURLEncoded = bodyParser.urlencoded({extended:true});

//initialise express router
var router = express.Router();
console.log(PORT)
dbconnection();


app.use(log);
app.use(bodyParserJSON);
app.use(bodyParserURLEncoded);


app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
     res.setHeader("Access-Control-Allow-Credentials", "true");
     res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
     res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Origin,Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,Authorization");
   next();
 });

app.use('/api',router);
herosRoutes(router);
app.listen(PORT)