export default function Loading() {
  return (
    <div className="space-y-6">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="space-y-3">
          <div className="h-48 w-full bg-neutral-100 dark:bg-neutral-800 rounded" />
          <div className="h-6 w-1/2 bg-neutral-100 dark:bg-neutral-800 rounded" />
          <div className="h-4 w-2/3 bg-neutral-100 dark:bg-neutral-800 rounded" />
        </div>
      ))}
    </div>
  );
}


