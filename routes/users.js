var express = require('express');
var router = express.Router();
const fs = require("fs");
const cors = require("cors");

router.use(cors());

let apiNyckel = "123456";

/* GET users listing. */
router.get('/', function(req, res, next) {

  fs.readFile("users.json", function(err, data) {
    if(err) {
      console.log(err);

      if(err.code == "ENOENT")
      {
        console.log("Finns ingen sådan fil! ");
      }

    }

    let users = JSON.parse(data);

    res.json(users);

  });

});

router.get('/:userName', function(req, res, next) {

  console.log("Skicka info om ", req.params.userName);

  fs.readFile("users.json", function(err, data) {
    if(err) {
      console.log(err);
    }

    let users = JSON.parse(data);

    let sendUser = users.find((users) => users.firstName == req.params.userName);

    console.log("Hittad user", sendUser);

    res.json(sendUser);

  });

});

router.post("/new/:apiNyckel", function(req, res){

  let getKey = req.params.apiNyckel;

  if (getKey == apiNyckel) {

    let newUser = req.body;
  console.log(newUser);

  fs.readFile("users.json", function(err, data) {
    if (err) {
      console.log(err);
    }

    let users = JSON.parse(data);
    users.push(newUser);

    fs.writeFile("users.json", JSON.stringify(users, null, 2), function(err) {
      if (err) {
        console.log(err);
      }
    })

  })


  res.json("Ny användare sparad");

  } else {
    res.json("Nehe du! Så får du inte göra!");
  }

  

});

module.exports = router;
