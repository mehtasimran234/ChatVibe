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
import { AiOutlineUser } from "react-icons/ai";
import axios from "axios";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [picture, setPicture] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

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
      setPicture(image);
    }
  };

  const submitHandler = () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("file", picture);
    axios
      .post("http://localhost:5000/upload", formData)
      .then((res) => {
        console.log(res);
        setLoading(false);
      })
      .catch((err) => console.log(err));

    if (!email || !password || !name || !confirmpassword) {
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
  };

  return (
    <VStack spacing={4}>
      {/* <Avatar src={picture} size='xl'>
        <AvatarBadge cursor='pointer' borderColor='gray.100' bgColor='gray.100'>
          <BiPencil color='black' fontSize='20px' />
        </AvatarBadge>
      </Avatar> */}

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

      <FormControl id='confirmpassword' isRequired>
        <InputGroup>
          <InputLeftElement pointerEvents='none'>
            <RiLockPasswordFill color='gray.300' />
          </InputLeftElement>
          <Input
            type={show ? "text" : "password"}
            placeholder='Confirm Password'
            onChange={(e) => setConfirmpassword(e.target.value)}
          />
          <InputRightElement width='4.5rem'>
            <Button h='1.75rem' size='sm' onClick={() => setShow(!show)}>
              {show ? <BiSolidShow /> : <BiSolidHide />}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl id='picture' encType='multipart/form-data'>
        <InputGroup>
          <Input
            type='file'
            name='file'
            accept='image/*'
            onChange={(e) => uploadPicture(e.target.files[0])}
          />
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
