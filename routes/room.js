const router = require("express").Router();
const { json } = require("express");
const mongoose = require("mongoose");
const Room = require("../models/Room");
const User = require("../models/User");
const ConversationR = require("../models/ConversationR");
const ConversationP = require("../models/ConversationP");
router.route("/").get((req, res) => {
  res.json("ok");
});
router.route("/addroom").post((req, res) => {
  const room = new Room({
    _id: new mongoose.Types.ObjectId(),
    owner: req.body.owner,
    bannerUrl: req.body.bannerUrl,
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    isFree: req.body.isFree,
    isPublic: req.body.isPublic,
    Horaire: req.body.Horaire,
    // subscriptions: null,
  });
  // user.joinedAt = user.joinedAt.toString().substring(0, 21);
  room
    .save()
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
  res.status(200).json(room);
});

router.route("/findbyowner/:owner").get((req, res) => {
  const room = req.params.owner;
  Room.find({ owner: room })
    .then((items) => {
      items.length > 0
        ? res.send({ find: true, rooms: { count: items.length, items } })
        : res.send({ find: false });
    })
    .catch((err) => res.status(404).send({ find: false }));
});

router.route("/findbyid/:roomid").get((req, res) => {
  const room = req.params.roomid;
  Room.find({ _id: room })
    .populate("owner")
    .populate("invites")
    .then((items) => {
      items.length > 0
        ? res.send({ find: true, room: items[0] })
        : res.send({ find: false });
    })

    .catch((err) => res.status(404).send({ find: false }));
});

router.route("/allrooms").get((req, res) => {
  Room.find((err, docs) => {
    docs != undefined
      ? res.send({ count: docs.length, docs })
      : res.send({ docs });
  }).populate("owner");
});

router.route("/update/:roomid").post(async (req, res) => {
  var old = {};

  const updatedroom = await Room.findOneAndUpdate(
    { _id: req.params.roomid },
    req.body, //change to object
    { rowResult: true },
    (err, doc) => {
      old = doc;
      if (err) res.send({ update: false });
    }
  );
  if (updatedroom) res.send({ update: true, old, new: updatedroom });
});

router.route("/delete/:roomid").delete((req, res) => {
  Room.findOneAndDelete(
    { _id: req.params.roomid },
    { rowResult: true },
    (err, doc) => res.send({ delete: true, doc })
  );
});
router.route("/subscribe/:roomid").post((req, res) => {
  Room.findOneAndUpdate(
    { _id: req.params.roomid },
    { $push: { subscriptions: req.body.sub } },
    { rowResult: true }
  )
    .populate("subscriptions")
    .exec()
    .then((r) => res.send(r));
});

router.route("/unsubscribe/:roomid").post((req, res) => {
  Room.findOneAndUpdate(
    { _id: req.params.roomid },
    { $pull: { subscriptions: req.body.sub } },
    { rowResult: true },
    (err, doc) => res.send(doc)
  ).populate("subscriptions");
});
router.route("/issub/:roomid").post((req, res) => {
  Room.find({ _id: req.params.roomid }, (err, docs) => {
    var sub;
    var found = false;
    docs.forEach((doc) => {
      // console.log(doc);
      if (doc.subscriptions != null)
        doc.subscriptions.map((val) => {
          if (val._id == req.body.id) {
            found = true;
            sub = { find: true, doc: doc };
          }
          // console.log(val._id);
        });
    });
    // !found && res.send({ find: false });
    if (!found) {
      res.send({ find: false });
    } else res.send(sub);
  })
    .populate("subscriptions")
    .populate("owner")
    .populate("invites");
});
router.route("/islive/:roomid").post((req, res) => {
  Room.findOneAndUpdate(
    { _id: req.params.roomid },
    { isLive: req.body.isLive }
  ).then(res.send("ok"));
});
// router.route("/invite/:roomid").post((req, res) => {
//   req.body.invites.forEach((username) => {
//     User.find({ username })
//       .then((data) => {
//         data.length > 0 &&
//           data.forEach((u) => {
//             // console.log(u._id);

//             Room.findOneAndUpdate(
//               { _id: req.params.roomid },
//               { $push: { invites: u._id } },
//               { rowResult: true }
//             )
//               .populate("invites")
//               .exec()
//               .then((r) => res.send({ update: true, r }))
//               .catch((err) => console.log(err));
//           });
//       })
//       .catch((err) => {
//         res.send(err);
//       });
//   });
// });

router.route("/invite/:roomid").post((req, res) => {
  req.body.forEach((invitation) => {
    User.findOne({ username: invitation.to })
      .then((data) => {
        var i = {
          sender: invitation.sender,
          to: data._id,
          time: invitation.time,
        };

        Room.findOneAndUpdate(
          { _id: req.params.roomid },
          { $push: { invites: i } },
          { rowResult: true }
        )
          .populate("invites.to")
          .populate("invites.sender")
          .exec()
          .then((r) => res.send({ update: true, r }))
          .catch((err) => console.log(err));
      })
      .catch((err) => {
        res.send(err);
      });
  });
});

router.route("/addconversation").post((req, res) => {
  var type = req.body.type;
  var id = req.body.id;
  // var message = {
  //   sender: req.body.sender,
  //   to: req.body.to,
  //   time: req.body.time,
  // };
  if (type === "group") {
    const conversation = new ConversationR({
      _id: new mongoose.Types.ObjectId(id),
      type,
    });
    conversation
      .save()
      .then((v) => res.send(v))
      .catch((err) => console.log(err));
  } else {
    const conversation = new ConversationP({
      _id: new mongoose.Types.ObjectId(),
      type,
    });
    conversation
      .save()
      .then((v) => res.send(v))
      .catch((err) => console.log(err));
  }
});
router.route("/allconversations/:type").get((req, res) => {
  if (req.params.type == "group") {
    ConversationR.find()
      .populate("messages.sender")
      .populate("messages.to")
      .then((docs) => res.send(docs));
  } else {
    ConversationP.find()
      .populate("sender")
      .populate("to")
      .then((docs) => res.send(docs));
  }
});
router.route("/findconversation/:id").post((req, res) => {
  const type = req.body.type;
  if (type == "group") {
    ConversationR.findById(req.params.id)
      .populate("sender")
      .populate("to")
      .then((docs) => res.send(docs));
  } else {
    ConversationP.findById(req.params.id)
      .populate("sender")
      .populate("to")
      .then((docs) => res.send(docs));
  }
});
router.route("/findconversationsPsender/:sender").get((req, res) => {
  ConversationP.find({
    messages: {
      $elemMatch: { sender: req.params.sender },
    },
  }).then((docs) => {
    res.send(docs);
  });
});
router.route("/findconversationsPto/:to").get((req, res) => {
  ConversationP.find({
    messages: {
      $elemMatch: { to: req.params.to },
    },
  }).then((docs) => {
    res.send(docs);
  });
});

router.route("/findconversationsRsender/:sender").get((req, res) => {
  ConversationR.find({
    messages: {
      $elemMatch: { sender: req.params.sender },
    },
  }).then((docs) => {
    res.send(docs);
  });
});

router.route("/findconversations/:userid").get((req, res) => {
  ConversationP.find({
    messages: {
      $elemMatch: {
        $or: [{ sender: req.params.userid }, { to: req.params.userid }],
      },
    },
  })
    .populate("messages.to")
    .populate("messages.sender")
    .then((docs) => {
      res.send(docs);
    });
});
router.route("/existconversation/").post((req, res) => {
  ConversationP.find({
    messages: {
      $elemMatch: {
        $and: [
          { $or: [{ sender: req.body.sender }, { to: req.body.sender }] },
          {
            $or: [{ sender: req.body.to }, { to: req.body.to }],
          },
        ],
      },
    },
  })
    .populate("messages.to")
    .populate("messages.sender")
    .then((docs) => {
      docs.length > 0
        ? res.send({ find: true, id: docs[0]._id })
        : res.send({ find: false });
    });
});
router.route("/pushmessage/:id").post((req, res) => {
  const message = {
    sender: req.body.sender,
    time: req.body.time,
    message: req.body.message,
    to: req.body.to,
  };
  const type = req.body.type;
  if (type === "group") {
    ConversationR.findOneAndUpdate(
      { _id: req.params.id },
      { $push: { messages: message } },
      { rowResult: true }
    )
      // .populate("messages.sender")
      .then((val) => {
        res.send(val);
        console.log(val);
      })
      .catch((err) => console.log(err));
  } else {
    ConversationP.findOneAndUpdate(
      { _id: req.params.id },
      { $push: { messages: message } },
      { rowResult: true }
    )
      // .populate("messages.sender")
      // .populate("messages.to")
      .then((val) => {
        res.send(val);
      });
  }
  //   ConversationP.findOneAndUpdate(
  //     { _id: req.params.id },
  //     { $push: message },
  //     { rowResult: true }
  // })]
  //     .populate("messages.sender")
  //     .then((val) => {
  //       res.send(val)
});
module.exports = router;
