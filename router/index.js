var path = require("path");
var fs = require("fs");
var express = require("express");
var router = express.Router();
var csv = require("csvtojson");
var db = require("../connections/mongodb/models/data");


router.get("/", function(req, res){
    res.sendFile(path.join(__dirname, "../public/index.html"));
});

router.post("/search", async function(req, res){

    let abb = req.body.message;

    let out = await db.find({ abbreviation: new RegExp(abb, "ig") }).sort("abbreviation");
   
    res.send(out);

});

module.exports = router;