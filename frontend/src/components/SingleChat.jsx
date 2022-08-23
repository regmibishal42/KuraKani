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
import Lottie from "react-lottie";
import animationData from '../animations/typing.json';
 
const ENDPOINT = "https://kuraakani.herokuapp.com/";
let socket,selectedChatCompare;

const SingleChat = ({fetchAgain, setFetchAgain}) => {
    const {user, selectedChat, setSelectedChat,notification,setNotification} = chatState()
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [newMessage, setNewMessage] = useState("");
    const [socketConnected,setSocketConnected] = useState(false);
    const [typing,setTyping] = useState(false);
    const [isTyping,setIsTyping] = useState(false);
    const toast = useToast();

    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
      },
    };


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

    const sendMessage = async(event) =>{
        if(event.key === "Enter" && newMessage) {
            socket.emit('stop typing',selectedChat._id);
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
                console.log('Error while sending 1');
                socket.emit("new message",data);
                console.log('Error while sending 2');
                setMessages([...messages,data]);
                console.log('Error while sending 3');
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

    useEffect(()=>{
        socket = io(ENDPOINT);
        socket.emit("setup",user);
        socket.on("connected",()=>setSocketConnected(true));
        socket.on('typing',()=>setIsTyping(true));
        socket.on('stop typing',()=>setIsTyping(false));
    },[]);

    useEffect(()=>{
        fetchMessages();
        selectedChatCompare = selectedChat;
    },[selectedChat]);
    
    useEffect(()=>{
        socket.on("message received",(newMessageReceived)=>{
          // if chat is not selected or doesn't match current chat
            if(!selectedChatCompare || selectedChatCompare._id !== newMessageReceived.chat._id){
                // give notification
              if(!notification.includes(newMessageReceived)){
                setNotification([newMessageReceived,...notification]);
                setFetchAgain(!fetchAgain);
              }
            }else{
                setMessages([...messages,newMessageReceived]);
            }
        });
    });

    const typingHandler = (e) =>{
        setNewMessage(e.target.value);
        // Typing message Indicator
        if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
    }


    return (
        <>
        {selectedChat ? (
          <>
            <Text
              fontSize={{ base: "28px", md: "30px" }}
              pb={3}
              px={2}
              w="100%"
              fontFamily="Work sans"
              display="flex"
              justifyContent={{ base: "space-between" }}
              alignItems="center"
            >
              <IconButton
                display={{ base: "flex", md: "none" }}
                icon={<BsFillArrowLeftCircleFill />}
                onClick={() => setSelectedChat("")}
              />
              {messages &&
                (!selectedChat.isGroupChat ? (
                  <>
                    {getSender(user, selectedChat.users)}
                    <ProfileModel
                      user={ getSenderDetails(user, selectedChat.users)}
                    />
                  </>
                ) : (
                  <>
                    {selectedChat.chatName.toUpperCase()}
                    <UpdateGroupChatModal
                      fetchMessages={fetchMessages}
                      fetchAgain={fetchAgain}
                      setFetchAgain={setFetchAgain}
                    />
                  </>
                ))}
            </Text>
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
              {loading ? (
                <Spinner
                  size="xl"
                  w={20}
                  h={20}
                  alignSelf="center"
                  margin="auto"
                />
              ) : (
                <div className="messages">
                  <ScrollableChat messages={messages} />
                </div>
              )}
  
              <FormControl
                onKeyDown={sendMessage}
                id="first-name"
                isRequired
                mt={3}
              >
                {isTyping ? (
                  <div>
                    <Lottie
                    options={defaultOptions}
                    // height={50}
                    width={70}
                    style={{ marginBottom: 15, marginLeft: 0 }}
                  />
                  </div>
                ) : (
                  <></>
                )}
                <Input
                  variant="filled"
                  bg="#E0E0E0"
                  placeholder="Enter a message.."
                  value={newMessage}
                  onChange={typingHandler}
                />
              </FormControl>
            </Box>
          </>
        ) : (
          // to get socket.io on same page
          <Box display="flex" alignItems="center" justifyContent="center" h="100%">
            <Text fontSize="3xl" pb={3} fontFamily="Work sans">
              Click on a user to start chatting
            </Text>
          </Box>
        )}
      </>
    );
};

export default SingleChat;
