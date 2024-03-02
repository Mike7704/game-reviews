import { sql } from "@vercel/postgres";
import Link from "next/link";

export default async function Games() {
  const games = await sql`
    SELECT * FROM games;
  `;

  return (
    <div className="page-content">
      <h1 className="heading">Games</h1>
      <ul>
        {games.rows.map((game) => (
          <div className="pt-3" key={game.id}>
            <li className="subheading">{game.title}</li>
            <Link className="button" href={`/games/${game.id}`}>
              Read Reviews
            </Link>
          </div>
        ))}
      </ul>
    </div>
  );
}
