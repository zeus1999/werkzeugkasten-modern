var path = require("path");
var fs = require("fs");
var express = require("express");
var router = express.Router();
var csv = require("csvtojson");

let abbrJson = [];

(async () => {
    
    let manual = await csv({ delimiter: ";" }).fromFile(path.join(__dirname, "../abbs.csv"));
    manual.forEach(function(value){
        abbrJson.push({ abbr: value.abbr, meaning: value.meaning, type: "myCsv" });
    }); 

    let iso31661 = await csv({ delimiter: "," }).fromFile(path.join(__dirname, "../iso-3166-1.csv"));
    iso31661.forEach(function(value){
        abbrJson.push({ abbr: value.alpha2, meaning: value.country, type: "ISO 3166-1 Data (Alpha 2)" });
        abbrJson.push({ abbr: value.alpha3, meaning: value.country, type: "ISO 3166-1 Data (Alpha 3)" });
    });

    let iso31662 = await csv({ delimiter: "," }).fromFile(path.join(__dirname, "../iso-3166-2.csv"));
    iso31662.forEach(function(value){
        abbrJson.push({ abbr: value.code, meaning: value.name + " (" + value.countryName + ")", type: "ISO 3166-2 Data" });
    });

    let iso4217 = await csv({ delimiter: "," }).fromFile(path.join(__dirname, "../iso-4217.csv"));
    iso4217.forEach(function(value){
        abbrJson.push({ abbr: value.code, meaning: value.currency, type: "ISO 4217 Data" });
    });
    
    let airports = await csv({ delimiter: ",", quote: "\"" }).fromFile(path.join(__dirname, "../airports.csv"));
    airports.forEach(function(value){
        abbrJson.push({ abbr: value.iata_code, meaning: value.name, type: "Airport Data" });
    });

    abbrJson.sort(function(a, b){return b.length - a.length});

    //abbrJson.sort(dynamicSort("abbr"));

})();





router.get("/", function(req, res){
    res.sendFile(path.join(__dirname, "../public/index.html"));
});

router.post("/abbr", function(req, res){

    let output = [];
    let abb = req.body.abbr;
    
    let r = new RegExp(abb, "i");

    for(let i = 0; i < abbrJson.length; i++){
        
        //console.log(abbrJson[i].abbr, r.test(abbrJson[i].abbr))
        if(r.test(abbrJson[i].abbr)){
            console.log(abbrJson[i].abbr)
            output.push(abbrJson[i]);
        }
    }
    
    res.send(output);

});

module.exports = router;


function dynamicSort(property) {
    var sortOrder = 1;

    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }

    return function (a,b) {
        if(sortOrder == -1){
            return b[property].localeCompare(a[property]);
        }else{
            return a[property].localeCompare(b[property]);
        }        
    }
}
