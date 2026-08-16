import BlurFade from "@/components/magicui/blur-fade";
import { ProjectsGrid } from "@/components/projects-grid";
import { DATA } from "@/data/resume";

export const metadata = {
  title: "Projects",
  description: "All projects",
};

const BLUR_FADE_DELAY = 0.04;

export default function ProjectsIndex() {
  const allProjects = [
    ...DATA.projects,
    ...(DATA.consultingProjects ?? []),
    ...(DATA.otherProjects ?? []),
  ] as readonly any[];

  return (
    <div className="relative left-1/2 w-[min(100vw-2rem,72rem)] -translate-x-1/2">
      <section className="py-6">
        <BlurFade delay={BLUR_FADE_DELAY}>
          <p className="section-index mb-2">projects</p>
          <h1 className="text-4xl font-bold tracking-tighter md:text-6xl">
            All <span className="text-gradient">projects</span>.
          </h1>
          <p className="mt-4 max-w-2xl text-muted-foreground md:text-lg">
            Filter by category or search to find specific work — from AI research to process automation.
          </p>
        </BlurFade>
      </section>
      <section className="pb-16">
        <ProjectsGrid projects={allProjects} />
      </section>
    </div>
  );
}
