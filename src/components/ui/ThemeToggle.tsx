// components/ThemeToggle.js  
'use client'
import { useEffect, useState } from 'react';
import LightMode from '@mui/icons-material/LightMode';
import DarkMode from '@mui/icons-material/DarkMode';

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check local storage for user preference  
    const userPreference = localStorage.getItem('theme');
    if (userPreference) {
      setIsDark(userPreference === 'dark');
    } else {
      // Check system preference  
      setIsDark(window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = isDark ? 'dark' : 'light';
    setIsDark(!isDark);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 bg-blue-500 text-white rounded"
    >
      {isDark ? <LightMode /> : <DarkMode />}
    </button>
  );
};

export default ThemeToggle;