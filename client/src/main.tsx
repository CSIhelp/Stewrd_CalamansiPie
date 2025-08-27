import React from 'react';
import ReactDOM from 'react-dom/client';
import { useState } from 'react';
import './index.css';
import App from './App.tsx';
import { SearchProvider } from './SearchContext.tsx';

import { MantineProvider } from '@mantine/core';



const Main = () => {

  return (
    <SearchProvider>
    <MantineProvider
      theme={{primaryColor: 'blue' }}
      defaultColorScheme="light"
    >
      <App />
    </MantineProvider>
    </SearchProvider>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(<Main />);
