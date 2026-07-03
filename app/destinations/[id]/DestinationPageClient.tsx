"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import SectionWrapper from "@/components/SectionWrapper";
import type { Destination } from "@/lib/destinations";
import BookingModal from "@/components/BookingModal";

interface Props {
  destination: Destination;
}

export default function DestinationPageClient({ destination }: Props) {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  return (
    <article>
      {/* ===== HERO ===== */}
      <section className="relative min-h-[70vh] flex items-end overflow-hidden">
        {/* Background video or image fallback */}
        {destination.video ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={destination.video} type="video/mp4" />
          </video>
        ) : (
          <Image
            src={destination.image}
            alt={destination.title}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        )}
        {/* Gradient overlays for readability */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${destination.gradient}`}
        />
        <div className="absolute inset-0 bg-background/40" />
        <div className="absolute inset-0 grid-pattern opacity-20" />

        {/* Animated accent orb */}
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full blur-3xl"
          style={{ background: `${destination.accentColor}08` }}
        />

        {/* Bottom gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-background to-transparent" />

        {/* Content */}
        <div className="relative z-10 mx-auto max-w-5xl px-6 pb-16 w-full">
          {/* Back button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              href="/#destinations"
              className="inline-flex items-center gap-2 mb-8 px-4 py-2 text-sm font-medium text-text-primary bg-surface/80 backdrop-blur-md border border-white/10 rounded-full hover:bg-surface-hover hover:border-white/20 transition-all group shadow-lg"
            >
              <svg
                className="w-4 h-4 transition-transform group-hover:-translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M7 16l-4-4m0 0l4-4m-4 4h18"
                />
              </svg>
              Retour aux destinations
            </Link>
          </motion.div>

          {/* Epoch badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span
              className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full text-xs font-medium border"
              style={{
                color: destination.accentColor,
                borderColor: `${destination.accentColor}30`,
                background: `${destination.accentColor}10`,
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ background: destination.accentColor }}
              />
              {destination.epoch}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-7xl font-bold text-text-primary mb-4 leading-[1.1]"
          >
            {destination.title}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg md:text-xl text-text-secondary max-w-2xl leading-relaxed"
          >
            {destination.subtitle}
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-8"
          >
            <motion.button
              onClick={() => setIsBookingModalOpen(true)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold rounded-full text-background transition-shadow duration-300"
              style={{
                background: destination.accentColor,
                boxShadow: `0 0 30px ${destination.accentColor}30`,
              }}
            >
              Réserver cette destination
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
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* ===== DESCRIPTION ===== */}
      <section className="py-24">
        <div className="mx-auto max-w-3xl px-6">
          <SectionWrapper>
            <div className="prose prose-invert prose-lg max-w-none">
              {destination.longDescription.split("\n\n").map((paragraph, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="text-text-secondary leading-[1.8] mb-6"
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>
          </SectionWrapper>
        </div>
      </section>

      {/* ===== ACTIVITÉS ===== */}
      <section className="py-24 relative">
        <div className="absolute inset-0 radial-gold" />

        <div className="relative mx-auto max-w-5xl px-6">
          <SectionWrapper>
            <div className="text-center mb-16">
              <span
                className="inline-block px-4 py-1.5 mb-6 text-xs font-medium tracking-wider uppercase rounded-full border"
                style={{
                  color: destination.accentColor,
                  borderColor: `${destination.accentColor}30`,
                  background: `${destination.accentColor}10`,
                }}
              >
                Activités
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-text-primary">
                Ce qui vous attend
              </h2>
            </div>
          </SectionWrapper>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {destination.activities.map((activity, i) => (
              <motion.div
                key={activity.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="group p-6 rounded-2xl border border-border bg-surface hover:border-border-hover transition-all duration-300"
              >
                <div className="flex gap-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0"
                    style={{ background: `${destination.accentColor}10` }}
                  >
                    {activity.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-text-primary mb-2 group-hover:text-gold transition-colors duration-300">
                      {activity.title}
                    </h3>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      {activity.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== INFOS PRATIQUES ===== */}
      <section className="py-24">
        <div className="mx-auto max-w-5xl px-6">
          <SectionWrapper>
            <div className="text-center mb-16">
              <span
                className="inline-block px-4 py-1.5 mb-6 text-xs font-medium tracking-wider uppercase rounded-full border"
                style={{
                  color: destination.accentColor,
                  borderColor: `${destination.accentColor}30`,
                  background: `${destination.accentColor}10`,
                }}
              >
                Pratique
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-text-primary">
                Informations pratiques
              </h2>
            </div>
          </SectionWrapper>

          <SectionWrapper delay={0.2}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {destination.practicalInfo.map((info, i) => (
                <motion.div
                  key={info.label}
                  whileHover={{ y: -2 }}
                  className="p-5 rounded-xl border border-border bg-surface hover:border-border-hover transition-all duration-300"
                >
                  <div className="text-xs text-text-muted uppercase tracking-wider mb-2">
                    {info.label}
                  </div>
                  <div
                    className="text-base font-medium"
                    style={{ color: destination.accentColor }}
                  >
                    {info.value}
                  </div>
                </motion.div>
              ))}
            </div>
          </SectionWrapper>

        </div>
      </section>

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        initialDestinationId={destination.id}
      />
    </article>
  );
}
