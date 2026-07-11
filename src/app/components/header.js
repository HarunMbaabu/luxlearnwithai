"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import UniversalEnrollmentForm from "@/components/UniversalEnrollmentForm";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

export default function Header({ hideRegistrationBanner = false }) {
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [showCompanyDropdown, setShowCompanyDropdown] = useState(false);
  const [showProgramDropdown, setShowProgramDropdown] = useState(false);
  const [showMobileProgramDropdown, setShowMobileProgramDropdown] =
    useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showBanner, setShowBanner] = useState(!hideRegistrationBanner);
  const [showUniversalEnrollmentForm, setShowUniversalEnrollmentForm] =
    useState(false);

  const [selectedLanguage, setSelectedLanguage] = useState({
    flag: "/globe.svg",
    name: "English",
  });

  // Handle clicks outside dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Don't close if clicking the dropdown triggers
      if (
        event.target.closest(".language-dropdown-trigger") ||
        event.target.closest(".company-dropdown-trigger") ||
        event.target.closest(".program-dropdown-trigger") ||
        event.target.closest(".mobile-menu-trigger")
      ) {
        return;
      }

      // Close if clicking outside
      if (
        !event.target.closest(".language-dropdown-content") &&
        !event.target.closest(".company-dropdown-content") &&
        !event.target.closest(".program-dropdown-content") &&
        !event.target.closest(".mobile-menu-content")
      ) {
        setShowLanguageDropdown(false);
        setShowCompanyDropdown(false);
        setShowProgramDropdown(false);
        setShowMobileProgramDropdown(false);
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setShowBanner(!hideRegistrationBanner);
  }, [hideRegistrationBanner]);

  const languages = [
    { flag: "/globe.svg", name: "English" },
    { flag: "/globe.svg", name: "Français" },
    { flag: "/globe.svg", name: "Español" },
    { flag: "/globe.svg", name: "Deutsch" },
  ];

  const programLinks = [
    { href: "/pricing", label: "Full Program" },
    { href: "/prep-program", label: "Prep Program" },
  ];

  const companyLinks = [
    { href: "/about", label: "About Us" },
    { href: "/research", label: "Research" },
    { href: "/community", label: "Community" },
    { href: "/ai-services", label: "AI Services" },
  ];

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
    setShowLanguageDropdown(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    setShowMobileProgramDropdown(false);
  };

  return (
    <>
      {/* Registration Banner */}
      {!hideRegistrationBanner && showBanner && (
        <div className="fixed top-0 left-0 w-full z-50 bg-blue-900 text-white">
          <div className="flex items-center justify-center px-4 py-2 relative">
            <div className="text-center">
              <p className="text-sm md:text-base font-medium">
                <strong>August 2026 Intake – Final Intake for 2026 |</strong>

                <Dialog
                  open={showUniversalEnrollmentForm}
                  onOpenChange={(open) => {
                    setShowUniversalEnrollmentForm(open);
                    if (open) {
                      setShowLanguageDropdown(false);
                      setShowCompanyDropdown(false);
                      setShowProgramDropdown(false);
                      setMobileMenuOpen(false);
                    }
                  }}
                >
                  <DialogTrigger asChild>
                    <button
                      type="button"
                      className="ml-1 underline hover:no-underline font-semibold"
                      onClick={() => setShowUniversalEnrollmentForm(true)}
                    >
                      Enroll Now →
                    </button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogTitle>Enrollment</DialogTitle>
                    <UniversalEnrollmentForm
                      onClose={() => setShowUniversalEnrollmentForm(false)}
                    />
                  </DialogContent>
                </Dialog>
              </p>
            </div>
            <button
              onClick={() => setShowBanner(false)}
              className="absolute right-4 hover:bg-blue-800 rounded-full p-1 transition-colors"
              aria-label="Close banner"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Main Header */}
      <header
        className={`fixed left-0 w-full z-40 bg-white/95 backdrop-blur-sm border-b border-blue-200 ${
          showBanner ? "top-10" : "top-0"
        } transition-all duration-300`}
      >
        <div className="w-full px-4 mx-auto flex h-16 items-center justify-between">
          <Link href={"/"} className="flex items-center gap-2 md:gap-4">
            <Image
              src="/logo.png"
              alt="User"
              width={40}
              height={40}
              className="w-8 h-8 md:w-10 md:h-10 rounded-full"
            />
            <h1 className="text-blue-900 font-bold text-xl md:text-2xl">
              LuxDevHQ
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/pricing"
              className="text-md tracking-wide font-bold text-gray-800 hover:text-blue-900 transition-colors"
            >
              Pricing
            </Link>

            {/* Program Dropdown */}
            <div className="relative">
              <button
                className="program-dropdown-trigger flex items-center gap-1 text-md tracking-wide font-bold text-gray-800 hover:text-blue-900 transition-colors focus:outline-none"
                aria-expanded={showProgramDropdown}
                onClick={(e) => {
                  e.stopPropagation();
                  setShowLanguageDropdown(false);
                  setShowCompanyDropdown(false);
                  setShowProgramDropdown(!showProgramDropdown);
                }}
              >
                Program
                <ChevronDown className="h-4 w-4" />
              </button>
              {showProgramDropdown && (
                <div className="program-dropdown-content absolute left-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-10">
                  {programLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block px-4 py-3 text-sm font-medium text-gray-600 hover:text-blue-900 hover:bg-gray-50 transition-colors"
                      onClick={() => setShowProgramDropdown(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/prep-program"
              className="text-md tracking-wide font-bold text-gray-800 hover:text-blue-900 transition-colors"
            >
              Prep Program
            </Link>

            <Link
              href="/free-ai-tutor"
              className="text-md tracking-wide font-bold text-blue-900 hover:text-blue-700 transition-colors"
            >
              Ask AI
            </Link>

            <Link
              href="/get-started"
              className="text-md tracking-wide font-bold text-gray-800 hover:text-blue-900 transition-colors"
            >
              Get Started
            </Link>

            <Link
              href="/login"
              className="text-md tracking-wide font-bold text-gray-800 hover:text-blue-900 transition-colors"
            >
              Log in
            </Link>

            {/* Company Dropdown */}
            <div className="relative">
              <button
                className="company-dropdown-trigger flex items-center gap-1 text-md tracking-wide font-bold text-gray-800 hover:text-blue-900 transition-colors focus:outline-none"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowLanguageDropdown(false);
                  setShowProgramDropdown(false);
                  setShowCompanyDropdown(!showCompanyDropdown);
                }}
              >
                About
                <ChevronDown className="h-4 w-4" />
              </button>
              {showCompanyDropdown && (
                <div className="company-dropdown-content absolute left-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-10">
                  {companyLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block px-4 py-3 text-sm font-medium text-gray-600 hover:text-blue-900 hover:bg-gray-50 transition-colors"
                      onClick={() => setShowCompanyDropdown(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>

          <div className="flex items-center gap-2 md:gap-4">
            {/* Language Dropdown */}
            <div className="relative">
              <button
                className="language-dropdown-trigger focus:outline-none"
                onClick={(e) => {
                  e.stopPropagation();
                  setMobileMenuOpen(false);
                  setShowCompanyDropdown(false);
                  setShowProgramDropdown(false);
                  setShowLanguageDropdown(!showLanguageDropdown);
                }}
              >
                <Image
                  src={selectedLanguage.flag}
                  alt="Language"
                  width={30}
                  height={20}
                  className="w-6 h-4"
                />
              </button>
              {showLanguageDropdown && (
                <div className="language-dropdown-content absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg z-10">
                  {languages.map((language) => (
                    <button
                      key={language.name}
                      onClick={() => handleLanguageChange(language)}
                      className="flex items-center w-full px-4 py-2 text-left hover:bg-gray-100"
                    >
                      <Image
                        src={language.flag}
                        alt={language.name}
                        width={20}
                        height={15}
                        className="mr-2"
                      />
                      {language.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Desktop Apply Button */}
            <Dialog
              open={showUniversalEnrollmentForm}
              onOpenChange={(open) => {
                setShowUniversalEnrollmentForm(open);
                if (open) {
                  setShowLanguageDropdown(false);
                  setShowCompanyDropdown(false);
                  setShowProgramDropdown(false);
                  setMobileMenuOpen(false);
                }
              }}
            >
              <DialogTrigger asChild>
                <Button
                  size="sm"
                  className="text-md hidden md:block bg-blue-900"
                  onClick={() => setShowUniversalEnrollmentForm(true)}
                >
                  Enroll Now
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogTitle>Enrollment</DialogTitle>
                <UniversalEnrollmentForm
                  onClose={() => setShowUniversalEnrollmentForm(false)}
                />
              </DialogContent>
            </Dialog>

            {/* Mobile Menu Button */}
            <button
              className="mobile-menu-trigger md:hidden focus:outline-none"
              onClick={() => {
                toggleMobileMenu();
                setShowLanguageDropdown(false);
                setShowCompanyDropdown(false);
                setShowProgramDropdown(false);
              }}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6 text-gray-600" />
              ) : (
                <Menu className="h-6 w-6 text-gray-600" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="mobile-menu-content md:hidden bg-white border-t border-gray-100">
            <div className="px-4 py-3 flex flex-col space-y-3">
              <Link
                href="/pricing"
                className="text-sm font-medium text-gray-600 hover:text-blue-900 transition-colors py-2"
              >
                Pricing
              </Link>

              <div className="border-l-2 border-blue-100 pl-3">
                <button
                  type="button"
                  className="flex w-full items-center justify-between py-2 text-left text-sm font-semibold text-blue-900 uppercase tracking-wide hover:text-blue-700 transition-colors"
                  aria-expanded={showMobileProgramDropdown}
                  onClick={() =>
                    setShowMobileProgramDropdown(!showMobileProgramDropdown)
                  }
                >
                  Program
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      showMobileProgramDropdown ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {showMobileProgramDropdown && (
                  <div className="mt-1 space-y-1">
                    {programLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="block py-1 text-sm font-medium text-gray-600 hover:text-blue-900 transition-colors"
                        onClick={() => {
                          setShowMobileProgramDropdown(false);
                          setMobileMenuOpen(false);
                        }}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link
                href="/prep-program"
                className="text-sm font-medium text-gray-600 hover:text-blue-900 transition-colors py-2"
              >
                Prep Program
              </Link>

              <Link
                href="/free-ai-tutor"
                className="text-sm font-semibold text-blue-900 hover:text-blue-700 transition-colors py-2"
              >
                Ask AI
              </Link>

              <Link
                href="/get-started"
                className="text-sm font-medium text-gray-600 hover:text-blue-900 transition-colors py-2"
              >
                Get Started
              </Link>

              <Link
                href="/login"
                className="text-sm font-medium text-gray-600 hover:text-blue-900 transition-colors py-2"
              >
                Log in
              </Link>

              {/* Mobile Company Section */}
              <div className="border-l-2 border-blue-100 pl-3">
                <div className="text-xs font-semibold text-blue-900 uppercase tracking-wide mb-2">
                  About
                </div>
                {companyLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block text-sm font-medium text-gray-600 hover:text-blue-900 transition-colors py-1"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              <Dialog
                open={showUniversalEnrollmentForm}
                onOpenChange={(open) => {
                  setShowUniversalEnrollmentForm(open);
                  if (open) {
                    setShowLanguageDropdown(false);
                    setShowCompanyDropdown(false);
                    setMobileMenuOpen(false);
                  }
                }}
              >
                <DialogTrigger asChild>
                  <Button
                    size="sm"
                    className="bg-blue-900 w-full mt-2"
                    onClick={() => setShowUniversalEnrollmentForm(true)}
                  >
                    Enroll Now
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogTitle>Enrollment</DialogTitle>
                  <UniversalEnrollmentForm
                    onClose={() => setShowUniversalEnrollmentForm(false)}
                  />
                </DialogContent>
              </Dialog>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
