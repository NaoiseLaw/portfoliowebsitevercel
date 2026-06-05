"use client";

import BlurFade from "@/components/magicui/blur-fade";
import { ProjectCard } from "@/components/project-card";
import { useMemo, useState } from "react";

export function ProjectsGrid({ projects }: { projects: readonly any[] }) {
  const tabs = ["All", "AI/ML", "Enterprise", "Business", "Academic"] as const;
  const [active, setActive] = useState<(typeof tabs)[number]>("All");
  const [q, setQ] = useState("");

  const withCategories = useMemo(
    () =>
      projects.map((p) => ({
        ...p,
        categories: categoriesOf(p),
        haystack: `${p.title} ${p.description} ${(p.technologies || []).join(" ")}`.toLowerCase(),
      })),
    [projects],
  );

  const filtered = useMemo(() => {
    return withCategories.filter((p) => {
      const tabOk = active === "All" || p.categories.includes(active);
      const qOk = q.trim().length === 0 || p.haystack.includes(q.trim().toLowerCase());
      return tabOk && qOk;
    });
  }, [withCategories, active, q]);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <div className="flex gap-2">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setActive(t)}
              className={`px-3 py-1 rounded border text-sm ${t === active ? "bg-foreground text-background" : ""}`}
            >
              {t}
            </button>
          ))}
        </div>
        <input
          placeholder="Search projects..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="ml-auto px-3 py-1.5 text-sm rounded border bg-background"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filtered.map((p) => (
          <BlurFade key={p.slug}>
            <ProjectCard
              href={p.href}
              title={p.title}
              description={p.description}
              dates={p.dates}
              tags={p.technologies ?? []}
              image={p.image}
              video={p.video}
              links={p.links ?? []}
            />
          </BlurFade>
        ))}
      </div>
    </div>
  );
}

function categoriesOf(p: any): string[] {
  const cats: string[] = [];
  if (p.featured) cats.push("AI/ML");
  if ((p.location || "").toLowerCase().includes("academic")) cats.push("Academic");
  if ((p.description || "").toLowerCase().includes("enterprise")) cats.push("Enterprise");
  if ((p.location || "").toLowerCase().includes("client") || (p.description || "").toLowerCase().includes("e-commerce")) cats.push("Business");
  return cats.length ? cats : ["All"];
}


