import React, { useState, useEffect } from "react";
import "./messages.css";
import MessageCard from "./MessageCard.js";
import Messenger from "./Messenger";
import api from "./api";
function Messages() {
  const [conversations, setConversations] = useState([]);
  const [conversationForsidebar, SetConversationForsidebar] = useState([]);
  const [firstrun, setFirstrun] = useState(false);
  const [currentconversation, setCurrentconversation] = useState({});
  const [showMessenger, setShowMessenger] = useState(false);
  let componentMounted = true; // (3) component is mounted

  useEffect(async () => {
    await api
      .get("/room/findconversations/" + localStorage.getItem("id"))
      .then((docs) => {
        if (componentMounted) {
          var list = [];
          docs.data.map((c) => {
            var conversation = {
              conversation: c,
              type: c.type,
            };
            //put it to 0
            if (c.messages[0].to._id === localStorage.getItem("id")) {
              conversation.person = c.messages[0].sender.username;
              conversation.receiver = c.messages[0].sender._id;
            } else {
              conversation.person = c.messages[0].to.username;
              conversation.receiver = c.messages[0].to._id;
            }
            conversation.lastmessage =
              c.messages[c.messages.length - 1].message;
            list.push(conversation);
            setConversations((list) => [...list, conversation]);

            setCurrentconversation(conversation);
            setShowMessenger(true);
          });
        }
        // var list = [];
        // setConversations(docs.data);
        // !firstrun && setFirstrun(true);
        // console.log(docs.data);
        // docs.data.map((c) => {
        //   var conversation = {
        //     conversation: c,
        //   };
        //   //put it to 0
        //   if (c.messages[4].to._id === localStorage.getItem("id")) {
        //     conversation.person = c.messages[4].sender.username;
        //   } else {
        //     conversation.person = c.messages[4].to.username;
        //   }
        //   conversation.lastmessage = c.messages[c.messages.length - 1].message;
        //   list.push(conversation);
        //   setConversations((list) => [...list, conversation]);
        // });
      });

    return () => {
      // This code runs when component is unmounted
      componentMounted = false; // (4) set it to false if we leave the page
    };
  }, []);
  function setCurrent(key) {
    setCurrentconversation(conversations[key]);
  }
  // useEffect(() => {
  //   var list = [];
  //   console.log(conversations);
  //   conversations.map((c) => {
  //     var conversation = {
  //       conversation: c,
  //     };
  //     //put it to 0
  //     if (c.messages[4].to._id === localStorage.getItem("id")) {
  //       conversation.person = c.messages[4].sender.username;
  //     } else {
  //       conversation.person = c.messages[4].to.username;
  //     }
  //     conversation.lastmessage = c.messages[c.messages.length - 1].message;
  //     list.push(conversation);
  //   });
  //   console.log(list);
  //   SetConversationForsidebar(list);
  // }, [conversations]);

  // async function filterConversations() {
  //   await api
  //     .get("/room/findconversations/" + localStorage.getItem("id"))
  //     .then((docs) => {
  //       setConversations(docs.data);
  //     });

  //   var list = [];
  //   conversations.map((c) => {
  //     var conversation = {
  //       conversation: c,
  //     };
  //     //put it to 0
  //     if (c.messages[4].to._id === localStorage.getItem("id")) {
  //       conversation.person = c.messages[4].sender.username;
  //       // if (c.messages[4].sender.profilePic !== undefined)
  //       //   conversation.pic = c.messages[4].sender.profilePic;
  //     } else {
  //       conversation.person = c.messages[4].to.username;
  //     }
  //     conversation.lastmessage = c.messages[c.messages.length - 1].message;
  //     list.push(conversation);
  //   });
  //   return list;
  // }

  return (
    <div>
      <div className="messages__container">
        {/* {filterConversations(conversations).map} */}
        {/* {conversations.map((cv) => cv.type)} */}
        <div className="messages__sidebar">
          {conversations.map((val, key) => (
            <div
              onClick={() => {
                setCurrentconversation(conversations[key]);
                setCurrent(key);
                console.log(conversations[key]);
              }}
            >
              <MessageCard conversation={val} />
            </div>
          ))}
          {/* {conversations.map((co) => {
            <MessageCard conversation={co} />;
          })} */}
          {/* <MessageCard />
          <MessageCard />
          <MessageCard />
          <MessageCard />
          <MessageCard />
          <MessageCard />
          <MessageCard />
          <MessageCard /> */}
        </div>
        <div className="messages__messages">
          {" "}
          {/* <Messenger currentconversation={currentconversation} /> */}
          {showMessenger && (
            <Messenger currentconversation={currentconversation} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Messages;
