import React,{useState} from 'react';
import {Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack,useToast} from '@chakra-ui/react';
import {BiShow,BiHide} from 'react-icons/bi';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
 

const Signup = () => {
  const [name,setName] = useState();
  const [email,setEmail] = useState();
  const [password,setPassword] = useState();
  const [confirmPassword,setConfirmPassword] = useState();
  const [profile,setProfile] = useState();
  const [show,setShow] = useState(false);
  const [loading,setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const handleClick = () =>setShow(!show);
  const postDetails = (profile) =>{
    setLoading(true);
    if(profile === undefined){
      toast({
        title:"Please Select an  Image",
        status:"warning",
        duration:5000,
        isClosable:true,
        position:"bottom"
      });
      return;
    }
    if(profile.type === "image/jpeg" || profile.type === "image/png" || profile.type === "image/jpg"){
      const data = new FormData();
      data.append("file",profile);
      data.append("upload_preset","kura-kani");
      data.append("cloud_name","ds2lwfslo");
    fetch("https://api.cloudinary.com/v1_1/ds2lwfslo/image/upload",{
      method:"post",
      body:data
    }).then((res)=>res.json())
      .then(data =>{
        setProfile(data.url.toString());
        console.log('Data back ',data.url.toString())
        setLoading(false);
      }).catch((err)=>{
        console.log(err);
        setLoading(false);
      })
    }else{
      toast({
        title:"Please Select an Image",
        status:"warning",
        duration:5000,
        isClosable:true,
        position:'bottom'
      });
      setLoading(false);
      return;
    }
  }
  const submitHandler = async ()=>{
    setLoading(true);
    if(!name || !email || !password || !confirmPassword){
      toast({
        title:"Please Fill All The Fields",
        status:"warning",
        duration:5000,
        isClosable:true,
        position:"botton"
      });
      setLoading(false);
      return;
    }
    if(password !== confirmPassword) {
      toast({
        title:"Passwords DoNot Match",
        status:'warning',
        duration:5000,
        isClosable:true,
        position:"bottom"
      })
      return;
    }
    try{
      const config = {
        headers:{
          "Content-Type":"application/json"
        },
      };
      const {data} = await axios.post('http://localhost:3000/api/user',{name,email,password,profile},config);
      toast({
        title:"Registeration Successful",
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
        <Button colorScheme="customOrange" width="100%" style={{marginTop:15}} onClick={submitHandler} isLoading={loading}>Sign Up</Button>
    </VStack>
  )
}

export default Signup;