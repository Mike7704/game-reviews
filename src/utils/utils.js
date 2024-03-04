"use server";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";

export async function handleReviewDelete(id) {
  await sql`DELETE FROM reviews WHERE id=${id}`;
  revalidatePath("/games");
}

export async function handleGameDelete(id) {
  await sql`DELETE FROM games WHERE id=${id}`;
  revalidatePath("/games");
}
