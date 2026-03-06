"use client";

import { motion } from "framer-motion";
import {
  Calendar,
  MapPin,
  Users,
  ArrowRight,
  Crown,
  Mountain,
  Building2,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { ProtectedImage } from "@/components/ui/video-player";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/ui/section-heading";
import { EVENTS_INFO } from "@/lib/constants";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
};

//  HERO (image background  stays dark) 
function EventsHero() {
  return (
    <section className="relative hero-padding overflow-hidden">
      <div className="absolute inset-0 bg-zinc-950" />
      <div className="absolute inset-0">
        <ProtectedImage src="/images/god-work.jpg" alt="God Work Integrity" fill className="object-cover opacity-20" priority />
        <div className="absolute inset-0 bg-linear-to-b from-zinc-950/60 via-zinc-950/80 to-zinc-950" />
      </div>
      <div className="absolute inset-0 bg-grid opacity-30" />

      <div className="container-wide relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 mb-5 sm:mb-8">
            <Calendar className="w-3.5 h-3.5 text-orange-400" />
            <span className="text-[10px] sm:text-xs font-semibold tracking-wider uppercase text-orange-400">Our Gatherings</span>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-white leading-[0.95] mb-4 sm:mb-6">
            Events & <span className="text-gradient">Gatherings</span>
          </h1>

          <p className="text-sm sm:text-lg md:text-xl text-zinc-400 leading-relaxed max-w-3xl mx-auto">
            The Integrity Man Network hosts regular gatherings that go beyond entertainment  they are strategic, intentional, and purpose-centered. Each event serves specific goals aligned with our mandate to form, equip, and mobilize men.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

//  INTRO 
function IntroSection() {
  return (
    <section className="section-padding">
      <div className="container-wide">
        <motion.div {...fadeInUp} className="max-w-3xl mx-auto text-center">
          <p className="text-sm sm:text-base md:text-lg text-zinc-400 leading-relaxed">
            Our gatherings are not generic conferences. They are structured encounters where men are challenged, taught, mentored, activated, and sent out with greater clarity and conviction. Every gathering is designed to leave a lasting imprint on those who attend.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

const EVENT_ICONS: Record<string, React.ElementType> = {
  "Crown": Crown,
  "Mountain": Mountain,
  "Briefcase": Building2,
};

//  EVENT SECTION 
function EventSection({ event, index }: { event: (typeof EVENTS_INFO)[number]; index: number }) {
  const Icon = EVENT_ICONS[event.icon] || Sparkles;
  const isReversed = index % 2 === 1;

  return (
    <section className={`section-padding ${isReversed ? "bg-zinc-900/30" : ""}`}>
      {isReversed && <div className="absolute inset-0 bg-radial-dark pointer-events-none" />}
      <div className="container-wide relative z-10">
        <motion.div {...fadeInUp}>
          <Card className="overflow-hidden">
            <div className="h-1.5 bg-linear-to-r from-orange-500 via-orange-400 to-orange-600" />
            <CardContent className="p-0">
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-0">
                {/* Left */}
                <div className="lg:col-span-2 p-5 sm:p-8 md:p-12 flex flex-col items-start justify-center border-b lg:border-b-0 lg:border-r border-zinc-800/50">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-linear-to-br from-orange-500/20 to-orange-600/10 border border-orange-500/20 flex items-center justify-center mb-4 sm:mb-6">
                    <Icon className="w-5 h-5 sm:w-7 sm:h-7 text-orange-400" />
                  </div>
                  <Badge className="mb-2 sm:mb-3">{event.schedule}</Badge>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white font-display mb-3 sm:mb-4">{event.name}</h2>
                  <div className="mt-4 sm:mt-8 flex flex-wrap gap-3 sm:gap-4 text-xs text-zinc-500">
                    <div className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5 text-orange-400" /><span>Men of Purpose</span></div>
                    <div className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-orange-400" /><span>See Schedule</span></div>
                  </div>
                </div>

                {/* Right */}
                <div className="lg:col-span-3 p-5 sm:p-8 md:p-12 space-y-4 sm:space-y-5 text-sm sm:text-base text-zinc-400 leading-relaxed">
                  <p>{event.description}</p>
                  <p className="text-orange-400/80 italic font-medium text-base sm:text-lg border-l-2 border-orange-500/30 pl-4 sm:pl-6">{event.highlight}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}

//  CTA (orange bg  stays as-is) 
function EventsCTA() {
  return (
    <section className="section-padding bg-linear-to-br from-orange-600 via-orange-500 to-orange-700 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
      </div>

      <div className="container-wide relative z-10 text-center">
        <motion.div {...fadeInUp} className="max-w-2xl mx-auto">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">Ready to Attend?</h2>
          <p className="text-orange-100/80 text-sm sm:text-lg mb-8 sm:mb-10 leading-relaxed">
            Stay connected for upcoming event announcements, early registrations, and exclusive access to our gatherings.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link href="/contact" className="block sm:inline">
              <Button variant="white" size="xl" className="w-full sm:w-auto">Get Notified<ArrowRight className="w-4 h-4" /></Button>
            </Link>
            <Link href="/join" className="block sm:inline">
              <Button variant="outline" size="xl" className="border-white/30 text-white hover:bg-white/10 w-full sm:w-auto">Join The Network</Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function EventsPage() {
  return (
    <>
      <EventsHero />
      <div className="divider-gradient" />
      <IntroSection />
      {EVENTS_INFO.map((event, index) => (
        <div key={event.name}>
          <div className="divider-gradient" />
          <EventSection event={event} index={index} />
        </div>
      ))}
      <div className="divider-gradient" />
      <EventsCTA />
    </>
  );
}
