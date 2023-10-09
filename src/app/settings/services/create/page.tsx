"use client";

import {
    Button,
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
    Box,
    useToast,
    Container,
    Text,
    Flex,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { addService } from "@/controllers/services.controller";

import CircleProgress from "@/components/Loading/CircleProgress";

interface FormInterface {
    name: String;
    description: String;
}

const CreateServicePage = () => {
    const toast = useToast();
    const { push } = useRouter();

    const ServiceQuery = useForm<FormInterface>({
        defaultValues: {
            name: "",
            description: "",
        },
    });

    const ServiceMutation = useMutation({
        mutationFn: (event: { name: String; description: String }) => {
            return addService({ payload: event });
        },
        onSuccess: (res) => {
            toast({
                title: res.data.message,
                position: "top-right",
                status: "success",
            });
            push("/settings/services");
        },
    });

    const onSubmit = (event: FormInterface) => {
        ServiceMutation.mutate(event);
    };

    return (
        <>
            <CircleProgress isLoading={ServiceMutation.isLoading} />
            <Container maxW="container.md">
                <Box>
                    <Text fontSize="5xl">Create Service</Text>
                </Box>
                <Box>
                    <form onSubmit={ServiceQuery.handleSubmit(onSubmit)}>
                        <Box my="3">
                            <FormControl
                                isInvalid={
                                    ServiceQuery.formState.errors.name
                                        ? true
                                        : false
                                }
                            >
                                <FormLabel>Name</FormLabel>
                                <Input
                                    type="text"
                                    {...ServiceQuery.register("name", {
                                        required: "Name is required",
                                    })}
                                />
                                <FormErrorMessage>
                                    {
                                        ServiceQuery.formState.errors.name
                                            ?.message
                                    }
                                </FormErrorMessage>
                            </FormControl>
                        </Box>
                        <Box my="3">
                            <FormControl
                                isInvalid={
                                    ServiceQuery.formState.errors.description
                                        ? true
                                        : false
                                }
                            >
                                <FormLabel>Description</FormLabel>
                                <Input
                                    type="text"
                                    {...ServiceQuery.register("description")}
                                />
                                <FormErrorMessage>
                                    {
                                        ServiceQuery.formState.errors
                                            .description?.message
                                    }
                                </FormErrorMessage>
                            </FormControl>
                        </Box>
                        <Box my="3">
                            <Flex
                                minWidth="max-content"
                                alignItems="center"
                                gap="2"
                            >
                                <Box>
                                    <Button
                                        as={NextLink}
                                        href="/settings/services"
                                        color="blue.500"
                                    >
                                        Cancel
                                    </Button>
                                </Box>
                                <Box>
                                    <Button type="submit" colorScheme="blue">
                                        Submit
                                    </Button>
                                </Box>
                            </Flex>
                        </Box>
                    </form>
                </Box>
            </Container>
        </>
    );
};

export default CreateServicePage;
