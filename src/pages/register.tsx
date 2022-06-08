import { Flex, Button, Stack, Icon, Divider, Text } from "@chakra-ui/react";
import { Input } from "../components/Form/input";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { api } from "../services/axios";
import { useContext } from "react";
import { LoginContext } from "../contexts/LoginContext";
import Router from "next/router";
import Link from "next/link";


type SignInFormData = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

const SignInFormSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().required().email(),
  password: yup.string().required().min(6, "Minimum 6 letters."),
  password_confirmation: yup
    .string()
    .oneOf([null, yup.ref("password")], "The passwords need to be the same"),
});

export default function Register() {

    const { createUser } = useContext(LoginContext);

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(SignInFormSchema),
  });

  const { errors, isSubmitting } = formState;

  const handleSignin: SubmitHandler<SignInFormData> = ({ email, password, name, password_confirmation }) => {
    createUser({name, email, password})
    

    Router.push('/successredirect')
  };

  return (
    <Flex w="100vw" h="100vh" alignItems="center" justifyContent="center">

      

      <Flex
        as="form"
        w="100%"
        maxW={360}
        bg="gray.800"
        p="8"
        borderRadius={8}
        flexDir="column"
        onSubmit={handleSubmit(handleSignin)}
      >
        <Stack spacing={4}>
          <Input
            name="name"
            label="Full name"
            {...register("name")}
            error={errors.name}
          />
          <Input
            name="email"
            label="E-mail"
            type={"email"}
            {...register("email")}
            error={errors.email}
          />

          <Input
            name="password"
            type="password"
            label="Password"
            {...register("password")}
            error={errors.password}
          />
          <Input
            name="password_confirmation"
            type="password"
            label="Password confirmation"
            {...register("password_confirmation")}
            error={errors.password_confirmation}
          />
        </Stack>

        <Button
          type="submit"
          mt="8"
          colorScheme="twitter"
          size="lg"
          isLoading={formState.isSubmitting}
        >
          Register
        </Button>

        <Flex display="grid" alignItems="center" justifyContent="center" mt="8">
          <Text>Are you already registered?</Text>
        </Flex>
        <Flex display="grid" alignItems="center" justifyContent="center">
          <Link href="/" passHref>
            <Text color="blue.600" cursor="pointer" _hover={{color: "blue.400"}}>
              Login
            </Text>
          </Link>
        </Flex>
      </Flex>
    </Flex>
  );
}
