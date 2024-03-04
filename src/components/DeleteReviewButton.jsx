"use client";
import { handleReviewDelete } from "@/utils/utils";
import gameStyles from "@/styles/game.module.css";

export default function DeleteReviewButton({ reviewID, gameID }) {
  return (
    <button className={`button ${gameStyles.button}`} onClick={() => handleReviewDelete(reviewID, gameID)}>
      Delete
    </button>
  );
}
