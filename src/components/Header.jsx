import { useEffect, useState } from "react";
import useMegaMenu from "../hooks/useMegaMenu.js";
import Logo from "./Logo.jsx";

const SOLUTIONS_LEFT = [
  { href: "#surveillance-cctv", label: "Surveillance (CCTV) Systems" },
  { href: "#smart-home", label: "Smart Home & Automation" },
  { href: "#intercom", label: "Intercom System" },
  { href: "#smart-door-lock", label: "Smart Door Lock" },
  { href: "#telephone", label: "Telephone Systems" },
  { href: "#speed-gates", label: "Speed Gates & Turnstiles" },
  { href: "#metal-detector", label: "Metal Detector" },
  { href: "#moi-approval", label: "MOI Approval" },
  { href: "#cctv-drawing", label: "CCTV Drawing" },
];

const SOLUTIONS_RIGHT = [
  { href: "#access-control", label: "Access Control Systems" },
  { href: "#installation", label: "Installation & Maintenance" },
  { href: "#ceiling-sound", label: "Ceiling Sound System" },
  { href: "#internet-wifi", label: "Internet & Wi-Fi" },
  { href: "#central-satellite", label: "Central Satellite" },
  { href: "#gate-barriers", label: "Gate Barriers" },
  { href: "#accessories", label: "Accessories" },
  { href: "#amc-services", label: "AMC Services" },
  { href: "#free-consultation", label: "Free Consultation" },
];

const NAV_ITEMS = [
  { href: "#top", label: "Home" },
  {
    label: "About",
    menu: "stack",
    children: [
      { href: "#why", label: "Why Us" },
      { href: "#contact", label: "About Us" },
      { href: "#stats", label: "Our Results" },
    ],
  },
  {
    label: "Services",
    menu: "grid",
    children: [
      { href: "#services", label: "All Services" },
      { href: "#services", label: "Manned Guarding" },
      { href: "#services", label: "Mobile Patrols" },
      { href: "#services", label: "Event Security" },
      { href: "#services", label: "CCTV Monitoring" },
      { href: "#services", label: "Alarm Response" },
    ],
  },
  {
    label: "Solutions",
    menu: "columns",
    children: [SOLUTIONS_LEFT, SOLUTIONS_RIGHT],
  },
  {
    label: "Projects",
    menu: "stack",
    children: [
      { href: "#moi-projects", label: "MOI Projects" },
      { href: "#non-moi-projects", label: "Non - Moi Projects" },
    ],
  },
  { href: "#blog", label: "Blog" },
  { href: "#support", label: "Support" },
  { href: "#team", label: "Our Team" },
  { href: "#contact", label: "Contact" },
];

function flattenChildren(children) {
  if (!children) return [];
  if (Array.isArray(children[0])) return children.flat();
  return children;
}

function isActive(href, activeHash) {
  if (!href) return false;
  if (href === "#top") return activeHash === "#top" || activeHash === "";
  return activeHash === href;
}

function childIsActive(item, activeHash) {
  return flattenChildren(item.children).some((c) => isActive(c.href, activeHash));
}

function DropdownLinks({ items, activeHash, onNavigate }) {
  return items.map((child) => (
    <a
      key={child.label}
      href={child.href}
      className={`nav-mega-link${isActive(child.href, activeHash) ? " active" : ""}`}
      onClick={onNavigate}
    >
      {child.label}
    </a>
  ));
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("#top");

  const {
    openDropdown,
    setOpenDropdown,
    isDesktopNav,
    closeDropdown,
    getDropdownHandlers,
  } = useMegaMenu();

  useEffect(() => {
    const syncHash = () => setActiveHash(window.location.hash || "#top");
    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, []);

  const closeMobile = () => {
    setOpen(false);
    closeDropdown();
  };

  const toggleMobileDropdown = (label) => {
    setOpenDropdown((prev) => (prev === label ? null : label));
  };

  return (
    <header className={`site-header${open ? " open" : ""}`} id="top">
      <div className="header-inner">
        <a href="#top" className="brand" aria-label="Jama Go Security home">
          <Logo variant="header" />
        </a>

        <nav className="main-nav" aria-label="Main navigation">
          {NAV_ITEMS.map((item) =>
            item.children ? (
              <div
                key={item.label}
                {...getDropdownHandlers(item.label)}
                className={`nav-dropdown nav-dropdown--${item.menu}${
                  openDropdown === item.label ? " open" : ""
                }${childIsActive(item, activeHash) ? " active" : ""}`}
              >
                <button
                  type="button"
                  className="nav-link nav-link--dropdown"
                  aria-expanded={openDropdown === item.label}
                  aria-haspopup="true"
                  onClick={() => {
                    if (!isDesktopNav) toggleMobileDropdown(item.label);
                  }}
                >
                  {item.label}
                  <span className="nav-caret" aria-hidden="true" />
                </button>

                <div className="nav-mega">
                  {item.menu === "columns" ? (
                    <div className="nav-mega-grid nav-mega-grid--2">
                      {item.children.map((column) => (
                        <div className="nav-mega-col" key={column[0].label}>
                          <DropdownLinks
                            items={column}
                            activeHash={activeHash}
                            onNavigate={closeMobile}
                          />
                        </div>
                      ))}
                    </div>
                  ) : item.menu === "grid" ? (
                    <div className="nav-mega-grid nav-mega-grid--3">
                      <DropdownLinks
                        items={item.children}
                        activeHash={activeHash}
                        onNavigate={closeMobile}
                      />
                    </div>
                  ) : (
                    <div className="nav-mega-stack">
                      <DropdownLinks
                        items={item.children}
                        activeHash={activeHash}
                        onNavigate={closeMobile}
                      />
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <a
                key={item.label}
                href={item.href}
                className={`nav-link${isActive(item.href, activeHash) ? " active" : ""}`}
                onClick={closeMobile}
              >
                {item.label}
              </a>
            )
          )}
        </nav>

        <a href="#contact" className="btn btn-primary btn-sm nav-cta">
          Get a Quote
        </a>

        <button
          className="nav-toggle"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
}
