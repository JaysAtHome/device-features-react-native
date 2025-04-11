import React, { createContext, useContext, useState } from 'react';
import { ThemeProvider as PaperThemeProvider } from 'react-native-paper';
import { DarkTheme, DefaultTheme } from '@react-navigation/native';

const ThemeContext = createContext({
  isDark: false,
  toggleTheme: () => {},
  theme: DefaultTheme,
});

export const useThemeContext = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => setIsDark((prev) => !prev);

  const theme = isDark ? DarkTheme : DefaultTheme;

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, theme }}>
      <PaperThemeProvider theme={theme}>{children}</PaperThemeProvider>
    </ThemeContext.Provider>
  );
};
