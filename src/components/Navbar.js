'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Features', href: '#features' },
    { name: 'About', href: '#about' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-black/90 backdrop-blur-xl border-b border-red-500/10 shadow-lg shadow-black/50'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo Section */}
          <Link
            href="/"
            className="flex items-center gap-3 group z-10 animate-fade-in-down"
          >
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute -inset-2 bg-gradient-to-r from-red-500 to-red-600 rounded-xl opacity-0 group-hover:opacity-70 blur-xl transition-all duration-500"></div>
              {/* Icon container */}
              <div className="relative bg-gradient-to-br from-red-500 via-red-600 to-red-700 p-2.5 rounded-xl shadow-lg shadow-red-500/50 group-hover:shadow-red-500/70 transition-all duration-300 group-hover:scale-110">
                <svg
                  className="w-6 h-6 text-white transform group-hover:rotate-12 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
            </div>
            <span className="text-2xl font-extrabold gradient-text tracking-tight group-hover:tracking-normal transition-all duration-300">
              VisionMesh
            </span>
          </Link>

          {/* Desktop Navigation - Centered */}
          <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2">
            <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/5 backdrop-blur-sm border border-white/10">
              {navLinks.map((link, index) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="relative px-5 py-2 text-sm font-medium text-gray-300 hover:text-white transition-all duration-300 rounded-full hover:bg-white/10 group animate-fade-in"
                  style={{ animationDelay: `${(index + 2) * 100}ms` }}
                >
                  {link.name}
                  <span className="absolute inset-x-0 -bottom-0.5 h-0.5 bg-gradient-to-r from-red-500 to-red-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full"></span>
                </Link>
              ))}
            </div>
          </div>

          {/* CTA Buttons - Right aligned */}
          <div className="hidden lg:flex items-center gap-3 animate-fade-in-down" style={{ animationDelay: '600ms' }}>
            <button className="px-5 py-2 text-sm font-medium text-gray-300 hover:text-white transition-all duration-300 rounded-lg hover:bg-white/5">
              Sign In
            </button>
            <button className="group relative px-6 py-2.5 rounded-lg bg-gradient-to-r from-red-500 via-red-600 to-red-700 text-white text-sm font-semibold overflow-hidden shadow-lg shadow-red-500/30 hover:shadow-red-500/50 transition-all duration-300 hover:scale-105">
              <span className="relative z-10 flex items-center gap-2">
                Get Started
                <svg
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </span>
              {/* Animated gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-red-700 to-red-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              {/* Shine effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden relative p-2 rounded-lg text-white hover:bg-white/10 transition-all duration-300"
            aria-label="Toggle menu"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span
                className={`w-full h-0.5 bg-white rounded-full transition-all duration-300 ${
                  mobileMenuOpen ? 'rotate-45 translate-y-2' : ''
                }`}
              ></span>
              <span
                className={`w-full h-0.5 bg-white rounded-full transition-all duration-300 ${
                  mobileMenuOpen ? 'opacity-0' : ''
                }`}
              ></span>
              <span
                className={`w-full h-0.5 bg-white rounded-full transition-all duration-300 ${
                  mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
                }`}
              ></span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu - Enhanced */}
      <div
        className={`lg:hidden transition-all duration-500 ease-in-out ${
          mobileMenuOpen
            ? 'max-h-[600px] opacity-100'
            : 'max-h-0 opacity-0 pointer-events-none'
        }`}
      >
        <div className="bg-gradient-to-b from-black via-black/95 to-black/90 backdrop-blur-xl border-t border-red-500/10 shadow-2xl">
          <div className="px-6 py-8 space-y-6 max-w-md mx-auto">
            {/* Mobile Navigation Links */}
            <div className="space-y-2">
              {navLinks.map((link, index) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="group block px-5 py-3.5 text-base font-medium text-gray-300 hover:text-white rounded-xl hover:bg-white/5 border border-transparent hover:border-red-500/20 transition-all duration-300 animate-slide-in-left"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <span className="flex items-center justify-between">
                    {link.name}
                    <svg
                      className="w-5 h-5 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </span>
                </Link>
              ))}
            </div>

            {/* Mobile CTA Buttons */}
            <div className="pt-6 border-t border-red-500/10 space-y-3">
              <button className="w-full px-5 py-3.5 text-base font-medium text-gray-300 hover:text-white rounded-xl border border-white/10 hover:border-red-500/30 hover:bg-white/5 transition-all duration-300">
                Sign In
              </button>
              <button className="group relative w-full px-5 py-3.5 rounded-xl bg-gradient-to-r from-red-500 via-red-600 to-red-700 text-white text-base font-semibold overflow-hidden shadow-lg shadow-red-500/30 hover:shadow-red-500/50 transition-all duration-300">
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Get Started
                  <svg
                    className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-red-700 to-red-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

