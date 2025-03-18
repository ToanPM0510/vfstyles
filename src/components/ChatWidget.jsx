import React, { useState } from 'react';
import styled from 'styled-components';
import Chat from './Chat';
import { FiMessageSquare, FiX } from 'react-icons/fi';

const WidgetContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
`;

const ChatButton = styled.button`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #4a90e2;
  color: white;
  border: none;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background-color: #3a80d2;
  }
`;

const ChatWindow = styled.div`
  position: fixed;
  bottom: 90px;
  right: 20px;
  width: 350px;
  height: 500px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  display: ${props => props.isOpen ? 'block' : 'none'};
`;

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleChat = () => {
    setIsOpen(!isOpen);
  };
  
  return (
    <WidgetContainer>
      <ChatButton onClick={toggleChat}>
        {isOpen ? <FiX size={24} /> : <FiMessageSquare size={24} />}
      </ChatButton>
      
      <ChatWindow isOpen={isOpen}>
        <Chat />
      </ChatWindow>
    </WidgetContainer>
  );
};

export default ChatWidget;