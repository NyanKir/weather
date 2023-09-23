'use client';
import { SWRConfig } from 'swr';
import { PropsWithChildren } from 'react';
import { fetcher } from '@/utils/fetcher';
export const SWRProvider = ({ children }: PropsWithChildren<{}>) => {
  return (
    <SWRConfig
      value={{
        fetcher
      }}
    >
      {children}
    </SWRConfig>
  );
};
