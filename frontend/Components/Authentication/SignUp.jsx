import {
  Avatar,
  AvatarBadge,
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
import { CgProfile } from "react-icons/cg";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { BiSolidShow, BiSolidHide, BiPencil } from "react-icons/bi";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pic, setPic] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const uploadPicture = (image) => {
    if (!image) {
      toast({
        title: "Please select a valid image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    if (
      image &&
      (image.type === "image/jpeg" ||
        image.type === "image/png" ||
        image.type === "image/jpg")
    ) {
      setPic(image);
    }
  };

  const submitHandler = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("file", pic);
    axios
      .post("http://localhost:5000/upload", formData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
    if (!email || !password || !name || !confirmPassword) {
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

    if (password !== confirmPassword) {
      toast({
        title: "Please enter same passwords",
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

      let picture = pic.name;
      const { data } = await axios.post(
        "http://localhost:5000/api/v1/user",
        { name, email, password, picture },
        config
      );

      toast({
        title: "Registration successful!",
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
        description: error.response.data.message,
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
      <Avatar src={pic ? URL.createObjectURL(pic) : ""} size='xl'>
        <AvatarBadge cursor='pointer' borderColor='gray.100' bgColor='gray.100'>
          <label htmlFor='photo-upload' className='custom-file-upload'>
            <BiPencil color='black' fontSize='20px' />
          </label>
        </AvatarBadge>
      </Avatar>
      <input
        id='photo-upload'
        type='file'
        style={{ display: "none" }}
        onChange={(e) => uploadPicture(e.target.files[0])}
      />

      <FormControl id='name' isRequired>
        <InputGroup>
          <InputLeftElement pointerEvents='none'>
            <CgProfile color='gray.300' />
          </InputLeftElement>
          <Input placeholder='Name' onChange={(e) => setName(e.target.value)} />
        </InputGroup>
      </FormControl>

      <FormControl id='email' isRequired>
        <InputGroup>
          <InputLeftElement pointerEvents='none'>
            <MdEmail color='gray.300' />
          </InputLeftElement>
          <Input
            placeholder='Email'
            onChange={(e) => setEmail(e.target.value)}
          />
        </InputGroup>
      </FormControl>

      <FormControl id='password' isRequired>
        <InputGroup>
          <InputLeftElement pointerEvents='none'>
            <RiLockPasswordFill color='gray.300' />
          </InputLeftElement>
          <Input
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

      <FormControl id='confirm-password' isRequired>
        <InputGroup>
          <InputLeftElement pointerEvents='none'>
            <RiLockPasswordFill color='gray.300' />
          </InputLeftElement>
          <Input
            type={show ? "text" : "password"}
            placeholder='Confirm Password'
            onChange={(e) => setConfirmPassword(e.target.value)}
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
        Sign Up
      </Button>
    </VStack>
  );
};
export default SignUp;
