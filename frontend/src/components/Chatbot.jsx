import ActionProvider from "../utils/ActionProvider";
import MessageParser from "../utils/MessageParser";
import config from "../utils/config";
import "react-chatbot-kit/build/main.css";
import Chatbot from "react-chatbot-kit";
import { Box, Button, Fade, Tooltip, Typography } from "@mui/material";
import { useState } from "react";
import { ChatBubbleRounded, Close } from "@mui/icons-material";

export default function ChatBot() {
  const [clicked, setClicked] = useState(false);

  // const saveMessages = (messages, HTMLString) => {
  //   localStorage.setItem("chat_messages", JSON.stringify(messages));
  // };

  // const loadMessages = () => {
  //   const messages = JSON.parse(localStorage.getItem("chat_messages"));
  //   return messages;
  // };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "end",
        position: "fixed",
        bottom: "40px",
        right: "40px",
        zIndex: 9999,
      }}
    >
      {clicked && (
        <Fade timeout={400} in={clicked}>
          <Box>
            <Chatbot
              config={config}
              actionProvider={ActionProvider}
              messageParser={MessageParser}
              // saveMessages={saveMessages}
              // messageHistory={loadMessages()}
              headerText={
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingLeft: 1,
                    width: "100%",
                  }}
                >
                  <Typography sx={{ display: "flex", alignItems: "center" }}>
                    Ask Fungus &#127812;
                  </Typography>
                  <Button onClick={() => setClicked((prev) => !prev)}>
                    <Close sx={{ color: "#313131" }} />
                  </Button>
                </Box>
              }
            />{" "}
          </Box>
        </Fade>
      )}

      <Button
        sx={{
          marginTop: 2,
          width: "56px",
          height: "60px",
          borderRadius: "50%",
          backgroundColor: "#ff6d75",
          "&:hover": {
            backgroundColor: "#ff8c94",
          },
        }}
        onClick={() => setClicked((prev) => !prev)}
      >
        <Tooltip title="Ask bot">
          <ChatBubbleRounded sx={{ color: "white" }} />
        </Tooltip>
      </Button>
    </Box>
  );
}
