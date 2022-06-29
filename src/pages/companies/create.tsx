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
    phone: number;
    hours: number;
  }
  
  const createUserFormSchema = yup.object().shape({
    company: yup.string().required(),  
    cnpj: yup.string().required(),
    responsable_name: yup.string().required().min(4, 'Minimum 6 letters.'),
    email: yup.string(),
    phone: yup.number(),
    hours: yup.number()
  })


export default function CreateCompany(){

    const { register, handleSubmit, formState } = useForm({
        resolver: yupResolver(createUserFormSchema)
    })

    const {errors} = formState

    const handleCreateUser: SubmitHandler<CreateUserFormData> = async ({company, cnpj, responsable_name, email, phone, hours }) => {
        
        console.log(company, cnpj, responsable_name, email)
        Router.push('/companies')
        await api.post('createcompany', {data: company, cnpj, responsable_name, email, phone, hours})
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        
    }

    return (
        <Box mt={-3}>
            <Header />

            <Flex w="100%" my="6" maxWidth={1600} mx="auto" px="6">
                <Sidebar />

                <Box as='form' flex='1' borderRadius={8} bg='gray.800' p='8' mt={5} onSubmit={handleSubmit(handleCreateUser)}>

                    <Heading size="lg" fontWeight="normal">Add a company</Heading>

                    <Divider my="6" borderColor="gray.700"/>

                    <VStack spacing="8">
                        <SimpleGrid minChildWidth="240px" spacing="8" w="100%">
                            <Input name="company" label="Company" {...register('company')} error={errors.company} autoComplete={'off'}/>
                            <Input name="cnpj" label="CNPJ" {...register('cnpj')} error={errors.cnpj} autoComplete={'off'}/>
                        </SimpleGrid>

                        <SimpleGrid minChildWidth="240px" spacing="8" w="100%">
                            <Input name="responsable_name" label="Responsable name" {...register('responsable_name')} error={errors.responsable_name} autoComplete={'off'}/>
                            <Input name="email" label="E-mail" {...register('email')} error={errors.email} autoComplete={'off'}/>
                        </SimpleGrid>

                        <SimpleGrid minChildWidth="240px" spacing="8" w="100%">
                            <Input name="phone" label="Phone" {...register('phone')} error={errors.phone} autoComplete={'off'}/>
                            <Input name="hours" label="Contracted hours" {...register('hours')} error={errors.hours} maxLength={3} autoComplete={'off'}/>
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