"use client";

import React from "react";
import Link from "next/link"
import { Twitter, Github, Mail, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[var(--footer-bg)] rounded-sm py-10 b flex flex-col justify-center items-center m-1">
      <div className="container  px-8 flex flex-col items-center justify-between gap-6 md:flex-row">
        {/* Platform Info */}
        <div className="text-center flex flex-col items-center flex-1">
          <div className="flex items-center justify-center gap-2 mb-2">
            <img src="/logo.png" alt="NyayaSahayak logo" width={22} />
            <h3 className="font-bold text-[var(--foreground)]">Nayai</h3>
          </div>
          <p className="text-sm text-[var(--secondary-fg)] max-w-xs">
            Empowering citizens with legal knowledge, verified lawyer connections, and access to justice. All in one place.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="text-center flex-1">
          <h3 className="font-medium mb-3 text-[var(--foreground)]">Explore</h3>
          <ul className="flex flex-col gap-2 text-sm text-[var(--secondary-fg)]">
            <li>
              <Link href="/" className="hover:text-[var(--foreground)] transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link href="/articles" className="hover:text-[var(--foreground)] transition-colors">
                Legal Articles
              </Link>
            </li>
            <li>
              <Link href="/lawyers" className="hover:text-[var(--foreground)] transition-colors">
                Find Lawyers
              </Link>
            </li>
            <li>
              <Link href="/appointments" className="hover:text-[var(--foreground)] transition-colors">
                Book Appointment
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-[var(--foreground)] transition-colors">
                About Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Section */}
        <div className="text-center flex-1">
          <h3 className="font-medium mb-3 text-[var(--foreground)]">Contact</h3>
          <div className="flex flex-col gap-2 text-sm">
            <Link
              href="mailto:support@nyayasahayak.in"
              className="flex items-center justify-center gap-2 text-[var(--secondary-fg)] hover:text-[var(--foreground)] transition-colors"
            >
              <Mail className="h-4 w-4" />
              <span>support@nyayasahayak.in</span>
            </Link>

            {/* Social Icons */}
            <div className="flex items-center justify-center gap-5 mt-2">
              <Link
                href="https://twitter.com/nyayasahayak"
                className="text-[var(--secondary-fg)] hover:text-[var(--foreground)] transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter className="h-5 w-5" />
              </Link>
              <Link
                href="https://github.com/nyayasahayak"
                className="text-[var(--secondary-fg)] hover:text-[var(--foreground)] transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-5 w-5" />
              </Link>
              <Link
                href="https://linkedin.com/company/nyayasahayak"
                className="text-[var(--secondary-fg)] hover:text-[var(--foreground)] transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="w-full mt-8 pt-4 border-t border-gray-700/30 text-center">
        <p className="text-sm text-[var(--secondary-fg)]">
          © {new Date().getFullYear()} NyayaSahayak. Built with ❤️ for citizens .
        </p>
      </div>
    </footer>
  );
};

export default Footer;
