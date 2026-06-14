// src/app/layout.jsx
import './globals.css';
import { Inter } from 'next/font/google';
import Providers from "@/components/Providers";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata = {
  title: 'CareConnect',
  description: 'Anonymous mental health support with real counselor insights',
  icons: {
    icon: '/logo.png',
  },
};



export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}