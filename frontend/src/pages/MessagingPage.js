import React, { useState } from 'react';
import MessageList from '../components/MessageList';
import SendMessage from '../components/SendMessage';

const MessagingPage = ({ userId }) => {
  const currentUserId = /* Retrieve the logged-in user's ID from your auth system */;

  return (
    <div>
      <h1>Messages</h1>
      <MessageList userId={userId} currentUserId={currentUserId} />
      <SendMessage receiverId={userId} onMessageSent={() => console.log('Message sent')} />
    </div>
  );
};

export default MessagingPage;
