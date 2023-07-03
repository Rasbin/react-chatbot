import { useState } from 'react';
import styled from 'styled-components';

const Form = styled.div`
  display: flex;
  background-color: white;
  padding-top: 8px;
  border-top: 1px solid #ccc;
`;

const NewMessageInput = styled.input`
  flex: 1;
  border-radius: 8px;
  font-size: 16px;
  padding: 8px;
  margin-right: 4px;
`;

const SendButton = styled.button`
  background-color: grey;
  color: white;
  border-radius: 8px;
  font-size: 16px;
  padding: 8px;
`;

const NewMessageForm = ({ onSubmit = () => {} }) => {
  const [newMessage, setNewMessage] = useState('');

  const submitForm = () => {
    onSubmit(newMessage);
    setNewMessage('');
  }

  return (
    <Form>
      <NewMessageInput
        value={newMessage}
        onChange={e => setNewMessage(e.target.value)} />
      <SendButton onClick={submitForm}>Send</SendButton>
    </Form>
  );
}

export default NewMessageForm;