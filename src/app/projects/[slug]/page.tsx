import { DATA } from "@/data/resume";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ProjectLayout } from "@/components/project-layout";
import { getProjectPosts } from "@/data/projects";

export async function generateStaticParams() {
  const allProjects = [
    ...(DATA.projects || []),
    ...(DATA.consultingProjects || []),
    ...(DATA.otherProjects || [])
  ];
  return allProjects.filter((p: any) => p.slug).map((p: any) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const allProjects = [
    ...(DATA.projects || []),
    ...(DATA.consultingProjects || []),
    ...(DATA.otherProjects || [])
  ];
  const project = allProjects.find((p) => p.slug === params.slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.description,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: project.title,
      description: project.description,
      type: "article",
    },
  };
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const allProjects = [
    ...(DATA.projects || []),
    ...(DATA.consultingProjects || []),
    ...(DATA.otherProjects || [])
  ];
  const idx = allProjects.findIndex((p) => p.slug === params.slug);
  if (idx === -1) notFound();
  const project = allProjects[idx];
  const prev = idx > 0 ? { title: allProjects[idx - 1].title, href: allProjects[idx - 1].href } : null;
  const next = idx < allProjects.length - 1 ? { title: allProjects[idx + 1].title, href: allProjects[idx + 1].href } : null;

  return (
    <section className="max-w-3xl mx-auto px-4 py-10">
      <ProjectLayout project={project} prev={prev} next={next} />
      {/* If an MDX case study exists under content/projects/[slug].mdx, show it below */}
      <ProjectCaseStudy slug={params.slug} />
    </section>
  );
}

async function ProjectCaseStudy({ slug }: { slug: string }) {
  const posts = await getProjectPosts();
  const post = posts.find((p) => p.slug === slug);
  if (!post) return null;
  return (
    <article className="prose dark:prose-invert mt-10">
      <div dangerouslySetInnerHTML={{ __html: post.source }} />
    </article>
  );
}


