import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the ThemeContext type to specify the shape of the context value
interface ThemeContextType {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
}

// Create the context with the appropriate type and default value
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
  theme?: { colors: { primary: string } };  // Optional theme prop
}

export const ThemeProvider = ({ children, theme }: ThemeProviderProps) => {
  const [themeState, setThemeState] = useState<string>('light');

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
