"use client";

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="text-center space-y-4">
      <h1 className="text-3xl font-semibold">Something went wrong</h1>
      <p className="text-muted-foreground">{error?.message || "Unknown error"}</p>
      <button
        className="px-3 py-1.5 text-sm bg-neutral-100 dark:bg-neutral-800 rounded border"
        onClick={() => reset()}
      >
        Try again
      </button>
    </div>
  );
}


