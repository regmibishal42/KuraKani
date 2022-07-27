import React,{useState} from 'react';
import {Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack} from '@chakra-ui/react';
import {BiShow,BiHide} from 'react-icons/bi';

const Login = () => {
  const [email,setEmail] = useState();
  const [password,setPassword] = useState();
  const [show,setShow] = useState(false);

  const handleClick = () =>setShow(!show);
  const submitHandler = ()=>{}

  return (
    <VStack spacing='5px' color="black">
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
    <Button colorScheme="customOrange" width="100%" style={{marginTop:15}} onClick={submitHandler} >Submit</Button>
    <Button colorScheme="customBlue" width="100%" style={{marginTop:15}} onClick={()=>{setEmail("guest@example.com"); setPassword("123456")}} >Get Guest Account Credentials</Button>
</VStack>
  )
}

export default Login;