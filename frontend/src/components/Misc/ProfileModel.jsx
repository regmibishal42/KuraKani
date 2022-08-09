import React from 'react';
import {useDisclosure} from '@chakra-ui/hooks';
import { IconButton,Modal,ModalOverlay,ModalContent,ModalHeader,ModalCloseButton,ModalBody,ModalFooter,Button,Image,Text } from '@chakra-ui/react';
import {AiOutlineEye} from 'react-icons/ai';


const ProfileModel = ({user,children}) => {
    const {isOpen,onOpen,onClose} = useDisclosure();
  return (
    <>
    {
        children ? (<span onClick={onOpen}>
            {children}
        </span>) :(
            <IconButton
            display={{base:"flex"}}
            icon={<AiOutlineEye/>}
            onClick={onOpen}
            />
        )
    }
    <Modal size="lg" isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent height="410px">
          <ModalHeader
          fontSize="40px"
          fontFamily="Work sans"
          display="flex"
          justifyContent="center"
          >{user.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody
          display="flex"
          flexDir="column"
          alignItems="center"
          justifyContent="space-between"

          >
          <Image
               borderRadius="full"
               boxSize="150px"
               src={user.profile}
               alt={user.name}
               />
               <Text fontSize={{base:"28px",md:"30px"}} fontFamily="Work sans">
                    Email:{user.email}
               </Text>
          </ModalBody >

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    
    </>
  )
}

export default ProfileModel