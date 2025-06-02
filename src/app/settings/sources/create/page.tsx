'use client';

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
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

import { addSource } from '@/controllers/sources.controller';

import CircleProgress from '@/components/Loading/CircleProgress';

interface FormInterface {
  name: String;
  description: String;
}

const CreateSourcePage = () => {
  const toast = useToast();
  const { push } = useRouter();

  const SourceQuery = useForm<FormInterface>({
    defaultValues: {
      name: '',
      description: '',
    },
  });

  const SourceMutation = useMutation({
    mutationFn: (event: { name: String; description: String }) => {
      return addSource({ payload: event });
    },
    onSuccess: (res) => {
      toast({
        title: res.data.message,
        position: 'top-right',
        status: 'success',
      });
      push('/settings/sources');
    },
  });

  const onSubmit = (event: FormInterface) => {
    SourceMutation.mutate(event);
  };

  return (
    <>
      <CircleProgress isLoading={SourceMutation.isLoading} />
      <Container maxW="container.md">
        <Box>
          <Text fontSize="5xl">Create Source</Text>
        </Box>
        <Box>
          <form onSubmit={SourceQuery.handleSubmit(onSubmit)}>
            <Box my="3">
              <FormControl
                isInvalid={SourceQuery.formState.errors.name ? true : false}
              >
                <FormLabel>Name</FormLabel>
                <Input
                  type="text"
                  {...SourceQuery.register('name', {
                    required: 'Name is required',
                  })}
                />
                <FormErrorMessage>
                  {SourceQuery.formState.errors.name?.message}
                </FormErrorMessage>
              </FormControl>
            </Box>
            <Box my="3">
              <FormControl
                isInvalid={
                  SourceQuery.formState.errors.description ? true : false
                }
              >
                <FormLabel>Description</FormLabel>
                <Input type="text" {...SourceQuery.register('description')} />
                <FormErrorMessage>
                  {SourceQuery.formState.errors.description?.message}
                </FormErrorMessage>
              </FormControl>
            </Box>
            <Box my="3">
              <Flex minWidth="max-content" alignItems="center" gap="2">
                <Box>
                  <Button
                    as={NextLink}
                    href="/settings/sources"
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

export default CreateSourcePage;
