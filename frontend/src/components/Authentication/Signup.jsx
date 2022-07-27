import React,{useState} from 'react';
import {Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack} from '@chakra-ui/react';
import {BiShow,BiHide} from 'react-icons/bi';


const Signup = () => {
  const [name,setName] = useState();
  const [email,setEmail] = useState();
  const [password,setPassword] = useState();
  const [confirmPassword,setConfirmPassword] = useState();
  const [profile,setProfile] = useState();
  const [show,setShow] = useState(false);

  const handleClick = () =>setShow(!show);
  const postDetails = (profile) =>{}
  const submitHandler = ()=>{}


  return (
    <VStack spacing='5px' color="black">
        <FormControl id='first-name' isRequired>
          <FormLabel>Name</FormLabel>
          <Input placeholder="Enter Your Name" onChange={(e)=>setName(e.target.value) } />
        </FormControl>
        <FormControl id='email' isRequired>
          <FormLabel>E-mail</FormLabel>
          <Input placeholder="Enter Your Email" onChange={(e)=>setEmail(e.target.value) } />
        </FormControl>
        <FormControl id='password' isRequired>
          <FormLabel>Password</FormLabel>
          <InputGroup>
          <Input type={show ? "text" :"password"} placeholder="Enter Your Name" onChange={(e)=>setPassword(e.target.value) } />
          <InputRightElement width="4.5rem">
            <Button h='1.50rem' size="sm" onClick={handleClick}>
              {show ?<BiShow /> : <BiHide />}
            </Button>
          </InputRightElement>
          </InputGroup>
        </FormControl>
        <FormControl id='password' isRequired>
          <FormLabel>Confirm Password</FormLabel>
          <InputGroup>
          <Input type={show ? "text" :"password"} placeholder="Enter Your Name" onChange={(e)=>setConfirmPassword(e.target.value) } />
          <InputRightElement width="4.5rem">
            <Button h='1.50rem' size="sm" onClick={handleClick}>
              {show ? <BiShow/> : <BiHide/>}
            </Button>
          </InputRightElement>
          </InputGroup>
        </FormControl>
        <FormControl id="profile">
          <FormLabel>Upload Your Picture</FormLabel>
          <Input type='file' p={1.5} accept='image/*' onChange={(e)=>postDetails(e.target.files[0])} />
        </FormControl>
        <Button colorScheme="customOrange" width="100%" style={{marginTop:15}} onClick={submitHandler} >Submit</Button>
    </VStack>
  )
}

export default Signup;