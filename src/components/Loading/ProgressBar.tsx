'use client';

import { Box, Progress } from '@chakra-ui/react';

interface ProgressBarInterface {
	isLoading: boolean;
}
const ProgressBar = ({ isLoading }: ProgressBarInterface) => {
	return (
		<Box mb={!isLoading ? '4px' : ''}>
			{isLoading && <Progress size='xs' isIndeterminate />}
		</Box>
	);
};

export default ProgressBar;
