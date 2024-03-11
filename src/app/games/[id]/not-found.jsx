import Link from "next/link";

export default function NotFound() {
  return (
    <div className="page-content">
      <h1 className="heading">Page Not Found</h1>
      <Link className="button" href={`/games?category=All`}>
        Back
      </Link>
    </div>
  );
}
