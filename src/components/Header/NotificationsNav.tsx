import {
  HStack,
  Text,
  Icon,
  Spinner,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  Button,
  Link,
  Box,
  Flex,
} from "@chakra-ui/react";
import { GetStaticProps } from "next";
import { useContext, useEffect, useState } from "react";
import { BsCheckCircle, BsExclamationCircle } from "react-icons/bs";
import { RiNotificationLine, RiUserAddLine } from "react-icons/ri";
import { LoginContext } from "../../contexts/LoginContext";
import { MyPopoverTrigger } from "../PopOverTriggerComponent";

export function NotificationsNav() {

  const [hasDriverLicence, setHasDriverLicence] = useState(false)

  const {user} = useContext(LoginContext);


  return (
    <>
      <HStack
        spacing="8"
        mx={["6", "8"]}
        pr={["6", "8"]}
        py="1"
        color="gray.300"
        borderRightWidth={1}
        borderColor="gray.700"
      >
        <Popover autoFocus={false} placement={"bottom-end"}>
          <MyPopoverTrigger>
            <Link>
              <Icon as={RiNotificationLine} fontSize="20" />
            </Link>
          </MyPopoverTrigger>

          <PopoverContent
            color="white"
            bg="#292A36"
            borderColor="blackAlpha.200"
            shadow={"2xl"}
            mt={2}
          >
            <PopoverHeader pt={4} fontWeight="bold" border="0">
              <Text fontSize={17}>Notifications</Text>
            </PopoverHeader>
              {(user?.companyRef == '' || !user?.driver_expiration) ? (
                
              <Box>
              
                {user?.companyRef == '' && (
                  <Flex alignItems={"center"} borderBottom={'2px'} borderBottomColor={'#333442'} pr={2} py={3} as={'a'} cursor={'pointer'} _hover={{bg: "#21222c"}}>

                  <Flex p={4}>
                    <Icon fontSize={30} as={BsExclamationCircle} color={"blue.500"}/>
                  </Flex>

                  <Box>
                    <Text fontWeight={600} fontSize={16} color={'blue.500'}>Company necessary</Text>
                    <Text  fontSize={14} color={'gray.300'}>You have to be part of a company.</Text>
                  </Box>

                  </Flex>
                )}



                {new Date(user?.driver_expiration) <= new Date() && (
                  <Flex alignItems={"center"} pr={2} py={3} as={'a'} cursor={'pointer'} _hover={{bg: "#21222c"}}>

                  <Flex p={4}>
                    <Icon fontSize={30} as={BsExclamationCircle} color={"blue.500"}/>
                  </Flex> 

                  <Box>
                    <Text fontWeight={600} fontSize={16} color={'blue.500'}>Company necessary</Text>
                    <Text  fontSize={14} color={'gray.300'}>You have to be part of a company.</Text>
                  </Box>

                  </Flex>
                )}
                </Box>
                
              ) : (<Flex px={4} justifyContent={"center"} mt={4} mb={6}>
              <Box justifyContent={"center"}>
                <Flex w={"100%"} justifyContent={"center"}>
                  <Icon
                    as={BsCheckCircle}
                    fontSize={40}
                    color={"green.500"}
                    mb={3}
                  />
                </Flex>

                <Text fontWeight={800}>You don't have any notification.</Text>
              </Box>
            </Flex>)}

            <PopoverCloseButton />
          </PopoverContent>
        </Popover>
      </HStack>
    </>
  );
}
