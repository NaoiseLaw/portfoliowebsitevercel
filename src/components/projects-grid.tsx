"use client";

import { Badge } from "@/components/ui/badge";
import BlurFade from "@/components/magicui/blur-fade";
import Link from "next/link";
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
            <Link href={p.href} className="block border rounded p-4 hover:shadow-md transition">
              <div className="font-semibold mb-1">{p.title}</div>
              <div className="text-xs text-muted-foreground mb-2">{p.dates}</div>
              <div className="text-sm text-muted-foreground line-clamp-3 mb-3">{p.description}</div>
              <div className="flex flex-wrap gap-1">
                {(p.technologies || []).slice(0, 4).map((t: string) => (
                  <Badge key={t}>{t}</Badge>
                ))}
              </div>
            </Link>
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


