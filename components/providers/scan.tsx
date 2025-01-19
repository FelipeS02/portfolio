'use client';

// eslint-disable-next-line 'simple-import-sort/imports'
import { scan } from 'react-scan';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useEffect } from 'react';

type Options = Parameters<typeof scan>[0];

const ScanProvider = ({ options }: { options?: Options }) => {
  useEffect(() => {
    scan({
      ...options,
      enabled: true,
      log: true,
    });
  }, [options]);

  return null;
};

export default ScanProvider;
