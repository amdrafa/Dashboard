import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  VStack,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { Input } from "../../components/Form/input";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { api } from "../../services/axios";
import Router from "next/router";
import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../../contexts/LoginContext";
import { toast } from "react-toastify";
import { ChooseConfig } from "../../components/ChooseConfig";
import { RiCarLine, RiContactsLine } from "react-icons/ri";
import { MdOutlineBadge } from "react-icons/md";
import { BiBuilding } from "react-icons/bi";


export default function Configurations() {

  return (
    <Box mt={-3} ml={-4}>
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <Box
          as="form"
          flex="1"
          height={"100%"}
          borderRadius={8}
          bg="gray.800"
          p="8"
          pb={'16'}
          mt={5}
        >
          <Heading size="lg" fontWeight="normal">
            Configurations
          </Heading>

          <Divider my="6" borderColor="gray.700" />

          <VStack spacing="8">
            <SimpleGrid minChildWidth="240px" spacing="8" w="100%">
              <ChooseConfig
                icon={RiContactsLine}
                vehicleType="Personal Informations"
                onClick={() => {}}
                isActive={false}
              />

              <ChooseConfig
                icon={MdOutlineBadge}
                vehicleType="Driver Licence"
                onClick={() => {}}
                isActive={false}
              />

              <ChooseConfig
                icon={BiBuilding}
                vehicleType="Company details"
                onClick={() => {}}
                isActive={false}
              />

            </SimpleGrid>
          </VStack>

          
        </Box>
      </Flex>
    </Box>
  );
}
