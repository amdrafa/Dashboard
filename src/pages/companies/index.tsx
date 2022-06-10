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
import { parseCookies } from "nookies";
import { decode } from "jsonwebtoken";

export type DecodedToken = {
  sub: string;
  iat: number;
  exp: number;
  roles: string[];
  name: string;
}

interface companyDataProps {
  data: companyProps;
  ref: string;
  ts: number;
}

interface companyProps {
  company: string;
  cnpj: string;
  responsable_name: string;
  email: string;
  companySecretKey: string;
  createdAt: string;
}


export default function CompanyList() {
    
  const isWideVersioon = useBreakpointValue({
    base: false,
    lg: true,
  });

  const [page, setPage] = useState(1);

  const [limit, setLimit] = useState(5);

  const [total, setTotal] = useState(0);

  const [companies, setCompanies] = useState<companyDataProps[]>([]);

  const { data, isLoading, error } = useQuery<companyDataProps[]>(`companylist${page}`, async () => {
    const response = await api.get(`getallcompanies?page=${page}&limit=${limit}`)
    const {PaginateData: ReturnedData} = response.data;
    console.log(ReturnedData)
    

    let totalLenght = 0

    ReturnedData.map(company => totalLenght = totalLenght + 1)

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
              Company list
            </Heading>

            <Link href="/companies/create" passHref>
              <Button
                as="a"
                size="sm"
                fontSize="sm"
                colorScheme="blue"
                leftIcon={<Icon as={RiAddLine} fontSize="20" />}
              >
                Add a new company
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
                      <Text>Company</Text>
                    </Th>

                    <Th px={["4", "4", "6"]} width="">
                      <Text>Responsable</Text>
                    </Th>

                    <Th>CNPJ</Th>

                    {isWideVersioon && <Th>Register date</Th>}
                    <Th w="8"></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {data.map((company) => (
                    <Tr key={company.data.companySecretKey}>
                      <Td px={["4", "4", "6"]}>
                        <Text>{company.data.company}</Text>
                      </Td>
                      <Td>
                        <Box>
                          <Text fontWeight="bold">
                            {company.data.responsable_name}
                          </Text>
                          <Text fontSize="sm" color="gray.300">
                            {company.data.email}
                          </Text>
                        </Box>
                      </Td>
                      {isWideVersioon && <Td>{company.data.cnpj}</Td>}

                      {isWideVersioon && <Td>{company.data.createdAt}</Td>}

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



export const getServerSideProps: GetServerSideProps = async (ctx) => {

  // const {auth} = parseCookies(ctx)

  // const decodedUser = decode(auth as string) as DecodedToken;

  // const necessaryRoles = ['ADMINISTRATOR']
  
  // if(necessaryRoles?.length > 0){
  //   const hasAllRoles = necessaryRoles.some(role => {
  //     return decodedUser.roles.includes(role)
  // });

  // if(!hasAllRoles){
  //   console.log(hasAllRoles)
  //   return {
  //     redirect: {
  //       destination: '/dashboard',
  //       permanent: false
  //     }
  //   }
  // }
  // }

  
  

  return {
    props: {}
  }
}