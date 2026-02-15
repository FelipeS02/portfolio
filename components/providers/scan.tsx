'use client';

// eslint-disable-next-line 'simple-import-sort/imports'
import { scan } from 'react-scan';

import { useEffect } from 'react';

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
