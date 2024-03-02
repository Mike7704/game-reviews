import { sql } from "@vercel/postgres";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import Link from "next/link";

export default async function PostsPage({ params }) {
  async function handleSavePost(formData) {
    "use server"; // makes this function run _on the server_, as if by magic API.
    console.log("Saving post to the database...");

    // get the form data from the formData object next provdides
    const review = formData.get("review");
    const rating = formData.get("rating");

    // insert the data into postgres
    await sql`INSERT INTO reviews (game_id, review, rating) VALUES (${params.id}, ${review}, ${rating})`;
    console.log("Post saved!");

    // revalidate the games page, so it fetches the new data
    revalidatePath(`/games/${params.id}`);

    // redirect the user to the games page
    redirect(`/games/${params.id}`);
  }

  return (
    <div className="page-content">
      <h1 className="heading">Add a new review</h1>
      <form action={handleSavePost}>
        <label className="subheading" htmlFor="rating">
          Rating
        </label>
        <input className="text-black" id="rating" name="rating" type="text" />
        <label className="subheading" htmlFor="review">
          Review
        </label>
        <textarea className="text-black" id="review" name="review" />
        <button className="button" type="submit">
          Submit
        </button>
        {/*<SavePostButton className="p-3" />*/}
      </form>
      <div className="pt-3">
        <Link className="button" href={`/games/${params.id}`}>
          Back
        </Link>
      </div>
    </div>
  );
}
