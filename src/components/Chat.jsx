import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { FiSend, FiRefreshCw } from 'react-icons/fi';

// Styled components
const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 80vh;
  max-width: 800px;
  margin: 0 auto;
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const ChatHeader = styled.div`
  background-color: #4a90e2;
  color: white;
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ChatTitle = styled.h2`
  margin: 0;
  font-size: 18px;
`;

const NewChatButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 14px;
  
  &:hover {
    text-decoration: underline;
  }
  
  svg {
    margin-right: 5px;
  }
`;

const MessagesContainer = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

const Message = styled.div`
  max-width: 80%;
  padding: 10px 15px;
  border-radius: 18px;
  margin-bottom: 15px;
  line-height: 1.5;
  font-size: 15px;
  
  ${props => props.isUser ? `
    background-color: #e6f2ff;
    color: #333;
    align-self: flex-end;
    border-bottom-right-radius: 5px;
  ` : `
    background-color: #f0f0f0;
    color: #333;
    align-self: flex-start;
    border-bottom-left-radius: 5px;
  `}
`;

const InputContainer = styled.div`
  display: flex;
  padding: 15px;
  border-top: 1px solid #eee;
`;

const Input = styled.input`
  flex: 1;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 25px;
  font-size: 15px;
  outline: none;
  
  &:focus {
    border-color: #4a90e2;
  }
`;

const SendButton = styled.button`
  background-color: #4a90e2;
  color: white;
  border: none;
  border-radius: 50%;
  width: 45px;
  height: 45px;
  margin-left: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background-color: #3a80d2;
  }
  
  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const TypingIndicator = styled.div`
  align-self: flex-start;
  background-color: #f0f0f0;
  padding: 10px 15px;
  border-radius: 18px;
  margin-bottom: 15px;
  color: #666;
  
  &:after {
    content: '...';
    animation: dots 1.5s steps(5, end) infinite;
  }
  
  @keyframes dots {
    0%, 20% { content: '.'; }
    40% { content: '..'; }
    60%, 100% { content: '...'; }
  }
`;

const ErrorMessage = styled.div`
  color: #e74c3c;
  text-align: center;
  margin: 10px 0;
  padding: 10px;
  background-color: #fdecea;
  border-radius: 5px;
`;

// Main component
const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [conversationId, setConversationId] = useState(null);
  const messagesEndRef = useRef(null);
  
  // API base URL - change this to your backend URL
  const API_BASE_URL = 'https://localhost:5000/api'; // Adjust to your API port
  
  // Start a new conversation when component mounts
  useEffect(() => {
    startNewConversation();
  }, []);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const startNewConversation = async () => {
    setMessages([]);
    setConversationId(null);
    setError('');
    setIsLoading(true);
    
    try {
      const response = await axios.post(`${API_BASE_URL}/chatbot/ask`);
      setConversationId(response.data.id);
      
      // Add welcome message
      if (response.data.messages && response.data.messages.length > 0) {
        setMessages(response.data.messages.map(msg => ({
          text: msg.content,
          isUser: msg.sender.toLowerCase() === 'user'
        })));
      }
    } catch (err) {
      console.error('Error starting conversation:', err);
      setError('Không thể kết nối với chatbot. Vui lòng thử lại sau.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMessage = input.trim();
    setInput('');
    
    // Add user message to chat
    setMessages(prev => [...prev, { text: userMessage, isUser: true }]);
    setIsLoading(true);
    setError('');
    
    try {
      const response = await axios.post(`${API_BASE_URL}/chatbot/chat`, {
        message: userMessage,
        conversationId: conversationId
      });
      
      // Add bot response to chat
      setMessages(prev => [...prev, { text: response.data.response, isUser: false }]);
      
      // Update conversation ID if it's a new conversation
      if (!conversationId && response.data.conversationId) {
        setConversationId(response.data.conversationId);
      }
    } catch (err) {
      console.error('Error sending message:', err);
      setError('Không thể gửi tin nhắn. Vui lòng thử lại sau.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };
  
  return (
    <ChatContainer>
      <ChatHeader>
        <ChatTitle>VF Style Chatbot</ChatTitle>
        <NewChatButton onClick={startNewConversation}>
          <FiRefreshCw size={14} /> Cuộc trò chuyện mới
        </NewChatButton>
      </ChatHeader>
      
      <MessagesContainer>
        {messages.map((message, index) => (
          <Message key={index} isUser={message.isUser}>
            {message.text}
          </Message>
        ))}
        
        {isLoading && <TypingIndicator>Đang nhập</TypingIndicator>}
        
        {error && <ErrorMessage>{error}</ErrorMessage>}
        
        <div ref={messagesEndRef} />
      </MessagesContainer>
      
      <InputContainer>
        <Input
          type="text"
          placeholder="Nhập tin nhắn của bạn..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={isLoading}
        />
        <SendButton onClick={sendMessage} disabled={isLoading || !input.trim()}>
          <FiSend size={18} />
        </SendButton>
      </InputContainer>
    </ChatContainer>
  );
};

export default Chat;