import React from 'react';
import logo from '../img/logo.png';
import MenuDropdown from './MenuDropdown';

export default function Navbar() {
  return (
    <div className="sticky top-0 z-20 bg-white">
      <header className="flex justify-between border-b-2 shadow-sm ">
        <img src={logo} alt=" " className=" h-16" />
        <MenuDropdown />
      </header>
    </div>
  );
}
