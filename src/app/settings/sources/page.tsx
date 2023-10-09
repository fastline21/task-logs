"use client";

import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Container,
    Box,
    Text,
    Button,
    Flex,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import NextLink from "next/link";

import { getAllSources } from "@/controllers/sources.controller";

import CircleProgress from "@/components/Loading/CircleProgress";

const SourcesPage = () => {
    const SourceQuery = useQuery({
        queryKey: ["SourceData"],
        queryFn: async () => getAllSources(),
    });

    return (
        <>
            <CircleProgress isLoading={SourceQuery.isLoading} />
            <Container maxW="container.md">
                <Box>
                    <Text fontSize="5xl">Sources</Text>
                </Box>
                <Box my="3">
                    <Button
                        color="teal.500"
                        href="/settings/sources/create"
                        as={NextLink}
                    >
                        Create New Source
                    </Button>
                </Box>
                <Box>
                    <TableContainer>
                        <Table variant="simple">
                            <Thead>
                                <Tr>
                                    <Th>#</Th>
                                    <Th>Name</Th>
                                    <Th>Actions</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {SourceQuery.data?.data.data.map(
                                    (datum: any, key: any) => (
                                        <Tr key={key}>
                                            <Td>{key + 1}</Td>
                                            <Td>{datum.name}</Td>
                                            <Td>
                                                <Flex
                                                    minWidth="max-content"
                                                    alignItems="center"
                                                    gap="2"
                                                >
                                                    <Box>
                                                        <Button>View</Button>
                                                    </Box>
                                                    <Box>
                                                        <Button>Edit</Button>
                                                    </Box>
                                                    <Box>
                                                        <Button>Delete</Button>
                                                    </Box>
                                                </Flex>
                                            </Td>
                                        </Tr>
                                    )
                                )}
                            </Tbody>
                        </Table>
                    </TableContainer>
                </Box>
            </Container>
        </>
    );
};

export default SourcesPage;
