"use client";

import { useQuery } from "@tanstack/react-query";
import NextLink from "next/link";
import {
    Card,
    CardBody,
    Heading,
    Text,
    Box,
    Button,
    HStack,
    FormControl,
    FormLabel,
    Input,
    Container,
    Wrap,
    WrapItem,
    Flex,
    Spacer,
} from "@chakra-ui/react";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useSession } from "next-auth/react";

import { getAllTasksBySearchDate } from "@/controllers/tasks.controller";

import { getDateFormat } from "@/utils/date-helper";

import CircleProgress from "@/components/Loading/CircleProgress";

const TasksPage = () => {
    const { data: session } = useSession();

    const searchParams = useSearchParams();
    const router = useRouter();
    const [currentDate, setCurrentDate] = useState(
        getDateFormat({
            date: searchParams.get("date") || null,
        })
    );

    const TaskQuery = useQuery({
        queryKey: ["TaskData", currentDate],
        queryFn: async () =>
            getAllTasksBySearchDate({
                payload: {
                    task_date: currentDate,
                },
            }),
    });

    if (TaskQuery.error) {
        return <p>An error has occurred: {JSON.stringify(TaskQuery.error)}</p>;
    }

    const handleCurrentDateChange = (event: any) => {
        const { value } = event.target;
        setCurrentDate(value);

        if (value !== getDateFormat({})) {
            router.push(`/tasks/?date=${value}`);
        } else {
            router.push("/tasks");
        }
    };

    const handleSingleTask = (id: string) => {
        router.push(`/tasks/${id}`);
    };

    return (
        <>
            <CircleProgress isLoading={TaskQuery.isLoading} />
            <Container maxW="container.md">
                <Box my="3">
                    <Text fontSize="5xl">Welcome back!</Text>
                    <Text fontSize="3xl">{session?.user?.name}</Text>
                </Box>
                <Box my="3">
                    <FormControl>
                        <FormLabel>Task Date</FormLabel>
                        <Input
                            type="date"
                            value={currentDate}
                            onChange={handleCurrentDateChange}
                        />
                    </FormControl>
                </Box>
                <Box my="3">
                    <Button color="teal.500" href="/tasks/create" as={NextLink}>
                        Create New Task
                    </Button>
                </Box>
                <Box>
                    <Wrap spacing="10px">
                        {TaskQuery.data?.map((datum: any, key: any) => (
                            <WrapItem key={key}>
                                <Card
                                    width="238px"
                                    onClick={() => handleSingleTask(datum.id)}
                                    className="pointer"
                                >
                                    <CardBody>
                                        <Heading size="md">
                                            {getDateFormat({
                                                date: datum.task_date_start,
                                                formatDate: "MMMM dd, yyyy",
                                            })}
                                        </Heading>
                                        <Box>
                                            <Text>
                                                {getDateFormat({
                                                    date: datum.task_date_start,
                                                    formatDate: "hh:mm b",
                                                })}{" "}
                                                -{" "}
                                                {getDateFormat({
                                                    date: datum.task_date_end,
                                                    formatDate: "hh:mm b",
                                                })}
                                            </Text>
                                        </Box>
                                        <Box>
                                            <Text>{datum.description}</Text>
                                        </Box>
                                        <Box>
                                            <HStack spacing="12px">
                                                <Box
                                                    p="2"
                                                    bg="teal.50"
                                                    color="teal.400"
                                                    borderRadius="xl"
                                                >
                                                    <Text fontWeight="bold">
                                                        {datum.source.name}
                                                    </Text>
                                                </Box>

                                                <Box
                                                    p="2"
                                                    bg="blue.50"
                                                    color="blue.400"
                                                    borderRadius="xl"
                                                >
                                                    <Text fontWeight="bold">
                                                        {datum.service.name}
                                                    </Text>
                                                </Box>
                                            </HStack>
                                        </Box>
                                    </CardBody>
                                </Card>
                            </WrapItem>
                        ))}
                    </Wrap>
                </Box>
            </Container>
        </>
    );
};

export default TasksPage;
