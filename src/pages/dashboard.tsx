import { Flex, SimpleGrid, Box, Text, theme, Button, Checkbox, Heading, Icon, Link, Table, Tbody, Td, Th, Thead, Tr, useBreakpointValue, Divider } from "@chakra-ui/react";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import dynamic from "next/dynamic";
import { SiOpenaigym } from "react-icons/si";
import { Pagination } from "../components/Pagination";
import { BiShapeSquare } from "react-icons/bi";

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
                    <Divider />
                    
                
                </Flex>
                <Flex justify="center">
                    <Flex w="200px"></Flex>
                    <Flex justify="center" alignItems="center" mt="60px">
                        <Icon color="blue.500" shadow="inherit" fontSize="35" mr="2" as={SiOpenaigym} />
                        <Text color="whiteAlpha.800" shadow="inherit" fontSize="25" fontWeight="bold">Control Room</Text>
                    </Flex>
                    
                </Flex>

            
            </Flex>


            
            
        </div>
    )   
}