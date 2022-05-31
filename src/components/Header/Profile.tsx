import { Flex, Box, Avatar, Text } from "@chakra-ui/react";
import {useSession} from 'next-auth/react'

interface ShowProfileProps{
    showProfileData?: boolean;
}

export function Profile({showProfileData = true}: ShowProfileProps){

    const {data: session} = useSession()

    

    return session? (
        <Flex
        align="center"
        >
            {showProfileData && (
                <Box mr="4" textAlign="right">
                    <Text>{session.user.name}</Text>
                    <Text color="gray.300" fontSize="small">{session.user.email}</Text>
                </Box>
            )}        
            <Avatar size="md" name={session.user.name} src={session.user.image} bg="green.600"/>
        </Flex>
    ) : (
        <Flex
        align="center"
        >
            {showProfileData && (
                <Box mr="4" textAlign="right">
                    <Text>nome fake</Text>
                    <Text color="gray.300" fontSize="small">teste@gmail.com</Text>
                </Box>
            )}        
            <Avatar size="md" name='Bosch Operator' src='' bg="green.600"/>
        </Flex>
    )
    
   
}