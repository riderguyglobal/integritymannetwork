"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ProtectedImage } from "@/components/ui/video-player";
import {
  Heart,
  Gift,
  CreditCard,
  Building2,
  ArrowRight,
  CheckCircle2,
  DollarSign,
  Globe,
  Shield,
  Users,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/ui/section-heading";
import { formatCurrency } from "@/lib/utils";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
};

// 
// HERO
// 

function DonateHero() {
  return (
    <section className="relative hero-padding overflow-hidden">
      <div className="absolute inset-0 bg-zinc-950" />
      {/* Background image */}
      <div className="absolute inset-0">
        <ProtectedImage
          src="/images/man-integrity.jpg"
          alt="Man of Integrity"
          fill
          className="object-cover opacity-15"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-b from-white/50 via-white/80 to-white from-zinc-950/50 via-zinc-950/80 to-zinc-950" />
      </div>
      <div className="absolute inset-0 bg-grid opacity-30" />

      <div className="container-wide relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 mb-5 sm:mb-8">
            <Heart className="w-3.5 h-3.5 text-orange-400" />
            <span className="text-[10px] sm:text-xs font-semibold tracking-wider uppercase text-orange-400">
              Support The Vision
            </span>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-white leading-[0.95] mb-4 sm:mb-6">
            Partner With{" "}
            <span className="text-gradient">Us</span>
          </h1>

          <p className="text-sm sm:text-lg md:text-xl text-zinc-400 leading-relaxed max-w-3xl mx-auto">
            Your generosity fuels the formation of men, the expansion of
            communities, and the advancement of purpose-driven impact across
            nations.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// 
// IMPACT AREAS
// 

const impactAreas = [
  {
    icon: Building2,
    title: "Schools & Training",
    description:
      "Fund the School of Integrity and Purpose Centers that form men and children with clarity and conviction.",
  },
  {
    icon: Users,
    title: "Youth & Campus Outreach",
    description:
      "Support outreach programs that reach young men in schools and universities before compromise defines them.",
  },
  {
    icon: Globe,
    title: "Community Interventions",
    description:
      "Help fund community-focused initiatives that address social challenges through a purpose-driven approach.",
  },
  {
    icon: Shield,
    title: "Network Operations",
    description:
      "Support the infrastructure, technology, events, and operations that keep the network running globally.",
  },
];

function ImpactSection() {
  return (
    <section className="section-padding">
      <div className="container-wide">
        <motion.div {...fadeInUp}>
          <SectionHeading
            label="Your Impact"
            title="Where Your Gift Goes"
            description="Every contribution directly advances our mandate to form, equip, and deploy men of integrity."
          />
        </motion.div>

        <div className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {impactAreas.map((area, index) => (
            <motion.div
              key={area.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <Card className="h-full hover:border-orange-500/20 transition-colors">
                <CardContent className="p-4 sm:p-6 flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-linear-to-br from-orange-500/20 to-orange-600/10 border border-orange-500/20 flex items-center justify-center shrink-0">
                    <area.icon className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white font-display mb-1 sm:mb-2">
                      {area.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                      {area.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// 
// DONATION FORM
// 

const presetAmounts = [5000, 10000, 25000, 50000, 100000, 250000];

function DonationForm() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(25000);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [donationType, setDonationType] = useState<"one-time" | "monthly">(
    "one-time"
  );

  const currentAmount = customAmount
    ? parseInt(customAmount, 10)
    : selectedAmount;

  return (
    <div className="space-y-8">
      {/* Donation Type Toggle */}
      <div className="flex gap-2 p-1 rounded-lg bg-zinc-800/50 border border-zinc-700/50 w-fit">
        <button
          onClick={() => setDonationType("one-time")}
          className={`px-5 py-2 rounded-md text-sm font-medium transition-all ${
            donationType === "one-time"
              ? "bg-orange-500 text-white shadow-lg shadow-orange-500/20"
              : "text-zinc-400 hover:text-white"
          }`}
        >
          One-Time
        </button>
        <button
          onClick={() => setDonationType("monthly")}
          className={`px-5 py-2 rounded-md text-sm font-medium transition-all ${
            donationType === "monthly"
              ? "bg-orange-500 text-white shadow-lg shadow-orange-500/20"
              : "text-zinc-400 hover:text-white"
          }`}
        >
          Monthly
        </button>
      </div>

      {/* Preset Amounts */}
      <div>
        <label className="text-xs sm:text-sm font-medium text-zinc-300 mb-2 sm:mb-3 block">
          Select Amount (NGN)
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
          {presetAmounts.map((amount) => (
            <button
              key={amount}
              onClick={() => {
                setSelectedAmount(amount);
                setCustomAmount("");
              }}
              className={`px-3 sm:px-4 py-3 rounded-lg text-xs sm:text-sm font-semibold transition-all border ${
                selectedAmount === amount && !customAmount
                  ? "bg-orange-500/10 border-orange-500/50 text-orange-400"
                  : "bg-zinc-800/30 border-zinc-700/50 text-zinc-300 hover:border-orange-500/30"
              }`}>
              {formatCurrency(amount)}
            </button>
          ))}
        </div>
      </div>

      {/* Custom Amount */}
      <div className="space-y-1.5 sm:space-y-2">
        <label className="text-xs sm:text-sm font-medium text-zinc-300">
          Or Enter Custom Amount (NGN)
        </label>
        <div className="relative">
          <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <Input
            type="number"
            placeholder="Enter amount"
            value={customAmount}
            onChange={(e) => {
              setCustomAmount(e.target.value);
              setSelectedAmount(null);
            }}
            className="pl-10"
          />
        </div>
      </div>

      {/* Summary */}
      {currentAmount && currentAmount > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-lg bg-orange-500/5 border border-orange-500/20"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-zinc-400">
                {donationType === "monthly"
                  ? "Monthly Donation"
                  : "One-Time Donation"}
              </p>
              <p className="text-2xl font-bold text-white font-display mt-1">
                {formatCurrency(currentAmount)}
              </p>
            </div>
            <Badge variant="success">
              {donationType === "monthly" ? "Recurring" : "Single Gift"}
            </Badge>
          </div>
        </motion.div>
      )}

      {/* Payment Methods */}
      <div className="space-y-2 sm:space-y-3">
        <label className="text-xs sm:text-sm font-medium text-zinc-300 block">
          Payment Method
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
          {[
            { name: "Paystack", desc: "Cards, Bank, USSD" },
            { name: "PayPal", desc: "International" },
            { name: "Stripe", desc: "Cards, Apple Pay" },
          ].map((method) => (
            <button
              key={method.name}
              className="p-4 rounded-lg bg-zinc-800/30 border border-zinc-700/50 hover:border-orange-500/30 transition-all text-left group"
            >
              <div className="flex items-center gap-3">
                <CreditCard className="w-5 h-5 text-orange-400" />
                <div>
                  <p className="text-sm font-semibold text-white group-hover:text-orange-400 transition-colors">
                    {method.name}
                  </p>
                  <p className="text-xs text-zinc-500">{method.desc}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* CTA */}
      <Button size="xl" className="w-full">
        Donate {currentAmount && currentAmount > 0 && formatCurrency(currentAmount)}
        <ArrowRight className="w-4 h-4" />
      </Button>

      <p className="text-xs text-zinc-500 text-center">
        All donations are securely processed. You will receive a receipt via
        email.
      </p>
    </div>
  );
}

// 
// SCRIPTURE BANNER
// 

function ScriptureBanner() {
  return (
    <section className="section-padding bg-linear-to-br from-orange-600 via-orange-500 to-orange-700 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
      </div>
      <div className="container-wide relative z-10 text-center">
        <motion.div {...fadeInUp}>
          <p className="text-xl sm:text-xl md:text-2xl lg:text-3xl font-display font-bold text-white leading-relaxed max-w-3xl mx-auto">
            &ldquo;Give, and it will be given to you. A good measure, pressed
            down, shaken together and running over, will be poured into your
            lap.&rdquo;
          </p>
          <p className="text-orange-100/70 mt-4 font-medium"> Luke 6:38</p>
        </motion.div>
      </div>
    </section>
  );
}

// 
// PAGE
// 

export default function DonatePage() {
  return (
    <>
      <DonateHero />
      <div className="divider-gradient" />
      <ImpactSection />
      <div className="divider-gradient" />

      {/* Donation Form Section */}
      <section className="section-padding bg-zinc-900/30">
        <div className="absolute inset-0 bg-radial-dark pointer-events-none" />
        <div className="container-wide relative z-10">
          <motion.div {...fadeInUp}>
            <SectionHeading
              label="Give"
              title="Make a Donation"
              description="Choose your donation amount and preferred payment method."
            />
          </motion.div>

          <div className="mt-8 sm:mt-12 grid grid-cols-1 lg:grid-cols-5 gap-8 sm:gap-10 max-w-5xl mx-auto">
            <motion.div {...fadeInUp} className="lg:col-span-3">
              <Card>
                <CardContent className="p-4 sm:p-6 md:p-10">
                  <DonationForm />
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-2 space-y-4 sm:space-y-6 hidden lg:block"
            >
              <div className="relative aspect-3/4 rounded-xl sm:rounded-2xl overflow-hidden border border-zinc-800/50">
                <ProtectedImage
                  src="/images/man-5.jpg"
                  alt="Support the Vision"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-zinc-950/70 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-white font-display text-xl font-bold mb-2">
                    Your Gift Matters
                  </p>
                  <p className="text-zinc-300 text-sm">
                    Every contribution fuels the formation of men and the expansion
                    of purpose across nations.
                  </p>
                </div>
              </div>
              <div className="relative aspect-video rounded-xl sm:rounded-2xl overflow-hidden border border-zinc-800/50">
                <ProtectedImage
                  src="/images/hero-alt.jpg"
                  alt="Integrity Man Network"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-zinc-950/50 to-transparent" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="divider-gradient" />
      <ScriptureBanner />
    </>
  );
}
