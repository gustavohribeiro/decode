import Link from "next/link";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="#home"
      className={`inline-flex items-center gap-2.5 text-white ${className}`}
      aria-label="SONIQ home"
    >
      <svg width="28" height="16" viewBox="0 0 28 16" fill="none" aria-hidden>
        <circle cx="7" cy="8" r="5.2" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="21" cy="8" r="5.2" stroke="currentColor" strokeWidth="1.6" />
        <path
          d="M12 8c1.4-2.4 2.6-2.4 4 0"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
      <span className="font-display text-[15px] font-medium tracking-[0.04em]">
        SONIQ™
      </span>
    </Link>
  );
}
