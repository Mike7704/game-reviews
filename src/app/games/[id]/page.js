import { sql } from "@vercel/postgres";
import Link from "next/link";
import Image from "next/image";
import gameStyles from "@/styles/game.module.css";
import DeleteReviewButton from "@/components/DeleteReviewButton";

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

  // Check if game with given ID exists
  if (game.rows[0] === null || game.rows[0] === undefined) {
    return (
      <div className="page-content">
        <h1 className="heading">Game Not Found</h1>
        <Link className="button" href={`/games`}>
          Back
        </Link>
      </div>
    );
  }

  // Check if there are any reviews to display an average
  if (averageRating.rows[0].average_rating === null) {
    averageRating = "No reviews available";
  } else {
    averageRating = `${averageRating.rows[0].average_rating} / 10`;
  }

  return (
    <div className="page-content">
      <h1 className="heading">{game.rows[0].title}</h1>
      <div className={gameStyles.game_container}>
        <Image className={gameStyles.game_cover} src={game.rows[0].cover_image} width={300} height={450} alt="Game Cover" />
        <div className={gameStyles.game_info_container}>
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
      <h2 className={`subheading ${gameStyles.review_heading}`}>Reviews:</h2>
      <ul className={gameStyles.reviews_container}>
        {reviews.rows.length === 0 ? (
          <div className={gameStyles.review}>
            <li>No reviews available</li>
          </div>
        ) : (
          reviews.rows.map((review) => (
            <div className={gameStyles.review} key={review.id}>
              <li>Rating: {review.rating} / 10</li>
              <li>Review: {review.review}</li>
              <li>Posted: {review.created_at.toLocaleString("en-GB")}</li>
              <div className={gameStyles.review_buttons_container}>
                <Link
                  className={`button ${gameStyles.button}`}
                  href={`/games/${params.id}/addReview?edit=true&reviewID=${review.id}&title=${game.rows[0].title}`}
                >
                  Edit
                </Link>
                <DeleteReviewButton reviewID={review.id} />
              </div>
            </div>
          ))
        )}
      </ul>
      <Link className={`button ${gameStyles.review_button}`} href={`/games/${params.id}/addReview?edit=false&title=${game.rows[0].title}`}>
        Add a Review
      </Link>
      <Link className="button" href={`/games`}>
        Back
      </Link>
    </div>
  );
}
