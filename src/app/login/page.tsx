"use client";

import { Box, Button, Container, Text } from "@chakra-ui/react";
import { signIn, getProviders } from "next-auth/react";
import { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";

import CircleProgress from "@/components/Loading/CircleProgress";

const LoginPage = () => {
    const [providers, setProviders] = useState<any>(null);

    useEffect(() => {
        (async () => {
            const res = await getProviders();
            setProviders(res);
        })();
    }, []);

    const Icon = ({ name }: { name: string }) => {
        if (name === "Google") {
            return <FcGoogle />;
        }
        return "";
    };

    return (
        <>
            <CircleProgress isLoading={!providers} />
            <Container maxW="container.md">
                <Box>
                    <Text fontSize="5xl">Login Page</Text>
                </Box>
                <Box>
                    {providers &&
                        Object.values(providers).map((provider: any) => (
                            <Button
                                key={provider.name}
                                onClick={() => {
                                    signIn(provider.id, {
                                        redirect: true,
                                        callbackUrl: "/tasks",
                                    });
                                }}
                                leftIcon={<Icon name={provider.name} />}
                            >
                                {provider.name}
                            </Button>
                        ))}
                </Box>
            </Container>
        </>
    );
};

export default LoginPage;
