"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import {
  getQuizRecommendation,
  quizGoals,
  quizImprovements,
} from "@/data/mockData";
import type { QuizGoal, QuizImprovement, QuizLead, QuizLeadErrors } from "@/types";
import { Button } from "@/components/ui/Button";
import { TextField } from "@/components/ui/Input";
import { cn, isValidEmail, isValidPhone, scrollToId } from "@/lib/utils";

const INITIAL_LEAD: QuizLead = { fullName: "", email: "", phone: "" };

export function SmileQuiz() {
  const [step, setStep] = useState(1);
  const [improvement, setImprovement] = useState<QuizImprovement | null>(null);
  const [goal, setGoal] = useState<QuizGoal | null>(null);
  const [lead, setLead] = useState<QuizLead>(INITIAL_LEAD);
  const [errors, setErrors] = useState<QuizLeadErrors>({});
  const [stepError, setStepError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const statusId = useId();
  const isFirstFocus = useRef(true);

  const recommendation =
    improvement && goal ? getQuizRecommendation(improvement, goal) : null;

  useEffect(() => {
    if (isFirstFocus.current) {
      isFirstFocus.current = false;
      return;
    }
    headingRef.current?.focus();
  }, [step, submitted]);

  const goNext = () => {
    if (step === 1 && !improvement) {
      setStepError("Select what you would like to improve.");
      return;
    }
    if (step === 2 && !goal) {
      setStepError("Select your primary goal.");
      return;
    }
    setStepError(null);
    setStep((value) => Math.min(3, value + 1));
  };

  const validateLead = (): QuizLeadErrors => {
    const next: QuizLeadErrors = {};
    if (lead.fullName.trim().length < 2) {
      next.fullName = "Enter your full name.";
    }
    if (!isValidEmail(lead.email)) {
      next.email = "Enter a valid email address.";
    }
    if (!isValidPhone(lead.phone)) {
      next.phone = "Enter a valid phone number.";
    }
    return next;
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validateLead();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      return;
    }
    setSubmitted(true);
  };

  const resetQuiz = () => {
    setStep(1);
    setImprovement(null);
    setGoal(null);
    setLead(INITIAL_LEAD);
    setErrors({});
    setStepError(null);
    setSubmitted(false);
  };

  return (
    <section id="quiz" aria-labelledby="quiz-heading" className="scroll-mt-24 bg-mist py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="text-xs uppercase tracking-[0.24em] text-lime-800">AI-assisted triage</p>
        <h2 id="quiz-heading" className="mt-3 font-serif text-3xl text-ink-900 sm:text-5xl">
          Interactive 3-step smile assessment
        </h2>
        <p className="mt-4 max-w-2xl text-black/70">
          Three considered questions. An instant protocol recommendation. Then a VIP concierge hold
          so a clinician can refine the plan—never a generic chatbot.
        </p>

        <ol className="mt-8 flex flex-wrap gap-3 text-sm" aria-label="Quiz progress">
          {["Improve", "Goal", "Result"].map((label, index) => {
            const value = index + 1;
            const current = value === step;
            return (
              <li
                key={label}
                className={cn(
                  "rounded-full border px-4 py-2",
                  current
                    ? "border-ink-900 bg-ink-900 text-white"
                    : value < step
                      ? "border-lime-800/50 text-lime-800"
                      : "border-black/15 text-black/50",
                )}
                aria-current={current ? "step" : undefined}
              >
                {value}. {label}
              </li>
            );
          })}
        </ol>

        <div className="glass-card mt-8 rounded-3xl p-5 shadow-glass sm:p-8">
          <p id={statusId} className="sr-only" aria-live="polite">
            Step {step} of 3{submitted ? ". Recommendation captured." : ""}
          </p>

          <AnimatePresence mode="wait">
            {submitted && recommendation ? (
              <motion.div
                key="done"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="space-y-4"
              >
                <h3 ref={headingRef} tabIndex={-1} className="font-serif text-2xl text-ink-900 outline-none">
                  Your concierge brief is reserved
                </h3>
                <p className="flex items-center gap-2 text-ink-800">
                  <CheckCircle2 className="h-5 w-5 text-lime-800" aria-hidden="true" />
                  We will reach {lead.fullName} at {lead.email}
                </p>
                <p className="text-black/70">
                  Recommended protocol: {recommendation.title}. A coordinator confirms your VIP
                  consultation within one business hour.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button variant="primary" onClick={() => scrollToId("booking")}>
                    Continue to VIP booking
                  </Button>
                  <Button variant="outline" onClick={resetQuiz}>
                    Retake assessment
                  </Button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key={`step-${step}`}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.28 }}
              >
                <h3
                  ref={headingRef}
                  tabIndex={-1}
                  className="font-serif text-2xl text-ink-900 outline-none"
                >
                  {step === 1 && "Step 1 · What would you like to improve?"}
                  {step === 2 && "Step 2 · What is your primary goal?"}
                  {step === 3 && "Step 3 · Your recommended protocol"}
                </h3>

                {step === 1 ? (
                  <fieldset className="mt-6">
                    <legend className="sr-only">Improvement focus</legend>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {quizImprovements.map((choice) => {
                        const selected = improvement === choice.id;
                        return (
                          <label
                            key={choice.id}
                            className={cn(
                              "cursor-pointer rounded-2xl border p-4 transition-colors",
                              selected
                                ? "border-lime-800 bg-lime-500/15"
                                : "border-black/15 bg-mist hover:border-lime-800",
                            )}
                          >
                            <input
                              type="radio"
                              name="quiz-improvement"
                              className="sr-only"
                              checked={selected}
                              onChange={() => {
                                setImprovement(choice.id);
                                setStepError(null);
                              }}
                            />
                            <span className="block font-serif text-xl text-ink-900">{choice.label}</span>
                            <span className="mt-2 block text-sm text-black/70">{choice.description}</span>
                          </label>
                        );
                      })}
                    </div>
                  </fieldset>
                ) : null}

                {step === 2 ? (
                  <fieldset className="mt-6">
                    <legend className="sr-only">Primary goal</legend>
                    <div className="grid gap-3">
                      {quizGoals.map((choice) => {
                        const selected = goal === choice.id;
                        return (
                          <label
                            key={choice.id}
                            className={cn(
                              "cursor-pointer rounded-2xl border p-4 transition-colors",
                              selected
                                ? "border-lime-800 bg-lime-500/15"
                                : "border-black/15 bg-mist hover:border-lime-800",
                            )}
                          >
                            <input
                              type="radio"
                              name="quiz-goal"
                              className="sr-only"
                              checked={selected}
                              onChange={() => {
                                setGoal(choice.id);
                                setStepError(null);
                              }}
                            />
                            <span className="block font-serif text-xl text-ink-900">{choice.label}</span>
                            <span className="mt-2 block text-sm text-black/70">{choice.description}</span>
                          </label>
                        );
                      })}
                    </div>
                  </fieldset>
                ) : null}

                {step === 3 && recommendation ? (
                  <form className="mt-6 space-y-6" onSubmit={onSubmit} noValidate>
                    <div className="rounded-2xl border border-lime-500/30 bg-ink-900 p-5 text-white">
                      <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-lime-400">
                        <Sparkles className="h-4 w-4" aria-hidden="true" />
                        Instant recommendation
                      </p>
                      <h4 className="mt-2 font-serif text-2xl">{recommendation.title}</h4>
                      <p className="mt-3 text-white/90">{recommendation.summary}</p>
                      <p className="mt-4 text-sm text-lime-400">{recommendation.protocol}</p>
                      <p className="mt-3 text-xs uppercase tracking-[0.16em] text-lime-400">
                        Pathway · {recommendation.recommendedServiceName}
                      </p>
                    </div>
                    <div className="grid gap-4 md:grid-cols-3">
                      <TextField
                        id="quiz-name"
                        label="Full name"
                        autoComplete="name"
                        value={lead.fullName}
                        error={errors.fullName}
                        onChange={(event) =>
                          setLead((prev) => ({ ...prev, fullName: event.target.value }))
                        }
                      />
                      <TextField
                        id="quiz-email"
                        label="Email"
                        type="email"
                        autoComplete="email"
                        value={lead.email}
                        error={errors.email}
                        onChange={(event) =>
                          setLead((prev) => ({ ...prev, email: event.target.value }))
                        }
                      />
                      <TextField
                        id="quiz-phone"
                        label="Phone"
                        type="tel"
                        autoComplete="tel"
                        value={lead.phone}
                        error={errors.phone}
                        onChange={(event) =>
                          setLead((prev) => ({ ...prev, phone: event.target.value }))
                        }
                      />
                    </div>
                    <Button type="submit" variant="primary">
                      Reserve my VIP brief
                      <ChevronRight className="h-4 w-4" aria-hidden="true" />
                    </Button>
                  </form>
                ) : null}

                {stepError ? (
                  <p role="alert" className="mt-4 text-sm text-red-700">
                    {stepError}
                  </p>
                ) : null}

                {step < 3 ? (
                  <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
                    <Button
                      variant="outline"
                      disabled={step === 1}
                      onClick={() => {
                        setStepError(null);
                        setStep((value) => Math.max(1, value - 1));
                      }}
                    >
                      <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                      Back
                    </Button>
                    <Button variant="primary" onClick={goNext}>
                      Continue
                      <ChevronRight className="h-4 w-4" aria-hidden="true" />
                    </Button>
                  </div>
                ) : null}

                {step === 3 ? (
                  <div className="mt-6">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setStepError(null);
                        setStep(2);
                      }}
                    >
                      <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                      Back
                    </Button>
                  </div>
                ) : null}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
