import React,{useState} from 'react';
import {Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack,useToast} from '@chakra-ui/react';
import {BiShow,BiHide} from 'react-icons/bi';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email,setEmail] = useState();
  const [password,setPassword] = useState();
  const [show,setShow] = useState(false);
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  const handleClick = () =>setShow(!show);
  const submitHandler = async ()=>{
    setLoading(true);
    if(!email || !password){
      toast({
        title:"Please Enter Email And Password",
        status:"warning",
        duration:5000,
        isClosable:true,
        position:"botton"
      });
      setLoading(false);
      return;
    }
    // if(password !== confirmPassword) {
    //   toast({
    //     title:"Passwords DoNot Match",
    //     status:'warning',
    //     duration:5000,
    //     isClosable:true,
    //     position:"bottom"
    //   })
    //   return;
    // }
    try{
      const config = {
        headers:{
          "Content-Type":"application/json"
        },
      };
      const {data} = await axios.post('http://localhost:3000/api/user/login',{email,password},config);
      toast({
        title:"Login Successful",
        status:"success",
        duration:5000,
        isClosable:true,
        position:"bottom"
      });
      localStorage.setItem("userInfo",JSON.stringify(data));
      setLoading(false);
      navigate('/chats');


    }catch(error){
      toast({
        title:"Error Occured",
        description:error.response.data.message,
        status:'error',
        duration:5000,
        isClosable:true,
        position:"bottom"
      });
      setLoading(false);
    }
  }

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
    <Button colorScheme="customOrange" width="100%" style={{marginTop:15}} onClick={submitHandler} isLoading={loading}>Submit</Button>
    <Button colorScheme="customBlue" width="100%" style={{marginTop:15}} onClick={()=>{setEmail("guest@example.com"); setPassword("123456")}} >Get Guest Account Credentials</Button>
</VStack>
  )
}

export default Login;