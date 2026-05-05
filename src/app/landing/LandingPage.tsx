'use client';

import React from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';
import {
  Briefcase,
  MapPin,
  Zap,
  ArrowRight,
  BookOpen,
  Users,
  Clock,
  ExternalLink,
  Sparkles,
  TrendingUp,
} from 'lucide-react';

export default function LandingPage() {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-[#f8f7f4] flex flex-col">
      {/* Nav */}
      <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <AppLogo size={34} />
            <div className="flex flex-col leading-none">
              <span className="font-bold text-[17px] tracking-tight text-foreground">Kairo</span>
              <span className="text-[10px] text-muted-foreground font-medium hidden sm:block">
                powered by Newton School of Technology
              </span>
            </div>
          </div>
          <nav className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-50 border border-green-200 text-green-700 text-xs font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              Live Listings
            </span>
            <Link
              href="/internship-listings"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              Browse Internships
              <ArrowRight size={14} />
            </Link>
          </nav>
        </div>
      </header>
      {/* Hero */}
      <section className="relative overflow-hidden pt-16 pb-12 sm:pt-24 sm:pb-20">
        {/* Layered background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-primary/6 blur-3xl" />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-violet-400/5 blur-3xl" />
          <div className="absolute bottom-0 left-1/3 w-[700px] h-[250px] rounded-full bg-amber-400/4 blur-3xl" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-[1fr_420px] gap-12 items-center">
            {/* Left: text */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-6">
                <Sparkles size={11} />
                Curated from Internshala · Updated daily
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-bold text-foreground leading-[1.08] tracking-tight">
                Your first{' '}
                <span className="relative inline-block">
                  <span className="relative z-10 text-primary">real-world</span>
                  <span className="absolute bottom-1 left-0 right-0 h-3 bg-primary/15 rounded-sm -z-0" />
                </span>
                <br />
                internship starts here
              </h1>

              <p className="mt-5 text-lg text-muted-foreground max-w-lg leading-relaxed">
                Browse verified internships across tech, design, marketing, and more — filtered by
                location and skills. No account, no friction.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/internship-listings"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity shadow-md"
                >
                  Browse Internships
                  <ArrowRight size={15} />
                </Link>
              </div>
            </div>

            {/* Right: feature preview card */}
            <div className="hidden lg:block">
              <div className="relative">
                {/* Main card */}
                <div className="bg-white rounded-2xl border border-border shadow-xl p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Latest Openings
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs text-green-600 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                      Live
                    </span>
                  </div>
                  {[
                    {
                      role: 'Full Stack Development',
                      company: 'Finixia Dedecons',
                      location: 'Work From Home',
                      stipend: '₹3K–4K/mo',
                      tag: 'bg-blue-50 text-blue-700',
                    },
                    {
                      role: 'UI/UX Design',
                      company: 'PivotRoots',
                      location: 'Mumbai',
                      stipend: '₹8K–10K/mo',
                      tag: 'bg-violet-50 text-violet-700',
                    },
                    {
                      role: 'Visual Design',
                      company: 'Shiplock Technologies',
                      location: 'Bangalore',
                      stipend: '₹20K–25K/mo',
                      tag: 'bg-amber-50 text-amber-700',
                    },
                  ]?.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 p-3 rounded-xl bg-[#f8f7f4] hover:bg-primary/5 transition-colors cursor-default"
                    >
                      <div className="w-9 h-9 rounded-lg bg-white border border-border flex items-center justify-center flex-shrink-0 shadow-sm">
                        <Briefcase size={15} className="text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-foreground truncate">
                          {item?.role}
                        </p>
                        <p className="text-xs text-muted-foreground">{item?.company}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-muted-foreground flex items-center gap-0.5">
                            <MapPin size={10} /> {item?.location}
                          </span>
                          <span
                            className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${item?.tag}`}
                          >
                            {item?.stipend}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                  <Link
                    href="/internship-listings"
                    className="flex items-center justify-center gap-1.5 w-full py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
                  >
                    View all internships <ArrowRight size={14} />
                  </Link>
                </div>

                {/* Floating badge */}
                <div className="absolute -top-4 -right-4 bg-white border border-border rounded-xl shadow-lg px-3 py-2 flex items-center gap-2">
                  <TrendingUp size={14} className="text-green-500" />
                  <span className="text-xs font-semibold text-foreground">13 new today</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Bento features */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
        <div className="mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            Built for students who move fast
          </h2>
          <p className="mt-2 text-muted-foreground text-sm max-w-md">
            No account required. No forms. Just browse listings with verified application links.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Large card — spans 2 cols */}
          <div className="sm:col-span-2 rounded-2xl bg-white border border-border p-7 shadow-sm flex flex-col sm:flex-row gap-6 items-start hover:shadow-md transition-shadow">
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <MapPin size={22} className="text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground">Smart filters, instant results</h3>
              <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
                Filter by location (work from home or city) and required skills like React, Figma,
                or Python. Results update instantly — no page reloads.
              </p>
              <Link
                href="/internship-listings"
                className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
              >
                Try the filters <ArrowRight size={13} />
              </Link>
            </div>
          </div>

          {/* Tall card */}
          <div className="rounded-2xl bg-gradient-to-br from-primary/8 to-violet-500/10 border border-primary/15 p-7 shadow-sm flex flex-col justify-between min-h-[180px] hover:shadow-md transition-shadow">
            <div className="w-11 h-11 rounded-xl bg-white shadow-sm flex items-center justify-center">
              <MapPin size={20} className="text-primary" />
            </div>
            <div>
              <h3 className="text-base font-bold text-foreground mt-4">Work From Home & on-site</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Work from home or in-office across multiple cities — filter by what works for your
                schedule.
              </p>
            </div>
          </div>

          {/* Small card */}
          <div className="rounded-2xl bg-white border border-border p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-11 h-11 rounded-xl bg-amber-50 flex items-center justify-center">
              <Clock size={20} className="text-amber-600" />
            </div>
            <h3 className="mt-4 text-base font-bold text-foreground">Deadline tracking</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              See exact apply-by dates on every listing so you never miss a closing deadline.
            </p>
          </div>

          {/* Small card */}
          <div className="rounded-2xl bg-white border border-border p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-11 h-11 rounded-xl bg-teal-50 flex items-center justify-center">
              <BookOpen size={20} className="text-teal-600" />
            </div>
            <h3 className="mt-4 text-base font-bold text-foreground">Skill-matched roles</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Each listing shows required skills upfront — find roles that match what you already
              know.
            </p>
          </div>

          {/* Dark card */}
          <div className="rounded-2xl bg-foreground text-background p-7 shadow-sm flex flex-col justify-between min-h-[160px] hover:shadow-md transition-shadow">
            <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center">
              <Users size={20} className="text-white" />
            </div>
            <div>
              <h3 className="mt-4 text-base font-bold">Zero sign-up friction</h3>
              <p className="mt-1 text-sm text-white/70">
                Browse listings with verified links — no account, no email, no waiting.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* CTA */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
        <div className="rounded-2xl bg-primary px-8 py-14 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-white/5 blur-2xl" />
            <div className="absolute -bottom-12 -left-12 w-56 h-56 rounded-full bg-white/5 blur-2xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-32 rounded-full bg-white/3 blur-3xl" />
          </div>
          <div className="relative text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 border border-white/20 text-white text-xs font-semibold mb-5">
              <Zap size={11} />
              No account needed
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Ready to land your first internship?
            </h2>
            <p className="mt-3 text-white/75 text-sm max-w-sm mx-auto leading-relaxed">
              Hundreds of verified listings are live right now. It takes under a minute to find one
              that fits.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/internship-listings"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-white text-primary font-bold text-sm hover:bg-white/90 transition-colors shadow-md"
              >
                Browse all internships
                <ArrowRight size={15} />
              </Link>
              <a
                href="https://internshala.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-white/10 text-white font-semibold text-sm hover:bg-white/20 transition-colors border border-white/20"
              >
                Visit Internshala
                <ExternalLink size={13} />
              </a>
            </div>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="border-t border-border mt-auto bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-7 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <AppLogo size={32} />
            <span className="font-semibold text-foreground">Kairo</span>
            <span className="text-border">·</span>
            <span>powered by Newton School of Technology</span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/internship-listings"
              className="hover:text-foreground transition-colors font-medium"
            >
              Internship Listings →
            </Link>
            <span className="text-border">·</span>
            {mounted && <span>© {new Date()?.getFullYear()}</span>}
          </div>
        </div>
      </footer>
    </div>
  );
}
