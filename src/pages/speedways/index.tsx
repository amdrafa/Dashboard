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
    Spinner,
  } from "@chakra-ui/react";
  import { query as q } from "faunadb";
  import { GetServerSideProps } from "next";
  import Link from "next/link";
  import { useEffect, useState } from "react";
  import { RiAddLine, RiPencilLine } from "react-icons/ri";
  import { Header } from "../../components/Header";
  import { Pagination } from "../../components/Pagination";
  import { Sidebar } from "../../components/Sidebar";
  import { api } from "../../services/axios";
  import { fauna } from "../../services/fauna";
  import { useQuery } from "react-query";
  import ReactPaginate from 'react-paginate'
  
  interface speedwayDataProps {
    data: speedwayProps;
    ref: string;
    ts: number;
  }
  
  interface speedwayProps {
    speedway: string;
    vehicles_limit: number;
    description: string;
    createdAt: string;
  }
  
  
  export default function Speedwaylist() {
      
    const isWideVersioon = useBreakpointValue({
      base: false,
      lg: true,
    });
  
    const [page, setPage] = useState(1);
  
    const [limit, setLimit] = useState(5);
  
    const [total, setTotal] = useState(1);
  
    const [speedway, setSpeedway] = useState<speedwayDataProps[]>([]);

    const [needsLessHeight, setNeedsLessHeight] = useState('');
  
    const { data, isLoading, error } = useQuery<speedwayDataProps[]>(`speedwaylist${page}`, async () => {
      const response = await api.get(`getallspeedways?page=${page}&limit=${limit}`)
      const {PaginateData: ReturnedData, totalcount} = response.data;
      
      
      setTotal(totalcount)
      
      
      return ReturnedData;
    });

    useEffect(() => {
      let personPerPage = 0
      
      console.log(data)
      {data? (data.forEach((company) => {
        personPerPage = personPerPage + 1
        console.log(personPerPage)
      })) : ('') }
  
      switch(personPerPage){
        case 1: 
          setNeedsLessHeight('310px')
          break;
        case 2: 
          setNeedsLessHeight('400px')
          break;
        default: setNeedsLessHeight('')
      }
    }, [setPage, page, data ])
  
  
    return (
      <Box mt={-3}>
        <Header />
  
        <Flex w="100%" my="6" maxWidth={1600} mx="auto" px="6">
          <Sidebar />
  
          <Box flex="1" borderRadius={8} bg="gray.800" height="100%" p="8" mt={5}>
            <Flex mb="8" justify="space-between" align="center">
              <Heading size="lg" fontWeight="normal">
                Speedway list
              </Heading>
  
              <Link href="/speedways/create" passHref>
                <Button
                  as="a"
                  size="sm"
                  fontSize="sm"
                  colorScheme="blue"
                  leftIcon={<Icon as={RiAddLine} fontSize="20" />}
                >
                  Add a new speedway
                </Button>
              </Link>
            </Flex>
  
            {isLoading ? (
              <Flex justify="center">
                <Spinner mt="110px" />
              </Flex>
            ) : error ? (
              <Flex justify="center">
                <Text>The requisition failed</Text>
              </Flex>
            ) : (
              total > 0 ? (<>
                <Table colorScheme="whiteAlpha">
                  <Thead>
                    <Tr>
                      <Th px={["4", "4", "6"]} color="gray.300" width="">
                        <Text>Speedway</Text>
                      </Th>
  
                      <Th px={["4", "4", "6"]} width="">
                        <Text>Limit of vehicles</Text>
                      </Th>
  
  
                      {isWideVersioon && <Th>Description</Th>}
                      <Th w="8"></Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {data.map((speedway) => (
                      <Tr key={speedway.ts}>
                        <Td px={["4", "4", "6"]}>
                          <Text>{speedway.data.speedway}</Text>
                        </Td>
                        <Td>
                          <Box>
                            <Text fontWeight="bold">
                            {speedway.data.vehicles_limit}
                            </Text>
                            <Text fontSize="sm" color="gray.300">
                              
                            </Text>
                          </Box>
                        </Td>
                        {isWideVersioon && <Td>{speedway.data.description}</Td>}
  
                       
  
                        <Td>
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
                totalCountOfRegisters={total}
                currentPage={page}
                onPageChanges={setPage}
                />
                
              </>) : (<Flex w="100%" mt={"110px"} justifyContent="center"> 
                <Box justifyContent="center" mb={"36"}>
                    <Flex w="100%" justifyContent="center">
                        <Text fontSize={22} fontWeight="bold">There is not any speedway registered.</Text>         
                    </Flex>
                    <Flex w="100%" justifyContent="center">           
                <Text fontSize={18}>Register a speedway and wait the users to schedule it.</Text>
                </Flex> 
                </Box>
              </Flex>)
            )}
          </Box>
        </Flex>
      </Box>
    );
  }
  