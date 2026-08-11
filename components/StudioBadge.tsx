export function StudioBadge() {
  return (
    <aside className="fixed bottom-4 right-4 z-40 hidden w-[220px] rounded-xl border border-white/15 bg-black/75 p-3 text-[11px] text-white/80 shadow-glass backdrop-blur md:block">
      <div className="mb-2 flex items-center gap-2">
        <span className="inline-flex h-4 w-6 items-center justify-center rounded-full border border-[#ed7a2f] text-[9px] text-[#ed7a2f]">
          ○
        </span>
        <p>
          Built with <span className="font-semibold text-white">Interactive Studio</span>
        </p>
      </div>
      <div className="border-t border-white/10 pt-2">
        <p className="mb-1 text-white/50">Installed Apps:</p>
        <ul className="space-y-0.5 text-white/75">
          <li>• Motion Flow</li>
          <li>• Aura Suite</li>
        </ul>
      </div>
    </aside>
  );
}
