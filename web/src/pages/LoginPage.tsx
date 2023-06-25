import { Center, Heading, VStack } from "@chakra-ui/react";
import RegisterForm from "../components/RegisterForm";
import { Link } from "react-router-dom";
import LoginForm from "../components/LoginForm";

export const LoginPage = () => {
  return (
    <Center h="100vh">
      <VStack spacing={5}>

        <Heading>🔐 Webauthn</Heading>
        <VStack p={5} border="1px solid" rounded="md">
          <Heading>Authentication</Heading>
          <LoginForm />
          <Link to="/register">go to registration</Link>
        </VStack>
      </VStack>
    </Center>
  );
};
