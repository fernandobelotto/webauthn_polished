import { Button, VStack, useToast } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { AppInput } from "./AppInput";
import { api } from "../api";
import {
  startAuthentication,
  startRegistration,
} from "@simplewebauthn/browser";

type FormType = {
  name: string;
  email: string;
};

function RegisterForm() {
  const toast = useToast();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormType>();

  async function onSubmit({ name, email }: any) {
    const res = await api.post("/register-options", {
      email,
      name,
    });

    let options = res.data;
    options.authenticatorSelection.residentKey = "required";
    options.authenticatorSelection.requireResidentKey = true;
    options.extensions = {
      credProps: true,
    };
    const optionsResponse = await startRegistration(options);
    const verifyRes = await api.post("/register-verify", {
      optionsResponse,
      email,
    });
    if (verifyRes.status === 200) {
      toast({
        title: "Success! 🎉",
        status: "success",
        duration: 5000,
      });
    } else {
      toast({
        title: "Could not register 😕",
        status: "error",
        duration: 5000,
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
          Register
        </Button>
      </VStack>
    </form>
  );
}

export default RegisterForm;
