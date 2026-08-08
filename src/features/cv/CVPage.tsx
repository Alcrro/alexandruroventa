"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import resumeData from "../../../resume.json";
import "./cv.scss";

type Locale = "en" | "ro";
type Theme = "technical" | "corporate";

const translations: Record<Locale, Record<string, string>> = {
  en: {
    summary: "Summary",
    experience: "Experience",
    projects: "Projects",
    skills: "Skills",
    competencies: "Competencies",
    languages: "Languages",
    education: "Education",
    certificates: "Certificates",
    present: "Present",
    download: "Download PDF",
    technical: "Technical",
    corporate: "Corporate",
  },
  ro: {
    summary: "Rezumat",
    experience: "Experiență",
    projects: "Proiecte",
    skills: "Abilități",
    competencies: "Competențe",
    languages: "Limbi",
    education: "Educație",
    certificates: "Certificate",
    present: "Prezent",
    download: "Descarcă PDF",
    technical: "Tehnic",
    corporate: "Corporate",
  },
};

function fmt(dateStr: string, locale: Locale): string {
  return new Date(dateStr).toLocaleDateString(
    locale === "ro" ? "ro-RO" : "en-GB",
    { month: "short", year: "numeric" }
  );
}

export default function CVPage({ theme }: { theme: Theme }) {
  const [locale, setLocale] = useState<Locale>("en");
  const router = useRouter();
  const t = translations[locale];

  const { basics, work, projects, education, certificates, skills, competencies, languages } =
    resumeData;

  const summary =
    theme === "corporate"
      ? locale === "ro"
        ? basics.summary_corporate_ro
        : basics.summary_corporate
      : locale === "ro"
      ? basics.summary_ro
      : basics.summary;

  const github = basics.profiles.find((p) => p.network === "GitHub");
  const linkedin = basics.profiles.find((p) => p.network === "LinkedIn");

  return (
    <main className="cv-page">
      {/* ── Fixed controls ── */}
      <div className="cv-controls">
        <div className="cv-toggle-row">
          {/* Theme toggle */}
          <div className="cv-pill-toggle">
            <button
              className={`cv-toggle-btn${theme === "technical" ? " active" : ""}`}
              onClick={() => router.push("/cv?theme=technical")}
            >
              {t.technical}
            </button>
            <span className="cv-toggle-sep">|</span>
            <button
              className={`cv-toggle-btn${theme === "corporate" ? " active" : ""}`}
              onClick={() => router.push("/cv?theme=corporate")}
            >
              {t.corporate}
            </button>
          </div>

          {/* Lang toggle */}
          <div className="cv-pill-toggle">
            <button
              className={`cv-toggle-btn${locale === "en" ? " active" : ""}`}
              onClick={() => setLocale("en")}
            >
              EN
            </button>
            <span className="cv-toggle-sep">|</span>
            <button
              className={`cv-toggle-btn${locale === "ro" ? " active" : ""}`}
              onClick={() => setLocale("ro")}
            >
              RO
            </button>
          </div>
        </div>

        <button className="cv-print-btn" onClick={() => window.print()}>
          <i className="bi bi-download" />
          {t.download}
        </button>
      </div>

      <div className="cv-container">
        {/* ── Header ── */}
        <header className="cv-header">
          <h1 className="cv-name">{basics.name}</h1>
          <p className="cv-label">
            {theme === "corporate" ? basics.label_corporate : basics.label}
          </p>
          <div className="cv-contacts">
            <a href={`mailto:${basics.email}`} className="cv-contact">
              <i className="bi bi-envelope" />
              {basics.email}
            </a>
            <span className="cv-contact">
              <i className="bi bi-telephone" />
              {basics.phone}
            </span>
            <span className="cv-contact">
              <i className="bi bi-geo-alt" />
              {basics.location.city}, {basics.location.countryCode}
            </span>
            <a
              href={basics.url}
              target="_blank"
              rel="noopener noreferrer"
              className="cv-contact"
            >
              <i className="bi bi-globe" />
              {basics.url.replace("https://", "")}
            </a>
            {theme === "technical" && github && (
              <a
                href={github.url}
                target="_blank"
                rel="noopener noreferrer"
                className="cv-contact"
              >
                <i className="bi bi-github" />
                {github.username}
              </a>
            )}
            {linkedin && (
              <a
                href={linkedin.url}
                target="_blank"
                rel="noopener noreferrer"
                className="cv-contact"
              >
                <i className="bi bi-linkedin" />
                {linkedin.username}
              </a>
            )}
          </div>
        </header>

        {/* ── Two-column body ── */}
        <div className="cv-body">
          {/* ── Main ── */}
          <div className="cv-main">
            <section className="cv-section">
              <h2 className="cv-section-title">{t.summary}</h2>
              <p className="cv-summary">{summary}</p>
            </section>

            <section className="cv-section">
              <h2 className="cv-section-title">{t.experience}</h2>
              <div className="cv-items">
                {work.map((job, i) => (
                  <div key={i} className="cv-item">
                    <div className="cv-item-top">
                      <div>
                        <h3 className="cv-item-title">{job.position}</h3>
                        <span className="cv-item-subtitle">
                          {job.name}
                          {job.location ? ` · ${job.location}` : ""}
                        </span>
                      </div>
                      <span className="cv-item-period">
                        {fmt(job.startDate, locale)} –{" "}
                        {job.endDate ? fmt(job.endDate, locale) : t.present}
                      </span>
                    </div>
                    {job.highlights && job.highlights.length > 0 && (
                      <ul className="cv-highlights">
                        {job.highlights.map((h, j) => (
                          <li key={j}>{h}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>

            <section className="cv-section">
              <h2 className="cv-section-title">{t.projects}</h2>
              <div className="cv-items">
                {projects.map((project, i) => {
                  const desc =
                    theme === "corporate"
                      ? locale === "ro"
                        ? project.impact_ro
                        : project.impact
                      : locale === "en" && project.description_en
                      ? project.description_en
                      : project.description;

                  const hasEndDate =
                    "endDate" in project && project.endDate;

                  const problem =
                    locale === "ro" ? project.problem_ro : project.problem;

                  return (
                    <div key={i} className="cv-item">
                      <div className="cv-item-top">
                        <h3 className="cv-item-title">
                          {project.url ? (
                            <a
                              href={project.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="cv-item-link"
                            >
                              {project.name}
                              <i className="bi bi-arrow-up-right-square" />
                            </a>
                          ) : (
                            project.name
                          )}
                          {"repo" in project && project.repo && (
                            <a
                              href={project.repo as string}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="cv-item-link cv-item-link--repo"
                            >
                              <i className="bi bi-github" />
                            </a>
                          )}
                        </h3>
                        {project.startDate && (
                          <span className="cv-item-period">
                            {fmt(project.startDate, locale)} –{" "}
                            {hasEndDate
                              ? fmt(project.endDate as string, locale)
                              : t.present}
                          </span>
                        )}
                      </div>
                      {problem && <p className="cv-item-problem">{problem}</p>}
                      {desc && <p className="cv-item-desc">{desc}</p>}
                      {theme === "technical" &&
                        project.keywords &&
                        project.keywords.length > 0 && (
                          <div className="cv-tags">
                            {project.keywords.map((kw, j) => (
                              <span key={j} className="cv-tag">
                                {kw}
                              </span>
                            ))}
                          </div>
                        )}
                    </div>
                  );
                })}
              </div>
            </section>
          </div>

          {/* ── Sidebar ── */}
          <aside className="cv-sidebar">
            {theme === "technical" ? (
              <section className="cv-section">
                <h2 className="cv-section-title">{t.skills}</h2>
                {skills.map((group, i) => (
                  <div key={i} className="cv-skill-group">
                    <strong className="cv-skill-name">{group.name}</strong>
                    <p className="cv-skill-list">{group.keywords.join(", ")}</p>
                  </div>
                ))}
              </section>
            ) : (
              <section className="cv-section">
                <h2 className="cv-section-title">{t.competencies}</h2>
                <ul className="cv-competencies">
                  {competencies.map((c, i) => (
                    <li key={i} className="cv-competency">
                      {c.name}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <section className="cv-section">
              <h2 className="cv-section-title">{t.languages}</h2>
              {languages.map((item, i) => (
                <div key={i} className="cv-lang-row">
                  <span className="cv-lang-name">{item.language}</span>
                  <span className="cv-lang-fluency">{item.fluency}</span>
                </div>
              ))}
            </section>

            <section className="cv-section">
              <h2 className="cv-section-title">{t.education}</h2>
              {education.map((edu, i) => (
                <div key={i} className="cv-item">
                  <h3 className="cv-item-title">
                    {edu.studyType} – {edu.area}
                  </h3>
                  <span className="cv-item-subtitle">{edu.institution}</span>
                  <span className="cv-item-period">
                    {fmt(edu.startDate, locale)} – {fmt(edu.endDate, locale)}
                  </span>
                </div>
              ))}
            </section>

            <section className="cv-section">
              <h2 className="cv-section-title">{t.certificates}</h2>
              {certificates.map((cert, i) => (
                <div key={i} className="cv-item">
                  <h3 className="cv-item-title">{cert.name}</h3>
                  <div className="cv-cert-row">
                    <span className="cv-item-subtitle">{cert.issuer}</span>
                    <span className="cv-item-period">
                      {fmt(cert.date, locale)}
                    </span>
                  </div>
                </div>
              ))}
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
}
