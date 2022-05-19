import { Flex, SimpleGrid, Box, Text, Image, VStack, Icon, Select } from "@chakra-ui/react";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';
import { useState } from "react";
import carImg from '../../public/assets/pista.png'
import { Calendar } from 'react-date-range';
import { RiCalendarLine, RiCarLine } from "react-icons/ri";




export default function Schedule(){

    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())

    const handleSelect = (ranges) => {
        setStartDate(ranges.selection.startDate);
        setEndDate(ranges.selection.endDate);
    }

    const selectionRange = {
        startDate: startDate,
        endDate: endDate,
        key: 'selection',
        
    }

    

    return (
        <Flex direction="column" h="100vh">
                <Header />

                <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
                    <Sidebar />

                    <VStack display="flex">

                        <Flex justifyContent="start" w="100%" alignItems="center" mb='6' mt="6">
                                <Icon fontSize="23" mr="2" as={RiCarLine}/>
                                <Text mb="0" fontSize={25}>Select a speedway</Text>
                        </Flex>
                    <SimpleGrid flex="1" gap="4" minChildWidth="320px" alignItems="flex-start" mb="8">
                        <Box
                        p={["6"]}
                        bg="gray.800"
                        borderRadius={8}
                        pb='4'
                        
                        >
                            
                            

                            <Box display="flex" justifyContent="space-around">
                                
                                <Flex w="594px">
                                    <Select placeholder='Select option' color="gray.300">
                                        
                                        <option value='option1'>BoschSpeedway</option>
                                        <option value='option2'>PickyBlinders Race Track</option>
                                        <option value='option3'>Street club: the movie</option>
                                    </Select>   
                                </Flex>

                                
                            </Box>
                        </Box>
                        
                    </SimpleGrid>

                    <Flex justifyContent="left" w="100%" alignItems="center" mb='3'>
                        <Icon fontSize="23" mr="2" as={RiCalendarLine} />
                        <Text mb="0" fontSize={25}>Choose a date</Text>
                    </Flex>

                    
                    <SimpleGrid flex="1" gap="4" minChildWidth="320px" alignItems="flex-start">
                        <Box
                        p={["6"]}
                        bg="gray.800"
                        borderRadius={8}
                        pb='4'
                        
                        >
                            
                            

                            <Box display="flex" justifyContent="space-around">
                                
                                <DateRangePicker 
                                    ranges={[selectionRange]}
                                    minDate={new Date()}
                                    onChange={handleSelect}
                                    className='CalendarStyle'
                                    
                                />

                                
                            </Box>
                        </Box>
                        
                    </SimpleGrid>
                    </VStack>
                    
                </Flex>
                

            </Flex>
    );
}