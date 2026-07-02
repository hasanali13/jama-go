// Real Jama Go Security logo (served from /public). `variant` tweaks the size.
export default function Logo({ variant = "header" }) {
  return (
    <img
      src="/JamaGoLogo.png"
      alt="Jama Go Security Equipment"
      className={`brand-logo brand-logo--${variant}`}
      width="240"
      height="80"
      decoding="async"
    />
  );
}
