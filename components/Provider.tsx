'use client';
import { SessionProvider, Session } from 'next-auth/react';

interface IProviderProps {
  children: React.ReactNode;
  session?: Session;
}

const Provider = ({ children, session }: IProviderProps): React.JSX.Element => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default Provider;
