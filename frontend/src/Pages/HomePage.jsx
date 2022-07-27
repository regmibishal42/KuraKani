import React from 'react';
// import './HomePage.css';
import {
    Box,
    Text,
    Container,
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel
} from '@chakra-ui/react';
import Login from '../components/Authentication/Login.jsx';
import Signup from '../components/Authentication/Signup.jsx';


const HomePage = () => {
    return (
        <Container maxWidth="xl" centerContent>
            {/* Box Works The Same as Div */}
            <Box display='flex' justifyContent='center' alignItems='center'
                p={3}
                bg="white"
                w="100%"
                m="40px 0 15px 0"
                borderRadius="lg"
                borderWidth="1px">
                <Text fontSize="4xl" fontFamily="Work Sans" color="black">कुरा-कानि</Text>
            </Box>
            <Box bg='white'
                p={4}
                w="100%"
                borderRadius='lg'
                borderWidth="1px">
                <Tabs variant='soft-rounded' colorScheme='orange'>
                    <TabList mb='1em'>
                        <Tab width='50%'>Login</Tab>
                        <Tab width='50%'>Signup</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel> <Login /> </TabPanel>
                        <TabPanel> <Signup /> </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </Container>
    )
}

export default HomePage;
