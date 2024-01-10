import {
  Button,
  FormControl,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { BiSolidShow, BiSolidHide } from "react-icons/bi";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const submitHandler = async () => {
    setLoading(true);

    if (!email || !password) {
      toast({
        title: "Please fill in all the required fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "http://localhost:5000/api/v1/user/login",
        { email, password },
        config
      );

      toast({
        title: "Login successful!",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      navigate("/chats");
    } catch (error) {
      toast({
        title: "Error occurred!",
        description: error.response?.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };

  return (
    <VStack spacing={4}>
      <FormControl id='login-email' isRequired>
        <InputGroup>
          <InputLeftElement pointerEvents='none'>
            <MdEmail color='gray.300' />
          </InputLeftElement>
          <Input
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </InputGroup>
      </FormControl>

      <FormControl id='login-password' isRequired>
        <InputGroup>
          <InputLeftElement pointerEvents='none'>
            <RiLockPasswordFill color='gray.300' />
          </InputLeftElement>
          <Input
            value={password}
            type={show ? "text" : "password"}
            placeholder='Password'
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width='4.5rem'>
            <Button h='1.75rem' size='sm' onClick={() => setShow(!show)}>
              {show ? <BiSolidShow /> : <BiSolidHide />}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <Button
        width='100%'
        colorScheme='blue'
        onClick={submitHandler}
        isLoading={loading}
      >
        Login
      </Button>

      <Button
        width='100%'
        colorScheme='red'
        onClick={() => {
          setEmail("guest@gmail.com");
          setPassword("123456");
        }}
      >
        Get Guest User Credentials
      </Button>
    </VStack>
  );
};
export default Login;
