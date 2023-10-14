import {
  Box,
  Container,
  TabList,
  TabPanels,
  TabPanel,
  Tabs,
  Tab,
  Text,
} from "@chakra-ui/react";
import Login from "../Components/Authentication/Login";
import SignUp from "../Components/Authentication/SignUp";

const HomePage = () => {
  return (
    <Container maxW='xl' centerContent>
      <Box
        d='flex'
        textAlign='center'
        p={3}
        w='100%'
        bg='white'
        m='40px 0 15px 0'
        borderRadius='lg'
        borderWidth='1px'
      >
        <Text fontFamily='Playball' fontSize='5xl' paddingBottom='10px'>
          Chat-Vibe
        </Text>
        <Tabs variant='soft-rounded' align='center' colorScheme='gray'>
          <TabList mb='1px'>
            <Tab width='50%'>Login</Tab>
            <Tab width='50%'>SignUp</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <SignUp />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};
export default HomePage;
