import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ThemeContextType {
  mode: 'light' | 'dark';
  toggleTheme: () => void;
  theme: {
    colors: {
      background: string;
      text: string;
      primary: string;
    };
  };
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<'light' | 'dark'>('light');

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const theme = {
    colors: {
      background: mode === 'light' ? '#fff' : '#000',
      text: mode === 'light' ? '#000' : '#fff',
      primary: mode === 'light' ? '#007AFF' : '#1E90FF',
    },
  };

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
