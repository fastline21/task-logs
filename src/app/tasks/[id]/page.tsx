"use client";

import { useQuery } from "@tanstack/react-query";
import {
    Container,
    Box,
    Text,
    TableContainer,
    Table,
    Thead,
    Tr,
    Th,
    Tbody,
    Td,
    useToast,
} from "@chakra-ui/react";
import { useParams } from "next/navigation";

import { getSingleTaskByID } from "@/controllers/tasks.controller";

import CircleProgress from "@/components/Loading/CircleProgress";

import { getDateFormat } from "@/utils/date-helper";

import { TIME_FORMAT, DATE_FORMAT } from "@/constants/date-time-format";

const SingleTaskPage = () => {
    const toast = useToast();

    const { id: taskID } = useParams();

    const TaskQuery = useQuery({
        queryKey: ["TaskDatum", taskID],
        queryFn: async () =>
            getSingleTaskByID({
                payload: {
                    id: taskID,
                },
            }),
    });
    if (TaskQuery.error) {
        return <p>An error has occurred: {JSON.stringify(TaskQuery.error)}</p>;
    }

    if (TaskQuery.isLoading) {
        return <CircleProgress isLoading={TaskQuery.isLoading} />;
    }

    const handleCopyData = (data: string) => {
        navigator.clipboard.writeText(data);

        toast({
            title: "Copied!",
            position: "top-right",
            status: "success",
        });
    };

    return (
        <>
            <Container maxW="container.md">
                <Box my="3">
                    <Text
                        fontSize="3xl"
                        onClick={() =>
                            handleCopyData(TaskQuery.data.description)
                        }
                        className="pointer"
                    >
                        {TaskQuery.data.description}
                    </Text>
                </Box>
                <Box my="3">
                    <Text fontSize="md">
                        <span
                            onClick={() =>
                                handleCopyData(TaskQuery.data.service.name)
                            }
                            className="pointer"
                        >
                            {TaskQuery.data.service.name}
                        </span>{" "}
                        -{" "}
                        <span
                            onClick={() =>
                                handleCopyData(TaskQuery.data.source.name)
                            }
                            className="pointer"
                        >
                            {TaskQuery.data.source.name}
                        </span>
                    </Text>
                </Box>
                <Box my="3">
                    <TableContainer>
                        <Table variant="simple">
                            <Thead>
                                <Tr>
                                    <Th>Field</Th>
                                    <Th>Full Name</Th>
                                    <Th>Standard</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                <Tr>
                                    <Td>Date</Td>
                                    <Td
                                        onClick={() =>
                                            handleCopyData(
                                                getDateFormat({
                                                    date: TaskQuery.data
                                                        .task_date_start,
                                                    formatDate:
                                                        DATE_FORMAT.FULL_NAME,
                                                })
                                            )
                                        }
                                        className="pointer"
                                    >
                                        {getDateFormat({
                                            date: TaskQuery.data
                                                .task_date_start,
                                            formatDate: DATE_FORMAT.FULL_NAME,
                                        })}
                                    </Td>
                                    <Td
                                        onClick={() =>
                                            handleCopyData(
                                                getDateFormat({
                                                    date: TaskQuery.data
                                                        .task_date_start,
                                                    formatDate:
                                                        DATE_FORMAT.STANDARD,
                                                })
                                            )
                                        }
                                        className="pointer"
                                    >
                                        {getDateFormat({
                                            date: TaskQuery.data
                                                .task_date_start,
                                            formatDate: DATE_FORMAT.STANDARD,
                                        })}
                                    </Td>
                                </Tr>
                            </Tbody>
                            <Thead>
                                <Tr>
                                    <Th>Field</Th>
                                    <Th>12 Hours</Th>
                                    <Th>24 Hours</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                <Tr>
                                    <Td>Time Start</Td>
                                    <Td
                                        onClick={() =>
                                            handleCopyData(
                                                getDateFormat({
                                                    date: TaskQuery.data
                                                        .task_date_start,
                                                    formatDate:
                                                        TIME_FORMAT.TWELVE_HOURS,
                                                })
                                            )
                                        }
                                        className="pointer"
                                    >
                                        {getDateFormat({
                                            date: TaskQuery.data
                                                .task_date_start,
                                            formatDate:
                                                TIME_FORMAT.TWELVE_HOURS,
                                        })}
                                    </Td>
                                    <Td
                                        onClick={() =>
                                            handleCopyData(
                                                getDateFormat({
                                                    date: TaskQuery.data
                                                        .task_date_start,
                                                    formatDate:
                                                        TIME_FORMAT.TWENTY_FOUR_HOURS,
                                                })
                                            )
                                        }
                                        className="pointer"
                                    >
                                        {getDateFormat({
                                            date: TaskQuery.data
                                                .task_date_start,
                                            formatDate:
                                                TIME_FORMAT.TWENTY_FOUR_HOURS,
                                        })}
                                    </Td>
                                </Tr>
                                <Tr>
                                    <Td>Time End</Td>
                                    <Td
                                        onClick={() =>
                                            handleCopyData(
                                                getDateFormat({
                                                    date: TaskQuery.data
                                                        .task_date_end,
                                                    formatDate:
                                                        TIME_FORMAT.TWELVE_HOURS,
                                                })
                                            )
                                        }
                                        className="pointer"
                                    >
                                        {getDateFormat({
                                            date: TaskQuery.data.task_date_end,
                                            formatDate:
                                                TIME_FORMAT.TWELVE_HOURS,
                                        })}
                                    </Td>
                                    <Td
                                        onClick={() =>
                                            handleCopyData(
                                                getDateFormat({
                                                    date: TaskQuery.data
                                                        .task_date_end,
                                                    formatDate:
                                                        TIME_FORMAT.TWENTY_FOUR_HOURS,
                                                })
                                            )
                                        }
                                        className="pointer"
                                    >
                                        {getDateFormat({
                                            date: TaskQuery.data.task_date_end,
                                            formatDate:
                                                TIME_FORMAT.TWENTY_FOUR_HOURS,
                                        })}
                                    </Td>
                                </Tr>
                            </Tbody>
                        </Table>
                    </TableContainer>
                </Box>
            </Container>
        </>
    );
};

export default SingleTaskPage;
