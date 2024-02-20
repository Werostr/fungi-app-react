import React from "react";

const ActionProvider = ({ createChatBotMessage, setState, children }) => {
  const handleHello = () => {
    const botMessage = createChatBotMessage("Hello");

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  const handlePoisonous = () => {
    const botMessage = createChatBotMessage(
      "Here you have a few examples of poisonous fungi: Amanita phalloides, Amanita muscaria, Galerina marginata, Gyromitra esculenta."
    );

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  const handleError = () => {
    const botMessage = createChatBotMessage(
      "I don't know what you mean, try to ask differently."
    );

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  // Put the handleHello function in the actions object to pass to the MessageParser
  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: {
            handleHello,
            handlePoisonous,
            handleError,
          },
        });
      })}
    </div>
  );
};

export default ActionProvider;
