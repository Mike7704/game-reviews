import { Oswald } from "next/font/google";
import "@/styles/globals.css";
import Header from "@/components/Header";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const oswald = Oswald({
  subsets: ["latin"],
  display: "swap",
  weights: ["700"],
});

export const metadata = {
  title: "Game Reviews",
  description: "A Next JS application to review video games",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={oswald.className} suppressHydrationWarning={true}>
        <div className="background-overlay" />
        <Header />
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
