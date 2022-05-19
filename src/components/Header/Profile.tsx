import { Flex, Box, Avatar, Text } from "@chakra-ui/react";

interface ShowProfileProps{
    showProfileData?: boolean;
}

export function Profile({showProfileData = true}: ShowProfileProps){
    return (
        <Flex
        align="center"
        >
            {showProfileData && (
                <Box mr="4" textAlign="right">
                    <Text>Rafael Amaro</Text>
                    <Text color="gray.300" fontSize="small">tmrafinha4@gmail.com</Text>
                </Box>
            )}        
            <Avatar size="md" name="Rafael Amaro" src='https://github.com/amdrafa.png' />
        </Flex>
    );
}