"use client";
import { handleReviewDelete } from "@/utils/utils";
import gameStyles from "@/styles/game.module.css";

export default function DeleteReviewButton({ reviewID }) {
  return (
    <button className={`button ${gameStyles.button}`} onClick={() => handleReviewDelete(reviewID)}>
      Delete
    </button>
  );
}
