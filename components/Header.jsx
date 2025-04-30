"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, User, X, Scale, BookOpenCheck, PhoneCall, HelpCircle, Bot } from "lucide-react";
import { useUser } from "@/context/UserContext";

const Header = () => {
  const { user,fetchUser } = useUser();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    <header className="fixed top-1  left-1/2 -translate-x-1/2 z-50  w-full text-nowrap max-w-7xl px-1">
      <div className="flex h-16  items-center justify-between px-4 lg:px-6 bg-white border border-gray-200 text-gray-800 rounded-xl shadow-md">
        {/* Logo */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 text-blue-700 font-semibold text-lg">
            <Scale size={24} />
            <span className="hidden sm:inline">Nayai</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4 font-semibold text-sm">
            <Link href="/legal-article" className="px-3 py-2 rounded-md hover:bg-blue-50 text-gray-700 hover:text-blue-700 transition-colors">
              Legal Rights
            </Link>
            <Link href="/lawyers" className="px-3 py-2 rounded-md hover:bg-blue-50 text-gray-700 hover:text-blue-700 transition-colors">
              Consult Lawyer
            </Link>
            <Link href="/your-rights" className="px-3 py-2 rounded-md hover:bg-blue-50 text-gray-700 hover:text-blue-700 transition-colors">
              Your Rights
            </Link>
            <Link href="/ask-ai" className="px-3 py-2 rounded-md hover:bg-blue-50 text-gray-700 hover:text-blue-700 transition-colors">
              Ask AI
            </Link>
          </nav>
        </div>

        {/* Right-side Actions */}
        <div className="hidden md:flex items-center gap-3 text-sm font-semibold">
          {user ? (
            <Link
              href={user?.role === "admin" ? "/admin-profile" : "/profile"}
              className="px-4 py-2 bg-gray-100 border border-gray-200 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <User size={16} className="inline mr-1" />
              Profile
            </Link>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="px-4 py-2 text-blue-600 hover:text-blue-800 transition-colors"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button onClick={toggleMobileMenu} className="md:hidden text-gray-800 p-1 hover:bg-gray-100 rounded-md">
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 p-4 bg-white border border-gray-200 rounded-xl shadow-lg animate-fadeIn text-sm font-semibold">
          <nav className="flex flex-col space-y-3 text-gray-800">
            <Link href="/legal-article" onClick={toggleMobileMenu} className="px-3 py-2 rounded-md hover:bg-blue-50">
              Legal Rights
            </Link>
            <Link href="/lawyers" onClick={toggleMobileMenu} className="px-3 py-2 rounded-md hover:bg-blue-50">
              Consult Lawyer
            </Link>
            <Link href="/your-rights" onClick={toggleMobileMenu} className="px-3 py-2 rounded-md hover:bg-blue-50">
              Your Rights & Schemes
            </Link>
            <Link href="/ask-ai" onClick={toggleMobileMenu} className="px-3 py-2 rounded-md hover:bg-blue-50">
              Ask AI
            </Link>
          </nav>

          <div className="border-t border-gray-200 mt-4 pt-4">
            {user ? (
              <Link
                href={user?.role === "admin" ? "/admin-profile" : "/profile"}
                onClick={toggleMobileMenu}
                className="block px-3 py-2 rounded-md hover:bg-gray-100"
              >
                My Profile
              </Link>
            ) : (
              <div className="flex flex-col space-y-2 mt-2">
                <Link
                  href="/login"
                  onClick={toggleMobileMenu}
                  className="flex items-center justify-center px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  onClick={toggleMobileMenu}
                  className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
