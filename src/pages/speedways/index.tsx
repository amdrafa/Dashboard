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
  
    const [total, setTotal] = useState(0);
  
    const [speedway, setSpeedway] = useState<speedwayDataProps[]>([]);
  
    const { data, isLoading, error } = useQuery<speedwayDataProps[]>(`speedwaylist${page}`, async () => {
      const response = await api.get(`getallspeedways?page=${page}&limit=${limit}`)
      const {PaginateData: ReturnedData} = response.data;
      console.log(ReturnedData)
      
  
      let totalLenght = 0
  
      ReturnedData.map(speedway => totalLenght = totalLenght + 1)
  
      setTotal(totalLenght)
      
      return ReturnedData;
    });
  
  
    return (
      <Box>
        <Header />
  
        <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
          <Sidebar />
  
          <Box flex="1" borderRadius={8} bg="gray.800" p="8" mt={5}>
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
                <Spinner mt="10" />
              </Flex>
            ) : error ? (
              <Flex justify="center">
                <Text>The requisition failed</Text>
              </Flex>
            ) : (
              <>
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
                
              </>
            )}
          </Box>
        </Flex>
      </Box>
    );
  }
  