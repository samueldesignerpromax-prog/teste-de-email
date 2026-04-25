import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Samuel Designer - Sistema de Agendamento',
  description: 'Agende seu horário online e receba confirmação por email',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
