import { Center, Heading, VStack } from "@chakra-ui/react";
import RegisterForm from "../components/RegisterForm";

export const HomePage = () => {
  return (
    <Center h="100vh">
      <VStack>
        <Heading>You're authenticated! 🥳</Heading>
      </VStack>
    </Center>
  );
};
