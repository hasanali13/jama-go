// Real Jama Go Security logo (served from /public). `variant` tweaks the size.
export default function Logo({ variant = "header" }) {
  return (
    <img
      src="/JamaGoLogo.png"
      alt="JAMA Security Equipment"
      className={`brand-logo brand-logo--${variant}`}
      width="130"
      height="130"
      decoding="async"
    />
  );
}
