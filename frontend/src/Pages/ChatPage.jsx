import React,{useState} from 'react';
import { chatState } from '../Context/chatProvider';
import { Box } from '@chakra-ui/react';
import SideDrawer from '../components/Misc/SideDrawer';
import MyChats from '../components/Misc/MyChats';
import ChatBox from '../components/Misc/ChatBox';

const ChatPage = () => {
  const [fetchAgain,setFetchAgain] = useState(false);
  const {user} = chatState();
  return (
    <div style={{width:"100%"}}>
       {user && <SideDrawer />}
      <Box
      display="flex"
      justifyContent="space-between"
      w="100%"
      h="91.5vh"
      p="10px"
      >
        {user && <MyChats fetchAgain={fetchAgain}/>}
        {user && <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>}

      </Box>
    </div>
  )
}

export default ChatPage;
