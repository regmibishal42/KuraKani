import React,{useState} from 'react';
import {Box, Button, Tooltip,Text, Menu, MenuButton, MenuList, Avatar, MenuItem, MenuDivider} from '@chakra-ui/react';
import {AiOutlineSearch,AiFillBell} from 'react-icons/ai';
import {BsChevronBarDown} from 'react-icons/bs';
import { chatState } from '../../Context/chatProvider';

const SideDrawer = () => {
  const {user} = chatState();
  const [search,setSearch] = useState("");
  const [searchResult,setSearchResult] = useState([]);
  const [loading,setLoading] = useState(false);
  const [loadingChat,setLoadingChat] = useState();

  return (
    <>
    <Box 
    display='flex'
    justifyContent='space-between'
    alignItems='center'
    bg='white'
    w='100%'
    p='5px 13px 5px 10px'
    borderWidth='5px'
    >
        <Tooltip label='Search Users to Chat' hasArrow placement='bottom-end'>
          <Button varient='ghost'>
            <AiOutlineSearch />
            <Text d={{base:"none",md:'flex'}} px='4'></Text>
          </Button>
        </Tooltip>
        <Text fontSize="2xl" fontFamily="Work sans">
          Kura-Kani
        </Text>
        <div>
          <Menu>
            <MenuButton p={2}>
              <AiFillBell size="1.5em" style={{marginTop:"3px"}}/>
            </MenuButton>
            {/* For Notification */}
            {/* <MenuList></MenuList> */}
          </Menu>
          <Menu>
            <MenuButton as={Button} p={1} rightIcon={<BsChevronBarDown/>}>
              <Avatar size='sm' cursor='pointer'name={user.name} src={user.profile}/>
            </MenuButton>
            <MenuList>
            <MenuItem>My Profile</MenuItem>
            <MenuDivider />
            <MenuItem>Logout</MenuItem>
          </MenuList>
          </Menu>

        </div>
    </Box>
    </>
  )
}

export default SideDrawer;