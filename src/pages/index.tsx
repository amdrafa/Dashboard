import { Flex, Button, Stack, Icon, Divider, Text } from '@chakra-ui/react';
import { Input } from '../components/Form/input';
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import { api } from '../services/axios';
import { useContext } from 'react';
import { LoginContext } from '../contexts/LoginContext';
import { signIn as githubSignIn, useSession } from 'next-auth/react'
import { RiGithubFill, RiGithubLine, RiGoogleFill, RiGoogleLine, RiLinkedinFill } from 'react-icons/ri';

type SignInFormData = {
  email: string;
  password: string;
}

const SignInFormSchema = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().required()
})

export default function Home() {

  const {data: session} = useSession()

  console.log(session)

  const { signIn } = useContext(LoginContext)
   

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(SignInFormSchema)
  })

  const {errors} = formState

  const handleSignin:SubmitHandler<SignInFormData> = ({ email, password }) => {

    
    

    
    signIn({email, password})

    
  }

  return (
    <Flex w="100vw" h="100vh" alignItems="center" justifyContent="center">

      <Flex 
      as="form" 
      w='100%' 
      maxW={360}
      bg="gray.800"
      p="8"
      borderRadius={8}
      flexDir="column"
      onSubmit={handleSubmit(handleSignin)}
      mr="10"
      >
        <Stack spacing={4}>

          <Input 
          type='email'  
          name='email'
          label='E-mail'  
          error={errors.email}
          {...register('email')}   
          />

          <Input 
            type='password'  
            name='password'
            label='Password'  
            error={errors.password}
            {...register('password')}      
          />
          
        </Stack>
      
        <Button 
        type='submit' 
        mt="8" 
        colorScheme="twitter"
        size="lg"
        isLoading={formState.isSubmitting}
        >
          Enter
        </Button>

        <Flex display="grid" alignItems="center" justifyContent="center" mt="8">
          <Text >Already have access?</Text>
        </Flex>
        <Flex display="grid" alignItems="center" justifyContent="center">
          <Text color="whiteAlpha.900">Register now!</Text>
        </Flex>
      </Flex>

      <Divider orientation='vertical' height="410" opacity="0.1" ml="70px" mr="70px"/>

      <Flex
      w='100%' 
      maxW={360}
      bg="gray.800"
      p="8"
      py="44px"
      ml="10"
      borderRadius={8}
      flexDir="column"
      >

      <Text fontSize="30" fontWeight="bold" mt={-2}>Don't you want to register?</Text>
        <Stack spacing="10px">

          

          <Text fontSize="15" mb="5" color="gray.300">Sign in with your social media.</Text>

          <Flex display="grid" alignItems="center">
            <Button 
            type='submit'  
            colorScheme="purple"
            size="lg"
            
            >
              <Icon mr="1" as={RiGithubFill} fontSize="25"/>
              Github
            </Button>
          </Flex>

          <Flex display="grid" alignItems="center">
            <Button 
            type='submit' 
            colorScheme="messenger"
            size="lg"
            >
              <Icon mr="1" as={RiLinkedinFill} mt="-1" fontSize="25"/>
              Linkedin
            </Button>
          </Flex>
         
          
          <Flex display="grid" alignItems="center">
            <Button 
              type='submit' 
              colorScheme="whatsapp"
              size="lg"
              onClick={() => githubSignIn('github', {
                callbackUrl: `${window.location.origin}/dashboard`
              })}
              
            >

              <Icon mr="1" as={RiGoogleFill} fontSize="25"/>
              Google
            
            </Button>
          </Flex>
          
        </Stack>
      
        

        
      </Flex>

    </Flex>

    

    
  )
}
