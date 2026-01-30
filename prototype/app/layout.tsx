import type { Metadata } from "next";
import "@mantine/core/styles.css";
import "./globals.css";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { theme } from "@/lib/theme/theme";
import { AuthProvider } from "@/lib/contexts/AuthContext";
import { ContractsProvider } from "@/lib/contexts/ContractsContext";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: "Sjednávač cestovního pojištění",
  description: "Prototyp klientské zóny pro sjednání cestovního pojištění",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs">
      <head>
        <ColorSchemeScript defaultColorScheme="light" />
      </head>
      <body>
        <MantineProvider theme={theme}>
          <AuthProvider>
          <ContractsProvider>
            <Header />
            {children}
          </ContractsProvider>
        </AuthProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
