import React, { useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

const SendMessage = ({ receiverId, onMessageSent }) => {
  const [content, setContent] = useState('');

  const handleSend = () => {
    const senderId = /* Retrieve the logged-in user's ID from your auth system */;
    socket.emit('sendMessage', { senderId, receiverId, content });
    setContent('');
    onMessageSent();
  };

  return (
    <div>
      <textarea value={content} onChange={(e) => setContent(e.target.value)} />
      <button onClick={handleSend}>Send</button>
    </div>
  );
};

export default SendMessage;
