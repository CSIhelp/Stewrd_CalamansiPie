import React from 'react';
import ReactDOM from 'react-dom/client';
import { useState } from 'react';
import './index.css';
import App from './App.tsx';
import { SearchProvider } from './SearchContext.tsx';

import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
// User Menu Optimized
import { SessionProvider } from './hooks/useSession.tsx';


const Main = () => {

  return (
    <SessionProvider>
    <SearchProvider>
    <MantineProvider
      theme={{primaryColor: 'blue' }}
      defaultColorScheme="light"
    >

      <App />
    </MantineProvider>
    </SearchProvider>
    </SessionProvider>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(<Main />);
