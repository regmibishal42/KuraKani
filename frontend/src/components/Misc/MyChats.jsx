import React, {useEffect, useState} from 'react';
import {
    Box,
    Button,
    Stack,
    useToast,
    Text
} from '@chakra-ui/react';
import {chatState} from '../../Context/chatProvider';
import axios from 'axios';
import {BiCommentAdd} from 'react-icons/bi';
import ChatLoading from '../chatLoading';
import {getSender} from '../../config/chatLogics';
import GroupChatModel from '../Misc/GroupChatModel';


const MyChats = ({fetchAgain}) => {
    const {
        user,
        setSelectedChat,
        chats,
        setChats,
        selectedChat
    } = chatState();
    const [loggedUser, setLoggedUser] = useState();
    const toast = useToast();

    const fetchChats = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${
                        user.token
                    }`
                }
            }
            const {data} = await axios.get('http://localhost:3000/api/chat', config);
            // console.log(data);
            setChats(data);

        } catch (error) {
            toast({
                title: 'Error Occured',
                description: "Failed To Load The Chats",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left"
            });
        }
    }

    useEffect(() => {
        setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
        fetchChats();
    }, [fetchAgain])
    return (
        <Box display={
                {
                    base: selectedChat ? "none" : "flex",
                    md: "flex"
                }
            }
            flexDir="column"
            alignItems="center"
            p={3}
            bg="white"
            h="100%"
            w={
                {
                    base: "100%",
                    md: "31%"
                }
            }
            borderRadius="lg"
            borderWidth="1px">
            <Box pb={3}
                px={3}
                fontSize={
                    {
                        base: "28px",
                        md: "30px"
                    }
                }
                fontFamily="Work sans"
                display="flex"
                w="100%"
                justifyContent="space-between"
                alignItems="center">
                My Chats
                <GroupChatModel>
                    <Button display="flex"
                        fontSize={
                            {
                                base: "17px",
                                md: "10px",
                                lg: "17px"
                            }
                        }
                        rightIcon={<BiCommentAdd/>}>New Group Chat</Button>
                </GroupChatModel>
            </Box>
            <Box display="flex" flexDir="column"
                p={3}
                bg="#f8f8f8"
                w="100%"
                h="100%"
                borderRadius="lg"
                overflowY="hidden">
                {
                chats ? (
                    <Stack overflowY='scroll'>
                        {
                        chats.map((chat) => (
                            <Box onClick={
                                    () => setSelectedChat(chat)
                                }
                                cursor="pointer"
                                bg={
                                    selectedChat === chat ? "#38b2ac" : "#e8e8e8"
                                }
                                color={
                                    selectedChat === chat ? "white" : "black"
                                }
                                px={3}
                                py={2}
                                borderRadius="lg"
                                key={
                                    chat._id
                            }>
                                <Text> {
                                    !chat.isGroupChat ? getSender(loggedUser, chat.users) : chat.chatName
                                } </Text>
                            </Box>
                        ))
                    } </Stack>
                ) : (
                    <ChatLoading/>)
            } </Box>
        </Box>
    )
}

export default MyChats;
