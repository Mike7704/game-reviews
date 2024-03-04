"use server";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";

export async function handleReviewDelete(reviewID, gameID) {
  await sql`DELETE FROM reviews WHERE id=${reviewID}`;
  revalidatePath(`/games/${gameID}`);
}

export async function handleGameDelete(gameID) {
  await sql`DELETE FROM games WHERE id=${gameID}`;
  revalidatePath("/games");
}
