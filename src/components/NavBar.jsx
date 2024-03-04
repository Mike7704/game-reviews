import Link from "next/link";
import navbarStyles from "@/styles/navbar.module.css";

export default function NavBar() {
  return (
    <div>
      <nav className={navbarStyles.container}>
        <Link className="button" href="/">
          Home
        </Link>
        <Link className="button" href="/games?category=All">
          Games
        </Link>
        <Link className="button" href="/addGame">
          Add Game
        </Link>
      </nav>
    </div>
  );
}
