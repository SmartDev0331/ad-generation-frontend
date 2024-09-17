'use client'
import React from 'react';
import Link from 'next/link';
import NavMenu from './NavMenu';
import ThemeToggle from '../ui/ThemeToggle';


const Header = () => {
  return (
    <header className='flex justify-between z-40 items-center p-4 bg-primary-light dark:bg-primary-dark text-text-light dark:text-text-dark'>
      <Link href='/'>
        <span className='text-lg font-semibold'>AD-Generation.ai</span>
      </Link>
      <NavMenu />
      <ThemeToggle />
    </header>
  );
};

export default Header;
