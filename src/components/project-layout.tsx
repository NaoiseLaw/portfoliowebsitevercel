import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import BlurFade from "@/components/magicui/blur-fade";

type Metric = Record<string, string> | undefined;

export function ProjectLayout({
  project,
  prev,
  next,
}: {
  project: any;
  prev?: { title: string; href: string } | null;
  next?: { title: string; href: string } | null;
}) {
  return (
    <article className="space-y-8">
      <header className="space-y-2 text-center">
        <h1 className="text-3xl md:text-5xl font-bold">{project.title}</h1>
        <p className="text-sm text-muted-foreground">{project.dates} {project.location ? `· ${project.location}` : ""}</p>
      </header>

      {project.metrics && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {Object.entries(project.metrics as Metric ?? {}).map(([k, v]) => (
            <Card key={k} className="p-4 text-center">
              <div className="text-xs uppercase tracking-wide text-muted-foreground">{k}</div>
              <div className="text-xl font-semibold">{v}</div>
            </Card>
          ))}
        </div>
      )}

      {project.description && (
        <BlurFade>
          <p className="text-base md:text-lg text-muted-foreground">{project.description}</p>
        </BlurFade>
      )}

      {project.problem && (
        <section>
          <h2 className="text-xl font-semibold mb-2">Problem</h2>
          <p className="text-muted-foreground">{project.problem}</p>
        </section>
      )}

      {project.solution && (
        <section>
          <h2 className="text-xl font-semibold mb-2">Solution</h2>
          <p className="text-muted-foreground">{project.solution}</p>
        </section>
      )}

      {project.role && (
        <section>
          <h2 className="text-xl font-semibold mb-2">My Role</h2>
          <p className="text-muted-foreground">{project.role}</p>
        </section>
      )}

      {project.technologies && project.technologies.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold mb-2">Tech Stack</h2>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((t: string) => (
              <Badge key={t}>{t}</Badge>
            ))}
          </div>
        </section>
      )}

      {project.artifacts && project.artifacts.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold mb-2">Artifacts</h2>
          <ul className="list-disc pl-5 space-y-1">
            {project.artifacts.map((a: any, i: number) => (
              <li key={i}>
                <a className="underline" href={a.url} target="_blank" rel="noopener noreferrer">
                  {a.label}
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      {(prev || next) && (
        <nav className="flex justify-between pt-6 border-t">
          <div>
            {prev && (
              <a className="underline" href={prev.href}>
                ← {prev.title}
              </a>
            )}
          </div>
          <div>
            {next && (
              <a className="underline" href={next.href}>
                {next.title} →
              </a>
            )}
          </div>
        </nav>
      )}
    </article>
  );
}


