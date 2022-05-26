import { Flex, Button, Stack, Icon } from '@chakra-ui/react';
import { Input } from '../components/Form/input';
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import { api } from '../services/axios';
import { useContext } from 'react';
import { LoginContext } from '../contexts/LoginContext';
import { signIn as githubSignIn, useSession } from 'next-auth/react'
import { RiGithubLine } from 'react-icons/ri';

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
        mt="6" 
        colorScheme="green"
        size="lg"
        isLoading={formState.isSubmitting}
        >
          Enter
        </Button>

        <Button 
        type='submit' 
        mt="6" 
        colorScheme="purple"
        size="lg"
        onClick={() => githubSignIn('github', {
          callbackUrl: `${window.location.origin}/dashboard`
        })}
        
        >

          <Icon mr="1" as={RiGithubLine} fontSize="25"/>
          Sign in with github
          
        </Button>
      </Flex>

    </Flex>
  )
}
