import { sql } from "@vercel/postgres";
import Link from "next/link";
import Image from "next/image";
import gamesStyles from "@/styles/games.module.css";

export default async function Reviews({ params }) {
  const game = await sql`
      SELECT * FROM games WHERE id = ${params.id}
      ;`;

  const reviews = await sql`
  SELECT * FROM reviews WHERE game_id = ${params.id}
  ;`;

  let averageRating = await sql`
  SELECT ROUND(AVG(rating), 1) AS average_rating FROM reviews WHERE game_id = ${params.id}
  ;`;

  if (averageRating.rows[0].average_rating === null) {
    averageRating = "No reviews available";
  } else {
    averageRating = `${averageRating.rows[0].average_rating} / 10`;
  }

  return (
    <div className="page-content">
      <h1 className="heading">{game.rows[0].title}</h1>
      <div className={gamesStyles.game_container}>
        <Image className={gamesStyles.game_cover} src={game.rows[0].cover_image} width={300} height={450} alt="Game Cover" />
        <div className={gamesStyles.game_info_container}>
          <h2 className="subheading">Description:</h2>
          <p>{game.rows[0].description}</p>
          <h2 className="subheading">Release Date:</h2>
          <p>{game.rows[0].release_date.toLocaleDateString("en-GB")}</p>
          <h2 className="subheading">Category:</h2>
          <p>{game.rows[0].category}</p>
          <h2 className="subheading">Average Rating:</h2>
          <p>{averageRating}</p>
        </div>
      </div>
      <h2 className={`subheading ${gamesStyles.review_heading}`}>Reviews:</h2>
      <ul className={gamesStyles.reviews_container}>
        {reviews.rows.length === 0 ? (
          <div className={gamesStyles.review}>
            <li>No reviews available</li>
          </div>
        ) : (
          reviews.rows.map((review) => (
            <div className={gamesStyles.review} key={review.id}>
              <li>{review.review}</li>
              <li>Rating: {review.rating} / 10</li>
              <li>{review.created_at.toLocaleString("en-GB")}</li>
            </div>
          ))
        )}
      </ul>
      <Link className={`button ${gamesStyles.review_button}`} href={`/games/${params.id}/addReview`}>
        Add a Review
      </Link>
      <Link className="button" href={`/games`}>
        Back
      </Link>
    </div>
  );
}
