import type { Metadata } from "next";
import RegistrationModal from "@/components/header/RegistrationModal";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "Beka's Blog",
  description: "Beka's Blog",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="flex flex-col h-full relative">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
