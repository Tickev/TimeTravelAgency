"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { destinations } from "@/lib/destinations";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialDestinationId?: string;
}

export default function BookingModal({ isOpen, onClose, initialDestinationId }: BookingModalProps) {
  const [step, setStep] = useState<"form" | "loading" | "success">("form");
  const [formData, setFormData] = useState({
    destinationId: initialDestinationId || "",
    startDate: "",
    endDate: "",
    travelers: 1,
    name: "",
    email: "",
  });
  const [error, setError] = useState("");

  // Update initial destination if it changes while modal is open (e.g., passing prop dynamically)
  useEffect(() => {
    if (initialDestinationId && isOpen) {
      setFormData((prev) => ({ ...prev, destinationId: initialDestinationId }));
    }
  }, [initialDestinationId, isOpen]);

  // Reset state when modal is closed
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setStep("form");
        setError("");
        setFormData({
          destinationId: initialDestinationId || "",
          startDate: "",
          endDate: "",
          travelers: 1,
          name: "",
          email: "",
        });
      }, 300);
    }
  }, [isOpen, initialDestinationId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError(""); // Clear error on change
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validations
    if (!formData.destinationId || !formData.startDate || !formData.endDate || !formData.name || !formData.email) {
      setError("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (start < today) {
      setError("La date de départ ne peut pas être dans le passé (terrestre).");
      return;
    }

    if (start >= end) {
      setError("La date de retour doit être postérieure à la date de départ.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Veuillez entrer une adresse e-mail valide.");
      return;
    }

    // All good, simulate API call
    setStep("loading");
    setTimeout(() => {
      setStep("success");
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-sm"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
              className="w-full max-w-lg bg-surface-elevated border border-border rounded-3xl shadow-2xl overflow-hidden pointer-events-auto relative flex flex-col max-h-[90vh]"
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-surface hover:bg-white/10 text-text-muted hover:text-text-primary transition-colors z-10"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="p-8 overflow-y-auto scrollbar-thin">
                <AnimatePresence mode="wait">
                  {/* FORM STEP */}
                  {step === "form" && (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      onSubmit={handleSubmit}
                      className="space-y-6"
                    >
                      <div className="text-center mb-8">
                        <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4 text-gold">
                          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-text-primary mb-2">Demande de voyage</h2>
                        <p className="text-sm text-text-secondary">Réservez votre saut temporel en remplissant le formulaire ci-dessous.</p>
                      </div>

                      {error && (
                        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                          {error}
                        </div>
                      )}

                      <div className="space-y-4">
                        {/* Destination */}
                        <div>
                          <label className="block text-sm font-medium text-text-secondary mb-1">Destination *</label>
                          <select
                            name="destinationId"
                            value={formData.destinationId}
                            onChange={handleChange}
                            className="w-full bg-surface rounded-xl px-4 py-3 text-sm text-text-primary border border-border focus:border-gold/50 focus:outline-none transition-colors appearance-none"
                          >
                            <option value="">-- Sélectionnez une époque --</option>
                            {destinations.map(d => (
                              <option key={d.id} value={d.id}>{d.title}</option>
                            ))}
                          </select>
                        </div>

                        {/* Dates */}
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-text-secondary mb-1">Date de départ (terrestre) *</label>
                            <input
                              type="date"
                              name="startDate"
                              value={formData.startDate}
                              onChange={handleChange}
                              className="w-full bg-surface rounded-xl px-4 py-3 text-sm text-text-primary border border-border focus:border-gold/50 focus:outline-none transition-colors [color-scheme:dark]"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-text-secondary mb-1">Date de retour (terrestre) *</label>
                            <input
                              type="date"
                              name="endDate"
                              value={formData.endDate}
                              onChange={handleChange}
                              className="w-full bg-surface rounded-xl px-4 py-3 text-sm text-text-primary border border-border focus:border-gold/50 focus:outline-none transition-colors [color-scheme:dark]"
                            />
                          </div>
                        </div>

                        {/* Voyageurs */}
                        <div>
                          <label className="block text-sm font-medium text-text-secondary mb-1">Nombre de voyageurs</label>
                          <input
                            type="number"
                            name="travelers"
                            min="1"
                            max="10"
                            value={formData.travelers}
                            onChange={handleChange}
                            className="w-full bg-surface rounded-xl px-4 py-3 text-sm text-text-primary border border-border focus:border-gold/50 focus:outline-none transition-colors"
                          />
                        </div>

                        {/* Infos personnelles */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-text-secondary mb-1">Nom complet *</label>
                            <input
                              type="text"
                              name="name"
                              placeholder="John Doe"
                              value={formData.name}
                              onChange={handleChange}
                              className="w-full bg-surface rounded-xl px-4 py-3 text-sm text-text-primary placeholder:text-text-muted border border-border focus:border-gold/50 focus:outline-none transition-colors"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-text-secondary mb-1">Adresse e-mail *</label>
                            <input
                              type="email"
                              name="email"
                              placeholder="john@example.com"
                              value={formData.email}
                              onChange={handleChange}
                              className="w-full bg-surface rounded-xl px-4 py-3 text-sm text-text-primary placeholder:text-text-muted border border-border focus:border-gold/50 focus:outline-none transition-colors"
                            />
                          </div>
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="w-full py-4 mt-4 rounded-xl bg-gold text-background font-semibold hover:shadow-[0_0_20px_rgba(212,168,83,0.3)] transition-all flex items-center justify-center gap-2"
                      >
                        Soumettre la demande
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </button>
                    </motion.form>
                  )}

                  {/* LOADING STEP */}
                  {step === "loading" && (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center py-16 flex flex-col items-center justify-center"
                    >
                      <div className="relative w-20 h-20 mb-8">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                          className="absolute inset-0 rounded-full border-2 border-border border-t-gold"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-2 h-2 bg-gold rounded-full animate-pulse" />
                        </div>
                      </div>
                      <h3 className="text-xl font-bold mb-2">Transmission en cours...</h3>
                      <p className="text-text-muted">Envoi crypté au Haut Conseil Temporel.</p>
                    </motion.div>
                  )}

                  {/* SUCCESS STEP */}
                  {step === "success" && (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-12"
                    >
                      <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-6 text-emerald-400">
                        <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold mb-4 text-white">Demande confirmée !</h3>
                      <p className="text-text-secondary leading-relaxed mb-8">
                        Votre demande d'autorisation de voyage a été transmise au Haut Conseil Temporel. Nous vous contacterons sous 24h terrestres à l'adresse <strong>{formData.email}</strong>.
                      </p>
                      <button
                        onClick={onClose}
                        className="w-full py-4 rounded-xl border border-border hover:border-gold/30 hover:bg-gold/5 text-text-primary transition-all font-medium"
                      >
                        Retourner au présent
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
