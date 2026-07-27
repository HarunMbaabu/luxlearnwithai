"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import UniversalEnrollmentForm from "@/components/UniversalEnrollmentForm";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const programLinks = [
  { href: "/curriculum#data-science-and-analytics", label: "Data Science and Analytics" },
  { href: "/curriculum#data-engineering", label: "Data Engineering" },
];

const aboutLinks = [
  { href: "/about", label: "About Us" },
  { href: "/research", label: "Research" },
  { href: "/community", label: "Community" },
  { href: "/ai-services", label: "AI Services" },
];

const languages = ["English", "Français", "Español", "Deutsch"];

export default function Header({ hideRegistrationBanner = false }) {
  const pathname = usePathname();
  const [showBanner, setShowBanner] = useState(!hideRegistrationBanner);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileDropdown, setMobileDropdown] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [showEnrollmentForm, setShowEnrollmentForm] = useState(false);

  useEffect(() => setShowBanner(!hideRegistrationBanner), [hideRegistrationBanner]);

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === "Escape") {
        setOpenDropdown(null);
        setMobileDropdown(null);
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, []);

  useEffect(() => {
    const closeOnOutsideClick = (event) => {
      if (!event.target.closest("[data-header-dropdown]")) setOpenDropdown(null);
    };
    document.addEventListener("mousedown", closeOnOutsideClick);
    return () => document.removeEventListener("mousedown", closeOnOutsideClick);
  }, []);

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
  const programActive = isActive("/curriculum");
  const aboutActive = aboutLinks.some(({ href }) => isActive(href));
  const navClass = (active, prominent = false) =>
    `relative rounded-sm px-1 py-2 text-sm font-bold tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2 ${
      active
        ? "text-blue-900 after:absolute after:inset-x-1 after:-bottom-1 after:h-0.5 after:bg-blue-900"
        : prominent
          ? "text-blue-900 hover:text-blue-700"
          : "text-gray-800 hover:text-blue-900"
    }`;
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setMobileDropdown(null);
  };

  const dropdown = (name, label, active, links) => (
    <div className="relative flex items-center" data-header-dropdown>
      <Link href={name === "program" ? "/curriculum" : "/about"} className={navClass(active)} aria-current={active ? "page" : undefined}>
        {label}
      </Link>
      <button
        type="button"
        className="rounded-sm p-1 text-gray-700 hover:text-blue-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700"
        aria-label={`Open ${label} menu`}
        aria-haspopup="menu"
        aria-expanded={openDropdown === name}
        aria-controls={`${name}-menu`}
        onClick={() => setOpenDropdown(openDropdown === name ? null : name)}
      >
        <ChevronDown className={`h-4 w-4 transition-transform ${openDropdown === name ? "rotate-180" : ""}`} aria-hidden="true" />
      </button>
      {openDropdown === name && (
        <div id={`${name}-menu`} role="menu" className="absolute left-0 top-full mt-2 w-56 rounded-lg border bg-white py-1 shadow-lg">
          {links.map((link) => (
            <Link key={link.href} href={link.href} role="menuitem" className="block px-4 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-blue-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-700" onClick={() => setOpenDropdown(null)}>
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );

  const mobileLink = (href, label, prominent = false) => {
    const active = isActive(href);
    return (
      <Link href={href} onClick={closeMobileMenu} aria-current={active ? "page" : undefined} className={`rounded px-2 py-2 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 ${active ? "bg-blue-50 text-blue-900" : prominent ? "text-blue-900 hover:bg-blue-50" : "text-gray-700 hover:bg-gray-50 hover:text-blue-900"}`}>
        {label}
      </Link>
    );
  };

  const mobileDropdownMenu = (name, label, active, links) => (
    <div className="border-l-2 border-blue-100 pl-2">
      <div className={`flex items-center rounded ${active ? "bg-blue-50" : ""}`}>
        <Link href={name === "program" ? "/curriculum" : "/about"} onClick={closeMobileMenu} aria-current={active ? "page" : undefined} className="flex-1 px-2 py-2 text-sm font-semibold text-gray-700 hover:text-blue-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700">
          {label}
        </Link>
        <button type="button" className="m-1 rounded p-2 text-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700" aria-label={`Open ${label} menu`} aria-haspopup="menu" aria-expanded={mobileDropdown === name} aria-controls={`mobile-${name}-menu`} onClick={() => setMobileDropdown(mobileDropdown === name ? null : name)}>
          <ChevronDown className={`h-4 w-4 transition-transform ${mobileDropdown === name ? "rotate-180" : ""}`} aria-hidden="true" />
        </button>
      </div>
      {mobileDropdown === name && (
        <div id={`mobile-${name}-menu`} role="menu" className="ml-2 space-y-1 py-1">
          {links.map((link) => (
            <Link key={link.href} href={link.href} role="menuitem" onClick={closeMobileMenu} className="block rounded px-2 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-blue-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700">
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <>
      {!hideRegistrationBanner && showBanner && (
        <div className="fixed left-0 top-0 z-[60] w-full bg-blue-900 text-white">
          <div className="relative flex items-center justify-center px-10 py-2 text-center text-sm font-medium md:text-base">
            <p><strong>August 2026 Intake – Final Intake for 2026 |</strong>{" "}<button type="button" className="font-semibold underline hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white" onClick={() => setShowEnrollmentForm(true)}>Enroll Now →</button></p>
            <button type="button" onClick={() => setShowBanner(false)} className="absolute right-4 rounded-full p-1 hover:bg-blue-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white" aria-label="Close banner"><X className="h-4 w-4" /></button>
          </div>
        </div>
      )}

      <header className={`fixed left-0 z-50 w-full border-b border-blue-200 bg-white/95 backdrop-blur-sm transition-all duration-300 ${showBanner ? "top-10" : "top-0"}`}>
        <div className="mx-auto flex h-16 w-full items-center justify-between gap-3 px-4 lg:px-6">
          <Link href="/" className="flex shrink-0 items-center gap-2 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 md:gap-3">
            <Image src="/logo.png" alt="LuxDevHQ" width={40} height={40} className="h-8 w-8 rounded-full md:h-10 md:w-10" />
            <span className="text-xl font-bold text-blue-900 md:text-2xl">LuxDevHQ</span>
          </Link>

          <nav aria-label="Main navigation" className="hidden items-center gap-3 md:flex lg:gap-5">
            <Link href="/" className={navClass(isActive("/"))} aria-current={isActive("/") ? "page" : undefined}>Home</Link>
            <Link href="/pricing" className={navClass(isActive("/pricing"))} aria-current={isActive("/pricing") ? "page" : undefined}>Pricing</Link>
            {dropdown("program", "Program", programActive, programLinks)}
            <Link href="/challenges" className={navClass(isActive("/challenges"))} aria-current={isActive("/challenges") ? "page" : undefined}>Challenges</Link>
            {dropdown("about", "About", aboutActive, aboutLinks)}
            <Link href="/free-ai-tutor" className={navClass(isActive("/free-ai-tutor"), true)} aria-current={isActive("/free-ai-tutor") ? "page" : undefined}>Ask AI</Link>
          </nav>

          <div className="flex shrink-0 items-center gap-2 md:gap-3">
            <div className="relative" data-header-dropdown>
              <button type="button" className="rounded p-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700" aria-label={`Language: ${selectedLanguage}`} aria-haspopup="menu" aria-expanded={openDropdown === "language"} aria-controls="language-menu" onClick={() => setOpenDropdown(openDropdown === "language" ? null : "language")}>
                <Image src="/globe.svg" alt="" width={30} height={20} className="h-4 w-6" />
              </button>
              {openDropdown === "language" && <div id="language-menu" role="menu" className="absolute right-0 mt-2 w-40 rounded-lg border bg-white py-1 shadow-lg">{languages.map((language) => <button type="button" role="menuitem" key={language} onClick={() => { setSelectedLanguage(language); setOpenDropdown(null); }} className="flex w-full items-center px-4 py-2 text-left hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-700"><Image src="/globe.svg" alt="" width={20} height={15} className="mr-2" />{language}</button>)}</div>}
            </div>
            <Button size="sm" className="hidden bg-blue-900 text-sm md:block" onClick={() => setShowEnrollmentForm(true)}>Enroll Now</Button>
            <button type="button" className="rounded p-1 md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700" onClick={() => { setMobileMenuOpen(!mobileMenuOpen); setMobileDropdown(null); setOpenDropdown(null); }} aria-label={mobileMenuOpen ? "Close menu" : "Open menu"} aria-expanded={mobileMenuOpen} aria-controls="mobile-navigation">{mobileMenuOpen ? <X className="h-6 w-6 text-gray-600" /> : <Menu className="h-6 w-6 text-gray-600" />}</button>
          </div>
        </div>

        {mobileMenuOpen && (
          <nav id="mobile-navigation" aria-label="Mobile navigation" className="border-t border-gray-100 bg-white md:hidden">
            <div className="flex flex-col space-y-1 px-4 py-3">
              {mobileLink("/", "Home")}
              {mobileLink("/pricing", "Pricing")}
              {mobileDropdownMenu("program", "Program", programActive, programLinks)}
              {mobileLink("/challenges", "Challenges")}
              {mobileDropdownMenu("about", "About", aboutActive, aboutLinks)}
              {mobileLink("/free-ai-tutor", "Ask AI", true)}
              <Button size="sm" className="mt-2 w-full bg-blue-900" onClick={() => { closeMobileMenu(); setShowEnrollmentForm(true); }}>Enroll Now</Button>
            </div>
          </nav>
        )}
      </header>

      <Dialog open={showEnrollmentForm} onOpenChange={setShowEnrollmentForm}>
        <DialogTrigger className="hidden" />
        <DialogContent><DialogTitle>Enrollment</DialogTitle><UniversalEnrollmentForm onClose={() => setShowEnrollmentForm(false)} /></DialogContent>
      </Dialog>
    </>
  );
}
