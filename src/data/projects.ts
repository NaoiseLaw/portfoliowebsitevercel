import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { markdownToHTML } from "@/data/blog";

export type ProjectTeamMember = {
  name: string;
  role: string;
  avatar: string;
  linkedIn?: string;
};

export type ProjectMetadata = {
  title: string;
  publishedAt: string;
  summary: string;
  images: string[];
  link?: string;
  technologies?: string[];
  team?: ProjectTeamMember[];
  downloads?: { label: string; href: string; size?: string }[];
};

export type Project = {
  slug: string;
  source: string; // processed HTML
  metadata: ProjectMetadata;
};

function getMDXFiles(dir: string) {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
}

export async function getProject(slug: string): Promise<Project> {
  const filePath = path.join("content", "projects", `${slug}.mdx`);
  const source = fs.readFileSync(filePath, "utf-8");
  const { content: rawContent, data } = matter(source);
  const html = await markdownToHTML(rawContent);
  return {
    slug,
    source: html,
    metadata: data as ProjectMetadata,
  };
}

async function getAllProjects(dir: string): Promise<Project[]> {
  const mdxFiles = getMDXFiles(dir);
  return Promise.all(
    mdxFiles.map(async (file) => {
      const slug = path.basename(file, path.extname(file));
      const project = await getProject(slug);
      return project;
    }),
  );
}

export async function getProjectPosts(): Promise<Project[]> {
  return getAllProjects(path.join(process.cwd(), "content", "projects"));
}


