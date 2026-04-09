"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { ArrowRight, Zap, Trophy, Flame, Dumbbell, Pill, BookOpen, PenLine, ListChecks, Users, Star } from "lucide-react";

const glass = {
  background: "color-mix(in srgb, var(--surface) 50%, transparent)",
  backdropFilter: "blur(20px) saturate(1.2)",
  WebkitBackdropFilter: "blur(20px) saturate(1.2)",
  border: "1px solid color-mix(in srgb, var(--border) 60%, transparent)",
} as const;

const glassSubtle = {
  background: "color-mix(in srgb, var(--surface) 35%, transparent)",
  backdropFilter: "blur(16px) saturate(1.1)",
  WebkitBackdropFilter: "blur(16px) saturate(1.1)",
  border: "1px solid color-mix(in srgb, var(--border) 40%, transparent)",
} as const;

export default function DashboardDesign() {
  const heroRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const dashRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      gsap.to(textRef.current, {
        y: -60, opacity: 0.3,
        scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.fromTo(dashRef.current, { scale: 1 }, {
        scale: 0.88, borderRadius: "28px",
        scrollTrigger: { trigger: dashRef.current, start: "top 60%", end: "bottom top", scrub: 1 },
      });
    });
  }, { scope: heroRef });

  return (
    <>
      {/* Glass Nav */}
      <nav className="fixed top-0 w-full z-40" style={{ ...glass, borderLeft: "none", borderRight: "none", borderTop: "none", borderRadius: 0 }}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 flex items-center justify-center" style={{ background: "var(--accent)", borderRadius: "var(--radius-md)" }}>
              <Flame className="w-4.5 h-4.5" style={{ color: "var(--bg)" }} />
            </div>
            <span className="font-semibold text-lg" style={{ color: "var(--text)" }}>Paceify</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            {["Features", "Companion", "Pricing"].map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} className="text-sm transition-colors hover:opacity-80" style={{ color: "var(--text-secondary)" }}>{l}</a>
            ))}
          </div>
          <button className="text-sm font-medium px-4 py-2 transition-all hover:scale-[1.02]" style={{ background: "var(--accent)", color: "var(--bg)", borderRadius: "var(--radius-md)", boxShadow: "0 2px 12px color-mix(in srgb, var(--accent) 30%, transparent)" }}>
            Start for free
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section ref={heroRef} className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at top, var(--accent-glow) 0%, transparent 50%)" }} />
        <div className="relative max-w-6xl mx-auto">
          <div ref={textRef}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="flex justify-center mb-6">
              <div className="flex items-center gap-2 px-4 py-1.5 text-xs" style={{ ...glassSubtle, borderRadius: "var(--radius-full, 9999px)", color: "var(--text-secondary)" }}>
                <Zap className="w-3.5 h-3.5" style={{ color: "var(--accent)" }} />
                Your habits, gamified.
              </div>
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="text-center text-5xl sm:text-6xl md:text-7xl leading-[1.1]" style={{ color: "var(--text)" }}>
              Level up your<br /><span style={{ color: "var(--accent)" }}>real life</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="text-center text-lg mt-6 max-w-xl mx-auto leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              Track gym, calories, pills, languages, and journaling — all in one app with a companion creature that grows with you.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="flex justify-center gap-4 mt-10">
              <button className="group font-medium px-6 py-3 transition-all flex items-center gap-2 hover:scale-[1.02]" style={{ background: "var(--accent)", color: "var(--bg)", borderRadius: "var(--radius-lg)", boxShadow: "0 4px 20px color-mix(in srgb, var(--accent) 35%, transparent)" }}>
                Start my journey <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
              <button className="font-medium px-6 py-3 transition-all hover:scale-[1.02]" style={{ ...glassSubtle, color: "var(--text-secondary)", borderRadius: "var(--radius-lg)" }}>
                See how it works
              </button>
            </motion.div>
          </div>

          {/* Glass Dashboard Mockup */}
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.5 }} className="mt-20 relative">
            <div className="absolute -inset-6 opacity-25" style={{ background: "var(--accent-glow)", filter: "blur(60px)", borderRadius: "var(--radius-xl)" }} />
            <div ref={dashRef} className="relative overflow-hidden" style={{
              ...glass, borderRadius: "var(--radius-xl)",
              boxShadow: "0 20px 60px color-mix(in srgb, var(--text) 8%, transparent), inset 0 1px 0 color-mix(in srgb, white 8%, transparent)",
            }}>
              <div className="p-1.5">
                <div className="flex items-center gap-1.5 px-3 py-2">
                  <div className="w-3 h-3 rounded-full" style={{ background: "var(--danger)", opacity: 0.6 }} />
                  <div className="w-3 h-3 rounded-full" style={{ background: "var(--xp)", opacity: 0.6 }} />
                  <div className="w-3 h-3 rounded-full" style={{ background: "var(--success)", opacity: 0.6 }} />
                  <span className="text-xs ml-2" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>paceify — dashboard</span>
                </div>
              </div>
              <div className="p-6 sm:p-10" style={{ background: "color-mix(in srgb, var(--bg) 40%, transparent)" }}>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="col-span-2 row-span-2 p-5 flex flex-col justify-between" style={{ ...glassSubtle, borderRadius: "var(--radius-lg)" }}>
                    <div>
                      <p className="text-xs uppercase tracking-wider mb-1" style={{ color: "var(--text-muted)" }}>Companion</p>
                      <p className="font-semibold text-lg" style={{ color: "var(--text)" }}>Luna the Phoenix</p>
                    </div>
                    <div className="flex items-end gap-4 mt-4">
                      <div className="text-5xl">🔥</div>
                      <div className="flex-1">
                        <div className="h-2 rounded-full overflow-hidden" style={{ background: "color-mix(in srgb, var(--elevated) 50%, transparent)" }}>
                          <div className="h-full rounded-full" style={{ background: "var(--accent)", width: "65%", boxShadow: "0 0 12px color-mix(in srgb, var(--accent) 50%, transparent)" }} />
                        </div>
                        <div className="flex gap-3 mt-3">
                          {[{ l: "STR", v: 24 }, { l: "VIT", v: 18 }, { l: "INT", v: 31 }].map(s => (
                            <div key={s.l} className="text-center">
                              <p className="font-bold text-sm" style={{ color: "var(--text)", fontFamily: "var(--font-mono)" }}>{s.v}</p>
                              <p className="text-[10px] uppercase" style={{ color: "var(--text-muted)" }}>{s.l}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-4" style={{ ...glassSubtle, borderRadius: "var(--radius-lg)" }}>
                    <Flame className="w-4 h-4 mb-2" style={{ color: "var(--streak)" }} />
                    <p className="text-3xl font-bold" style={{ color: "var(--text)", fontFamily: "var(--font-mono)" }}>12</p>
                    <p className="text-xs" style={{ color: "var(--text-muted)" }}>day streak</p>
                  </div>
                  <div className="p-4" style={{ ...glassSubtle, borderRadius: "var(--radius-lg)" }}>
                    <Trophy className="w-4 h-4 mb-2" style={{ color: "var(--xp)" }} />
                    <p className="text-3xl font-bold" style={{ color: "var(--text)", fontFamily: "var(--font-mono)" }}>7</p>
                    <p className="text-xs" style={{ color: "var(--text-muted)" }}>level</p>
                  </div>
                  <div className="col-span-2 p-4" style={{ ...glassSubtle, borderRadius: "var(--radius-lg)" }}>
                    <p className="text-xs uppercase tracking-wider mb-3" style={{ color: "var(--text-muted)" }}>Today&apos;s Habits</p>
                    {[{ n: "Gym — Push Day", d: true }, { n: "Log Calories", d: true }, { n: "French Lesson", d: false }, { n: "Evening Pills", d: false }].map(h => (
                      <div key={h.n} className="flex items-center gap-3 mb-1.5">
                        <div className="w-4 h-4 rounded border text-[9px] flex items-center justify-center" style={{ borderColor: h.d ? "var(--success)" : "color-mix(in srgb, var(--border) 60%, transparent)", background: h.d ? "var(--success)" : "transparent", color: h.d ? "var(--bg)" : "transparent" }}>✓</div>
                        <span className="text-sm" style={{ color: h.d ? "var(--text-muted)" : "var(--text)", textDecoration: h.d ? "line-through" : "none" }}>{h.n}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative py-20 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[{ icon: Users, v: "12K+", l: "Users", c: "--accent" }, { icon: Flame, v: "2.4M", l: "Habits", c: "--streak" }, { icon: Star, v: "4.9", l: "Rating", c: "--xp" }, { icon: Dumbbell, v: "340K", l: "Sessions", c: "--success" }].map((s, i) => (
            <motion.div key={s.l} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="text-center p-6" style={{ ...glassSubtle, borderRadius: "var(--radius-lg)" }}
            >
              <s.icon className="w-5 h-5 mx-auto mb-3" style={{ color: `var(${s.c})` }} />
              <p className="text-2xl sm:text-3xl font-bold" style={{ color: "var(--text)", fontFamily: "var(--font-mono)" }}>{s.v}</p>
              <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>{s.l}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="relative py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl" style={{ color: "var(--text)" }}>Six modules. One character.</h2>
            <p className="mt-4 max-w-lg mx-auto" style={{ color: "var(--text-secondary)" }}>Every habit feeds an RPG stat. Your companion grows stronger as you do.</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: Dumbbell, name: "Gym Tracker", stat: "Strength", desc: "Log sessions, track sets, see personal records." },
              { icon: Flame, name: "Calorie Tracker", stat: "Vitality", desc: "Log meals, track macros, hit daily targets." },
              { icon: Pill, name: "Pill Reminders", stat: "Shield", desc: "Never miss a dose. Scheduled reminders." },
              { icon: BookOpen, name: "French Lessons", stat: "Intelligence", desc: "Daily lessons, vocabulary drills, grammar." },
              { icon: PenLine, name: "Journal", stat: "Wisdom", desc: "Reflect daily. Track mood, find patterns." },
              { icon: ListChecks, name: "Habits & Todos", stat: "XP", desc: "Custom habits, daily todos, recurring tasks." },
            ].map((m, i) => (
              <motion.div key={m.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="p-6 transition-all hover:scale-[1.02]"
                style={{ ...glass, borderRadius: "var(--radius-lg)", boxShadow: "0 4px 24px color-mix(in srgb, var(--text) 4%, transparent), inset 0 1px 0 color-mix(in srgb, white 5%, transparent)" }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 flex items-center justify-center" style={{ background: "color-mix(in srgb, var(--accent) 15%, transparent)", borderRadius: "var(--radius-md)" }}>
                    <m.icon className="w-5 h-5" style={{ color: "var(--accent)" }} />
                  </div>
                  <div>
                    <h3 className="font-semibold" style={{ color: "var(--text)" }}>{m.name}</h3>
                    <p className="text-xs" style={{ color: "var(--accent)", fontFamily: "var(--font-mono)" }}>+{m.stat}</p>
                  </div>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{m.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-3xl mx-auto text-center">
          <div className="relative">
            <div className="absolute -inset-12 opacity-20" style={{ background: "var(--accent-glow)", filter: "blur(60px)" }} />
            <div className="relative p-12 sm:p-16" style={{
              ...glass, borderRadius: "var(--radius-xl)",
              boxShadow: "0 20px 60px color-mix(in srgb, var(--text) 6%, transparent), inset 0 1px 0 color-mix(in srgb, white 8%, transparent)",
            }}>
              <h2 className="text-3xl sm:text-4xl" style={{ color: "var(--text)" }}>
                Stop tracking habits.<br /><span style={{ color: "var(--accent)" }}>Start living them.</span>
              </h2>
              <p className="mt-4 max-w-md mx-auto" style={{ color: "var(--text-secondary)" }}>Free forever. No credit card. Your companion is waiting.</p>
              <button className="group mt-8 font-medium px-8 py-3.5 transition-all inline-flex items-center gap-2 text-lg hover:scale-[1.02]" style={{ background: "var(--accent)", color: "var(--bg)", borderRadius: "var(--radius-lg)", boxShadow: "0 4px 20px color-mix(in srgb, var(--accent) 35%, transparent)" }}>
                Start my journey <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 px-6" style={{ borderTop: "1px solid color-mix(in srgb, var(--border) 50%, transparent)" }}>
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 flex items-center justify-center" style={{ background: "var(--accent)", borderRadius: "var(--radius-sm)" }}>
              <Flame className="w-3.5 h-3.5" style={{ color: "var(--bg)" }} />
            </div>
            <span className="text-sm" style={{ color: "var(--text-muted)" }}>Paceify</span>
          </div>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>Built for people who want more from their habits.</p>
        </div>
      </footer>
    </>
  );
}
