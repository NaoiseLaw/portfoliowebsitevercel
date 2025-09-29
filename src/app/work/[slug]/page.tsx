import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProjectPosts, getProject } from "@/data/projects";
import { formatDate } from "@/lib/utils";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { LightboxGallery } from "@/components/lightbox";

export async function generateStaticParams() {
  const posts = await getProjectPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata | undefined> {
  try {
    const post = await getProject(params.slug);
    return {
      title: post.metadata.title,
      description: post.metadata.summary,
      alternates: {
        canonical: `/work/${post.slug}`,
      },
      openGraph: {
        title: post.metadata.title,
        description: post.metadata.summary,
        type: "article",
        images: post.metadata.images?.[0]
          ? [{ url: post.metadata.images[0] }]
          : undefined,
      },
      twitter: {
        card: "summary_large_image",
        title: post.metadata.title,
        description: post.metadata.summary,
        images: post.metadata.images?.[0] ? [post.metadata.images[0]] : undefined,
      },
    };
  } catch {
    return undefined;
  }
}

export default async function ProjectPage({
  params,
}: {
  params: { slug: string };
}) {
  let post: Awaited<ReturnType<typeof getProject>> | null = null;
  try {
    post = await getProject(params.slug);
  } catch {
    notFound();
  }

  if (!post) notFound();

  return (
    <article className="max-w-4xl mx-auto px-4 py-12">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            name: post.metadata.title,
            datePublished: post.metadata.publishedAt,
            description: post.metadata.summary,
            image: post.metadata.images,
            url: `/work/${post.slug}`,
          }),
        }}
      />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Projects", href: "/work" }, { label: post.metadata.title }]} />
      <div className="text-center mb-12">
        <Link href="/work" className="text-sm text-gray-600 hover:text-gray-900 dark:text-neutral-300 dark:hover:text-white">
          ← Back to Projects
        </Link>
        <p className="text-gray-500 dark:text-neutral-400 mt-4">
          {formatDate(post.metadata.publishedAt)}
        </p>
        <h1 className="text-4xl md:text-5xl font-bold mt-4">{post.metadata.title}</h1>
      </div>

      {post.metadata.images && post.metadata.images.length > 0 && (
        <div className="mb-12">
          <div className="relative aspect-video rounded-lg overflow-hidden">
            <Image
              src={post.metadata.images[0]}
              alt={post.metadata.title}
              fill
              className="object-cover"
              priority
            />
          </div>
          {post.metadata.images.length > 1 && (
            <div className="mt-4">
              <LightboxGallery images={post.metadata.images.slice(1)} />
            </div>
          )}
        </div>
      )}

      <div className="prose prose-lg dark:prose-invert mx-auto">
        <div dangerouslySetInnerHTML={{ __html: post.source }} />
      </div>

      {post.metadata.downloads && post.metadata.downloads.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Downloads</h2>
          <ul className="space-y-3">
            {post.metadata.downloads.map((d) => (
              <li key={`${d.href}-${d.label}`} className="flex items-center justify-between bg-neutral-50 dark:bg-neutral-900 border rounded-md px-4 py-3">
                <div className="flex items-center gap-3">
                  <svg className="w-4 h-4 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  <span className="font-medium">{d.label}</span>
                </div>
                <a
                  href={d.href}
                  download
                  className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm"
                >
                  Download{d.size ? ` (${d.size})` : ""}
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-2 text-xs text-neutral-500">Files are served from /public or external URLs.</p>
        </div>
      )}

      <div className="mt-20 pt-12 border-t">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Related Projects</h2>
        {/* Simple related section: latest two excluding current */}
        {/* The listing page shows all; here we inline two links */}
        <RelatedProjects excludeSlug={post.slug} />
      </div>
    </article>
  );
}

async function RelatedProjects({ excludeSlug }: { excludeSlug: string }) {
  const posts = await getProjectPosts();
  const related = posts
    .filter((p) => p.slug !== excludeSlug)
    .sort((a, b) => new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime())
    .slice(0, 2);

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {related.map((p) => (
        <Link key={p.slug} href={`/work/${p.slug}`} className="group">
          <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-gray-100">
            {p.metadata.images?.[0] && (
              <Image
                src={p.metadata.images[0]}
                alt={p.metadata.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            )}
          </div>
          <div className="mt-3">
            <h3 className="font-semibold text-lg">{p.metadata.title}</h3>
            <p className="text-sm text-gray-600 dark:text-neutral-400 line-clamp-2">
              {p.metadata.summary}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}


