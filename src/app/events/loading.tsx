export default function EventsLoading() {
  return (
    <div className="min-h-screen bg-zinc-950">
      <div className="section-padding">
        <div className="container-wide">
          <div className="text-center max-w-2xl mx-auto">
            <div className="h-4 w-24 bg-zinc-800 rounded-full mx-auto mb-4 animate-pulse" />
            <div className="h-10 w-48 bg-zinc-800 rounded-lg mx-auto mb-3 animate-pulse" />
            <div className="h-5 w-72 bg-zinc-800/50 rounded-lg mx-auto animate-pulse" />
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="rounded-xl border border-zinc-800/50 bg-zinc-900/30 overflow-hidden">
                <div className="h-1 bg-zinc-800 animate-pulse" />
                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-zinc-800 animate-pulse" />
                    <div className="h-5 w-20 bg-zinc-800/50 rounded-full animate-pulse" />
                  </div>
                  <div className="h-6 w-3/4 bg-zinc-800 rounded animate-pulse" />
                  <div className="h-4 w-full bg-zinc-800/50 rounded animate-pulse" />
                  <div className="h-4 w-2/3 bg-zinc-800/30 rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
