import { Box, Button, Checkbox, Flex, Heading, Icon, Table, Tbody, Td, Th, Thead, Tr, Text, useBreakpointValue } from "@chakra-ui/react";
import Link from "next/link";
import { useEffect } from "react";
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import { FiTrash } from "react-icons/fi";
import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { Sidebar } from "../../components/Sidebar";

export default function UserList(){

    const isWideVersioon = useBreakpointValue({
        base: false,
        lg: true,
    })


    

    return (
        
        <Box>
            <Header />

            <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
                <Sidebar />

                <Box flex='1' borderRadius={8} bg='gray.800' p='8'>
                    <Flex mb='8' justify='space-between' align='center'>
                        <Heading size='lg' fontWeight='normal'>Users list</Heading>

                        <Link href="/users/create" passHref>
                            <Text>A search box comes here</Text>
                        </Link>
                    </Flex>

                    <Table colorScheme="whiteAlpha">
                        <Thead>
                            <Tr>
                                <Th px={["4","4","6"]} color="gray.300" width="">
                                    <Text>User</Text>
                                </Th>
                                <Th>Company</Th>
                                {isWideVersioon && <Th>Register date</Th>}
                                <Th w="8"></Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            <Tr>
                                <Td px={["4","4","6"]}>
                                <Box>
                                        <Text fontWeight="bold">Rafael Amaro</Text>
                                        <Text fontSize="sm" color="gray.300">tmrafinha4@gmail.com</Text>
                                    </Box>
                                </Td>
                                <Td>
                                    <Text>asasdasd</Text>
                                </Td>
                                {isWideVersioon && <Td>18 de maio, 2022</Td> }
                                <Td 
                                display="flex"
                                justifyContent='right'
                                mt="2"
                                >
                                    <Button 
                                        as='a' 
                                        size="sm" 
                                        fontSize='sm' 
                                        colorScheme='red'
                                        pl="3"
                                        pr='1'
                                        leftIcon={<Icon as={FiTrash} fontSize="16"/>}
                                        >
                                            
                                    </Button>
                                </Td>
                            </Tr>

                            <Tr>
                                <Td px={["4","4","6"]}>
                                <Box>
                                        <Text fontWeight="bold">Rafael Amaro</Text>
                                        <Text fontSize="sm" color="gray.300">tmrafinha4@gmail.com</Text>
                                    </Box>
                                </Td>
                                <Td>
                                    <Box>
                                        <Text fontWeight="bold">Rafael Amaro</Text>
                                        <Text fontSize="sm" color="gray.300">tmrafinha4@gmail.com</Text>
                                    </Box>
                                </Td>
                                {isWideVersioon && <Td>18 de maio, 2022</Td> }
                                <Td 
                                display="flex"
                                justifyContent='right'
                                mt="2"
                                >
                                    <Button 
                                        as='a' 
                                        size="sm" 
                                        fontSize='sm' 
                                        colorScheme='red'
                                        pl="3"
                                        pr='1'
                                        leftIcon={<Icon as={FiTrash} fontSize="16"/>}
                                        >
                                            
                                    </Button>
                                </Td>
                            </Tr>

                            <Tr>
                                <Td px='6'>
                                <Box>
                                        <Text fontWeight="bold">Rafael Amaro</Text>
                                        <Text fontSize="sm" color="gray.300">tmrafinha4@gmail.com</Text>
                                    </Box>
                                </Td>
                                <Td>
                                    <Box>
                                        <Text fontWeight="bold">Rafael Amaro</Text>
                                        <Text fontSize="sm" color="gray.300">tmrafinha4@gmail.com</Text>
                                    </Box>
                                </Td>
                                {isWideVersioon && <Td>18 de maio, 2022</Td> }
                                <Td 
                                display="flex"
                                justifyContent='right'
                                mt="2"
                                >
                                    <Button 
                                        as='a' 
                                        size="sm" 
                                        fontSize='sm' 
                                        colorScheme='red'
                                        pl="3"
                                        pr='1'
                                        leftIcon={<Icon as={FiTrash} fontSize="16"/>}
                                        >
                                            
                                    </Button>
                                </Td>
                            </Tr>
                        </Tbody>
                    </Table>
                    <Pagination />
                    

                </Box>
            </Flex>
        </Box>
    );
}