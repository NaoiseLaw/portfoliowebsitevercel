"use client";

import Image from "next/image";
import Link from "next/link";

type Avatar = { src: string; alt?: string };

type WorkProjectCardProps = {
  href: string;
  priority?: boolean;
  images?: string[];
  title: string;
  description: string;
  avatars?: Avatar[];
  link?: string;
  technologies?: string[];
  className?: string;
};

export function WorkProjectCard({
  href,
  priority,
  images = [],
  title,
  description,
  avatars,
  link,
  technologies,
  className,
}: WorkProjectCardProps) {
  return (
    <div className={"flex flex-col gap-4 mb-12 " + (className || "") }>
      <div className="relative aspect-video overflow-hidden rounded-lg bg-gray-100">
        {images[0] && (
          <Image
            src={images[0]}
            alt={title}
            fill
            className="object-cover"
            priority={priority}
          />
        )}
      </div>

      <div className="flex flex-col gap-6 px-2 pt-3 pb-6">
        <h2 className="text-2xl font-bold md:text-3xl">{title}</h2>

        {avatars && avatars.length > 0 && (
          <div className="flex -space-x-2">
            {avatars.map((avatar, idx) => (
              <div
                key={idx}
                className="w-9 h-9 md:w-10 md:h-10 rounded-full overflow-hidden border-2 border-white"
              >
                <Image
                  src={avatar.src}
                  alt={avatar.alt || "Team member"}
                  width={40}
                  height={40}
                />
              </div>
            ))}
          </div>
        )}

        <p className="text-gray-600 dark:text-gray-300">{description}</p>

        {technologies && technologies.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 bg-gray-100 dark:bg-neutral-800 rounded-full text-xs md:text-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        <div className="flex gap-6 flex-wrap">
          <Link
            href={href}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
          >
            Read case study
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14" />
              <path d="M12 5l7 7-7 7" />
            </svg>
          </Link>
          {link && (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
            >
              View project
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <path d="M15 3h6v6" />
                <path d="M10 14L21 3" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}


