import { getBlogPosts } from "@/data/blog";
import { getProjectPosts } from "@/data/projects";
import { DATA } from "@/data/resume";

export default async function sitemap() {
  const baseUrl = DATA.url || "";
  const blog = (await getBlogPosts()) as Array<{ slug: string }>;
  const projects = (await getProjectPosts()) as Array<{ slug: string }>;
  const curated = (DATA.projects as ReadonlyArray<{ href: string }>).map((p) => ({ url: `${baseUrl}${p.href}` }));

  const staticRoutes = [
    { url: `${baseUrl}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/blog`, changeFrequency: "weekly" },
    { url: `${baseUrl}/work`, changeFrequency: "weekly" },
  ];

  const blogRoutes = blog.map((p) => ({
    url: `${baseUrl}/blog/${p.slug}`,
    changeFrequency: "monthly",
  }));

  const projectRoutes = projects.map((p) => ({
    url: `${baseUrl}/work/${p.slug}`,
    changeFrequency: "monthly",
  }));

  return [...staticRoutes, ...blogRoutes, ...projectRoutes, ...curated];
}


