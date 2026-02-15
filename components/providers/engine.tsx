'use client';

import { createContext, useContext } from 'react';

type Engine = 'webkit' | 'blink' | 'gecko' | 'unknown';

const EngineContext = createContext<Engine>('unknown');

export function EngineProvider({
  engine,
  children,
}: {
  engine: Engine;
  children: React.ReactNode;
}) {
  return (
    <EngineContext.Provider value={engine}>{children}</EngineContext.Provider>
  );
}

export function useEngine() {
  return useContext(EngineContext);
}
