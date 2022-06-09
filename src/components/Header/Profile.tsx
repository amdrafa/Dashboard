import { Flex, Box, Avatar, Text, Spinner } from "@chakra-ui/react";
import { useContext } from "react";
import {LoginContext} from '../../contexts/LoginContext'

interface ShowProfileProps{
    showProfileData?: boolean;
}

export function Profile({showProfileData = true}: ShowProfileProps){

    const {user} = useContext(LoginContext)

    

    return user? (
        <Flex
        align="center"
        >
            {showProfileData && (
                <Box mr="4" textAlign="right">
                    <Text>{user.name}</Text>
                    <Text color="gray.300" fontSize="small">{user.email}</Text>
                </Box>
            )}        
            <Avatar size="md" name={user.name} bg="green.600"/>
        </Flex>
    ) : (
        <Spinner />
    )
    
   
}