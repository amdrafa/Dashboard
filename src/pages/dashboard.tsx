import { Flex, SimpleGrid, Box, Text, theme, Button, Checkbox, Heading, Icon, Link, Table, Tbody, Td, Th, Thead, Tr, useBreakpointValue, Divider, Spinner } from "@chakra-ui/react";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import dynamic from "next/dynamic";
import { SiOpenaigym } from "react-icons/si";
import { Pagination } from "../components/Pagination";
import { BiShapeSquare } from "react-icons/bi";
import { api } from "../services/axios";
import { useState } from "react";
import { useQuery } from "react-query";
import { RiAddLine, RiPencilLine } from "react-icons/ri";


interface appointmentsDataProps {
    data: appointmentProps;
    ref: string;
    ts: number;
  }
  
  interface appointmentProps {
    speedway: string;
    startDate: string;
    endDate: string;
    vehicle: string;
  }



const Chart = dynamic( async () => await import('react-apexcharts'), {
    ssr: false,
})

const options = {
    chart: {
        toolbar: {
            show: false
        },
        zoom: {
            enabled: false,
        },
        forecolor: theme.colors.gray[500]
    },
    grid: {
        show: false
    },
    dataLabels: {
        enabled: false,
    },
    tooltip: {
        enabled: false,
    },
    xaxis: {
        
        axisBorder: {
            color: theme.colors.gray[600]
        },
        axisTicks: {
            color: theme.colors.gray[600]
        },
        categories: [
      
            new Date("2022-03-23T00:00:00.000Z").toLocaleString('pt-BR', { day: "2-digit", month: "short" }),
            new Date("2022-03-24T00:00:00.000Z").toLocaleString('pt-BR', { day: "2-digit", month: "short" }),
            new Date("2022-03-25T00:00:00.000Z").toLocaleString('pt-BR', { day: "2-digit", month: "short" }),
            new Date("2022-03-26T00:00:00.000Z").toLocaleString('pt-BR', { day: "2-digit", month: "short" }),
            new Date("2022-03-27T00:00:00.000Z").toLocaleString('pt-BR', { day: "2-digit", month: "short" }),
            new Date("2022-03-28T00:00:00.000Z").toLocaleString('pt-BR', { day: "2-digit", month: "short" }),
            new Date("2022-03-29T00:00:00.000Z").toLocaleString('pt-BR', { day: "2-digit", month: "short" })
          ],
    },

    fill: {
        opacity: 0.3,
        type: 'gradient',
        gradient: {
            shade:'dark',
            opacityFrom: 0.7,
            opacityTo: 0.3
        }
    }
};

const series = [
    {name: 'series1', data: [31, 120, 10, 28, 61, 18, 109]}
];







export default function Dashboard(){

    const isWideVersioon = useBreakpointValue({
        base: false,
        lg: true,
    })


    const [page, setPage] = useState(1);

  const [limit, setLimit] = useState(5);

  const [total, setTotal] = useState(0);

  const [companies, setCompanies] = useState<appointmentsDataProps[]>([]);

  const { data, isLoading, error } = useQuery<appointmentsDataProps[]>(`appointmentslist${page}`, async () => {
    const response = await api.get(`getalluserappointments?page=${page}&limit=${limit}`)
    const {PaginateData: ReturnedData, totalcount} = response.data;
    console.log(ReturnedData)
    

    let totalLenght = 0

    ReturnedData.map(company => totalLenght = totalLenght + 1)

    setTotal(totalcount)
    console.log(totalLenght)
    return ReturnedData;
  });



    return (
        <div>
            <Flex direction="column" h="100vh">
                <Header />

                <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
                    <Sidebar />

                    <SimpleGrid flex="1" gap="4" minChildWidth="320px" alignItems="flex-start" mt="6" >
                        <Box
                        p={["6", "8"]}
                        bg="gray.800"
                        borderRadius={8}
                        pb='4'
                        >
                            <Text fontSize="lg"  mb="4">
                                New customers
                            </Text>
                            <Chart options={options} series={series} type="area" height={160}/>
                        </Box>

                        <Box
                        p={["6", "8"]}
                        bg="gray.800"
                        borderRadius={8}
                        pb='4'
                        >
                            <Text fontSize="lg" mb="4">
                                Speedway usage
                            </Text>
                            <Chart options={options} series={series} type="area" height={160}/>
                        </Box>
                        
                    </SimpleGrid>

                    
                </Flex>

                
                <Flex w="100%" my="0" maxWidth={1480} mx="auto" px="6" opacity={0.3}>
                    <Flex w="270px"></Flex>
                    
                    
                
                </Flex>
                <Flex justify="center">
                    <Flex w="200px"></Flex>
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
                      <Text>Speedway</Text>
                    </Th>

                    <Th px={["4", "4", "6"]} width="">
                      <Text>From</Text>
                    </Th>

                    <Th>To</Th>

                    {isWideVersioon && <Th>Vehicle</Th>}
                    <Th px={["4", "4", "6"]} width="">
                      <Text>Status</Text>
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {data.map((appointment) => (
                    <Tr key={appointment.data.speedway}>
                      <Td px={["4", "4", "6"]}>
                        <Text>{appointment.data.speedway}</Text>
                      </Td>
                      <Td>
                          <Text fontWeight="bold">
                            {appointment.data.startDate}
                          </Text>
                      </Td>
                      {isWideVersioon && <Td>{appointment.data.endDate}</Td>}

                      {isWideVersioon && <Td>{appointment.data.vehicle}</Td>}

                      <Td>
                          <Text fontWeight="bold" color={"green.400"}>
                            Confirmed
                          </Text>
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

            
            </Flex>


            
            
        </div>
    )   
}