import React from 'react';
import {chatState} from '../../Context/chatProvider';
import {Box} from '@chakra-ui/react';
import SingleChat from '../SingleChat';

const ChatBox = ({fetchAgian,setFetchAgain}) => {
  const {selectedChat} = chatState();
  return (
    <Box
    display={{base:selectedChat ? "flex" : "none",md:"flex"}}
    alignItems="center"
    flexDir="column"
    p={2}
    bg="white"
    w={{base:"100%",md:"68%"}}
    borderRadius="lg"
    borderWidth="1px"
    >
      <SingleChat fetchAgian={fetchAgian}setFetchAgain={setFetchAgain}/>
    </Box>
  )
}

export default ChatBox