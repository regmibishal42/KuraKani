import React,{useState} from 'react';
import {
    useDisclosure,
    Modal,
    ModalBody,
    ModalOverlay,
    ModalContent,
    ModalCloseButton,
    ModalFooter,
    Button,
    IconButton,
    ModalHeader,
    useToast,
    Box,
    FormControl,
    Input
} from '@chakra-ui/react';
import {AiOutlineEye} from 'react-icons/ai';
import { chatState } from '../../Context/chatProvider';
import UserBadgeItem from '../Users/UserBadgeItem';
import axios from 'axios';

const UpdateGroupChatModal = ({fetchAgian, setFetchAgain}) => {
    const {selectedChat,setSelectedChat,user} = chatState();
    const {isOpen, onClose, onOpen} = useDisclosure();
    const toast = useToast();

    const [groupChatName,setGroupChatName] = useState();
    const [search,setSearch] = useState("");
    const [searchResult,setSearchResult] = useState([]);
    const [loading,setLoading] = useState(false);
    const [renameLoading,setRenameLoading] = useState(false);

    const handleRemove = async (userToRemove) =>{

    }
    const handleRename = async (newName) =>{
        if(!groupChatName) return;
        try {
            setRenameLoading(true);
            const config = {
                headers: {
                    Authorization: `Bearer ${
                        user.token
                    }`
                }
            };
            const {data} = await axios.put(`http://localhost:3000/api/chat/rename`,{
                chatId:selectedChat._id,
                chatName:groupChatName
            },config);
            setSelectedChat(data);
            setFetchAgain(!fetchAgian);
            setRenameLoading(false);
            
        } catch (error) {
            toast({
                title:"Error Occured",
                description:error.response.data.message,
                status:"error",
                duration:5000,
                isClosable:true,
                position:"bottom"
            });
            setRenameLoading(false);
        }
        setGroupChatName("");
    }
    const handleSearch = async (query) => {}


    return (
        <>
        <IconButton display={{base:"flex"}} onClick={onOpen} icon={<AiOutlineEye />}>Open Modal</IconButton>
            <Modal isOpen={isOpen}
                onClose={onClose} isCentered>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader
                    fontSize="35px"
                    fontFamily="Work sans"
                    display="flex"
                    justifyContent="center"
                    >{selectedChat.chatName}</ModalHeader>
                    <ModalCloseButton/>
                        <ModalBody>
                            <Box w="100%" display="flex" flexWrap="wrap" pb={3}>
                                {selectedChat.users?.map((u)=>(
                                    <UserBadgeItem
                                    key={u._id}
                                    user={u}
                                    handleFunction={()=>handleRemove(u)} />
                                ))}
                            </Box>
                            <FormControl display="flex">
                                    <Input  
                                        placeholder='Group Chat Name'
                                        mb={3}
                                        value={groupChatName}
                                        onChange={(e)=>setGroupChatName(e.target.value)}
                                        />
                                    <Button
                                        varient="solid"
                                        colorScheme="teal"
                                        ml={1}
                                        isLoading={renameLoading}
                                        onClick={handleRename}
                                    >Update</Button>

                            </FormControl>
                            <FormControl>
                                <Input 
                                placeholder="Add Userss To This Group"
                                mb={1}
                                onChange={(e)=>handleSearch(e.target.value)}
                                />
                            </FormControl>


                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme='red'
                                mr={3}
                                onClick={()=>handleRemove(user)}>
                                Leave Group
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </>
    )
}

export default UpdateGroupChatModal;
