import { useEffect, useState } from "react";
import { useRef } from "react";
import "./Chatbox.css";
import { format } from "timeago.js";
import InputEmoji from "react-input-emoji";
import PropTypes from "prop-types";
import {
  useAddMessagesMutation,
  useGetMessagesMutation,
  useGetUserMutation,
} from "../../Slices/chatApiSlice";

const ChatBox = ({ chat, currentUser, setSendMessage, receivedMessage }) => {
  const [getMessages] = useGetMessagesMutation();
  const [addMessage] = useAddMessagesMutation();
  const [getUser] = useGetUserMutation();
  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const handleChange = (newMessage) => {
    setNewMessage(newMessage);
  };

  // fetching data for header
  useEffect(() => {
      const userId = chat?.members?.find((id) => id !== currentUser);
    const getUserData = async () => {
      try {
        const { data } = await getUser(userId);
        setUserData(data);
      } catch (error) {
        console.log(error);
      }
    };

    if (chat !== null) getUserData();
  }, [chat, currentUser]);

  // fetch messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await getMessages(chat._id);
        setMessages(data);
      } catch (error) {
        console.log(error);
      }
    };

    if (chat !== null) fetchMessages();
  }, [chat]);

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Send Message
  const handleSend = async (e) => {
    e.preventDefault();
    const message = {
      senderId: currentUser,
      text: newMessage,
      chatId: chat._id,
    };
    const receiverId = chat.members.find((id) => id !== currentUser);
    // send message to socket server
    setSendMessage({ ...message, receiverId });
    // send message to database
    try {
      const { data } = await addMessage(message);
      setMessages([...messages, data]);
      setNewMessage("");
    } catch {
      console.log("error");
    }
  };

  // Receive Message from parent component
  useEffect(() => {
    if (receivedMessage !== null && receivedMessage.chatId === chat._id) {
      setMessages([...messages, receivedMessage]);
    }
  }, [receivedMessage]);

  const scroll = useRef();
  const imageRef = useRef();
  return (
    <>
      <div className="grid  grid-rows-[14vh,68vh,13vh] rounded-md overflow-hidden">
        {chat ? (
          <>
            {/* chat-header */}
            <div className="flex flex-col p-4 bg-white">
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0">
                  <img
                    src={
                      userData?.userDetails?.profilephoto ||userData?.instructorDetails?.profilephoto||
                      "https://cdn1.iconfinder.com/data/icons/instagram-ui-colored/48/JD-17-512.png"
                    }
                    alt="Profile"
                    className="w-12 h-12 rounded-full"
                  />
                </div>
                <div className="text-sm">
                  <span className="font-bold text-gray-800">
                    {userData?.userDetails?.name ||
                      userData?.instructorDetails?.name}
                  </span>
                </div>
              </div>
              <hr className="w-11/12 border-t border-gray-300 mt-4" />
            </div>
            {/* chat-body */}
            <div className="flex flex-col gap-2 p-6 overflow-auto bg-gray-50">
              {messages.map((message, index) => (
                <div
                  key={index}
                  ref={scroll}
                  className={
                    message.senderId === currentUser
                      ? "message own bg-blue-500 text-white"
                      : "message bg-gray-200 text-gray-800"
                  }
                >
                  <span>{message.text}</span>{" "}
                  <span className="text-xs text-gray-500 self-end">
                    {format(message.createdAt)}
                  </span>
                </div>
              ))}
            </div>
            {/* chat-sender */}
            <div className="flex justify-between items-center bg-white rounded p-2">
              {/* <div
                onClick={() => imageRef.current.click()}
                className="bg-gray-200 rounded-full flex items-center justify-center font-bold cursor-pointer text-gray-800"
              >
                +
              </div> */}
              <InputEmoji
                value={newMessage}
                onChange={handleChange}
                className="flex-1 h-70% bg-gray-300 rounded px-4"
              />
              <div
                className="button p-2 cursor-pointer bg-blue-900 text-white"
                onClick={handleSend}
              >
                Send
              </div>
              <input
                type="file"
                name=""
                id=""
                style={{ display: "none" }}
                ref={imageRef}
              />
            </div>{" "}
          </>
        ) : (
          <span className="chatbox-empty-message text-center text-gray-500">
            Tap on a chat to start a conversation...
          </span>
        )}
      </div>
    </>
  );
};

ChatBox.propTypes = {
  chat: PropTypes.object, // You can specify the shape of the object if needed
  currentUser: PropTypes.string.isRequired,
  setSendMessage: PropTypes.func.isRequired,
  receivedMessage: PropTypes.object, // You can specify the shape of the object if needed
};

export default ChatBox;
