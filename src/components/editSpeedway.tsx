import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import Modal from "react-modal";
import Link from "next/link";
import { Input } from "../components/Form/input";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { api } from "../services/axios";
import Router from "next/router";
import { toast, ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";

type EditSpeedwayFormData = {
  speedway: string;
  vehicles_limit: number;
  description: string;
  speedwayId: string;
  setIsEditMode: React.Dispatch<React.SetStateAction<boolean>>;
};

const EditSpeedwayFormSchema = yup.object().shape({
  speedway: yup.string().required(),
  vehicles_limit: yup.number().required(),
  description: yup.string().required().min(10, "Minimum 10 letters."),
});

export default function EditSpeedway({
  speedway,
  description,
  vehicles_limit,
  setIsEditMode,
  speedwayId,
}: EditSpeedwayFormData) {
  const { register, handleSubmit, formState, resetField } = useForm({
    resolver: yupResolver(EditSpeedwayFormSchema),
  });

  const { errors } = formState;

  const handleEditSpeedway: SubmitHandler<EditSpeedwayFormData> = async ({
    speedway,
    vehicles_limit,
    description,
  }) => {
    await api
      .put("editspeedway", {
        data: speedway,
        vehicles_limit,
        description,
        speedwayId,
      })
      .then((response) => {
        toast.success("Speedway updated");
      })
      .catch((err) => {
        toast.error("Company name already registered");
      });
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Box
      as="form"
      flex="1"
      height={"100%"}
      borderRadius={8}
      bg="gray.800"
      p="8"
      mt={5}
      onSubmit={handleSubmit(handleEditSpeedway)}
    >
      <Heading size="lg" fontWeight="normal">
        Edit speedway
      </Heading>

      <Divider my="6" borderColor="gray.700" />

      <VStack spacing="8">
        <SimpleGrid minChildWidth="240px" spacing="8" w="100%">
          <Input
            name="speedway"
            label="Speedway name"
            {...register("speedway")}
            error={errors.speedway}
            defaultValue={speedway}
          />
          <Input
            type="number"
            name="vehicles_limit"
            label="Vehicles limit"
            {...register("vehicles_limit")}
            error={errors.vehicles_limit}
            defaultValue={vehicles_limit}
          />
        </SimpleGrid>

        <SimpleGrid minChildWidth="240px" spacing="8" w="100%">
          <Input
            height="100"
            name="description"
            label="Description"
            {...register("description")}
            error={errors.description}
            defaultValue={description}
          />
        </SimpleGrid>
      </VStack>

      <Flex mt="8" justify="space-between">

      <Button
            cursor={"pointer"}
            onClick={() => {
              setIsEditMode(false);
            }}
            as={"a"}
            colorScheme="whiteAlpha"
          >
            Cancel
          </Button>

      <Flex>
        <HStack spacing="4">
        <Button
            isLoading={formState.isSubmitting}
            colorScheme="red"
            onClick={() => setIsModalOpen(true)}
          >
            Delete
          </Button>
          

          <Button
            isLoading={formState.isSubmitting}
            type="submit"
            colorScheme="blue"
          >
            Save
          </Button>
          
        </HStack>
        </Flex>
      </Flex>
      <Modal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
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
              <Text>Are u sure</Text>
            </Box>
            <Divider mt="-5" orientation="horizontal" />
            <Box
              mb="1.5"
              display="flex"
              justifyContent="space-between"
              px="5"
              alignItems="center"
            >
             

              

              <Button type="submit" onClick={() => setIsModalOpen(false)} bg="green.600">
                Continue
              </Button>
            </Box>
          </SimpleGrid>
        </Modal>
    </Box>
  );
}
