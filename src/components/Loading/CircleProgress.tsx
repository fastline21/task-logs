'use client';

import { CircularProgress } from '@chakra-ui/react';

interface CircleProgressInterface {
  isLoading: boolean;
}
const CircleProgress = ({ isLoading }: CircleProgressInterface) => {
  return (
    isLoading && (
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '100vh',
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
          zIndex: 1031,
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          {/* <PreLoader /> */}
          <div style={{ width: 100, height: 100 }}>
            <CircularProgress isIndeterminate color="green.300" />
          </div>
        </div>
      </div>
    )
  );
};

export default CircleProgress;
