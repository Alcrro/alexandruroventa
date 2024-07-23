import Link from "next/link";

export default function NameLink() {
  return (
    <Link href={"https://google.ro"}>
      <div className="header-name"></div>
    </Link>
  );
}
