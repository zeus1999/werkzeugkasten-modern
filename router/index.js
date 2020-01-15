var path = require("path");
var express = require("express");
var router = express.Router();
var csv = require("csvtojson");

let abbrJson = [];

csv({ headers: ["abbr", "meaning"], delimiter: ";"}).fromFile(path.join(__dirname, "../abbs.csv")).then((jsonObj)=>{
    jsonObj.forEach(function(value){
        abbrJson.push({ abbr: value.abbr, meaning: value.meaning, type: "my csv" });
    });
});

csv({ delimiter: ",", quote: "\""}).fromFile(path.join(__dirname, "../airports.csv")).then((jsonObj)=>{
    jsonObj.forEach(function(value){
        abbrJson.push({ abbr: value.iata_code, meaning: value.name, type: "Airport Data" });
    });
});



router.get("/", function(req, res){
    res.sendFile(path.join(__dirname, "../public/index.html"));
});

router.post("/abbr", function(req, res){

    let output = [];
    let abb = req.body.abbr;
    
    let r = new RegExp(abb, "ig");

    for(let i = 0; i < abbrJson.length; i++){
        
        if(r.test(abbrJson[i].abbr)){
            output.push(abbrJson[i]);
        }
    }
    
    res.send(output);

});

module.exports = router;