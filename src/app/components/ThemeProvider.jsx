import React, { createContext, useContext, useState } from 'react';

// Create the context with the appropriate default value
const ThemeContext = createContext(undefined);

export const ThemeProvider = ({ children, theme }) => {
  const [themeState, setThemeState] = useState('light');

  // You can set an initial theme value based on the passed theme prop
  const currentTheme = theme ? theme.colors.primary : themeState;

  return (
    <ThemeContext.Provider value={{ theme: currentTheme, setTheme: setThemeState }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to access the theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
