'use client';

import React, { useEffect } from 'react';
import { scan } from 'react-scan';

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
