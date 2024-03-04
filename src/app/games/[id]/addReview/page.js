import { sql } from "@vercel/postgres";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import formStyles from "@/styles/form.module.css";
import FormSubmitButton from "@/components/FormSubmitButton";
import RatingSelect from "@/components/RatingSelect";

export default async function AddReview({ searchParams, params }) {
  let gameTitle = searchParams.title;
  // No title searchParam so search the database
  if (!gameTitle) {
    gameTitle = (
      await sql`
      SELECT title FROM games WHERE id = ${params.id}
    ;`
    ).rows[0].title;
  }

  // Initial form data
  let currentReviewRating = 10;
  let currentReviewComment = "";

  // User is editing a review
  if (searchParams.edit === `true`) {
    let reviewData = await sql`
      SELECT * FROM reviews WHERE id = ${searchParams.reviewID}
    ;`;

    // Check review exists to edit
    if (reviewData.rows[0] === null || reviewData.rows[0] === undefined) {
      return (
        <div className="page-content">
          <h1 className="heading">Review Not Found</h1>
          <Link className="button" href={`/games`}>
            Back
          </Link>
        </div>
      );
    }
    // Populate form with current review data
    else {
      currentReviewRating = reviewData.rows[0].rating;
      currentReviewComment = reviewData.rows[0].review;
    }
  }

  async function handleSaveReview(formData) {
    // Make sure this is running on the server
    "use server";

    // Get review data from form
    const review = formData.get("review");
    const rating = formData.get("rating");

    // Update review
    if (searchParams.edit === `true`) {
      await sql`UPDATE reviews SET review = ${review}, rating = ${rating} WHERE id = ${searchParams.reviewID}`;
    }
    // Insert new review
    else {
      await sql`INSERT INTO reviews (game_id, review, rating) VALUES (${params.id}, ${review}, ${rating})`;
    }

    // Revalidate the games page to fetch most recent data
    revalidatePath(`/games/${params.id}`);

    // Redirect the user to the games page
    redirect(`/games/${params.id}`);
  }

  return (
    <div className="page-content">
      <h1 className="heading">{gameTitle}</h1>
      <form action={handleSaveReview} className={formStyles.form_container}>
        <label className="subheading" htmlFor="rating">
          Rating
        </label>
        <RatingSelect option={currentReviewRating} />

        <label className="subheading" htmlFor="review">
          Review
        </label>
        <textarea id="review" name="review" placeholder="Give your review here" defaultValue={currentReviewComment} required></textarea>

        <FormSubmitButton />
      </form>
      <Link className="button" href={`/games/${params.id}`}>
        Back
      </Link>
    </div>
  );
}
