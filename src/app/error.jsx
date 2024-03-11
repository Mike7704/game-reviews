"use client";

export default function GlobalError({ error, reset }) {
  return (
    <div className="page-content">
      <h2 className="heading">Error! Something went wrong!</h2>
      <p>{error.message}</p>
      <button className="button" onClick={() => reset()}>
        Try again
      </button>
    </div>
  );
}
