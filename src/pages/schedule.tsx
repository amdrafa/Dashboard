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
  Checkbox,
  Heading,
  HStack,
  Input,
  Link,
  
  Link as ChakraLink,
} from "@chakra-ui/react";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker } from "react-date-range";
import { useContext, useState } from "react";
import { Calendar } from "react-date-range";
import {
  RiCalendarLine,
  RiCarLine,
  RiCloseCircleLine,
  RiMotorbikeLine,
} from "react-icons/ri";
import { GiMineTruck } from "react-icons/gi";
import { FaTruckMonster } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import Modal from "react-modal";
import { LoginContext } from "../contexts/LoginContext";
import { api } from "../services/axios";
import Router from "next/router";
import { errors } from "faunadb";
import { ChooseVehicle } from "../components/ChooseVehicle";

export default function Schedule() {
  //const { user } = useContext(LoginContext);

  //console.log(user + "   schedule page  " + user);

  const [speedway, setSpeedway] = useState("");
  const [vehicle, setVehicle] = useState("Light vehicle");
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

  console.log(startDate, endDate, speedway, vehicle);

  async function CreateSchedule() {
    Router.push("/dashboard");
    await api.post("scheduletime", {
      startDate,
      endDate,
      speedway,
      vehicle,
      
    });
  }

  return (
    <>
      <Header />
      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <Box as="form" flex="1" borderRadius={8} bg="gray.800" p="8" mt={5} onSubmit={CreateSchedule}>
          <Heading size="lg" fontWeight="normal">
            Schedule
          </Heading>

          <Divider my="6" borderColor="gray.700" />

          <VStack spacing="8">
            <Text w="100%" fontSize="20">
              Select a vehicle:
            </Text>

            <SimpleGrid minChildWidth="240px" spacing="8" w="100%">
              <ChooseVehicle
                icon={RiCarLine}
                vehicleType="Light vehicle"
                onClick={() => {setVehicle('Light vehicle')}}
                isActive={vehicle == "Light vehicle"}
                
              />

              <ChooseVehicle
                icon={FaTruckMonster}
                vehicleType="Heavy vehicle"
                onClick={() => {setVehicle('Heavy vehicle')}}
                isActive={vehicle == "Heavy vehicle"}
              />

              <ChooseVehicle
                icon={GiMineTruck}
                vehicleType="Truck"
                onClick={() => {setVehicle('Truck')}}
                isActive={vehicle == "Truck"}
              />

              <ChooseVehicle
                icon={RiMotorbikeLine}
                vehicleType="Motorcycle"
                onClick={() => {setVehicle('Motorcycle')}}
                isActive={vehicle == 'Motorcycle'}
              />
            </SimpleGrid>

            <Text ml="1" w="100%" fontSize="18">
              Speedway
            </Text>
            <SimpleGrid minChildWidth="240px" spacing="8" w="100%">
              <Select
                mt="-4"
                onChange={(e) => setSpeedway(e.target.value)}
                placeholder="Select option"
                color="gray.300"
                bg="gray.900"
                border="none"
                height="45px"
                
              >
                <option value="BoschSpeedway">BoschSpeedway</option>
                <option value="PickyBlinders Race Track">
                  PickyBlinders Race Track
                </option>
                <option value="FightClub: The movie">
                  FightClub: The movie
                </option>
              </Select>
            </SimpleGrid>

            <SimpleGrid minChildWidth="240px" spacing="8" w="100%">
              <Flex
                background="gray.900"
                p="3"
                borderRadius="lg"
                alignItems="center"
                shadow="md"
                color="gray.100"
                justify="space-between"
                onClick={handleOpenModal}
                cursor="pointer"
              >
                <Flex>
                  <Icon
                    as={RiCalendarLine}
                    fontSize="25"
                    mr="2"
                    color="gray.200"
                  />
                  <Text color="gray.200">{startDate.toDateString()}</Text>
                </Flex>
                <Icon as={IoMdArrowDropdown} fontSize="25" mr="2" />
              </Flex>

              <Flex
                background="gray.900"
                p="3"
                borderRadius="lg"
                alignItems="center"
                shadow="md"
                color="gray.100"
                justify="space-between"
                onClick={handleOpenModal}
                cursor="pointer"
              >
                <Flex>
                  <Icon
                    color="gray.200"
                    as={RiCalendarLine}
                    fontSize="25"
                    mr="2"
                  />
                  <Text color="gray.200">{endDate.toDateString()}</Text>
                </Flex>
                <Icon as={IoMdArrowDropdown} fontSize="25" mr="2" />
              </Flex>
            </SimpleGrid>
          </VStack>

          <Flex mt="8" justify="flex-end">
            <HStack spacing="4">
              <Link href="/dashboard" passHref>
                <Button as={"a"} colorScheme="whiteAlpha">
                  Cancel
                </Button>
              </Link>
              <Button type="submit" colorScheme="blue">
                Save
              </Button>
            </HStack>
          </Flex>
        </Box>
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
            <Divider mt="-5" orientation="horizontal" />
            <Box
              mb="1.5"
              display="flex"
              justifyContent="space-between"
              px="5"
              alignItems="center"
            >
              <ChakraLink href="/dashboard" passHref>
                <Button onClick={handleCloseModal} bg="red.600">
                  Dashboard
                </Button>
              </ChakraLink>

              <Text color="gray.600">15 de janeiro, 2022</Text>

              <Button type="submit" onClick={handleCloseModal} bg="green.600">
                Continue
              </Button>
            </Box>
          </SimpleGrid>
        </Modal>
      </Flex>
    </>
  );
}
