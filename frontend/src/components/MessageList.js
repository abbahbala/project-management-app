import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

const MessageList = ({ userId, currentUserId }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetch(`/api/messages/conversation/${userId}`)
      .then((res) => res.json())
      .then((data) => setMessages(data))
      .catch((error) => console.error('Error fetching messages:', error));

    // Join room
    socket.emit('joinRoom', currentUserId);

    // Listen for incoming messages
    socket.on('receiveMessage', (message) => {
      if (
        (message.senderId === currentUserId && message.receiverId === userId) ||
        (message.senderId === userId && message.receiverId === currentUserId)
      ) {
        setMessages((prevMessages) => [...prevMessages, message]);
      }
    });

    return () => {
      socket.off('receiveMessage');
    };
  }, [userId, currentUserId]);

  return (
    <div>
      {messages.map((message) => (
        <div key={message._id} style={{ textAlign: message.senderId === currentUserId ? 'right' : 'left' }}>
          <p>{message.content}</p>
          <small>{new Date(message.timestamp).toLocaleString()}</small>
        </div>
      ))}
    </div>
  );
};

export default MessageList;
