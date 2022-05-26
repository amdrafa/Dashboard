import { Box, Button, Divider, Flex, Heading, HStack, SimpleGrid, VStack } from "@chakra-ui/react";
import Link from "next/link";
import { Input } from "../../components/Form/input";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup' 
import { api } from "../../services/axios";
import Router from "next/router";

type CreateUserFormData = {
    company: string;
    cnpj: string;
    responsable_name: string;
    email: string;
  }
  
  const createUserFormSchema = yup.object().shape({
    company: yup.string().required(),  
    cnpj: yup.string().required(),
    responsable_name: yup.string().required().min(4, 'Minimum 6 letters.'),
    email: yup.string()
  })


export default function CreateCompany(){

    const { register, handleSubmit, formState } = useForm({
        resolver: yupResolver(createUserFormSchema)
    })

    const {errors} = formState

    const handleCreateUser: SubmitHandler<CreateUserFormData> = async ({company, cnpj, responsable_name, email }) => {
        await new Promise(resolve => setTimeout(resolve, 1000))
        console.log(company, cnpj, responsable_name, email)
        Router.push('/companies')
        api.post('createcompany', {data: company, cnpj, responsable_name, email})
        
    }

    return (
        <Box>
            <Header />

            <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
                <Sidebar />

                <Box as='form' flex='1' borderRadius={8} bg='gray.800' p='8' onSubmit={handleSubmit(handleCreateUser)}>

                    <Heading size="lg" fontWeight="normal">Add a company</Heading>

                    <Divider my="6" borderColor="gray.700"/>

                    <VStack spacing="8">
                        <SimpleGrid minChildWidth="240px" spacing="8" w="100%">
                            <Input name="company" label="Company" {...register('company')} error={errors.company} />
                            <Input name="cnpj" label="Cpnj" {...register('cnpj')} error={errors.cnpj}/>
                        </SimpleGrid>

                        <SimpleGrid minChildWidth="240px" spacing="8" w="100%">
                            <Input name="responsable_name" label="Responsable name" {...register('responsable_name')} error={errors.responsable_name}/>
                            <Input name="email" label="E-mail" {...register('email')} error={errors.email}/>
                        </SimpleGrid>
                    </VStack>

                    <Flex mt="8" justify="flex-end">
                        <HStack spacing="4">
                            <Link href="/companies" passHref>
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