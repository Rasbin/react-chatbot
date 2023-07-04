import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage } from '@fortawesome/free-solid-svg-icons';

const Button = styled.button`
  position: absolute;
  right: 0;
  bottom: 0;
  height: 72px;
  width: 72px;
  border-radius: 50%;
  text-align: center;
  cursor: pointer;
`;

const NotificationBadge = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  height: 16px;
  width: 16px;
  padding: 6px;
  border-radius: 16px;
  background-color: #fa3e3e;
  color: white;
  font-weight: bold;
`;

const FloatingButton = ({
    unreadCount = 0,
    onClick = () => {},
}) => {
  return (
    <Button
      className='chatbot-primary'
      onClick={onClick}
    >
      <FontAwesomeIcon icon={faMessage} size='2x' />
      { unreadCount > 0 && <NotificationBadge>{unreadCount}</NotificationBadge> }
    </Button>
  );
}

export default FloatingButton;