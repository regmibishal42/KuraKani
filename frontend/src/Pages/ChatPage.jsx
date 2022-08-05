import React from 'react';
import { chatState } from '../Context/chatProvider';
import { Box } from '@chakra-ui/react';
import SideDrawer from '../components/Misc/SideDrawer';
import MyChats from '../components/Misc/MyChats';
import ChatBox from '../components/Misc/ChatBox';

const ChatPage = () => {
  const {user} = chatState();
  return (
    <div style={{width:"100%"}}>
       {user && <SideDrawer />}
      <Box
      d="flex"
      justifyContent="space-between"
      w="100%"
      h="91.5vh"
      p="10px"
      >
        {user && <MyChats />}
        {user && <ChatBox/>}

      </Box>
    </div>
  )
}

export default ChatPage;