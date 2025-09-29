"use client";

export default function SimulatorPage() {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-3">
        <h1 className="text-2xl font-semibold">Simulator</h1>
        <div className="flex gap-2">
          <button
            type="button"
            className="px-3 py-1.5 text-sm bg-neutral-100 dark:bg-neutral-800 rounded border"
            onClick={() => {
              const iframe = document.getElementById("sim-iframe") as HTMLIFrameElement | null;
              iframe?.contentWindow?.location.reload();
            }}
          >
            Reset
          </button>
          <button
            type="button"
            className="px-3 py-1.5 text-sm bg-neutral-100 dark:bg-neutral-800 rounded border"
            onClick={() => {
              const iframe = document.getElementById("sim-iframe") as HTMLIFrameElement | null;
              if (!iframe) return;
              const el = iframe;
              if (el.requestFullscreen) el.requestFullscreen();
            }}
          >
            Fullscreen
          </button>
        </div>
      </div>
      <div className="relative w-full h-[80vh]">
        <div className="absolute inset-0 grid place-items-center animate-pulse text-sm text-neutral-500">
          Loading simulator...
        </div>
        <iframe
          id="sim-iframe"
          src="/simulator/index.html"
          title="Simulator"
          className="w-full h-full border rounded relative z-10 bg-white"
        />
      </div>
    </div>
  );
}


