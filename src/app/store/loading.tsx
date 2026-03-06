export default function StoreLoading() {
  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Hero skeleton */}
      <div className="section-padding">
        <div className="container-wide">
          <div className="text-center max-w-2xl mx-auto">
            <div className="h-4 w-20 bg-zinc-800 rounded-full mx-auto mb-4 animate-pulse" />
            <div className="h-10 w-64 bg-zinc-800 rounded-lg mx-auto mb-3 animate-pulse" />
            <div className="h-5 w-96 bg-zinc-800/50 rounded-lg mx-auto animate-pulse" />
          </div>
          {/* Product grid skeleton */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="rounded-xl border border-zinc-800/50 bg-zinc-900/30 overflow-hidden">
                <div className="aspect-square bg-zinc-800/50 animate-pulse" />
                <div className="p-4 space-y-2">
                  <div className="h-4 w-3/4 bg-zinc-800 rounded animate-pulse" />
                  <div className="h-3 w-1/2 bg-zinc-800/50 rounded animate-pulse" />
                  <div className="h-5 w-1/3 bg-zinc-800 rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
