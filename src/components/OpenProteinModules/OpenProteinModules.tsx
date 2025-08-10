// src/components/OpenProteinModules.tsx
import React from "react";
import "./OpenProteinModules.css";
import useBaseUrl from "@docusaurus/useBaseUrl";

type LinkItem = { label: string; href: string };
type Feature = {
  title: string;
  subtitle?: string;
  description?: string;
  links?: LinkItem[];
  image?: string; // 静态资源路径或外链
};
type Solution = {
  title: string;
  bullets: string[];
  href?: string;
};

type Props = {
  heroTitle?: string;
  heroIntro?: string;
  features?: Feature[];
  solutions?: Solution[];
};

const defaultFeatures: Feature[] = [
  {
    title: "Tasks Overview",
    links: [
      { label: "Content", href: "/OpenPhase/docs/phase-system" },
      { label: "Python API tools", href: "#" },
      { label: "Protein Model", href: "/OpenPhase/docs/model" },
    ],
    image: "/img/phase_system_protein(1).png",
  },
  {
    title: "Dataset Splitting",
    links: [
      { label: "Content", href: "/OpenPhase/docs/dataset" },
      { label: "Python API tools", href: "#" },
      { label: "Protein Model", href: "/OpenPhase/docs/model" },
    ],
    image: "/img/phase_system_protein(2).png",
  },
  {
    title: "Experiment System",
    links: [
      { label: "Content", href: "/OpenPhase/docs/experimental-conditions" },
      { label: "Python API tools", href: "#" },      
      { label: "Protein Model", href: "/OpenPhase/docs/model" },
    ],
    image: "/img/phase_system_protein(3).png",
  },
];

const defaultSolutions: Solution[] = [
  {
    title: "Antibodies",
    bullets: [
      "Optimize sequences for key properties",
      "Binding Affinity",
      "Activity",
      "Immunogenicity",
    ],
  },
  {
    title: "Enzymes",
    bullets: [
      "Design novel variants with desired functionality",
      "Catalytic efficiency",
      "Thermostability",
      "Expression",
    ],
  },
  {
    title: "Structural proteins",
    bullets: ["Optimize fitness", "Stability", "Expression"],
  },
];

export default function OpenProteinModules({
  heroIntro = `OpenPhase, the first condition-aware phase behavior exploration platform at system level.`,
  features = defaultFeatures,
  solutions = defaultSolutions,
}: Props) {
  return (
    <section className="opm-container">
      {/* Hero */}
      <header className="opm-hero">
        <h3 className="opm-subtitle">{heroIntro}</h3>
      </header>

      {/* Feature modules */}
      <h2 className="opm-h2">Workflows</h2>
      <div className="opm-grid">
        {features.map((f, i) => (
          <article key={i} className="opm-card module-card">
            <h3 className="opm-card-title">{f.title}</h3>
            {f.description && <p className="opm-card-desc">{f.description}</p>}

            {/* Image or placeholder */}
            <div className="opm-imgbox">
              {f.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={useBaseUrl(f.image)}
                  alt={f.title}
                  className="opm-img"
                  loading="lazy"
                />
              ) : (
                <span className="opm-img-placeholder">Image / diagram</span>
              )}
            </div>

            {!!f.links?.length && (
              <div className="opm-linkrow">
                {f.links?.map((l, idx) => (
                  <a key={idx} className="opm-chip" href={l.href}>
                    {l.label}
                  </a>
                ))}
              </div>
            )}
          </article>
        ))}
      </div>

      {/* Solutions section */}
      <h2 className="opm-h2">Solutions for your application</h2>
      <div className="opm-grid">
        {solutions.map((s, i) => (
          <article key={i} className="opm-card">
            <div className="opm-solution-head">
              <h3 className="opm-card-title">{s.title}</h3>
              {s.href && (
                <a className="opm-learnmore" href={s.href}>
                  Learn more
                </a>
              )}
            </div>
            <ul className="opm-list">
              {s.bullets.map((b, j) => (
                <li key={j} className="opm-li">
                  {b}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
