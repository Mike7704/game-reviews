"use client";
import { useFormStatus } from "react-dom";

export default function FormSubmitButton() {
  const formStatus = useFormStatus();

  return (
    <button className="button" type="submit" disabled={formStatus.pending}>
      {formStatus.pending ? "Submitting..." : "Submit"}
    </button>
  );
}
