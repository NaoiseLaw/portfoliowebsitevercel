import { DATA } from "@/data/resume";
import dynamicImport from "next/dynamic";

export const dynamic = "force-dynamic";

const ProjectsGrid = dynamicImport(
  () => import("@/components/projects-grid").then((m) => ({ default: m.ProjectsGrid })),
  { ssr: false, loading: () => <p className="text-muted-foreground text-sm">Loading projects…</p> }
);

export const metadata = {
  title: "Projects",
  description: "All projects",
};

export default function ProjectsIndex() {
  const allProjects = [
    ...DATA.projects,
    ...(DATA.consultingProjects ?? []),
    ...(DATA.otherProjects ?? []),
  ] as readonly any[];
  return (
    <section className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl md:text-5xl font-bold mb-6">Projects</h1>
      <ProjectsGrid projects={allProjects} />
    </section>
  );
}


