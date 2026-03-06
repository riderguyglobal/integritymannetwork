"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import EmblaAutoplay from "embla-carousel-autoplay";
import { ProtectedImage } from "@/components/ui/video-player";
import {
  ArrowRight,
  Play,
  Compass,
  User,
  Hammer,
  Shield,
  Crown,
  Mountain,
  Briefcase,
  GraduationCap,
  Megaphone,
  Home,
  Heart,
  ChevronRight,
  Sparkles,
  ArrowUpRight,
  Quote,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/ui/section-heading";
import { BackgroundVideo, VideoPlayer } from "@/components/ui/video-player";
import { SITE, KEY_DEFINITIONS, CHANNELS, EVENTS_INFO } from "@/lib/constants";
import { cn } from "@/lib/utils";

// Animation Variants
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
};

const stagger = {
  whileInView: { transition: { staggerChildren: 0.1 } },
  viewport: { once: true },
};

const ICON_MAP: Record<string, React.ElementType> = {
  Compass, User, Hammer, Shield, Crown, Mountain,
  Briefcase, GraduationCap, Megaphone, Home, Heart,
};

//  HERO (always dark  video background) 
function HeroSection() {
  return (
    <section className="relative min-h-svh flex items-center justify-center overflow-hidden">
      <BackgroundVideo src="/videos/home-hero.mp4" poster="/images/hero-main.jpg" />

      <div className="hidden sm:block absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl animate-float z-1" />
      <div className="hidden sm:block absolute bottom-1/4 right-1/4 w-80 h-80 bg-orange-600/5 rounded-full blur-3xl animate-float z-1" style={{ animationDelay: "3s" }} />

      <div className="relative z-10 container-wide text-center px-6">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }} className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3, duration: 0.6 }} className="inline-flex items-center gap-2 px-4 sm:px-5 py-1.5 sm:py-2 rounded-full bg-orange-500/10 border border-orange-500/20 mb-6 sm:mb-10">
            <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-orange-500" />
            <span className="text-[10px] sm:text-xs font-semibold tracking-wider uppercase text-orange-500">{SITE.scripture.reference}</span>
          </motion.div>

          <h1 className="font-display text-[2.75rem] sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.9] mb-5 sm:mb-8">
            <span className="text-gradient">God.</span>{" "}
            <span className="text-white">Work.</span>{" "}
            <span className="text-gradient">Integrity.</span>
          </h1>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 0.8 }} className="text-xs sm:text-sm md:text-base text-zinc-500 italic max-w-2xl mx-auto mb-3 sm:mb-4 leading-relaxed px-2">
            &ldquo;{SITE.scripture.text}&rdquo;
          </motion.p>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 0.8 }} className="text-base sm:text-lg md:text-xl text-zinc-300 font-medium mb-8 sm:mb-12">
            {SITE.subtitle}
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.6 }} className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Link href="/join" className="w-full sm:w-auto">
              <Button size="lg" className="group w-full sm:w-auto sm:min-w-50 h-14 sm:h-16 text-base sm:text-lg rounded-xl">
                Join The Network
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/about" className="w-full sm:w-auto">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto sm:min-w-50 h-14 sm:h-16 text-base sm:text-lg rounded-xl">
                <Play className="w-5 h-5" />
                Our Story
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="hidden sm:flex absolute bottom-10 left-1/2 -translate-x-1/2 flex-col items-center gap-2">
          <span className="text-[10px] tracking-[0.2em] uppercase text-zinc-600">Scroll</span>
          <div className="w-px h-12 bg-linear-to-b from-orange-500/50 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}

//  WELCOME 
function WelcomeSection() {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-radial-dark" />
      <div className="container-wide relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 items-center">
          <motion.div {...fadeInUp} className="order-2 lg:order-1">
            <SectionHeading label="Welcome" title="Welcome to The Integrity Man Network" align="left" />
            <motion.p {...fadeInUp} className="mt-5 sm:mt-8 text-base sm:text-lg md:text-xl text-zinc-300 leading-relaxed">
              Raising Men of Integrity for advancing The Eternal Purpose of God on Earth through work.
            </motion.p>
            <motion.p {...fadeInUp} className="mt-4 sm:mt-6 text-sm sm:text-base text-zinc-400 leading-relaxed">
              {SITE.description}
            </motion.p>
            <motion.div {...fadeInUp} className="mt-6 sm:mt-8">
              <Link href="/about" className="block sm:inline">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Learn More About Us
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className="order-1 lg:order-2">
            <VideoPlayer src="/videos/welcome.mp4" poster="/images/hero-main.jpg" title="Welcome to TIMN" />
          </motion.div>
        </div>

        <motion.div {...fadeInUp} className="mt-12 sm:mt-20 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          <div className="relative aspect-3/4 rounded-xl sm:rounded-2xl overflow-hidden border border-zinc-800/50 group">
            <ProtectedImage src="/images/man-1.jpg" alt="Man of Integrity" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-linear-to-t from-zinc-950/60 to-transparent" />
          </div>
          <div className="relative aspect-3/4 rounded-xl sm:rounded-2xl overflow-hidden border border-zinc-800/50 group mt-4 sm:mt-8">
            <ProtectedImage src="/images/man-5.jpg" alt="Integrity Network" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-linear-to-t from-zinc-950/60 to-transparent" />
          </div>
          <div className="relative aspect-3/4 rounded-xl sm:rounded-2xl overflow-hidden border border-zinc-800/50 group hidden md:block">
            <ProtectedImage src="/images/man-integrity.jpg" alt="Purpose Driven" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-linear-to-t from-zinc-950/60 to-transparent" />
          </div>
          <div className="relative aspect-3/4 rounded-xl sm:rounded-2xl overflow-hidden border border-zinc-800/50 group mt-4 sm:mt-8 hidden md:block">
            <ProtectedImage src="/images/community-2.jpg" alt="Community of Men" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-linear-to-t from-zinc-950/60 to-transparent" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

//  KEY DEFINITIONS 
function DefinitionsSection() {
  return (
    <section className="section-padding relative">
      <div className="container-wide">
        <motion.div {...fadeInUp}>
          <SectionHeading label="Foundations" title="Definition of Key Words" description="Understanding the pillars upon which this movement stands" />
        </motion.div>

        <motion.div {...stagger} className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
          {KEY_DEFINITIONS.map((def) => {
            const Icon = ICON_MAP[def.icon];
            return (
              <motion.div key={def.term} {...fadeInUp}>
                <Card className="group h-full p-5 sm:p-8 hover:border-orange-500/30 transition-all duration-500">
                  <div className="flex items-start gap-4 sm:gap-5">
                    <div className="shrink-0 w-11 h-11 sm:w-14 sm:h-14 rounded-xl bg-linear-to-br from-orange-500/20 to-orange-600/10 border border-orange-500/20 flex items-center justify-center group-hover:from-orange-500/30 group-hover:to-orange-600/20 transition-all duration-500">
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500" />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-zinc-900 mb-2 sm:mb-3 font-display">{def.term}</h3>
                      <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">{def.definition}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

//  CHANNELS PREVIEW — CAROUSEL 
function ChannelsPreview() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "center", skipSnaps: false },
    [EmblaAutoplay({ delay: 4000, stopOnInteraction: true, stopOnMouseEnter: true })]
  );
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  React.useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi]);

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-radial-dark" />
      <div className="container-wide relative z-10">
        <motion.div {...fadeInUp}>
          <SectionHeading label="Our Channels" title="How We Advance The Mandate" description="Strategic channels designed to form, equip, deploy, and support men across every stage of life and calling." />
        </motion.div>

        {/* Carousel */}
        <motion.div {...fadeInUp} className="mt-10 sm:mt-16">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex -ml-4 sm:-ml-6">
              {CHANNELS.map((channel, i) => {
                const Icon = ICON_MAP[channel.icon];
                return (
                  <div key={channel.id} className="pl-4 sm:pl-6 min-w-0 flex-[0_0_85%] sm:flex-[0_0_60%] md:flex-[0_0_45%] lg:flex-[0_0_35%]">
                    <Link href={`/channels#${channel.id}`}>
                      <Card className={cn(
                        "group h-full p-6 sm:p-8 cursor-pointer transition-all duration-500 hover:-translate-y-1",
                        selectedIndex === i
                          ? "border-orange-500/40 shadow-lg shadow-orange-500/5"
                          : "hover:border-orange-500/30"
                      )}>
                        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-linear-to-br from-orange-500/20 to-orange-600/10 border border-orange-500/20 flex items-center justify-center mb-5 sm:mb-6 group-hover:from-orange-500/30 transition-all duration-500">
                          <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500" />
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold text-zinc-900 mb-2">{channel.title}</h3>
                        <p className="text-[10px] sm:text-xs text-orange-500/70 font-medium uppercase tracking-wider mb-3 sm:mb-4">{channel.subtitle}</p>
                        <p className="text-sm text-zinc-600 leading-relaxed line-clamp-3">{channel.description}</p>
                        <div className="mt-5 flex items-center gap-1 text-sm text-orange-500 font-medium">
                          Learn more <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </Card>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Dots + Arrows */}
          <div className="flex items-center justify-center gap-6 mt-8">
            <button
              onClick={() => emblaApi?.scrollPrev()}
              className="w-10 h-10 rounded-full border border-zinc-700 flex items-center justify-center text-zinc-400 hover:text-white hover:border-orange-500 transition-colors"
              aria-label="Previous channel"
            >
              <ChevronRight className="w-4 h-4 rotate-180" />
            </button>

            <div className="flex items-center gap-2">
              {CHANNELS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => emblaApi?.scrollTo(i)}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300",
                    selectedIndex === i
                      ? "w-8 bg-orange-500"
                      : "w-2 bg-zinc-700 hover:bg-zinc-500"
                  )}
                  aria-label={`Go to channel ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => emblaApi?.scrollNext()}
              className="w-10 h-10 rounded-full border border-zinc-700 flex items-center justify-center text-zinc-400 hover:text-white hover:border-orange-500 transition-colors"
              aria-label="Next channel"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>

        <motion.div {...fadeInUp} className="mt-8 sm:mt-12 text-center">
          <Link href="/channels" className="block sm:inline">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              Explore All Channels
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

//  EVENTS PREVIEW 
function EventsPreview() {
  return (
    <section className="section-padding relative">
      <div className="container-wide">
        <motion.div {...fadeInUp}>
          <SectionHeading label="Gatherings" title="Our Events" description="Intentional convergence points  spaces where conviction is strengthened, brotherhood is deepened, and men are realigned with purpose." />
        </motion.div>

        <motion.div {...stagger} className="mt-10 sm:mt-16 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {EVENTS_INFO.map((event) => {
            const Icon = ICON_MAP[event.icon];
            return (
              <motion.div key={event.name} {...fadeInUp}>
                <Card className="group h-full flex flex-col overflow-hidden hover:border-orange-500/30 transition-all duration-500">
                  <div className="h-1 bg-linear-to-r from-orange-500 to-orange-600 opacity-60 group-hover:opacity-100 transition-opacity" />
                  <CardContent className="p-5 sm:p-8 flex-1 flex flex-col">
                    <div className="flex items-center gap-2.5 sm:gap-3 mb-4 sm:mb-6">
                      <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-linear-to-br from-orange-500/20 to-orange-600/10 border border-orange-500/20 flex items-center justify-center">
                        <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" />
                      </div>
                      <Badge>{event.schedule}</Badge>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-zinc-900 mb-2 sm:mb-3 font-display">{event.name}</h3>
                    <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed flex-1">{event.description}</p>
                    <div className="mt-4 sm:mt-6 pt-4 sm:pt-5 border-t border-zinc-800/50">
                      <p className="text-xs sm:text-sm text-orange-500 italic font-medium">&ldquo;{event.highlight}&rdquo;</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div {...fadeInUp} className="mt-8 sm:mt-12 text-center">
          <Link href="/events" className="block sm:inline">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              View All Events
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

//  SCRIPTURE BANNER (always orange bg) 
function ScriptureBanner() {
  return (
    <section className="relative py-16 sm:py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-white" />
      <div className="absolute inset-0 bg-grid opacity-5" />
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-zinc-300 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-zinc-300 to-transparent" />

      <div className="container-wide relative z-10">
        <motion.div {...fadeInUp} className="max-w-4xl mx-auto text-center">
          <Quote className="w-8 h-8 sm:w-10 sm:h-10 text-zinc-900/20 mx-auto mb-4 sm:mb-6" />
          <blockquote className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-display font-bold text-zinc-900 leading-snug mb-4 sm:mb-6 px-2">
            &ldquo;{SITE.scripture.text}&rdquo;
          </blockquote>
          <cite className="text-base sm:text-lg text-zinc-600 font-medium not-italic"> {SITE.scripture.reference}</cite>
        </motion.div>
      </div>
    </section>
  );
}

//  CTA 
function CTASection() {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-radial-dark" />
      <div className="container-wide relative z-10">
        <motion.div {...fadeInUp} className="max-w-4xl mx-auto text-center">
          <SectionHeading label="Get Involved" title="Be Part of The Movement" description="Whether you want to join, partner, donate, or simply learn more  there is a place for you in The Integrity Man Network." />

          <motion.div {...fadeInUp} className="mt-8 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 flex-wrap">
            <Link href="/join" className="w-full sm:w-auto">
              <Button size="lg" className="group w-full sm:w-auto sm:min-w-45 h-14 sm:h-16 text-base sm:text-lg rounded-xl">
                <Users className="w-5 h-5" />
                Join Us
              </Button>
            </Link>
            <Link href="/donate" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full sm:w-auto sm:min-w-45 h-14 sm:h-16 text-base sm:text-lg rounded-xl">
                <Heart className="w-5 h-5" />
                Donate
              </Button>
            </Link>
            <Link href="/contact" className="w-full sm:w-auto">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto sm:min-w-45 h-14 sm:h-16 text-base sm:text-lg rounded-xl">
                Contact Us
                <ArrowUpRight className="w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

//  MAIN PAGE 
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <WelcomeSection />
      <div className="divider-gradient" />
      <DefinitionsSection />
      <div className="divider-gradient" />
      <ChannelsPreview />
      <ScriptureBanner />
      <EventsPreview />
      <div className="divider-gradient" />
      <CTASection />
    </>
  );
}
