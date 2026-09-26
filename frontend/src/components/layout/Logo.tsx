export function Logo() {
  return (
    <span className="flex items-center gap-2.5">
      <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary text-primary-foreground shadow-sm">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
          <path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6V3z" />
        </svg>
      </span>
      <span className="leading-tight">
        <span className="block font-heading text-lg font-extrabold tracking-tight text-slate-900">
          SPS Medcare
        </span>
        <span className="block text-[10px] font-bold uppercase tracking-[0.18em] text-primary">
          Medical Tourism · India
        </span>
      </span>
    </span>
  );
}

export default Logo;
