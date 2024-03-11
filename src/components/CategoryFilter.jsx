import Link from "next/link";
import gamesListStyles from "@/styles/gamesList.module.css";

export default function RatingSelect() {
  return (
    <div className={gamesListStyles.filter_container}>
      <p>Category:</p>
      <Link className={`button ${gamesListStyles.category_button}`} href={`/games?category=All`}>
        All
      </Link>
      <Link className={`button ${gamesListStyles.category_button}`} href={`/games?category=Action`}>
        Action
      </Link>
      <Link className={`button ${gamesListStyles.category_button}`} href={`/games?category=Adventure`}>
        Adventure
      </Link>
      <Link className={`button ${gamesListStyles.category_button}`} href={`/games?category=Platformer`}>
        Platformer
      </Link>
      <Link className={`button ${gamesListStyles.category_button}`} href={`/games?category=Puzzle`}>
        Puzzle
      </Link>
      <Link className={`button ${gamesListStyles.category_button}`} href={`/games?category=Racing`}>
        Racing
      </Link>
      <Link className={`button ${gamesListStyles.category_button}`} href={`/games?category=RPG`}>
        RPG
      </Link>
      <Link className={`button ${gamesListStyles.category_button}`} href={`/games?category=Shooter`}>
        Shooter
      </Link>
      <Link className={`button ${gamesListStyles.category_button}`} href={`/games?category=Simulation`}>
        Simulation
      </Link>
      <Link className={`button ${gamesListStyles.category_button}`} href={`/games?category=Sport`}>
        Sport
      </Link>
      <Link className={`button ${gamesListStyles.category_button}`} href={`/games?category=Strategy`}>
        Strategy
      </Link>
    </div>
  );
}
