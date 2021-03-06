//requiring packages
require('dotenv').config({path: __dirname + '/.env'});
const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const cors = require("cors");
const axios = require("axios");
const util = require("util");
const mongoose = require("mongoose");
const monsterSchema = require('./mongooseSchemas/monsterSchema');
const path = require("path")
mongoose.connect(
  process.env.MONGODB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true }
);
//initailizing middleware
// allow us to make handle HTTP requests from another origin
app.use(cors());
app.use(bodyparser.json());
app.use(express.static(path.join(__dirname, "client", "build")));
const Monster = mongoose.model("monster", monsterSchema);
console.log("in server")
app.get("/api/", function(req, res) {
  console.log('inside get request');
  Monster.find(function(err,data){
    if(err){console.log("there was an error in finding the names")}
    else{
      let monsterNames = [];
      for (let i = 0; i < data.length; ++i) {
        monsterNames.push(data[i].name);
      }
      console.log(util.inspect(data, false, null));
      res.json(monsterNames);
    }
  });
});
app.get("/api/:name", function(req, res) {
  let info ={};
  Monster.findOne({name:req.params.name},function(err,monster){
    if(err){
      console.log("monster can't be found from dnd5eapi");
      info.status = { isAMonster: false, characterName: req.params.name };
    }
    else{
      if(monster){
        info = monster;
        info.status = { isAMonster: true, characterName: req.params.name };
     }
     else{
       info.status = { isAMonster: false, characterName: req.params.name };
     }
      console.log(info);
      res.json(info); //all monster info including image
    }
  })
});

// Express only serves static assets in production
app.get("*", (req, res) => {
  console.log("ONLY the astrerix get request point is reached");
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});
const PORT = process.env.PORT || 4000;
app.listen(PORT, function() {
  console.log(`Server listening on port ${PORT}.`);
});
