var path = require("path");
var express = require("express");
var app = express();

var config = require("./config");
var router = require("./router");

app.use(router);
app.use("/public", express.static(path.join(__dirname, "/public")));


app.listen(config.ports.http, function(){
    console.log(`[HTTP] is up and running on port ${ config.ports.http }`);
});