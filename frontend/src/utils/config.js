import { createChatBotMessage } from "react-chatbot-kit";
import { Avatar } from "@mui/material";

const config = {
  botName: "Fungus",
  initialMessages: [createChatBotMessage(`What would you like to know??`)],
  customStyles: {
    botMessageBox: {
      backgroundColor: "#ff6d75",
    },
    chatButton: {
      backgroundColor: "#ff6d75",
    },
  },
  customComponents: {
    botAvatar: (props) => (
      <Avatar src="https://res.cloudinary.com/dhxufgysz/image/upload/v1708014307/fungiElysium/ujenrebdcttj2hkydrrt.jpg" />
    ),
  },
};

export default config;
