const router = require("express").Router();
const { json } = require("express");
const mongoose = require("mongoose");
const User = require("../models/User");
const UserInformation = require("../models/UserInformation");
router.route("/").get((req, res) => {
  res.json("ok");
});
router.route("/adduser").post(async (req, res) => {
  var userinformationid;
  var userid;
  const userinfo = new UserInformation({
    _id: new mongoose.Types.ObjectId(),
  });
  await userinfo
    .save()
    .then((res) => {
      userinformationid = res._id;
    })
    .catch((err) => console.log(err));
  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    fullname: req.body.fullname,
    balance: req.body.balance,
    security_question: req.body.security_question,
    userinformation: userinformationid,
  });
  // user.joinedAt = user.joinedAt.toString().substring(0, 21);
  await user
    .save()
    .then((res) => {
      console.log(res);
      userid = res._id;
    })
    .catch((err) => console.log(err));
  res.status(200).json(user);

  UserInformation.findOneAndUpdate(
    { _id: userinformationid },
    { userid: userid }
  )
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
});
router.route("/userinformations/getall").get((req, res) => {
  UserInformation.find().then((docs) => res.send(docs));
});

router.route("/userinformations/findbyid/:id").get((req, res) => {
  UserInformation.findOne({ userid: req.params.id })
    .then((doc) => {
      console.log(doc);
      res.send(doc);
    })
    .catch((err) => {
      console.log(err);
    });
});
router.route("/userinformation/update/:id").post((req, res) => {
  UserInformation.findOneAndUpdate(
    { _id: req.params.id },
    req.body
  ).then((doc) => res.send(doc));
});
// router.route("/adduser").post((req, res) => {
//   const user = new User({
//     _id: new mongoose.Types.ObjectId(),
//     email: req.body.email,
//     username: req.body.username,
//     password: req.body.password,
//     fullname: req.body.fullname,
//     balance: req.body.balance,
//     security_question: req.body.security_question,
//   });
//   user
//     .save()
//     .then((res) => console.log(res))
//     .catch((err) => console.log(err));
//   res.status(200).json(user);
// });

router.route("/findbyusername/:username").get((req, res) => {
  const us = req.params.username;
  User.find({ username: us })
    .then((items) => {
      items.length > 0
        ? res.send({ find: true, user: items[0] })
        : res.send({ find: false });
    })
    .catch((err) => console.log(err));
});

router.route("/findbyid/:userid").get((req, res) => {
  const us = req.params.userid;
  User.find({ _id: us })
    .populate("userinformation")
    .then((items) => {
      items.length > 0
        ? res.send({ find: true, user: items[0] })
        : res.send({ find: false });
    })
    .catch((err) => console.log(err));
});
router.route("/findbyemail/:email").get((req, res) => {
  const us = req.params.email;
  User.find({ email: us })
    .then((items) => {
      items.length > 0
        ? res.send({ find: true, user: items[0] })
        : res.send({ find: false });
    })
    .catch((err) => console.log(err));
});
router.route("/login").post((req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  User.find({ email, password })
    .then((items) => {
      items.length > 0
        ? res.status(200).send({ login: true, user: items[0] })
        : res.status(404).send({ login: false });
    })
    .catch((err) => console.log(err));
});
router.route("/allusers").get((req, res) => {
  User.find((err, docs) => {
    res.send(docs);
  });
});

router.route("/update/:userid").post(async (req, res) => {
  var old = {};
  // const user = {
  //   email: req.body.email,
  //   fullname: req.body.fullname,
  //   username: req.body.username,
  //   password: req.body.password,
  //   balance: req.body.balance,
  // };
  const updateduser = await User.findOneAndUpdate(
    { _id: req.params.userid },
    req.body, //change to user
    { rowResult: true },
    (err, doc) => {
      old = doc;
      if (err) res.send({ update: false });
    }
  );
  if (updateduser) res.send({ update: true, old, new: updateduser });
});

router.route("/updateimgfullname/:userid").post((req, res) => {
  User.findOneAndUpdate(
    { _id: req.params.userid },
    { profilePic: req.body.profilePic, fullname: req.body.fullname }
  )
    .then((re) => res.send(re))
    .catch((err) => console.log(err));
});
module.exports = router;
