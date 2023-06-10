import { Button, VStack, useToast } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { AppInput } from "./AppInput";
import { api } from "../api";
import { startAuthentication, startRegistration } from '@simplewebauthn/browser';

type FormType = {
  name: string;
  email: string;
};

function AppForm() {
  const toast = useToast()
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormType>();

  async function onSubmit({
    name,
    email,
  }: any) {

    const res = await api.post('/register-options', {
      email,
      name
    });

    let options = res.data
    options.authenticatorSelection.residentKey = 'required'
    options.authenticatorSelection.requireResidentKey = true
    options.extensions = {
      credProps: true,
    }
    const optionsResponse = await startRegistration(options);
    const verifyRes = await api.post('/register-verify', { optionsResponse, email });
    if (verifyRes.status === 200) {
      toast({
        title: "Account created.",
        description: "We've created your account for you.",
        status: "success",
        duration: 9000,
      })
    } else {
      toast({
        title: "Account not created.",
        description: "We've not created your account for you",
        status: "error",
        duration: 9000,
      })
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
        <Button
          type="submit"
          colorScheme="blue"
        >
          Create account
        </Button>
      </VStack>

    </form>
  );
}

export default AppForm;
