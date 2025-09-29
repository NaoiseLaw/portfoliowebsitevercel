import { WorkProjectCard } from "@/components/work-project-card";
import { getProjectPosts } from "@/data/projects";

export const metadata = {
  title: "Projects",
  description: "Showcasing my projects and case studies.",
};

export default async function WorkPage() {
  const projects = await getProjectPosts();
  const sorted = projects.sort((a, b) => {
    return (
      new Date(b.metadata.publishedAt).getTime() -
      new Date(a.metadata.publishedAt).getTime()
    );
  });

  return (
    <div className="max-w-4xl mx-auto px-4 pt-24">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-12">Projects</h1>
      <div className="flex flex-col gap-12 mb-10 px-0 md:px-4">
        {sorted.map((post, index) => (
          <WorkProjectCard
            key={post.slug}
            priority={index < 2}
            href={`/work/${post.slug}`}
            images={post.metadata.images}
            title={post.metadata.title}
            description={post.metadata.summary}
            technologies={post.metadata.technologies}
            avatars={post.metadata.team?.map((m) => ({ src: m.avatar }))}
            link={post.metadata.link}
          />
        ))}
      </div>
    </div>
  );
}


