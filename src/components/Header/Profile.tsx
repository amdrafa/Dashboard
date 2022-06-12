import {
  Flex,
  Box,
  Avatar,
  Text,
  Spinner,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Button,
  Link,
  ButtonGroup,
  PopoverFooter,
} from "@chakra-ui/react";
import Router from "next/router";
import { useContext, useEffect } from "react";
import { LoginContext } from "../../contexts/LoginContext";
import { MyPopoverTrigger } from "../PopOverTriggerComponent";

interface ShowProfileProps {
  showProfileData?: boolean;
}

export function Profile({ showProfileData = true }: ShowProfileProps) {
  const { user, isAuthenticated, signOut } = useContext(LoginContext);

  useEffect(() => {
    const waitAuthenticationLoad = async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      if (isAuthenticated == false) {
        Router.push("/");
      }
    };
  }, []);

  

  return user ? (
    <Flex align="center">
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>{user.name}</Text>
          <Text color="gray.300" fontSize="small">
            {user.email}
          </Text>
        </Box>
      )}

      <Popover >
        <MyPopoverTrigger>
          <Link>
            <Avatar size="md" name={user.name} bg="green.600" />
          </Link>
        </MyPopoverTrigger>

        <PopoverContent
          zIndex={4}
          color="white"
          bg="blue.800"
          borderColor="blue.800"
          my={2}
          mr="10"
        >
          <PopoverHeader pt={4} fontWeight="bold" border="0">
            Do you want to sign out?
          </PopoverHeader >
          
          <PopoverCloseButton />
          <PopoverBody>
          
            
            <Button colorScheme="red" w="100%" onClick={signOut}>
              Leave
            </Button>
          
          </PopoverBody>
          
        </PopoverContent>
      </Popover>
    </Flex>
  ) : (
    <Spinner />
  );
}
