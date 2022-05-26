import {
  Flex,
  SimpleGrid,
  Box,
  Text,
  Image,
  VStack,
  Icon,
  Select,
  Button,
  Divider,
  Checkbox
} from "@chakra-ui/react";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker } from "react-date-range";
import { useContext, useState } from "react";
import { Calendar } from "react-date-range";
import { RiCalendarLine, RiCarLine, RiCloseCircleLine } from "react-icons/ri";
import { RiRoadMapLine } from "react-icons/ri";
import Modal from "react-modal";
import { bg } from "date-fns/locale";
import { LoginContext } from "../contexts/LoginContext";
import { api } from "../services/axios";
import Router from 'next/router'


export default function Schedule() {

  const {user} = useContext(LoginContext)

  console.log(user + '   schedule page  ' + user)

  const [speedway, setSpeedway] = useState('')
  const [vehicle, setVehicle] = useState('')
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleOpenModal() {
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
  }

  const handleSelect = (ranges) => {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
  };

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };

  

  console.log(startDate, endDate, speedway, vehicle, user);

  async function CreateSchedule(){

    
    Router.push('/dashboard')
    await api.post('scheduletime', {startDate, endDate, speedway, vehicle, user})
  }

  return (
    <Box as="form" onSubmit={CreateSchedule}>
      <Flex direction="column" h="100vh">
        <Modal
          isOpen={isModalOpen}
          onRequestClose={handleCloseModal}
          overlayClassName="react-modal-overlay"
          className="react-modal-content"
          ariaHideApp={false}
        >
          <SimpleGrid
            flex="1"
            gap="1"
            minChildWidth="320px"
            alignItems="flex-start"
          >
            <Box display="flex" justifyContent="space-around">
              <DateRangePicker
                ranges={[selectionRange]}
                minDate={new Date()}
                onChange={handleSelect}
                className="CalendarStyle"
              />
            </Box>
            <Divider mt="-5" orientation='horizontal' />
            <Box mb="1.5" display="flex" justifyContent="space-between" px="5" alignItems="center">
              <Button onClick={handleCloseModal} bg="red.600">Cancel</Button>
              <Text color="gray.600">15 de janeiro, 2022</Text> 
              
              <Button type="submit" onClick={CreateSchedule} bg="green.600">Confirm</Button>
            </Box>
          </SimpleGrid>
        </Modal>

        <Header />

        <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6" >
          <Sidebar />

          <VStack display="flex">
            <Box p={["6"]} bg="gray.800" borderRadius={8} pb="6" mt="4" >
              <Flex justifyContent="start" w="100%" alignItems="center" mb="4">
                <Icon fontSize="20" mr="2" as={RiRoadMapLine} />
                <Text mb="0" fontSize={20}>
                  Select a speedway
                </Text>
              </Flex>
              <SimpleGrid
                flex="1"
                gap="4"
                minChildWidth="320px"
                alignItems="flex-start"
                mb="8"
              >
                <Box display="flex" justifyContent="space-around">
                  <Flex w="594px">
                    <Select onChange={e => setSpeedway(e.target.value)} placeholder="Select option" color="gray.300">
                      <option value="BoschSpeedway">BoschSpeedway</option>
                      <option value="PickyBlinders Race Track">PickyBlinders Race Track</option>
                      <option value="FightClub: The movie">FightClub: The movie</option>
                    </Select>
                  </Flex>
                </Box>
              </SimpleGrid>

              <Flex
                justifyContent="start"
                w="100%"
                alignItems="center"
                mb="4"
                mt="6"
              >
                <Icon fontSize="20" mr="2" as={RiCarLine} />
                <Text mb="0" fontSize={20}>
                  Select your vehicle
                </Text>
              </Flex>
              <SimpleGrid
                flex="1"
                gap="4"
                minChildWidth="320px"
                alignItems="flex-start"
                mb="5"
              >
                <Box display="flex" justifyContent="space-around">
                  <Flex w="594px">
                    <Select onChange={e => setVehicle(e.target.value)} placeholder="Select option" color="gray.300">
                      <option value="Car">Car</option>
                      <option value="Truck">Truck</option>
                      <option value="Motorcycle">Motorcycle</option>
                    </Select>
                  </Flex>
                </Box>
              </SimpleGrid>

              

              <Flex mb="7">
                <Checkbox mr="2"/>
                <Text color="gray.200" fontSize="15">
                  I read and accepted the terms.
                </Text>
              </Flex>

              <Flex justify="space-between">
              <Button
                  
                  colorScheme="red"
                  borderRadius={8}
                  w="30"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  onClick={handleOpenModal}
                >
                  <Text fontSize="14" fontWeight="500">
                    Go to my requests
                  </Text>
                </Button>

                <Button
                  
                  colorScheme="green"
                  borderRadius={8}
                  w="23"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  onClick={handleOpenModal}
                >
                  <Text fontSize="14" fontWeight="500">
                    Search avaiable dates
                  </Text>
                </Button>
              </Flex>
            </Box>
            
          </VStack>
          
          <Image ml="20" boxSize='400px' src='/images/pista.png' alt='Dan Abramov'/>
          
        </Flex>

        

        <Flex justifyContent="center" pl="40" w="100%" mt="20">
          
        </Flex>
        
      </Flex>
    </Box>
    
  );
}
