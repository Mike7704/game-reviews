import { sql } from "@vercel/postgres";
import Link from "next/link";
import Image from "next/image";
import gamesListStyles from "@/styles/gamesList.module.css";
import DeleteGameButton from "@/components/DeleteGameButton";

export default async function Games() {
  const games = await sql`
    SELECT * FROM games;
  `;

  return (
    <div className="page-content">
      <h1 className="heading">Games</h1>
      <ul className={gamesListStyles.games_container}>
        {games.rows.map((game) => (
          <div className={gamesListStyles.game_container} key={game.id}>
            <Image className={gamesListStyles.game_cover} src={game.cover_image} width={158} height={237} alt="Game Cover" />
            <div className={gamesListStyles.game_info_container}>
              <li className="subheading">{game.title}</li>
              <li className={gamesListStyles.game_description}>{game.description}</li>
              <li>Category: {game.category}</li>
              <div className={gamesListStyles.game_buttons_container}>
                <Link className={`button ${gamesListStyles.button}`} href={`/games/${game.id}`}>
                  Read Reviews
                </Link>
                <DeleteGameButton gameID={game.id} />
              </div>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
}
