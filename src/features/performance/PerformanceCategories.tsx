import Link from "next/link";
import "./performance.scss";

interface Category {
  skillName: string;
  link: string;
}

async function getCategories(): Promise<Category[]> {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/performance`, {
    cache: "no-cache",
  });
  const json = await res.json();
  return json.languagesSkills ?? [];
}

export default async function PerformanceCategories() {
  const categories = await getCategories();

  return (
    <section className="perf-section">
      <h1 className="perf-title">Knowledge Tracker</h1>
      <div className="perf-grid">
        {categories.map((cat) => (
          <Link key={cat.link} href={`/performance/${cat.link}`} className="perf-cat-card">
            <span className="perf-cat-name">{cat.skillName}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
