"use server";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";

export async function handleReviewDelete(id) {
  await sql`DELETE FROM reviews WHERE id=${id}`;
  revalidatePath("/games");
}
/*
export async function handleUpdate(values, id) {
    // values should be a string like `column1 = value` ect. 
    await sql`UPDATE books SET ${values} WHERE id=${id}`
    revalidatePath(`/books/${id}`)
}


function generateUpdateString(formData) {

}


export async function getGenres() {
    const genres = (await sql`SELECT * from genres`).rows
    return genres
}*/
