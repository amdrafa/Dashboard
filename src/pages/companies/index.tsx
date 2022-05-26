import { Box, Button, Checkbox, Flex, Heading, Icon, Table, Tbody, Td, Th, Thead, Tr, Text, useBreakpointValue } from "@chakra-ui/react";
import Link from "next/link";
import { useEffect } from "react";
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { Sidebar } from "../../components/Sidebar";

export default function CompanyList(){

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
                        <Heading size='lg' fontWeight='normal'>Company list</Heading>

                        <Link href="/companies/create" passHref>
                            <Button 
                            as='a' 
                            size="sm" 
                            fontSize='sm' 
                            colorScheme='blue'
                            leftIcon={<Icon as={RiAddLine} fontSize="20"/>}
                            >
                                Add a new company
                            </Button>
                        </Link>
                    </Flex>

                    <Table colorScheme="whiteAlpha">
                        <Thead>
                            <Tr>
                                <Th px={["4","4","6"]} color="gray.300" width="">
                                    <Text>Company</Text>
                                </Th>

                                <Th px={["4","4","6"]} width="">
                                    <Text>Responsable</Text>
                                </Th>
                                
                                
                                <Th>CNPJ</Th>
                                
                                {isWideVersioon && <Th>Register date</Th>}
                                <Th w="8"></Th>
                                
                            </Tr>
                        </Thead>
                        <Tbody>
                            <Tr>
                                <Td px={["4","4","6"]}>
                                    <Text>Bosch</Text>
                                </Td>
                                <Td>
                                    <Box>
                                        <Text fontWeight="bold">Rafael Amaro</Text>
                                        <Text fontSize="sm" color="gray.300">tmrafinha4@gmail.com</Text>
                                    </Box>
                                </Td>
                                {isWideVersioon && <Td>000000000-00</Td> }

                                {isWideVersioon && <Td>18 de maio, 2022</Td> }

                                <Td>
                                <Button 
                                    as='a' 
                                    size="sm" 
                                    fontSize='sm' 
                                    colorScheme='gray'
                                    color="gray.900"
                                    leftIcon={<Icon as={RiPencilLine} fontSize="16"/>}
                                    >
                                        Edit
                                    </Button>
                                </Td>
                            </Tr>

                            <Tr>
                                <Td px={["4","4","6"]}>
                                    <Text>Bosch</Text>
                                </Td>
                                <Td>
                                    <Box>
                                        <Text fontWeight="bold">Rafael Amaro</Text>
                                        <Text fontSize="sm" color="gray.300">tmrafinha4@gmail.com</Text>
                                    </Box>
                                </Td>
                                

                                
                                {isWideVersioon && <Td>000000000-00</Td> }
                                {isWideVersioon && <Td>18 de maio, 2022</Td> }

                                <Td>
                                <Button 
                                    as='a' 
                                    size="sm" 
                                    fontSize='sm' 
                                    colorScheme='gray'
                                    color="gray.900"
                                    leftIcon={<Icon as={RiPencilLine} fontSize="16"/>}
                                    >
                                        Edit
                                    </Button>
                                </Td>
                                
                            </Tr>

                            <Tr>
                                <Td px='6'>
                                    <Text>Bosch</Text>
                                </Td>
                                <Td>
                                    <Box>
                                        <Text fontWeight="bold">Rafael Amaro</Text>
                                        <Text fontSize="sm" color="gray.300">tmrafinha4@gmail.com</Text>
                                    </Box>
                                </Td>
                                {isWideVersioon && <Td>000000000-00</Td> }
                                {isWideVersioon && <Td>18 de maio, 2022</Td> }

                                <Td>
                                <Button 
                                    as='a' 
                                    size="sm" 
                                    fontSize='sm' 
                                    colorScheme='gray'
                                    color="gray.900"
                                    leftIcon={<Icon as={RiPencilLine} fontSize="16"/>}
                                    >
                                        Edit
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