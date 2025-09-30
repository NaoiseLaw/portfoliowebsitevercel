import { getBlogPosts } from "@/data/blog";
import { getProjectPosts } from "@/data/projects";
import { DATA } from "@/data/resume";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "";
  const blog = await getBlogPosts();
  const projects = await getProjectPosts();
  const curated = (DATA.projects as readonly any[]).map((p) => ({ url: `${baseUrl}${p.href}` }));

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/blog`, changeFrequency: "weekly" },
    { url: `${baseUrl}/work`, changeFrequency: "weekly" },
  ];

  const blogRoutes: MetadataRoute.Sitemap = blog.map((p) => ({
    url: `${baseUrl}/blog/${p.slug}`,
    changeFrequency: "monthly",
  }));

  const projectRoutes: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${baseUrl}/work/${p.slug}`,
    changeFrequency: "monthly",
  }));

  return [...staticRoutes, ...blogRoutes, ...projectRoutes, ...curated];
}


