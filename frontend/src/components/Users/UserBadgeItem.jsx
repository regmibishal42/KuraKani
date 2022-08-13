import React from 'react';
import {Box} from '@chakra-ui/react';
import {AiOutlineCloseCircle} from 'react-icons/ai'

const UserBadgeItem = ({user,handleFunction}) => {
  return (
    <Box
    px={2}
    py={1}
    borderRadius="lg"
    m={1} 
    mb={2}
    varient="solid"
    fontSize={12}
    backgroundColor="purple"
    color="white"
    cursor="pointer"
    onClick={handleFunction}
    >
        {user.name}
        <AiOutlineCloseCircle />
    </Box>
  )
}

export default UserBadgeItem;