'use client';

import { useState } from 'react';
import Image from 'next/image';
import Icon from '../public/assets/icon/weather-icon.svg';
import { AiOutlineMenu } from 'react-icons/ai';

const Nav = (): React.JSX.Element => {
  const session = false;
  const [toggle, setToggle] = useState(false);

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <div className="flex gap-6">
        <Image className="hidden md:block object-contain" src={Icon} alt="logo" width={70} height={30} />
        <h1 className="head_text text-center text-xs">
          Weather
          <span className="orange_gradient text-center"> Forecast</span>
        </h1>
      </div>
      {/* Desktop Navigation */}
      <div className="sm:flex  hidden">{session ? <></> : <button className="black_btn">Sign in</button>}</div>
      {/* Mobile Navigation */}
      <div className="sm:hidden flex relative" onClick={() => setToggle((prevState) => !prevState)}>
        <AiOutlineMenu size={30} className="mt-7"></AiOutlineMenu>
        {session ? <></> : toggle && <button className="black_btn">Sign in</button>}
      </div>
    </nav>
  );
};

export default Nav;
