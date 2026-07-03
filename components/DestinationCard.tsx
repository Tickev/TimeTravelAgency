"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import type { Destination } from "@/lib/destinations";

interface DestinationCardProps {
  destination: Destination;
  index: number;
}

export default function DestinationCard({
  destination,
  index,
}: DestinationCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        ease: [0.25, 0.4, 0.25, 1],
      }}
    >
      <Link href={`/destinations/${destination.id}`} className="block group">
        <div className="relative rounded-2xl overflow-hidden border border-border bg-surface transition-all duration-500 hover:border-border-hover hover:shadow-[0_0_40px_rgba(212,168,83,0.08)]">
          {/* Image with gradient overlay */}
          <div className="relative h-56 sm:h-64 overflow-hidden">
            {/* Real destination image */}
            <Image
              src={destination.image}
              alt={destination.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, 33vw"
            />

            {/* Gradient overlay for readability */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${destination.gradient} mix-blend-multiply`}
            />

            {/* Hover glow */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
              style={{
                background: `radial-gradient(circle at 50% 50%, ${destination.accentColor}15, transparent 70%)`,
              }}
            />

            {/* Epoch badge */}
            <div className="absolute top-4 left-4 z-10">
              <span className="px-3 py-1 text-xs font-medium rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white/80">
                {destination.epoch}
              </span>
            </div>

            {/* Bottom gradient overlay */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-surface to-transparent z-10" />
          </div>

          {/* Card content */}
          <div className="p-6">
            <h3 className="text-xl font-semibold text-text-primary mb-2 group-hover:text-gold transition-colors duration-300">
              {destination.title}
            </h3>
            <p className="text-sm text-text-secondary leading-relaxed line-clamp-2">
              {destination.description}
            </p>

            {/* CTA */}
            <div className="mt-5 flex items-center gap-2 text-sm font-medium text-text-muted group-hover:text-gold transition-colors duration-300">
              <span>Découvrir</span>
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </div>
          </div>

          {/* Accent border glow on hover */}
          <div
            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{
              boxShadow: `inset 0 0 0 1px ${destination.accentColor}30`,
            }}
          />
        </div>
      </Link>
    </motion.div>
  );
}
