export default function StoreLoading() {
  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Hero skeleton */}
      <div className="pt-28 pb-10 sm:pt-32 sm:pb-14">
        <div className="container-wide">
          <div className="max-w-xl">
            <div className="h-4 w-24 bg-zinc-800 rounded-full mb-5 animate-pulse" />
            <div className="h-12 w-72 bg-zinc-800 rounded-lg mb-4 animate-pulse" />
            <div className="h-5 w-96 bg-zinc-800/50 rounded-lg mb-6 animate-pulse" />
            <div className="flex gap-4">
              <div className="h-3 w-28 bg-zinc-800/30 rounded animate-pulse" />
              <div className="h-3 w-28 bg-zinc-800/30 rounded animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      <div className="py-10">
        <div className="container-wide">
          <div className="flex gap-8">
            {/* Sidebar skeleton */}
            <div className="hidden lg:block w-60 space-y-6">
              <div className="space-y-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="h-10 bg-zinc-800/30 rounded-lg animate-pulse" />
                ))}
              </div>
            </div>

            {/* Grid skeleton */}
            <div className="flex-1">
              <div className="flex justify-between mb-6">
                <div className="h-10 w-64 bg-zinc-800/30 rounded-lg animate-pulse" />
                <div className="flex gap-2">
                  <div className="h-10 w-24 bg-zinc-800/30 rounded-lg animate-pulse" />
                  <div className="h-10 w-20 bg-zinc-800/30 rounded-lg animate-pulse" />
                </div>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="rounded-2xl border border-zinc-800/40 bg-zinc-900/30 overflow-hidden">
                    <div className="aspect-square bg-zinc-800/30 animate-pulse" />
                    <div className="p-4 space-y-2">
                      <div className="h-2 w-16 bg-zinc-800/40 rounded animate-pulse" />
                      <div className="h-4 w-3/4 bg-zinc-800 rounded animate-pulse" />
                      <div className="h-3 w-full bg-zinc-800/30 rounded animate-pulse" />
                      <div className="h-3 w-2/3 bg-zinc-800/30 rounded animate-pulse" />
                      <div className="h-5 w-1/3 bg-zinc-800 rounded animate-pulse mt-2" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
