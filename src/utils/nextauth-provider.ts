'use client';

import { getProviders } from 'next-auth/react';

export const getAllProviders = () => {
	return getProviders();
};
