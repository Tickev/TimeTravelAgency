import Link from "next/link";
import { FaXTwitter, FaInstagram, FaLinkedin } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="relative border-t border-border bg-surface/50">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo & tagline */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-md bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center">
                <span className="text-background font-bold text-xs">TT</span>
              </div>
              <span className="text-text-primary font-semibold tracking-tight">
                TimeTravel
                <span className="text-gold ml-1">Agency</span>
              </span>
            </Link>
            <p className="text-xs text-text-muted">
              La première agence de voyage temporel au monde.
            </p>
          </div>

          {/* Links */}
          <div className="flex items-center gap-8">
            <Link
              href="/"
              className="text-sm text-text-muted hover:text-text-secondary transition-colors"
            >
              Accueil
            </Link>
            <Link
              href="/#destinations"
              className="text-sm text-text-muted hover:text-text-secondary transition-colors"
            >
              Destinations
            </Link>
            <Link
              href="/#contact"
              className="text-sm text-text-muted hover:text-text-secondary transition-colors"
            >
              Contact
            </Link>
          </div>

          {/* Social placeholders */}
          <div className="flex items-center gap-4">
            <button
              className="w-8 h-8 rounded-full border border-border hover:border-border-hover flex items-center justify-center text-text-muted hover:text-text-secondary transition-all duration-200"
              aria-label="Twitter"
            >
              <FaXTwitter size={14} />
            </button>
            <button
              className="w-8 h-8 rounded-full border border-border hover:border-border-hover flex items-center justify-center text-text-muted hover:text-text-secondary transition-all duration-200"
              aria-label="Instagram"
            >
              <FaInstagram size={16} />
            </button>
            <button
              className="w-8 h-8 rounded-full border border-border hover:border-border-hover flex items-center justify-center text-text-muted hover:text-text-secondary transition-all duration-200"
              aria-label="LinkedIn"
            >
              <FaLinkedin size={15} />
            </button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-muted">
            © {new Date().getFullYear()} TimeTravel Agency. Tous droits
            réservés à travers le temps.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-xs text-text-muted hover:text-text-secondary cursor-pointer transition-colors">
              Mentions légales
            </span>
            <span className="text-xs text-text-muted hover:text-text-secondary cursor-pointer transition-colors">
              Politique temporelle
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
