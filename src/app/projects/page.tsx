import { DATA } from "@/data/resume";
import { ProjectsGrid } from "@/components/projects-grid";

export const metadata = {
  title: "Projects",
  description: "All projects",
};

export default function ProjectsIndex() {
  const projects = DATA.projects as any[];
  return (
    <section className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl md:text-5xl font-bold mb-6">Projects</h1>
      <ProjectsGrid projects={projects} />
    </section>
  );
}


