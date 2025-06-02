'use client';

import {
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Select,
  Box,
  useToast,
  Container,
  Text,
  Flex,
  Progress,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { format } from 'date-fns';
import { Key } from 'react';
import { useRouter } from 'next/navigation';

import { addTask } from '@/controllers/tasks.controller';
import { getAllServices } from '@/controllers/services.controller';
import { getAllSources } from '@/controllers/sources.controller';

import CircleProgress from '@/components/Loading/CircleProgress';

import { getDateFormat } from '@/utils/date-helper';

interface FormInterface {
  task_date: String;
  task_date_start: String;
  task_date_end: String;
  description: String;
  source_id: String;
  service_id: String;
}

const CreateTaskPage = () => {
  const toast = useToast();
  const { push } = useRouter();

  const servicesQuery = useQuery({
    queryKey: ['ServicesData'],
    queryFn: async () => await getAllServices(),
  });
  const sourcesQuery = useQuery({
    queryKey: ['SourcesData'],
    queryFn: async () => await getAllSources(),
  });

  const TaskQuery = useForm<FormInterface>({
    defaultValues: {
      task_date: format(new Date(), 'yyyy-MM-dd'),
      task_date_start: format(new Date(), 'HH:mm'),
      task_date_end: format(new Date(), 'HH:mm'),
      description: '',
      source_id: '',
      service_id: '',
    },
  });

  const TaskMutation = useMutation({
    mutationFn: (event: {
      task_date: String;
      task_date_start: String;
      task_date_end: String;
      description: String;
      source_id: String;
      service_id: String;
    }) => {
      return addTask({ payload: event });
    },
    onSuccess: (res) => {
      const { data, message } = res.data;

      toast({
        title: message,
        position: 'top-right',
        status: 'success',
      });

      const { task_date_start } = data;
      const taskDate = getDateFormat({ date: task_date_start });
      const currentDate = getDateFormat({});

      if (taskDate !== currentDate) {
        push(`/tasks/?date=${taskDate}`);
      } else {
        push('/tasks');
      }
    },
  });

  const onSubmit = (event: FormInterface) => {
    TaskMutation.mutate(event);
  };

  return (
    <>
      <CircleProgress isLoading={TaskMutation.isLoading} />
      <Container maxW="container.md">
        <Box>
          <Text fontSize="5xl">Create Task</Text>
        </Box>
        <Box>
          <form onSubmit={TaskQuery.handleSubmit(onSubmit)}>
            <Box my="3">
              <FormControl
                isInvalid={TaskQuery.formState.errors.task_date ? true : false}
              >
                <FormLabel>Task Date</FormLabel>
                <Input
                  type="date"
                  {...TaskQuery.register('task_date', {
                    required: 'Task Date is required',
                  })}
                />
              </FormControl>
            </Box>
            <Box my="3">
              <FormControl
                isInvalid={
                  TaskQuery.formState.errors.task_date_start ? true : false
                }
              >
                <FormLabel>Task Start Time</FormLabel>
                <Input
                  type="time"
                  {...TaskQuery.register('task_date_start', {
                    required: 'Task Date Start',
                  })}
                />
              </FormControl>
            </Box>
            <Box my="3">
              <FormControl
                isInvalid={
                  TaskQuery.formState.errors.task_date_end ? true : false
                }
              >
                <FormLabel>Task End Time</FormLabel>
                <Input type="time" {...TaskQuery.register('task_date_end')} />
              </FormControl>
            </Box>
            <Box my="3">
              <FormControl
                isInvalid={
                  TaskQuery.formState.errors.description ? true : false
                }
              >
                <FormLabel>Description</FormLabel>
                <Input
                  type="text"
                  {...TaskQuery.register('description', {
                    required: 'Description is required',
                  })}
                />
                <FormErrorMessage>
                  {TaskQuery.formState.errors.description?.message}
                </FormErrorMessage>
              </FormControl>
            </Box>
            <Box my="3">
              <FormControl
                isInvalid={TaskQuery.formState.errors.source_id ? true : false}
              >
                <FormLabel>Source</FormLabel>
                <Select
                  placeholder="Select source"
                  {...TaskQuery.register('source_id', {
                    required: 'Source is required',
                  })}
                >
                  {sourcesQuery.data?.data.data.map(
                    (
                      datum: {
                        id: string;
                        name: String;
                      },
                      index: Key,
                    ) => (
                      <option key={index} value={datum.id}>
                        {datum.name}
                      </option>
                    ),
                  )}
                </Select>
                <FormErrorMessage>
                  {TaskQuery.formState.errors.source_id?.message}
                </FormErrorMessage>
              </FormControl>
            </Box>
            <Box my="3">
              <FormControl
                isInvalid={TaskQuery.formState.errors.service_id ? true : false}
              >
                <FormLabel>Service</FormLabel>
                <Select
                  placeholder="Select service"
                  {...TaskQuery.register('service_id', {
                    required: 'Service is required',
                  })}
                >
                  {servicesQuery.data?.data.data.map(
                    (
                      datum: {
                        id: string;
                        name: String;
                      },
                      index: Key,
                    ) => (
                      <option key={index} value={datum.id}>
                        {datum.name}
                      </option>
                    ),
                  )}
                </Select>
                <FormErrorMessage>
                  {TaskQuery.formState.errors.service_id?.message}
                </FormErrorMessage>
              </FormControl>
            </Box>
            <Box my="3">
              <Flex minWidth="max-content" alignItems="center" gap="2">
                <Box>
                  <Button as={NextLink} href="/tasks" color="blue.500">
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

export default CreateTaskPage;
