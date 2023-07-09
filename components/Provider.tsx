'use client';
import { SessionProvider } from 'next-auth/react';

const Provider = ({ children, session }: any): React.JSX.Element => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default Provider;
