import React from 'react'
import { chatState } from '../../Context/chatProvider';

const MyChats = () => {
  const {user,setSelectedChat,chats,setChats} = chatStatetate();
  return (
    <div>MyChats</div>
  )
}

export default MyChats