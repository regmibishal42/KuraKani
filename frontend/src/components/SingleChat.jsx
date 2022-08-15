import React from 'react'
import {Box, IconButton, Text} from '@chakra-ui/react';
import {chatState} from '../Context/chatProvider';
import {BsFillArrowLeftCircleFill} from 'react-icons/bs';
import {getSender,getSenderDetails} from '../config/chatLogics';
import  ProfileModel from './Misc/ProfileModel';
import UpdateGroupChatModal from './Misc/UpdateGroupChatModal';

const SingleChat = ({fetchAgian, setFetchAgain}) => {
    const {user, selectedChat, setSelectedChat} = chatState()
    return (
        <> {
            selectedChat ? (
                <>
                    <Text fontSize={
                            {
                                base: "28px",
                                md: "30px"
                            }
                        }
                        pb={3}
                        px={2}
                        w="100%"
                        fontFamily="Work Sans"
                        display="flex"
                        justifyContent={
                            {base: "space-between"}
                        }
                        alignItems="center">
                        <IconButton display={
                                {
                                    base: "flex",
                                    md: "none"
                                }
                            }
                            icon={<BsFillArrowLeftCircleFill/>}
                            onClick={
                                () => setSelectedChat("")
                            }/> {
                        !selectedChat.isGroupChat ? (
                            <>
                            {getSender(user,selectedChat.users)}
                            <ProfileModel user={getSenderDetails(user,selectedChat.users)}/>
                            </>
                        ) : (
                            <> {
                                selectedChat.chatName.toUpperCase()
                            }
                                <UpdateGroupChatModal fetchAgian={fetchAgian} setFetchAgain={setFetchAgain}/> </>
                        )
                    } </Text>
                    <Box
                    display="flex"
                    flexDir="column"
                    justifyContent="flex-end"
                    p={3}
                    bg="#E8E8E8"
                    w="100%"
                    h="100%"
                    borderRadius="lg"
                    overflowY="hidden"
                    >
                        {/* Messages Here */}
                    </Box>
                </>
            ) : (
                <Box display="flex" alignItems="center" justifyContent="center" h="100%">
                    <Text fontSize="3xl"
                        pb={3}
                        fontFamily="Work sans">
                        Click on user to start chatting
                    </Text>
                </Box>
            )
        } </>
    )
}

export default SingleChat;
