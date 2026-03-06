export default function BlogLoading() {
  return (
    <div className="min-h-screen bg-zinc-950">
      <div className="section-padding">
        <div className="container-wide">
          <div className="text-center max-w-2xl mx-auto">
            <div className="h-4 w-24 bg-zinc-800 rounded-full mx-auto mb-4 animate-pulse" />
            <div className="h-10 w-56 bg-zinc-800 rounded-lg mx-auto mb-3 animate-pulse" />
            <div className="h-5 w-80 bg-zinc-800/50 rounded-lg mx-auto animate-pulse" />
          </div>
          {/* Blog grid skeleton */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="rounded-xl border border-zinc-800/50 bg-zinc-900/30 overflow-hidden">
                <div className="aspect-video bg-zinc-800/50 animate-pulse" />
                <div className="p-5 space-y-3">
                  <div className="flex gap-2">
                    <div className="h-5 w-16 bg-zinc-800 rounded-full animate-pulse" />
                    <div className="h-5 w-20 bg-zinc-800/50 rounded-full animate-pulse" />
                  </div>
                  <div className="h-5 w-full bg-zinc-800 rounded animate-pulse" />
                  <div className="h-4 w-3/4 bg-zinc-800/50 rounded animate-pulse" />
                  <div className="h-3 w-1/2 bg-zinc-800/30 rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
