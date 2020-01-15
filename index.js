var path = require("path");
var express = require("express");
var app = express();
var bodyParser = require("body-parser");

var config = require("./config");
var router = require("./router");


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(router);
app.use("/public", express.static(path.join(__dirname, "/public")));


app.listen(config.ports.http, function(){
    console.log(`[HTTP] is up and running on port ${ config.ports.http }`);
});