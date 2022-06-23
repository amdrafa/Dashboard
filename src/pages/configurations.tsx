import { Box, Button, Divider, Flex, Heading, HStack, SimpleGrid, VStack } from "@chakra-ui/react";
import Link from "next/link";
import { Input } from "../components/Form/input";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup' 
import { api } from "../services/axios";
import Router from "next/router";
import { useContext } from "react";
import { LoginContext } from "../contexts/LoginContext";

type CreateSpeedwayFormData = {
    old_password: string;
    old_password_confirmation: string;
    new_password: string;
    new_password_confirmation: string;
  }
  
  const createUserFormSchema = yup.object().shape({
    old_password: yup.string().required(),  
    old_password_confirmation: yup.string().required().oneOf([null, yup.ref("old_password")], "The passwords need to be the same"),
    new_password: yup.string().required().min(6, 'Minimum 6 letters.'),
    new_password_confirmation: yup.string().required().min(6, 'Minimum 6 letters.').oneOf([null, yup.ref("new_password")], "The new passwords need to be the same")
  })


export default function Configurations(){

    const { user } = useContext(LoginContext)

    const { register, handleSubmit, formState } = useForm({
        resolver: yupResolver(createUserFormSchema)
    })

    const {errors} = formState

    const handleCreateUser: SubmitHandler<CreateSpeedwayFormData> = async ({old_password, old_password_confirmation, new_password, new_password_confirmation }) => {
        
        console.log(old_password, new_password)
        // Router.push('/speedways')
        const response = await api.post('updatedata', {data: new_password, email: user.email, old_password}).then(response => console.log(response))
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        
    }

    return (
        <Box mt={-3} ml={-4}>
            <Header />

            <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
                <Sidebar />

                <Box as='form' flex='1' height={"100%"} borderRadius={8} bg='gray.800' p='8' mt={5} onSubmit={handleSubmit(handleCreateUser)}>

                    <Heading size="lg" fontWeight="normal">Configurations</Heading>

                    <Divider my="6" borderColor="gray.700"/>

                    <VStack spacing="8">
                        <SimpleGrid minChildWidth="240px" spacing="8" w="100%">
                            <Input  name="old_password" label="Current password" {...register('old_password')} error={errors.old_password} type="password" />
                            <Input type="password" name="old_password_confirmation" label="Current password confirmation" {...register('old_password_confirmation')} error={errors.old_password_confirmation}/>
                        </SimpleGrid>

                        <SimpleGrid minChildWidth="240px" spacing="8" w="100%">
                            <Input type={"password"} name="new_password" label="New password" {...register('new_password')} error={errors.new_password}/>

                            <Input type={"password"} name="new_password_confirmation" label="New password confirmation" {...register('new_password_confirmation')} error={errors.new_password_confirmation}/>
                            
                        </SimpleGrid>
                    </VStack>

                    <Flex mt="8" justify="flex-end">
                        <HStack spacing="4">
                            <Link href="/userdashboard" passHref>
                                <Button as={"a"} colorScheme="whiteAlpha">Cancel</Button>
                            </Link>
                            <Button isLoading={formState.isSubmitting} type="submit" colorScheme="blue">Save</Button>
                            
                        </HStack>
                    </Flex>


                </Box>
            </Flex>
        </Box>
    );
}