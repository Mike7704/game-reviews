"use client";
import { handleReviewDelete } from "@/utils/utils";

export default function DeleteReviewButton({ reviewID }) {
  return (
    <button className="button" onClick={() => handleReviewDelete(reviewID)}>
      Delete
    </button>
  );
}
