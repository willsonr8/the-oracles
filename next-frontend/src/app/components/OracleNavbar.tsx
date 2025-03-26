import React from 'react';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from '@heroui/react';

export default function OracleNavbar() {

  return (
    <div className="w-full relative">
      <Navbar isBordered className="relative flex items-center justify-between px-4 sm:px-8">
        <NavbarBrand className="items-center gap-4">
          <h1 className="text-2xl font-semibold">The Oracle</h1>
        </NavbarBrand>
        <NavbarContent className='ml-auto hidden sm:flex gap-4' justify='end'>
          <NavbarItem>
            <Link className="text-xl" href='/'>Home</Link>
          </NavbarItem>
          <NavbarItem>
            <Link className="text-xl" href='https://github.com/willsonr8/the-oracles/tree/main'>About</Link>
          </NavbarItem>
          {/* <NavbarItem>
            <Link href='/contact'>Contact</Link>
          </NavbarItem> */}
        </NavbarContent>
      </Navbar>
    </div>
  );
}