// src/ThemeProvider.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { App, ConfigProvider, theme } from 'antd';

interface ThemeContextType {
  darkMode: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode; }> = ({ children }) => {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  const toggleTheme = () => {
    setDarkMode((prev) => {
      const newMode = !prev;
      localStorage.setItem('theme', newMode ? 'dark' : 'light');
      document.documentElement.classList.toggle('dark', !darkMode);
      return newMode;
    });
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      <App>
        <ConfigProvider
          theme={{
            algorithm: darkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
            components: {
              Table: {
                headerBg: darkMode ? '#2A2A2A' : '#fafafa',
                rowHoverBg: darkMode ? "#2A2A2A": "",
                padding: 8
              },
              Pagination: {
                itemBg: darkMode ? "#353535": "",
                itemActiveBg: darkMode ? "#353535": "",
              }
            }
          }}
        >
          {children}
        </ConfigProvider>
      </App>
    </ThemeContext.Provider>
  );
};

// Hook để sử dụng theme
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};