'use client';

import { Box, Text, Container } from '@chakra-ui/react';
import Image from 'next/image';

const HomePage = () => {
    return (
        <Container maxW="container.md">
            <Box>
                <Image
                    src={'/next.svg'}
                    alt="next logo"
                    width={100}
                    height={100}
                />
                <Text fontSize="5xl">Home Page</Text>
            </Box>
        </Container>
    );
};

export default HomePage;
