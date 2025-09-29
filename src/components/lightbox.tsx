"use client";

import Image from "next/image";
import { useState } from "react";

export function LightboxGallery({ images }: { images: string[] }) {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {images.map((src, idx) => (
          <button
            key={idx}
            onClick={() => setActive(src)}
            className="relative aspect-[16/10] overflow-hidden rounded-lg bg-gray-100"
          >
            <Image src={src} alt="Gallery image" fill className="object-cover" />
          </button>
        ))}
      </div>
      {active && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setActive(null)}
        >
          <div className="relative w-full max-w-5xl aspect-video">
            <Image src={active} alt="Preview" fill className="object-contain" />
          </div>
        </div>
      )}
    </div>
  );
}


