import React, {useState} from 'react';
import {
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalOverlay,
    Button,
    ModalHeader,
    ModalCloseButton,
    FormControl,
    Input,
    Box
} from '@chakra-ui/react';
import {useDisclosure, useToast} from '@chakra-ui/react';
import {chatState} from '../../Context/chatProvider';
import axios from 'axios';
import UserListItem from '../Users/UserListItem';
import UserBadgeItem from '../Users/UserBadgeItem';

const GroupChatModel = ({children}) => {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const [groupChatName, setGroupChatName] = useState();
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const {user, chats, setChats} = chatState();

    const handleSearch = async (query) =>{
        setSearch(query);
        if(!query) return;
        try {
            setLoading(true);
            const config = {
                headers: {
                    Authorization: `Bearer ${
                        user.token
                    }`
                }
            };
            const {data} = await axios.get(`http://localhost:3000/api/user?search=${search}`,config);
            console.log('Data From Group Chat Model',data);
            setLoading(false);
            setSearchResults(data);
        } catch (error) {
            toast({
                title:"Error Occured",
                description:"Failed tl load the Search Results",
                status:'error',
                duration:5000,
                isClosable:true,
                position:"bottom-left" 
            });
        }
    }
    const handleSubmit = async () =>{
        if(!groupChatName || !selectedUsers){
            console.log('Submit Handler IF Statement')
            toast({
                title: "Please fill all the feilds",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top",
            });
            return;
        }
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${
                        user.token
                    }`
                }
            };
            const {data} = await axios.post(`http://localhost:3000/api/chat/group`,{
                name:groupChatName,
                users:JSON.stringify(selectedUsers.map((u)=>u._id))
            },config);
            setChats([data,...chats]);
            onClose();
            toast({
                title:"New Group Chat Created",
                status:"success",
                duration:5000,
                isClosable:true,
                position:"bottom"
            });

            
        } catch (error) {
            console.log(error);
            toast({
                title:"Error Occured",
                description: error.response.data,
                status:'error',
                duration:5000,
                isClosable:true,
                position:"bottom" 
            });
        }
    }
    const handleDelete = (userToDelete) => {
        setSelectedUsers(selectedUsers.filter((sel)=>sel._id !== userToDelete._id));
    }
    const handleGroup = (userToAdd) => {
        if(selectedUsers.includes(userToAdd)){
            toast({
                title:"User Already Added",
                status:'warning',
                duration:5000,
                isClosable:true,
                position:"bottom-left" 
            });
            return;
        }
        setSelectedUsers([...selectedUsers,userToAdd]);
    }

    return (
        <>
            <span onClick={onOpen}>
                {children}</span>
            <Modal isOpen={isOpen}
                onClose={onClose}>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader fontSize="35px" fontFamily="Work sans" display="flex" justifyContent="center">Create Group Chat
                    </ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody display="flex" flexDir="column" alignItems="center">
                        <FormControl>
                            <Input placeholder='Chat Name' mb={3} onChange={(e)=>setGroupChatName(e.target.value)}/>
                        </FormControl>
                        <FormControl>
                            <Input placeholder='Add Users' mb={1} onChange={(e)=>handleSearch(e.target.value)}/>
                        </FormControl>
                        {/* Selected Users */}
                        <Box w="100%" display="flex" flexWrap="wrap">

                        {selectedUsers.map((u)=>(
                            <UserBadgeItem key={u._id} user={u} handleFunction={()=>handleDelete(user)} />
                            ))}

                            </Box>

                        {loading ? <div>loading</div> : (
                            searchResults?.slice(0,4).map((user)=>(
                                <UserListItem  key={user._id} user={user} handleFunction={()=>handleGroup(user)}/>
                            ))
                        )}
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue'
                            onClick={handleSubmit}>
                            Create Chat
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>

    )
}

export default GroupChatModel;
