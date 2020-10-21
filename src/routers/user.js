const express = require("express");
const User = require("../models/user");
var url = require("url");
var Meta = require("html-metadata-parser");
const router = new express.Router();

router.post("/users", async (req, res) => {
  const user = new User(req.body);
  console.log("body", req.body);
  let link= url.parse(req.body.Link, true)
  let publisher=link.host
  user.Publisher=publisher
Meta.parser(req.body.Link).then((res)=>
{
    console.log("res",res.meta.title)
    console.log(req.body)
    user.Title=res.meta.title; 
  
    user.save();   
}).then(res1=>   res.status(201).send(user)).catch ((e) =>{
    res.status(400).send(e);
  })
//   try {
//     await user.save();
//     res.status(201).send(user);
//   } 
});

router.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (e) {
    res.status(500).send();
  }
});

router.get("/users/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const user = await User.findById(_id);

    if (!user) {
      return res.status(404).send();
    }

    res.send(user);
  } catch (e) {
    res.status(500).send();
  }
});

//send tagid for corresponding userid
router.patch("/users/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password", "age"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(404).send();
    }

    res.send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).send();
    }

    res.send(user);
  } catch (e) {
    res.status(500).send();
  }
});

const updatetData = (req) => {
  return new Promise((resolve, reject) => {
    //(async)
    // var result = await Meta.parser(req.body.Link);

    // console.log(JSON.stringify(result, null, 3));
    // resolve(JSON.stringify(result,NULL,3))
    Meta.parser(req.body.Link)
      .then((res) => {
        resolve(JSON.stringify(res, null, 3));
      })
      .catch((err) => {
        reject(err);
      });
  });
};

//return JSON.stringify(result,null,3);

module.exports = router;
