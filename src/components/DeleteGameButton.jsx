"use client";
import { handleGameDelete } from "@/utils/utils";
import gameStyles from "@/styles/game.module.css";

export default function DeleteGameButton({ gameID }) {
  return (
    <button className={`button ${gameStyles.button}`} onClick={() => handleGameDelete(gameID)}>
      Delete
    </button>
  );
}
