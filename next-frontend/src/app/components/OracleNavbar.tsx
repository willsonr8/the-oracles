import React from 'react';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from '@heroui/react';

export default function OracleNavbar() {

  return (
    <div>
      <Navbar isBordered>
        <NavbarBrand>
          <p className='font-bold text-inherit'>THE ORACLES</p>
        </NavbarBrand>
        <NavbarContent className='hidden sm:flex gap-4' justify='center'>
          <NavbarItem>
            <Link href='/'>Home</Link>
          </NavbarItem>
          <NavbarItem>
            <Link href='/about'>About</Link>
          </NavbarItem>
          <NavbarItem>
            <Link href='/contact'>Contact</Link>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    </div>
  );
}