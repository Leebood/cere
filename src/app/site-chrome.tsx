import type { ReactNode } from "react";
import Link from "next/link";

const navItems = [
  ["Markets", "/markets"],
  ["Services", "/services"],
  ["About", "/about"],
  ["Contact", "/contact"],
];

export function SiteChrome({ children }: { children: ReactNode }) {
  return (
    <main className="cere-site">
      <header className="cere-nav">
        <Link className="cere-brand" href="/" aria-label="CERE home">
          <span>CERE</span>
          <small>Cambodia Export Readiness Engine</small>
        </Link>
        <nav aria-label="Main navigation">
          {navItems.map(([label, href]) => (
            <Link href={href} key={href}>{label}</Link>
          ))}
        </nav>
      </header>
      {children}
      <footer className="cere-footer">
        <strong>CERE</strong>
        <p>
          Readiness and compliance support only. Not a certification body, laboratory, government approval authority, or
          guarantee of market access.
        </p>
        <Link href="/workspace">Internal workspace</Link>
      </footer>
    </main>
  );
}

export function PageIntro({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="cere-page-hero">
      <p className="cere-eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <p>{children}</p>
    </section>
  );
}
