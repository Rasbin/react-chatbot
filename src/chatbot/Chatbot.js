import { useState } from 'react';
import styled from 'styled-components';
import { fakeMessages } from './fake-messages';
import FloatingButton from './FloatingButton';
import MessageList from './MessagesList';
import NewMessageForm from './NewMessageForm';

const FloatingWindow = styled.div`
`;

const FloatingContainer = styled.div`
  position: fixed;
  bottom: 32px;
  right: 32px;
`;

const Chatbot = () => {
  const [messages, setMessages] = useState(fakeMessages);
  const [windowIsOpen, setWindowIsOpen] = useState(false);

  const unreadMessages = messages.filter(m => m.isUnread);

  return (
    <FloatingContainer>
      { windowIsOpen && <FloatingWindow >
          <MessageList messages={messages} />
          <NewMessageForm />
        </FloatingWindow>
      }
      <FloatingButton
        onClick = {() => setWindowIsOpen(!windowIsOpen)}
        unreadCount={unreadMessages.length} />
    </FloatingContainer>
  );
}

export default Chatbot;