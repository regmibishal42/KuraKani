import React, {useState,useEffect} from 'react'
import {Box, FormControl, IconButton, Input, Spinner, Text,useToast} from '@chakra-ui/react';
import {chatState} from '../Context/chatProvider';
import {BsFillArrowLeftCircleFill} from 'react-icons/bs';
import {getSender, getSenderDetails} from '../config/chatLogics';
import ProfileModel from './Misc/ProfileModel';
import UpdateGroupChatModal from './Misc/UpdateGroupChatModal';
import ScrollableChat from './ScrollableChat';
import axios from 'axios';
import './styles.css';
import io from 'socket.io-client';

const ENDPOINT = "http://localhost:3000";
let socket,selectedChatCompare;

const SingleChat = ({fetchAgian, setFetchAgain}) => {
    const {user, selectedChat, setSelectedChat} = chatState()
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [newMessage, setNewMessage] = useState();
    const [socketConnected,setSocketConnected] = useState(false);
    const toast = useToast();

    const fetchMessages = async () =>{
        if(!selectedChat) return;
        try {
            const config = {
                headers:{
                    Authorization:`Bearer ${user.token}`
                }
            };
            setLoading(true);
            const {data} = await axios.get(`http://localhost:3000/api/message/${selectedChat._id}`,config);
            setMessages(data);
            setLoading(false);
            socket.emit("join chat",selectedChat._id);

        } catch (error) {
            toast({
                title:"Error Ocuured",
                description:"Failed to load the message",
                status:"error",
                duration:5000,
                isClosable:true,
                position:"bottom"
            });
        }
    }

    const sendMessage = async(e) =>{
        if(e.key === "Enter"&& newMessage){
            try {
                const config = {
                    headers:{
                        "Content-type":"application/json",
                        Authorization:`Bearer ${user.token}`
                    }
                }
                setNewMessage("");
                const {data} = await axios.post('http://localhost:3000/api/message',{
                     content:newMessage,
                     chatId:selectedChat._id
                },config );
                // console.log(data);
                socket.emit("new message",data);
                setMessages([...messages,data]);
            } catch (error) {
                toast({
                    title:"Error Ocuured",
                    description:"Failed to send the message",
                    status:"error",
                    duration:5000,
                    isClosable:true,
                    position:"bottom"
                });
            }
        }
    };

    const typingHandler = (e) =>{
        setNewMessage(e.target.value);
        // Typing message Indicator
    }
    useEffect(()=>{
        socket = io(ENDPOINT);
        socket.emit("setup",user);
        socket.on("connection",()=>setSocketConnected(true));
    },[]);

    useEffect(()=>{
        fetchMessages();
        selectedChatCompare = selectedChat;
    },[selectedChat]);
    
    useEffect(()=>{
        socket.on("message received",(newMessageReceived)=>{
            if(!selectedChatCompare || selectedChatCompare._id !== newMessageReceived.chat._id){
                // give notification
            }else{
                setMessages([...messages,newMessageReceived]);
            }
        })
    })

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
                            <> {
                                getSender(user, selectedChat.users)
                            }
                                <ProfileModel user={
                                    getSenderDetails(user, selectedChat.users)
                                }/>
                            </>
                        ) : (
                            <> {
                                selectedChat.chatName.toUpperCase()
                            }
                                <UpdateGroupChatModal fetchAgian={fetchAgian}
                                    setFetchAgain={setFetchAgain}
                                    fetchMessages={fetchMessages}
                                    />
                            </>
                        )
                    } </Text>
                    <Box display="flex" flexDir="column" justifyContent="flex-end"
                        p={3}
                        bg="#E8E8E8"
                        w="100%"
                        h="100%"
                        borderRadius="lg"
                        overflowY="hidden">
                      
                        {
                        loading ? (
                            <Spinner size="xl"
                                w={20}
                                h={20}
                                alignSelf="center"
                                margin="auto"/>
                        ) : (
                            <>
                            <div className='messsages'>
                                <ScrollableChat messages={messages}/>
                            </div>
                            </>
                        )}
                        <FormControl onKeyDown={sendMessage} isRequired mt={3}>
                            <Input 
                            variant="filled"
                            bg="#e0e0e0"
                            placeholder="Enter a message..."
                            onChange={typingHandler}
                            value={newMessage}
                            />
                        </FormControl>
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
