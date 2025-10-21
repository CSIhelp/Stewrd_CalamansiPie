import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { SearchProvider } from './SearchContext.tsx';

import { MantineProvider } from '@mantine/core';

// Providers
import { SessionProvider } from './hooks/useSession.tsx';
import IdleModal from './components/IdleModal/IdleModal.tsx';


const Main = () => {
  return (
    <SearchProvider>
      <MantineProvider
        theme={{ primaryColor: 'blue' }}
        defaultColorScheme="light"
      >
        <App />
        <IdleModal />
      </MantineProvider>
    </SearchProvider>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <SessionProvider>
    <Main />
  </SessionProvider>
);
