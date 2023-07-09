'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Icon from '../public/assets/icon/weather-icon.svg';
import { AiOutlineMenu } from 'react-icons/ai';
import { signIn, signOut, useSession, getProviders, ClientSafeProvider } from 'next-auth/react';

const Nav = (): React.JSX.Element => {
  const [toggle, setToggle] = useState<boolean>(false);
  const [provider, setProvider] = useState<Record<string, ClientSafeProvider> | null>(null);
  const { data: session } = useSession<boolean>();

  useEffect(() => {
    const setUpProviders = async (): Promise<void> => {
      const response: Record<string, ClientSafeProvider> | null = await getProviders();
      setProvider(response);
    };
    setUpProviders();
  }, []);

  const handleOnClick: React.MouseEventHandler<HTMLButtonElement> = () => signOut();

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
      <div className="sm:flex  hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <button type="button" onClick={handleOnClick} className="outline_btn">
              Sign Out
            </button>
            <Link href="/profile">
              <Image src={session?.user.image || ''} alt="profile" width={37} height={37} className="rounded-full" />
            </Link>
          </div>
        ) : (
          provider &&
          Object.values(provider).map((provider: ClientSafeProvider) => (
            <button type="button" key={provider.name} onClick={() => signIn(provider.id)} className="mt-5 w-full black_btn">
              Sign in
            </button>
          ))
        )}
      </div>
      {/* Mobile Navigation */}
      <div className="sm:hidden flex relative" onClick={() => setToggle((prevState) => !prevState)}>
        <AiOutlineMenu size={30} className="mt-7"></AiOutlineMenu>
        {session?.user && toggle ? (
          <div className="dropdown">
            <Link href="/profile">My profile</Link>
            <button
              type="button"
              onClick={() => {
                signOut;
                setToggle(false);
              }}
              className="dropdown_link"
            >
              Sign Out
            </button>
          </div>
        ) : (
          toggle && (
            <div className="dropdown">
              {provider &&
                Object.values(provider).map((provider: ClientSafeProvider) => (
                  <button type="button" key={provider.name} onClick={() => signIn(provider.id)} className="mt-5 w-full black_btn">
                    Sign in
                  </button>
                ))}
            </div>
          )
        )}
      </div>
    </nav>
  );
};

export default Nav;
