import { Center, Heading, VStack } from "@chakra-ui/react";
import RegisterForm from "../components/RegisterForm";
import { Link } from "react-router-dom";

export const RegisterPage = () => {
  return (
    <Center h="100vh">
      <VStack spacing={5}>
        <Heading>🔐 Webauthn</Heading>
        <VStack p={5} border="1px solid" rounded="md">
          <Heading>Registration</Heading>
          <RegisterForm />
          <Link to="/">go to authentication</Link>
        </VStack>
      </VStack>
    </Center>
  );
};
