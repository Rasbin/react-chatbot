import styled from 'styled-components';

const Container = styled.div`
  text-align: left;
  display: flex;
  flex-direction: column;
`;

const MessageWrapBase = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px;
`;

const UserMessageWrap = styled(MessageWrapBase)`
  align-items: flex-end;
`;

const NonUserMessageWrap = styled(MessageWrapBase)`
  align-items: flex-start;
`;

const MessageBase = styled.span`
  padding: 8px;
  border-radius: 8px;
  max-width: 75%;
`;

const UserMessage = styled(MessageBase)`
`;

const NonUserMessage = styled(MessageBase)`
`;

const MessageList = ({
  messages,
  isTyping,
  botName,
}) => {
  return (
    <Container>
      { messages.map(message => {
        if (message.isUser) {
          return (
            <UserMessageWrap>
              <UserMessage className='chatbot-primary'>{message.text}</UserMessage>
              { message.isUnread ? null : <div>Read</div> }
            </UserMessageWrap>
          )
        }

        return (
          <NonUserMessageWrap>
            <NonUserMessage className='chatbot-secondary'>{message.text}</NonUserMessage>
          </NonUserMessageWrap>
        )
      }) }
      { isTyping && <div>{botName} is typing...</div> }
    </Container>
  );
}

export default MessageList;