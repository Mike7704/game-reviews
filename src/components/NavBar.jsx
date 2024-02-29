import Link from "next/link";
import navbarStyles from "@/styles/navbar.module.css";

export default function NavBar() {
  return (
    <div>
      <nav className={navbarStyles.container}>
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
      </nav>
    </div>
  );
}
