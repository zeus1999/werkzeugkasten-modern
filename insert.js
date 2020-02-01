var db = require("./connections/mongodb/models/data");
var csv = require("csvtojson");


var fs = require("fs");
var path = require("path");


(async () => {
    let iso31661 = await csv({ delimiter: ";" }).fromFile(path.join(__dirname, "./data/nay.csv"));
    //fs.writeFileSync("a", JSON.stringify(iso31661))

    iso31661.forEach(function(value){
        let b = new db({ abbreviation: value.abbr, meaning: value.meaning, category: "Unit Measures > Temperature" });
        b.save();
    });

})();