import Link from "next/link";

export function CartButton({
  className = "",
  href = "#order",
}: {
  className?: string;
  href?: string;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black transition hover:bg-white/90 ${className}`}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M3 5h2l1.2 10.2A2 2 0 0 0 8.2 17H18a2 2 0 0 0 2-1.6L21.3 8H7"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="9" cy="20" r="1.3" fill="currentColor" />
        <circle cx="17" cy="20" r="1.3" fill="currentColor" />
      </svg>
      Get yours now!
    </Link>
  );
}
