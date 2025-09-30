import React, { useContext, useState } from "react";
import styles from "./messages.module.css";
import CommonNavbar from "../CommonNavbar/CommonNavbar";
import useFetch from "../useFetch";
import { UserContext } from "../App";
import { members } from "../Context/MembersContext";
import { Messaging } from "../Context/MessagingContext";

const Messages = () => {
  const users = [
    { name: "Britney Connor", image: "britney.jpg" },
    { name: "Wilfred Mendes", image: "wilfred.jpg" },
    { name: "Ozias Powers", image: "ozias.jpg" },
    { name: "Rich Idris", image: "rich.jpg" },
    { name: "Chris B. Jordon", image: "chris.jpg" },
  ];
  const messages = [
    {
      sender: "Britney Connor",
      text: "Hey, My Name is Britney how are you 😊",
    },
    { sender: "User", text: "Hey Britney, I'm Carmel 😍" },
    { sender: "Britney Connor", text: "I'm Thanks 💕" },
  ];
  const {messagedUsers,currentChat,setCurrentChat,handleDisplayChat} = useContext(Messaging)

  const { url, user } = useContext(UserContext);
  // const { get: getMessages } = useFetch(`${url}/messages/${user.username}`);
  // const [allMessages, setAllMessages] = useState();
  // const [messagedUsers, setMessagedUsers] = useState();
  const { allMembers } = useContext(members);
  // const [currentChat, setCurrentChat] = useState();

  // useEffect(() => {
  //   getMessages((d) => {
  //     setAllMessages(d);
  //     let users = [];
  //     d.forEach((m) => {
  //       users.push(m.senderId, m.recieverId);
  //     });
  //     users = users.filter((name) => {
  //       return name !== user.username;
  //     });
  //     setMessagedUsers([...new Set(users)]);
  //   });
  // }, [handleDisplayChat]);

  // function handleDisplayChat(user) {
  //   const messages = allMessages.filter((message) => {
  //     return message.recieverId === user || message.senderId === user;
  //   });
  //   const member = allMembers.find((member) => {
  //     return member.username === user;
  //   });
  //   setCurrentChat({
  //     pfp: `${url}/${member.pfpPath}`,
  //     name: member.fullName,
  //     username: member.username,
  //     messages,
  //   });
  // }

  const {post:sendMessage} = useFetch(`${url}/sendAMessage`)
  const [messageSent, setMessageSent] = useState();
  function handleSendAMessage() {
    const newMessage = {
      senderId: user.username,
      recieverId: currentChat.username,
      timeSent: new Date(),
      message: messageSent,
    };
    setCurrentChat({
      ...currentChat,
      messages: [...currentChat.messages, newMessage],
    });
    setMessageSent("");
    sendMessage(newMessage);
  }

  return (
    <>
      <div className="home-navbar">
        <CommonNavbar />
      </div>
      <div className={styles.container}>
        <div className={styles.sidebar}>
          <h2 className={styles.title}>Messages</h2>
          {/* <input className={styles.search} placeholder="Search..." /> */}
          {messagedUsers &&
            allMembers &&
            messagedUsers.map((user, index) => (
              <div
                key={index}
                className={styles.user}
                onClick={() => {
                  handleDisplayChat(user);
                }}
              >
                <img
                  src={`${url}/${
                    allMembers.find((member) => {
                      return member.username === user;
                    }).pfpPath
                  }`}
                  alt={user}
                  className={styles.userImage}
                />
                <span className={styles.userName}>{user}</span>
              </div>
            ))}
        </div>
        <div className={styles.chat}>
          {currentChat && (
            <>
              <div className={styles.chatHeader}>
                <div className={styles.chatHeaderInfo}>
                  <img
                    src={currentChat.pfp}
                    alt={currentChat.fullName}
                    className={styles.userImage}
                  />
                  <span className={styles.chatHeaderName}>
                    {currentChat.name}
                  </span>
                </div>
                <span className={styles.chatInfo}>i</span>
              </div>
              <div className={styles.chatMessages}>
                {currentChat.messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`${styles.message} ${
                      msg.senderId === user.username
                        ? styles.userMessage
                        : styles.otherMessage
                    }`}
                  >
                    <div className={styles.messageText}>{msg.message}</div>
                  </div>
                ))}
              </div>
              <div className={styles.chatInput}>
                <input
                  type="text"
                  className={styles.inputField}
                  placeholder="message..."
                  onChange={(e) => {
                    setMessageSent(e.target.value);
                  }}
                  value={messageSent}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSendAMessage();
                  }}
                />
                <button
                  className={styles.sendButton}
                  onClick={handleSendAMessage}
                >
                  send
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Messages;
