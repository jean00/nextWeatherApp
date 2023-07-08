import '../styles/global.css';
import type { Metadata } from 'next';
import Nav from '../components/Nav';

export const metadata: Metadata = {
  title: 'Weather site',
  description: 'Forecast weather for your city',
};

interface Props {
  children: React.ReactNode;
}

const RootLayout = ({ children }: Props): React.JSX.Element => {
  return (
    <html lang="en">
      <body>
        <div className="main">
          <div className="gradient"></div>
        </div>
        <main className="app">
          <Nav />
          {children}
        </main>
      </body>
    </html>
  );
};

export default RootLayout;
