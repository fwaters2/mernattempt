const express = require("express");
const router = express.Router();
const Player = require("../models/player");

router.get("/player", (req, res, next) => {
  //this will return all the data, exposing only the id and action field to the client
  Player.find()
    .then((data) => {
      console.log("looking for all /api", "data", data);
      return res.json(data);
    })
    .catch(() => console.log("catchnex"));
});

router.post("/player", (req, res, next) => {
  if (req.body.action) {
    Player.create(req.body)
      .then((data) => res.json(data))
      .catch(next);
  } else {
    res.json({
      error: "Yo, the input field is empty",
    });
  }
});

router.delete("/player", (req, res, next) => {
  Player.findOneAndDelete({
    _id: req.params.id,
  })
    .then((data) => res.json(data))
    .catch(next);
});

module.exports = router;
