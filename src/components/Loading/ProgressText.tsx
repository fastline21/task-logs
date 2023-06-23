'use client';

import { Box, SkeletonText } from '@chakra-ui/react';

const ProgressText = () => {
	return (
		<Box>
			<SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />
		</Box>
	);
};

export default ProgressText;
