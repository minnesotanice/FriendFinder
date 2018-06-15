// REQUIREMENTS
//https://www.npmjs.com/package/express
var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;
// https://www.npmjs.com/package/body-parser
var bodyParser = require('body-parser');
// https://nodejs.org/docs/latest/api/path.html
const path = require('path');

// data parsing for express.js
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// import the html and api routes
require("./app/routing/htmlRoutes.js")(app);
require("./app/routing/apiRoutes.js")(app);

// have Express listen for server to start on specified PORT
app.listen(PORT, function(){
  console.log(`http://localhost:${PORT}/`);
});