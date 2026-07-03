"use client";

import Hero from "@/components/Hero";
import SectionWrapper from "@/components/SectionWrapper";
import DestinationCard from "@/components/DestinationCard";
import { destinations } from "@/lib/destinations";
import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <>
      {/* ===== HERO ===== */}
      <Hero />

      {/* ===== AGENCE SECTION ===== */}
      <section id="agence" className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 radial-violet" />

        <div className="relative mx-auto max-w-5xl px-6">
          <SectionWrapper>
            <div className="text-center">
              <span className="inline-block px-4 py-1.5 mb-6 text-xs font-medium tracking-wider uppercase text-violet-light bg-violet/10 border border-violet/20 rounded-full">
                Notre agence
              </span>
              <h2 className="text-3xl md:text-5xl font-bold text-text-primary mb-6 leading-tight">
                Le temps est la dernière
                <br />
                <span className="text-gradient-violet">frontière.</span>
              </h2>
              <p className="text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed mb-8">
                TimeTravel Agency est née d&apos;un rêve audacieux : permettre à
                chacun de vivre l&apos;Histoire de l&apos;intérieur. Nos
                technologies de déplacement temporel, développées par les
                meilleurs physiciens quantiques, vous ouvrent les portes de
                toutes les époques.
              </p>
              <p className="text-base text-text-muted max-w-xl mx-auto leading-relaxed">
                Chaque voyage est minutieusement préparé, encadré par nos guides
                temporels certifiés, et conçu pour une immersion totale. Votre
                sécurité et votre émerveillement sont notre priorité absolue.
              </p>
            </div>
          </SectionWrapper>

          {/* Stats */}
          <SectionWrapper delay={0.2}>
            <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { value: "2,847", label: "Voyageurs" },
                { value: "12", label: "Époques accessibles" },
                { value: "99.9%", label: "Retour sécurisé" },
                { value: "∞", label: "Souvenirs" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="text-center p-6 rounded-xl border border-border bg-surface hover:border-border-hover transition-colors duration-300"
                >
                  <div className="text-2xl md:text-3xl font-bold text-gradient-gold mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs text-text-muted uppercase tracking-wider">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </SectionWrapper>
        </div>
      </section>

      {/* ===== DESTINATIONS SECTION ===== */}
      <section id="destinations" className="relative py-32">
        <div className="absolute inset-0 radial-gold" />

        <div className="relative mx-auto max-w-7xl px-6">
          <SectionWrapper>
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1.5 mb-6 text-xs font-medium tracking-wider uppercase text-gold bg-gold/10 border border-gold/20 rounded-full">
                Destinations
              </span>
              <h2 className="text-3xl md:text-5xl font-bold text-text-primary mb-6 leading-tight">
                Où voulez-vous
                <br />
                <span className="text-gradient-gold">voyager ?</span>
              </h2>
              <p className="text-lg text-text-secondary max-w-xl mx-auto leading-relaxed">
                Trois époques exceptionnelles vous attendent. Choisissez votre
                destination et préparez-vous pour l&apos;aventure de votre vie.
              </p>
            </div>
          </SectionWrapper>

          {/* Destination cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {destinations.map((dest, i) => (
              <DestinationCard key={dest.id} destination={dest} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA FINAL ===== */}
      <section id="contact" className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="absolute inset-0 radial-gold" />

        <SectionWrapper className="relative mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-text-primary mb-6 leading-tight">
            Prêt à traverser
            <br />
            <span className="text-gradient-gold">le temps ?</span>
          </h2>
          <p className="text-lg text-text-secondary max-w-xl mx-auto leading-relaxed mb-10">
            Contactez nos conseillers temporels pour planifier votre prochain
            voyage. Places limitées, le continuum espace-temps n&apos;attend
            pas.
          </p>
          <motion.a
            href="#destinations"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 px-10 py-4 text-sm font-semibold rounded-full bg-gold text-background hover:shadow-[0_0_40px_rgba(212,168,83,0.3)] transition-shadow duration-300"
          >
            Réserver mon voyage
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </motion.a>
        </SectionWrapper>
      </section>
    </>
  );
}
