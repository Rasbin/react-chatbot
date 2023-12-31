import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import socketIoClient from 'socket.io-client';
import { fakeMessages } from './fake-messages';
import FloatingButton from './FloatingButton';
import MessageList from './MessagesList';
import NewMessageForm from './NewMessageForm';

const FloatingWindow = styled.div`
    position: absolute;
    right: 0;
    bottom: 80px;

    background-color: white;
    color: black;
    border-radius: 8px;
    box-shadow: 0px 5px 15px black;
    width: 350px;
    height: 400px;
    display: flex;
    flex-direction: column;
    z-index: 2;
    padding: 8px;
`;

const FloatingContainer = styled.div`
  position: fixed;
  bottom: 32px;
  right: 32px;
`;

const MessagesSection = styled.div`
  overflow: auto;
  padding: 8px;
  padding-bottom: 20px;
  flex: 1;
`;

const Chatbot = () => {
  const [isTyping, setIsTyping] = useState(false);
  const [otherName, setOtherName] = useState('');
  const [messages, setMessages] = useState([]);
  const [windowIsOpen, setWindowIsOpen] = useState(false);
  const [socket, setSocket] = useState(null);

  const bottomOfMessagesRef = useRef(null);

  const scrollToBottom = () => {
    bottomOfMessagesRef.current?.scrollIntoView();
  }

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const chatbotId = localStorage.getItem('chatbot-id');

    const newSocket = socketIoClient('http://127.0.0.1:8080', {
      query: {
        id: chatbotId,
      }
    });
    setSocket(newSocket);

    return  () => {
      newSocket.disconnect();
    }
  }, []);

  const markMessagesAsRead = () => {
    socket?.emit('MARK_ALL_AS_READ');
  }

  useEffect(() => {
    socket?.on('ID_ASSIGNED', newId => {
      localStorage.setItem('chatbot-id', newId);
    });

    socket?.on('EXISTING_MESSAGES', messages => {
      setMessages(messages);
      const lastBotMessage = messages.find(message => message.from);
      setOtherName(lastBotMessage ? lastBotMessage.from : 'The agent is typing...');
    });

    socket?.on('GREETING', newMessage => {
      setMessages(messages.concat(newMessage));
      setOtherName(newMessage.from);
    });

    socket?.on('MESSAGE_READ', () => {
      setMessages(messages.map(message => {
        if (message.isUser) {
          return { ...message, isUnread: false };
        }

        return message;
      }));
    });

    socket?.on('IS_TYPING', () => {
      setIsTyping(true);
    });

    socket?.on('NEW_MESSAGE', newMessage => {
      setMessages(messages.concat({
        ...newMessage,
        isUnread: !windowIsOpen,
      }));
      setIsTyping(false);
      markMessagesAsRead();
    });
  }, [socket, messages, windowIsOpen]);

  useEffect(() => {
    if (windowIsOpen) {
      setMessages(messages.map(message => ({
        ...message,
        isUnread: false,
      })))
      markMessagesAsRead();
    }
  }, [windowIsOpen]);

  const unreadMessages = messages.filter(m => m.isUnread && !m.isUser);

  const addNewMessage = ( text ) => {
    const newMessage = {
      text,
      isUser: true,
      isUnread: true,
      sentAt: new Date(),
    };

    scrollToBottom();
    setMessages(messages.concat(newMessage));

    socket?.emit('NEW_MESSAGE', newMessage);
  }

  return (
    <FloatingContainer>
      { windowIsOpen && <FloatingWindow >
          <MessagesSection>
            <MessageList
              messages={messages}
              isTyping={isTyping}
              botName={otherName}
            />
            <div ref={bottomOfMessagesRef}></div>
          </MessagesSection>
          <NewMessageForm onSubmit={addNewMessage} />
        </FloatingWindow>
      }
      <FloatingButton
        onClick = {() => setWindowIsOpen(!windowIsOpen)}
        unreadCount={unreadMessages.length} />
    </FloatingContainer>
  );
}

export default Chatbot;