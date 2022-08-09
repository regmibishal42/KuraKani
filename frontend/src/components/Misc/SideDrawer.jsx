import React, {useState} from 'react';
import {
    Box,
    Button,
    Tooltip,
    Text,
    Menu,
    MenuButton,
    MenuList,
    Avatar,
    MenuItem,
    MenuDivider,
    Drawer,
    DrawerOverlay,
    DrawerContent,
    DrawerHeader,
    DrawerBody,
    Input,
    useToast
} from '@chakra-ui/react';
import {AiOutlineSearch, AiFillBell} from 'react-icons/ai';
import {BsChevronBarDown} from 'react-icons/bs';
import {chatState} from '../../Context/chatProvider';
import ProfileModel from './ProfileModel';
import {useNavigate} from 'react-router-dom';
import {useDisclosure} from '@chakra-ui/hooks';
import axios from 'axios';
import ChatLoading from '../chatLoading';
import UserListItem from '../Users/UserListItem.jsx';

const SideDrawer = () => {
    const {user,setSelectedChat,chats,setChats} = chatState();
    const naviagte = useNavigate();
    const {isOpen, onOpen, onClose} = useDisclosure();

    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingChat, setLoadingChat] = useState();
    const toast = useToast()

    const logoutHandler = () => {
        localStorage.removeItem("userInfo");
        console.log("Logged Out");
        naviagte('/');
    };
    const handleSearch = async () => {
        if (!search) {
            toast({
                title: "Please Enter Something in Search",
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: "top-left"

            });
            return;
        }
        try {
            setLoading(true);
            const config = {
                headers: {
                    Authorization: `Bearer ${
                        user.token
                    }`
                }
            };
            const {data} = await axios.get(`http://localhost:3000/api/user?search=${search}`, config);
            setLoading(false);
            setSearchResult(data);
        } catch (error) {
            toast({
                title: "Error Occured",
                description: "Failed to Load the Search Results",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left"
            });
        }
    }

    const accessChat = async (userId) =>{
        try {
            setLoadingChat(true);
            const config = {
                headers: {
                    "Content-type":'application/json',
                    Authorization: `Bearer ${
                        user.token
                    }`
                }
            };
        const {data} = await axios.post("http://localhost:3000/api/chat",{userId},config);
        setSelectedChat(data) 
        setLoadingChat(false);
        onClose();

        } catch (error) {
          toast({
            title: "Error Fetching Chats",
            description: error.message,
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom-left"
          })  
        }
    }

    return (
        <>
            <Box display='flex' justifyContent='space-between' alignItems='center' bg='white' w='100%' p='5px 13px 5px 10px' borderWidth='5px'>
                <Tooltip label='Search Users to Chat' hasArrow placement='bottom-end'>
                    <Button varient='ghost'
                        onClick={onOpen}>
                        <AiOutlineSearch/>
                        <Text d={
                                {
                                    base: "none",
                                    md: 'flex'
                                }
                            }
                            px='4'></Text>
                    </Button>
                </Tooltip>
                <Text fontSize="2xl" fontFamily="Work sans">
                    Kura-Kani
                </Text>
                <div>
                    <Menu>
                        <MenuButton p={2}>
                            <AiFillBell size="1.5em"
                                style={
                                    {marginTop: "3px"}
                                }/>
                        </MenuButton>
                        {/* For Notification */}
                        {/* <MenuList></MenuList> */} </Menu>
                    <Menu>
                        <MenuButton as={Button}
                            p={1}
                            rightIcon={<BsChevronBarDown/>}>
                            <Avatar size='sm' cursor='pointer'
                                name={
                                    user.name
                                }
                                src={
                                    user.profile
                                }/>
                        </MenuButton>
                        <MenuList>
                            <MenuItem>
                                <ProfileModel user={user}>My Profile</ProfileModel>
                            </MenuItem>
                            <MenuDivider/>
                            <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                        </MenuList>
                    </Menu>

                </div>
            </Box>
            {/* Search Users Drawer from Side */}
            <Drawer placement='left'
                onClose={onClose}
                isOpen={isOpen}>
                <DrawerOverlay/>
                <DrawerContent>
                    <DrawerHeader>Search User</DrawerHeader>
                    <DrawerBody>
                        <Box display="flex"
                            pb={2}>
                            <Input placeholder="Search by name or email"
                                mr={2}
                                value={search}
                                onChange={
                                    (e) => setSearch(e.target.value)
                                }/>
                            <Button onClick={handleSearch}>Search</Button>
                        </Box>
                        {
                        loading ? (
                            <ChatLoading/>) : (searchResult ?. map(user => (
                            <UserListItem key={
                                    user._id
                                }
                                user={user}
                                handleFunction={
                                    () => accessChat(user._id)
                                }/>
                        )))
                    } </DrawerBody>
                </DrawerContent>

            </Drawer>
        </>
    )
}

export default SideDrawer;
