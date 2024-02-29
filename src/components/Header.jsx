import headerStyles from "@/styles/header.module.css";

export default function Header() {
  return (
    <div className={headerStyles.container}>
      <h1 className={headerStyles.title}>Game Reviews</h1>
    </div>
  );
}
