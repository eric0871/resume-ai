"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";

// ─── i18n ────────────────────────────────────────────────────────────
const t = {
  zh: {
    nav: { pricing: "价格", login: "登录", start: "开始使用" },
    hero: {
      badge: "AI 简历优化平台",
      title1: "让简历",
      title2: "脱颖而出",
      subtitle: "基于 AI 深度分析，为国际学生量身打造的简历优化工具。精准匹配 ATS 关键词，提升面试通过率。",
      cta: "免费开始分析",
      ctaSub: "查看定价",
    },
    features: {
      label: "核心功能",
      title: "一站式简历优化",
      items: [
        { title: "AI 智能评分", desc: "全维度分析简历质量，精准定位薄弱环节，给出可量化的提升方案。" },
        { title: "ATS 关键词优化", desc: "深度解析岗位要求，自动匹配高频关键词，大幅提升系统通过率。" },
        { title: "一键简历改写", desc: "基于分析结果，AI 自动重写经历描述，用数据和成果说话。" },
        { title: "JD 精准匹配", desc: "上传职位描述，智能分析简历匹配度，给出针对性优化建议。" },
      ],
    },
    steps: {
      title: "三步完成优化",
      items: [
        { step: "01", title: "上传简历", desc: "支持 PDF / DOCX 格式" },
        { step: "02", title: "AI 分析", desc: "秒级深度分析与评分" },
        { step: "03", title: "获取建议", desc: "可操作的优化方案" },
      ],
    },
    demo: {
      title: "AI 分析报告预览",
      overall: "综合评分",
      format: "格式",
      content: "内容",
      keywords: "关键词",
      ats: "ATS 兼容",
    },
    cta: {
      title: "准备好优化你的简历了吗？",
      subtitle: "加入 10,000+ 已成功拿到 Offer 的留学生",
      button: "免费开始",
    },
    footer: {
      brand: "为国际学生打造的 AI 简历优化平台",
      product: "产品",
      features: "功能",
      pricing: "价格",
      resources: "资源",
      blog: "博客",
      docs: "文档",
      about: "关于",
      privacy: "隐私政策",
      terms: "服务条款",
      rights: "All rights reserved.",
    },
  },
  en: {
    nav: { pricing: "Pricing", login: "Log in", start: "Get Started" },
    hero: {
      badge: "AI Resume Platform",
      title1: "Make your resume",
      title2: "stand out",
      subtitle: "AI-powered resume analysis built for international students. Match ATS keywords precisely and boost your interview rate.",
      cta: "Start Free Analysis",
      ctaSub: "View Pricing",
    },
    features: {
      label: "Features",
      title: "All-in-one Resume Optimization",
      items: [
        { title: "AI Smart Scoring", desc: "Multi-dimensional analysis that pinpoints weaknesses and provides quantifiable improvement plans." },
        { title: "ATS Keyword Match", desc: "Deep JD parsing to automatically match high-frequency keywords and boost ATS pass rates." },
        { title: "One-Click Rewrite", desc: "AI auto-rewrites experience descriptions with action verbs, metrics, and impact statements." },
        { title: "JD Precision Match", desc: "Upload a job description to get a tailored match score and targeted optimization advice." },
      ],
    },
    steps: {
      title: "Three Simple Steps",
      items: [
        { step: "01", title: "Upload Resume", desc: "PDF / DOCX supported" },
        { step: "02", title: "AI Analysis", desc: "Instant deep scoring" },
        { step: "03", title: "Get Insights", desc: "Actionable improvements" },
      ],
    },
    demo: {
      title: "AI Analysis Preview",
      overall: "Overall",
      format: "Format",
      content: "Content",
      keywords: "Keywords",
      ats: "ATS Score",
    },
    cta: {
      title: "Ready to optimize your resume?",
      subtitle: "Join 10,000+ students who landed their dream offers",
      button: "Start Free",
    },
    footer: {
      brand: "AI resume platform built for international students",
      product: "Product",
      features: "Features",
      pricing: "Pricing",
      resources: "Resources",
      blog: "Blog",
      docs: "Docs",
      about: "About",
      privacy: "Privacy",
      terms: "Terms",
      rights: "All rights reserved.",
    },
  },
};

// ─── Animated Score Ring ─────────────────────────────────────────────
function ScoreRing({ score, label, delay = 0 }: { score: number; label: string; delay?: number }) {
  const [current, setCurrent] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            let frame = 0;
            const interval = setInterval(() => {
              frame++;
              setCurrent(Math.min(frame * 2, score));
              if (frame * 2 >= score) clearInterval(interval);
            }, 20);
          }, delay);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [score, delay]);

  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (current / 100) * circumference;
  const color = current >= 80 ? "#22c55e" : current >= 60 ? "#3b82f6" : "#f59e0b";

  return (
    <div ref={ref} className="flex flex-col items-center gap-2">
      <svg width="88" height="88" className="transform -rotate-90">
        <circle cx="44" cy="44" r={radius} fill="none" stroke="#f1f5f9" strokeWidth="6" />
        <circle
          cx="44" cy="44" r={radius} fill="none"
          stroke={color} strokeWidth="6" strokeLinecap="round"
          strokeDasharray={circumference} strokeDashoffset={offset}
          className="transition-all duration-700 ease-out"
        />
      </svg>
      <span className="text-2xl font-bold text-slate-900 absolute mt-6">{current}</span>
      <span className="text-xs text-slate-500 font-medium tracking-wide uppercase">{label}</span>
    </div>
  );
}

// ─── Fade-in on scroll ───────────────────────────────────────────────
function FadeIn({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${className}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// ─── Feature icon components ─────────────────────────────────────────
const featureIcons = [
  // Brain / AI
  <svg key="ai" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714a2.25 2.25 0 0 0 .659 1.591L19 14.5m-4.75-11.396c.251.023.501.05.75.082M12 21a8.966 8.966 0 0 0 5.982-2.275M12 21a8.966 8.966 0 0 1-5.982-2.275" /></svg>,
  // Key
  <svg key="key" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z" /></svg>,
  // Pencil / rewrite
  <svg key="pen" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931ZM16.862 4.487 19.5 7.125" /></svg>,
  // Target / match
  <svg key="target" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M7.5 3.75H6A2.25 2.25 0 0 0 3.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0 1 20.25 6v1.5m0 9V18A2.25 2.25 0 0 1 18 20.25h-1.5m-9 0H6A2.25 2.25 0 0 1 3.75 18v-1.5M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>,
];

// ─── Main Page ───────────────────────────────────────────────────────
export default function Home() {
  const [lang, setLang] = useState<"zh" | "en">("zh");
  const [scrolled, setScrolled] = useState(false);
  const i = t[lang];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      {/* ── Nav ─────────────────────────────────────────────── */}
      <nav
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-white/80 backdrop-blur-lg shadow-sm" : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center group-hover:scale-105 transition-transform">
              <span className="text-white font-bold text-sm">R</span>
            </div>
            <span className="font-semibold text-lg tracking-tight">ResumeAI</span>
          </Link>

          <div className="flex items-center gap-5">
            {/* Language toggle */}
            <button
              onClick={() => setLang(lang === "zh" ? "en" : "zh")}
              className="text-xs font-medium px-2.5 py-1 rounded-full border border-slate-200 text-slate-500 hover:border-slate-400 hover:text-slate-700 transition-all"
            >
              {lang === "zh" ? "EN" : "中文"}
            </button>

            <Link href="/pricing" className="text-sm text-slate-600 hover:text-slate-900 transition hidden sm:block">
              {i.nav.pricing}
            </Link>
            <Link href="/login" className="text-sm text-slate-600 hover:text-slate-900 transition">
              {i.nav.login}
            </Link>
            <Link
              href="/login"
              className="text-sm font-medium px-4 py-2 rounded-full bg-slate-900 text-white hover:bg-slate-800 transition-all hover:shadow-lg"
            >
              {i.nav.start}
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Hero ────────────────────────────────────────────── */}
      <section className="pt-32 pb-20 sm:pt-40 sm:pb-28 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-slate-400 mb-6 px-4 py-1.5 border border-slate-200 rounded-full">
              {i.hero.badge}
            </span>
          </FadeIn>

          <FadeIn delay={100}>
            <h1 className="text-5xl sm:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
              {i.hero.title1}
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-violet-600 to-purple-600 bg-clip-text text-transparent">
                {i.hero.title2}
              </span>
            </h1>
          </FadeIn>

          <FadeIn delay={200}>
            <p className="text-lg sm:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed mb-10">
              {i.hero.subtitle}
            </p>
          </FadeIn>

          <FadeIn delay={300}>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/login"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-slate-900 text-white font-medium hover:bg-slate-800 hover:shadow-xl transition-all text-sm"
              >
                {i.hero.cta}
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-full border border-slate-200 text-slate-700 font-medium hover:border-slate-400 hover:bg-slate-50 transition-all text-sm"
              >
                {i.hero.ctaSub}
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Animated Demo Preview ───────────────────────────── */}
      <section className="pb-20 sm:pb-28 px-6">
        <FadeIn>
          <div className="max-w-3xl mx-auto">
            <div className="rounded-2xl border border-slate-200 bg-gradient-to-b from-slate-50 to-white p-8 sm:p-12 shadow-sm">
              <p className="text-sm font-medium text-slate-400 uppercase tracking-widest mb-8 text-center">
                {i.demo.title}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
                <div className="relative">
                  <ScoreRing score={85} label={i.demo.overall} />
                </div>
                <ScoreRing score={78} label={i.demo.format} delay={150} />
                <ScoreRing score={65} label={i.demo.content} delay={300} />
                <ScoreRing score={72} label={i.demo.keywords} delay={450} />
                <ScoreRing score={71} label={i.demo.ats} delay={600} />
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ── Features ────────────────────────────────────────── */}
      <section className="py-20 sm:py-28 px-6 bg-slate-50/50">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="text-center mb-16">
              <span className="text-xs font-semibold tracking-widest uppercase text-slate-400 mb-3 block">
                {i.features.label}
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">{i.features.title}</h2>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {i.features.items.map((feat, idx) => (
              <FadeIn key={idx} delay={idx * 100}>
                <div className="group rounded-2xl border border-slate-200 bg-white p-8 hover:shadow-md hover:border-slate-300 transition-all duration-300">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 mb-5 group-hover:bg-slate-900 group-hover:text-white transition-all duration-300">
                    {featureIcons[idx]}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feat.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{feat.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Steps ───────────────────────────────────────────── */}
      <section className="py-20 sm:py-28 px-6">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-center mb-16">
              {i.steps.title}
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {i.steps.items.map((step, idx) => (
              <FadeIn key={idx} delay={idx * 150}>
                <div className="text-center">
                  <div className="w-14 h-14 mx-auto mb-5 rounded-full border-2 border-slate-200 flex items-center justify-center text-lg font-bold text-slate-400">
                    {step.step}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                  <p className="text-slate-500 text-sm">{step.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────── */}
      <section className="py-20 sm:py-28 px-6">
        <FadeIn>
          <div className="max-w-3xl mx-auto text-center">
            <div className="rounded-3xl bg-slate-900 text-white px-8 py-16 sm:px-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">{i.cta.title}</h2>
              <p className="text-slate-400 mb-8">{i.cta.subtitle}</p>
              <Link
                href="/login"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white text-slate-900 font-medium hover:bg-slate-100 transition-all text-sm"
              >
                {i.cta.button}
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
              </Link>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ── Footer ──────────────────────────────────────────── */}
      <footer className="border-t border-slate-200 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-10">
            <div className="col-span-2 sm:col-span-1">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded bg-slate-900 flex items-center justify-center">
                  <span className="text-white text-xs font-bold">R</span>
                </div>
                <span className="font-semibold">ResumeAI</span>
              </div>
              <p className="text-sm text-slate-500">{i.footer.brand}</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-3">{i.footer.product}</h4>
              <ul className="space-y-2 text-sm text-slate-500">
                <li><a href="#" className="hover:text-slate-900 transition">{i.footer.features}</a></li>
                <li><a href="/pricing" className="hover:text-slate-900 transition">{i.footer.pricing}</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-3">{i.footer.resources}</h4>
              <ul className="space-y-2 text-sm text-slate-500">
                <li><a href="#" className="hover:text-slate-900 transition">{i.footer.blog}</a></li>
                <li><a href="#" className="hover:text-slate-900 transition">{i.footer.docs}</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-3">{i.footer.about}</h4>
              <ul className="space-y-2 text-sm text-slate-500">
                <li><a href="#" className="hover:text-slate-900 transition">{i.footer.privacy}</a></li>
                <li><a href="#" className="hover:text-slate-900 transition">{i.footer.terms}</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-200 pt-6 text-sm text-slate-400 text-center">
            &copy; 2026 ResumeAI. {i.footer.rights}
          </div>
        </div>
      </footer>
    </div>
  );
}
