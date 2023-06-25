import { Button, VStack, useToast } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { AppInput } from "./AppInput";
import { api } from "../api";
import {
  startAuthentication,
  startRegistration,
} from "@simplewebauthn/browser";
import { useNavigate } from "react-router-dom";

type FormType = {
  name: string;
  email: string;
};

function LoginForm() {
  const toast = useToast();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormType>();

  const navigate = useNavigate();
  async function onSubmit({ name, email }: any) {
    const res = await api.post("/auth-options", {
      email,
      name,
    });

    const optionsResponse = await startAuthentication(res.data);
    const verifyRes = await api.post("/auth-verify", {
      optionsResponse,
      email,
    });

    if (verifyRes.status === 200) {
      toast({
        title: "Authenticated! 🎉",
        status: "success",
        duration: 9000,
      });
      navigate('/home')
    } else {
      toast({
        title: "Could not authenticate 😕.",
        status: "error",
        duration: 9000,
      });
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack>
        <AppInput<FormType>
          control={control}
          name="email"
          label="Insert your email here"
          errors={errors}
        />
        <AppInput<FormType>
          control={control}
          name="name"
          label="Insert your name here"
          errors={errors}
        />
        <Button type="submit" colorScheme="blue">
          Authenticate
        </Button>
      </VStack>
    </form>
  );
}

export default LoginForm;
