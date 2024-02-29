import { Inter } from "next/font/google";
import "@/styles/globals.css";
import Header from "@/components/Header";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Game Reviews",
  description: "A Next JS application to review video games",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <Header />
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
