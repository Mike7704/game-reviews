import { sql } from "@vercel/postgres";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import formStyles from "@/styles/form.module.css";

export default async function AddReview({ params }) {
  const gameTitle = await sql`
  SELECT title FROM games WHERE id = ${params.id}
;`;

  async function handleSaveReview(formData) {
    // Make sure this is running on the server
    "use server";

    // Get review data from form
    const review = formData.get("review");
    const rating = formData.get("rating");

    // Insert new review
    await sql`INSERT INTO reviews (game_id, review, rating) VALUES (${params.id}, ${review}, ${rating})`;

    // Revalidate the games page to fetch most recent data
    revalidatePath(`/games/${params.id}`);

    // Redirect the user to the games page
    redirect(`/games/${params.id}`);
  }

  return (
    <div className="page-content">
      <h1 className="heading">{gameTitle.rows[0].title}</h1>
      <form action={handleSaveReview} className={formStyles.form_container}>
        <label className="subheading" htmlFor="rating">
          Rating
        </label>
        <select id="rating" name="rating" required>
          <option value="10">10</option>
          <option value="9">9</option>
          <option value="8">8</option>
          <option value="7">7</option>
          <option value="6">6</option>
          <option value="5">5</option>
          <option value="4">4</option>
          <option value="3">3</option>
          <option value="2">2</option>
          <option value="1">1</option>
        </select>

        <label className="subheading" htmlFor="review">
          Review
        </label>
        <textarea id="review" name="review" placeholder="Give your review here" required />

        <button className="button" type="submit">
          Submit
        </button>
        {/*<SaveReviewButton className="button" />*/}
      </form>
      <Link className="button" href={`/games/${params.id}`}>
        Back
      </Link>
    </div>
  );
}
