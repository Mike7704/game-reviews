import { sql } from "@vercel/postgres";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import formStyles from "@/styles/form.module.css";
import FormSubmitButton from "@/components/FormSubmitButton";
import CategorySelect from "@/components/CategorySelect";

export default async function AddGame() {
  async function handleSaveGame(formData) {
    // Make sure this is running on the server
    "use server";

    // Get game data from form
    const title = formData.get("title");
    const description = formData.get("description");
    const release_date = formData.get("release_date");
    const category = formData.get("category");
    const cover_image = formData.get("cover_image");

    try {
      // Insert new game
      await sql`INSERT INTO games (title, description, release_date, category, cover_image)
      VALUES
      (${title}, ${description}, ${release_date}, ${category}, ${cover_image})
      `;
    } catch (error) {
      throw new Error("Could not add game");
    }

    // Revalidate the games page to fetch most recent data
    revalidatePath(`/games`);

    // Redirect the user to the games page
    redirect(`/games?category=All`);
  }

  return (
    <div className="page-content">
      <h1 className="heading">Add Game</h1>
      <form action={handleSaveGame} className={formStyles.form_container}>
        <label className="subheading" htmlFor="title">
          Title
        </label>
        <input id="title" name="title" type="text" placeholder="Game title" required />

        <label className="subheading" htmlFor="description">
          Description
        </label>
        <textarea id="description" name="description" placeholder="What is the game about?" required />

        <label className="subheading" htmlFor="category">
          Category
        </label>
        <CategorySelect />

        <label className="subheading" htmlFor="release_date">
          Release Date
        </label>
        <input id="release_date" name="release_date" type="date" required />

        <label className="subheading" htmlFor="cover_image">
          Cover Image&nbsp;
          <a href="https://www.steamgriddb.com/" target="_blank">
            (Find Images Here)
          </a>
        </label>
        <input id="cover_image" name="cover_image" type="url" placeholder="URL to the game's cover image" required />

        <FormSubmitButton />
      </form>
    </div>
  );
}
