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
  border-radius: 8px;
  font-size: 16px;
  padding: 8px;
`;

const NewMessageForm = ({
  onSubmit = () => {},
  primaryColor,
  primaryTextColor,
}) => {
  const [newMessage, setNewMessage] = useState('');

  const submitForm = () => {
    onSubmit(newMessage);
    setNewMessage('');
  }

  return (
    <Form>
      <NewMessageInput
        value={newMessage}
        onChange={e => setNewMessage(e.target.value)}
        onKeyDown={e => {
          if (e.key === 'Enter') {
            submitForm();
          }
        }} />
      <SendButton
        className='chatbot-primary'
        onClick={submitForm}>Send</SendButton>
    </Form>
  );
}

export default NewMessageForm;