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
const userSchema = require('./mongooseSchemas/userSchema');
const path = require("path")
mongoose.connect(
  process.env.MONGODB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true }
);
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client("669290193365-6a99rv1tr3a7cuqjjc940n1c0uru49o5.apps.googleusercontent.com")
//initailizing middleware
// allow us to make handle HTTP requests from another origin
app.use(cors());
app.use(bodyparser.json());
app.use(express.static(path.join(__dirname, "client", "build")));
const Monster = mongoose.model("monster", monsterSchema);
const User = mongoose.model("user",userSchema);
console.log("in server")

app.get("/api/", function(req, res) {

  Monster.find(function(err,data){

    if(err){
      res.send(err);
    }
    else{
      let monsterNames = [];
      for (let i = 0; i < data.length; ++i) {
        monsterNames.push(data[i].name);
      }
      res.json(monsterNames);
    }
  });
});

app.get("/api/:name", function(req, res) {
  let info ={};
  Monster.findOne({name:req.params.name},function(err,monster){
    if(err){
      console.log("argere");
      info.status = { isAMonster: false, characterName: req.params.name };
    }
    else{
      if(monster){
        info = monster;
        info.status = { isAMonster: true, characterName: req.params.name };
     }
     else{
       console.log("argggg");
       console.log("monster: " + monster);
       console.log("info givent: " + util.inspect(req.params,{showHidden: false, depth: null}))
       info.status = { isAMonster: false, characterName: req.params.name };
     }
      console.log(info);
      res.json(info); //all monster info including image
    }
  })
});

app.post("/api/save",function(req, res){
  const { token, cards }  = req.body
    console.log("save-TOKEN:" + token);
    if(!token){
      console.log("NO SAVE-TOKEN")
      res.json("no-data");
    }
  client.verifyIdToken({
    idToken: token,
    audience: "669290193365-6a99rv1tr3a7cuqjjc940n1c0uru49o5.apps.googleusercontent.com"
  }).then(function(response){
    const ticket = response;
    const { name, email } = ticket.getPayload();
    User.findOneAndUpdate({
      name: name,
      email: email,
    }, { data: cards},{new: true, upsert: true}).then(function(response){
      res.json(response);
    });
  })
})

app.post("/api/retrieve",function(req, res){
  const { token, cards }  = req.body
  console.log("retrieve-TOKEN:" + token);
  if(!token){
    console.log("NO RETREIVE-TOKEN");
    res.json("no-data");
  }
  client.verifyIdToken({
    idToken: token,
    audience: "669290193365-6a99rv1tr3a7cuqjjc940n1c0uru49o5.apps.googleusercontent.com"
  }).then(function(response){
    const ticket = response;
    const { name, email } = ticket.getPayload();
    User.findOne({name: name, email: email},function(err, user){
      if(err){res.status(404)}
      else{
        res.json(user.data)
      }
    });
  })
})
// Express only serves static assets in production
// app.get("*", (req, res) => {
//   console.log("ONLY the astrerix get request point is reached");
//     res.sendFile(path.join(__dirname, "client", "build", "index.html"));
// });
const PORT = process.env.PORT || 4000;
app.listen(PORT, function() {
  console.log(`Server listening on port ${PORT}.`);
});
