import {
    Box,
    Button,
    Checkbox,
    Flex,
    Heading,
    Icon,
    Table,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    Text,
    useBreakpointValue,
    Input,
    Spinner,
  } from "@chakra-ui/react";
  import Link from "next/link";
  import {useState } from "react";
  import { RiAddLine, RiPencilLine, RiSearchLine } from "react-icons/ri";
  import { FiTrash } from "react-icons/fi";
  import { Header } from "../../components/Header";
  import { Pagination } from "../../components/Pagination";
  import { Sidebar } from "../../components/Sidebar";
  import { api } from "../../services/axios";
  import { useQuery } from "react-query";
  
  interface AdmDataProps {
    data: AdmProps;
    ref: string;
    ts: number;
  }
  
  interface AdmProps {
    name: string;
    email: string;
    companyRef: {
        id: number;
    }
  }
  
  export default function AdmList() {
    const isWideVersioon = useBreakpointValue({
      base: false,
      lg: true,
    });
  
    const [page, setPage] = useState(1);
  
    const [limit, setLimit] = useState(6);
  
    const [total, setTotal] = useState(0);
  
    const [users, setUsers] = useState<AdmDataProps[]>([]);
  
    const { data, isLoading, error } = useQuery<AdmDataProps[]>(
      `admlist${page}`,
      async () => {
        const response = await api.get(`getalladms?page=${page}&limit=${limit}`);
        const { PaginateData: ReturnedData, totalcount } = response.data;
        console.log(ReturnedData);
        
        setTotal(totalcount)
        let totalLenght = 0;
  
        ReturnedData.map((user) => (totalLenght = totalLenght + 1));
  
        setTotal(totalcount);
  
        return ReturnedData;
      }
    );
  
    console.log(data);
  
    return (
      <Box>
        <Header />
  
        <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
          <Sidebar />
  
          <Box flex="1" borderRadius={8} bg="gray.800" p="8" mt={5}>
            <Flex mb="8" justify="space-between" align="center">
              <Heading size="lg" fontWeight="normal">
                Administrators list
              </Heading>
  
              <Link href="/administrators/create" passHref>
              <Button
                as="a"
                size="sm"
                fontSize="sm"
                colorScheme="blue"
                leftIcon={<Icon as={RiAddLine} fontSize="20" />}
              >
                Add a new administrator
              </Button>
            </Link>
            </Flex>
  
            {isLoading ? (
            <Flex justify="center">
              <Spinner mt="10" />
            </Flex>
            ): error ? (
              <Flex justify="center">
                <Text>The requisition failed</Text>
              </Flex>
            ): (
                <>
                <Table colorScheme="whiteAlpha">
              <Thead>
                <Tr>
                  <Th px={["4", "4", "6"]} color="gray.300" width="">
                    <Text>Administrator</Text>
                  </Th>
                  <Th>Created by</Th>
                  {isWideVersioon && <Th>Register date</Th>}
                  <Th w="8"></Th>
                </Tr>
              </Thead>
              <Tbody>
                {data.map((adm) => (
                    <Tr key={adm.ts}>
                    <Td px={["4", "4", "6"]}>
                      <Box>
                        <Text fontWeight="bold">{adm.data.name}</Text>
                        <Text fontSize="sm" color="gray.300">
                        {adm.data.email}
                        </Text>
                      </Box>
                    </Td>
                    <Td>
                      <Text>{adm.ts}</Text>
                    </Td>
                    {isWideVersioon && <Td>18 de maio, 2022</Td>}
                    <Td display="flex" justifyContent="right" mt="2">
                      <Button
                        as="a"
                        size="sm"
                        fontSize="sm"
                        colorScheme="gray"
                        color="gray.900"
                        leftIcon={<Icon as={RiPencilLine} fontSize="16" />}
                      >
                        Edit
                      </Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
            <Pagination
              totalCountOfRegisters={total - 1}
              currentPage={page}
              onPageChanges={setPage}
            />
                </>
              
            )} 
            
            
          </Box>
        </Flex>
      </Box>
    );
  }
  