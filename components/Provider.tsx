'use client';
import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';

interface IProviderProps {
  children: React.ReactNode;
  session?: Session;
}

const Provider = ({ children, session }: IProviderProps): React.JSX.Element => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default Provider;
