'use client';

import {
  Text,
  Box,
  Container,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button,
  WrapItem,
  Card,
  CardBody,
} from '@chakra-ui/react';
import NextLink from 'next/link';

const SettingsPage = () => {
  return (
    <>
      <Container maxW="container.md">
        <Box my="3">
          <Text fontSize="5xl">Settings</Text>
        </Box>
        <Box my="3">
          <Button href="/settings/services" as={NextLink}>
            Services
          </Button>
        </Box>
        <Box my="3">
          <Button href="/settings/sources" as={NextLink}>
            Sources
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default SettingsPage;
