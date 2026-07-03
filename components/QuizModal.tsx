"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { getDestination } from "@/lib/destinations";

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const QUESTIONS = [
  {
    title: "L'objectif principal de votre voyage ?",
    options: [
      { id: "A", text: "L'adrénaline et la nature brute." },
      { id: "B", text: "L'inspiration et le calme." },
      { id: "C", text: "La fête et le luxe." },
    ],
  },
  {
    title: "L'indispensable dans votre valise ?",
    options: [
      { id: "A", text: "Un couteau suisse et des jumelles." },
      { id: "B", text: "Un carnet de croquis et un crayon." },
      { id: "C", text: "Votre plus belle tenue de soirée." },
    ],
  },
  {
    title: "Quelle est votre ambiance préférée ?",
    options: [
      { id: "A", text: "L'isolement total au cœur de la nature." },
      { id: "B", text: "Le calme absolu, propice à la réflexion." },
      { id: "C", text: "L'énergie vibrante et bouillonnante d'une foule." },
    ],
  },
  {
    title: "Quel est le souvenir idéal à glisser dans votre valise ?",
    options: [
      { id: "A", text: "Une relique naturelle brute et rare, preuve de votre expédition." },
      { id: "B", text: "Un objet d'artisanat unique, minutieusement façonné à la main." },
      { id: "C", text: "Un accessoire chic et avant-gardiste, symbole de luxe et de modernité." },
    ],
  },
];

export default function QuizModal({ isOpen, onClose }: QuizModalProps) {
  const [currentStep, setCurrentStep] = useState(-1); // -1 = Intro, 0-3 = Questions, 4 = Loading, 5 = Result
  const [answers, setAnswers] = useState<string[]>([]);
  const [result, setResult] = useState<{
    destinationId: string;
    explanation: string;
  } | null>(null);

  const handleStart = () => setCurrentStep(0);

  const handleAnswer = async (answerText: string) => {
    const newAnswers = [...answers, answerText];
    setAnswers(newAnswers);

    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Finished questions, submit to API
      setCurrentStep(QUESTIONS.length); // Loading state
      try {
        const res = await fetch("/api/quiz", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ answers: newAnswers }),
        });

        if (!res.ok) throw new Error("Failed to evaluate quiz");
        const data = await res.json();
        setResult(data);
        setCurrentStep(QUESTIONS.length + 1); // Result state
      } catch (err) {
        console.error("Quiz evaluation error", err);
        // Fallback result in case of error
        setResult({
          destinationId: "paris-1889",
          explanation: "Nos capteurs temporels ont subi une légère perturbation, mais nous pensons que Paris 1889 sera parfait pour votre prochaine aventure !",
        });
        setCurrentStep(QUESTIONS.length + 1);
      }
    }
  };

  const resetQuiz = () => {
    setCurrentStep(-1);
    setAnswers([]);
    setResult(null);
  };

  const handleClose = () => {
    setTimeout(resetQuiz, 300); // Reset after animation
    onClose();
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
            onClick={handleClose}
            className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
              className="w-full max-w-xl bg-surface-elevated border border-border rounded-3xl shadow-2xl overflow-hidden pointer-events-auto relative"
            >
              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-surface hover:bg-white/10 text-text-muted hover:text-text-primary transition-colors z-10"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="p-8 md:p-12 min-h-[400px] flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  {/* STEP: INTRO */}
                  {currentStep === -1 && (
                    <motion.div
                      key="intro"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="text-center"
                    >
                      <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-6 text-gold">
                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h2 className="text-2xl md:text-3xl font-bold mb-4">Mon époque idéale</h2>
                      <p className="text-text-secondary mb-8 leading-relaxed">
                        Vous hésitez sur votre prochaine destination temporelle ? Répondez à ces 4 questions rapides pour découvrir l'époque qui correspond à votre âme de voyageur.
                      </p>
                      <button
                        onClick={handleStart}
                        className="w-full py-4 rounded-full bg-gold text-background font-semibold hover:shadow-[0_0_30px_rgba(212,168,83,0.3)] transition-all"
                      >
                        Commencer le quiz
                      </button>
                    </motion.div>
                  )}

                  {/* STEP: QUESTIONS */}
                  {currentStep >= 0 && currentStep < QUESTIONS.length && (
                    <motion.div
                      key={`question-${currentStep}`}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="flex flex-col h-full"
                    >
                      <div className="flex gap-2 mb-8 justify-center">
                        {QUESTIONS.map((_, idx) => (
                          <div
                            key={idx}
                            className={`h-1.5 w-12 rounded-full transition-colors duration-300 ${idx <= currentStep ? "bg-gold" : "bg-white/10"
                              }`}
                          />
                        ))}
                      </div>

                      <h3 className="text-xl md:text-2xl font-bold mb-8 text-center leading-tight">
                        {QUESTIONS[currentStep].title}
                      </h3>

                      <div className="space-y-3 mt-auto">
                        {QUESTIONS[currentStep].options.map((opt) => (
                          <button
                            key={opt.id}
                            onClick={() => handleAnswer(opt.text)}
                            className="w-full p-4 rounded-2xl border border-border bg-surface hover:border-gold/50 hover:bg-gold/5 text-left transition-all group flex items-center gap-4"
                          >
                            <span className="flex-shrink-0 w-8 h-8 rounded-full border border-border group-hover:border-gold/50 flex items-center justify-center text-sm font-medium text-text-muted group-hover:text-gold transition-colors">
                              {opt.id}
                            </span>
                            <span className="text-text-primary group-hover:text-white transition-colors">
                              {opt.text}
                            </span>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* STEP: LOADING */}
                  {currentStep === QUESTIONS.length && (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center py-12"
                    >
                      <div className="relative w-24 h-24 mx-auto mb-8">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                          className="absolute inset-0 rounded-full border-2 border-border border-t-gold"
                        />
                        <div className="absolute inset-0 flex items-center justify-center text-gold">
                          <svg className="w-8 h-8 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                          </svg>
                        </div>
                      </div>
                      <h3 className="text-xl font-bold mb-2">Analyse temporelle en cours...</h3>
                      <p className="text-text-muted">Notre IA croise vos réponses avec les archives quantiques.</p>
                    </motion.div>
                  )}

                  {/* STEP: RESULT */}
                  {currentStep === QUESTIONS.length + 1 && result && (
                    <motion.div
                      key="result"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center"
                    >
                      {(() => {
                        const dest = getDestination(result.destinationId);
                        if (!dest) return <p>Destination introuvable.</p>;

                        return (
                          <>
                            <div className="relative w-32 h-32 mx-auto mb-6 rounded-2xl overflow-hidden border border-gold/30 shadow-[0_0_30px_rgba(212,168,83,0.2)]">
                              <Image src={dest.image} alt={dest.title} fill className="object-cover" />
                              <div className={`absolute inset-0 bg-gradient-to-t ${dest.gradient} opacity-60`} />
                            </div>

                            <span className="text-xs font-bold uppercase tracking-widest text-gold mb-2 block">
                              Votre destination idéale
                            </span>
                            <h2 className="text-3xl font-bold mb-6 text-white">{dest.title}</h2>

                            <div className="bg-surface p-6 rounded-2xl border border-border mb-8 text-left relative">
                              <svg className="absolute top-4 left-4 w-6 h-6 text-gold/20" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                              </svg>
                              <p className="text-text-secondary leading-relaxed italic text-center px-4 relative z-10">
                                "{result.explanation}"
                              </p>
                            </div>

                            <div className="flex gap-4">
                              <Link
                                href={`/destinations/${dest.id}`}
                                onClick={handleClose}
                                className="flex-1 py-3.5 rounded-full bg-gold text-background font-semibold hover:shadow-[0_0_20px_rgba(212,168,83,0.3)] transition-all text-sm"
                              >
                                Découvrir {dest.title}
                              </Link>
                              <button
                                onClick={resetQuiz}
                                className="flex-1 py-3.5 rounded-full border border-border hover:border-gold/30 hover:bg-gold/5 text-text-primary transition-all text-sm"
                              >
                                Refaire le test
                              </button>
                            </div>
                          </>
                        );
                      })()}
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
