"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ProtectedImage } from "@/components/ui/video-player";
import {
  Mail,
  MapPin,
  Phone,
  Send,
  MessageSquare,
  ChevronDown,
  Instagram,
  Youtube,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { SITE } from "@/lib/constants";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
};

// 
// HERO
// 

function ContactHero() {
  return (
    <section className="relative hero-padding overflow-hidden">
      <div className="absolute inset-0 bg-zinc-950" />
      {/* Background image */}
      <div className="absolute inset-0">
        <ProtectedImage
          src="/images/community-1.jpg"
          alt="Integrity Man Community"
          fill
          className="object-cover opacity-15"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-b from-zinc-950/50 via-zinc-950/80 to-zinc-950" />
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
            <MessageSquare className="w-3.5 h-3.5 text-orange-400" />
            <span className="text-[10px] sm:text-xs font-semibold tracking-wider uppercase text-orange-400">
              Get In Touch
            </span>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-white leading-[0.95] mb-4 sm:mb-6">
            Contact{" "}
            <span className="text-gradient">Us</span>
          </h1>

          <p className="text-sm sm:text-lg md:text-xl text-zinc-400 leading-relaxed max-w-2xl mx-auto">
            Have questions about The Integrity Man Network? Want to partner
            with us, attend an event, or simply connect? We&apos;d love to hear
            from you.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// 
// CONTACT FORM
// 

function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call  will be replaced with real endpoint
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-16"
      >
        <div className="w-20 h-20 rounded-full bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mx-auto mb-6">
          <Send className="w-8 h-8 text-orange-400" />
        </div>
        <h3 className="text-2xl font-bold text-white font-display mb-3">
          Message Sent!
        </h3>
        <p className="text-zinc-400 max-w-sm mx-auto">
          Thank you for reaching out. We&apos;ll get back to you as soon as
          possible.
        </p>
        <Button
          className="mt-8"
          variant="outline"
          onClick={() => setSubmitted(false)}
        >
          Send Another Message
        </Button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <div className="space-y-1.5 sm:space-y-2">
          <label
            htmlFor="firstName"
            className="text-xs sm:text-sm font-medium text-zinc-300"
          >
            First Name
          </label>
          <Input
            id="firstName"
            name="firstName"
            placeholder="John"
            required
          />
        </div>
        <div className="space-y-1.5 sm:space-y-2">
          <label
            htmlFor="lastName"
            className="text-xs sm:text-sm font-medium text-zinc-300"
          >
            Last Name
          </label>
          <Input
            id="lastName"
            name="lastName"
            placeholder="Doe"
            required
          />
        </div>
      </div>

      <div className="space-y-1.5 sm:space-y-2">
        <label htmlFor="email" className="text-xs sm:text-sm font-medium text-zinc-300">
          Email Address
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="john@example.com"
          required
        />
      </div>

      <div className="space-y-1.5 sm:space-y-2">
        <label htmlFor="subject" className="text-xs sm:text-sm font-medium text-zinc-300">
          Subject
        </label>
        <Input
          id="subject"
          name="subject"
          placeholder="How can we help?"
          required
        />
      </div>

      <div className="space-y-1.5 sm:space-y-2">
        <label
          htmlFor="message"
          className="text-xs sm:text-sm font-medium text-zinc-300"
        >
          Message
        </label>
        <Textarea
          id="message"
          name="message"
          placeholder="Tell us what's on your mind..."
          rows={6}
          required
        />
      </div>

      <Button
        type="submit"
        size="lg"
        className="w-full sm:w-auto"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
            Sending...
          </>
        ) : (
          <>
            Send Message
            <Send className="w-4 h-4" />
          </>
        )}
      </Button>
    </form>
  );
}

// 
// CONTACT INFO CARDS
// 

const contactDetails = [
  {
    icon: Mail,
    title: "Email Us",
    value: "contact@theintegrityman.com",
    href: "mailto:contact@theintegrityman.com",
  },
  {
    icon: Phone,
    title: "Call Us",
    value: "+234 800 000 0000",
    href: "tel:+2348000000000",
  },
  {
    icon: MapPin,
    title: "Visit Us",
    value: "Lagos, Nigeria",
    href: null,
  },
];

const socialLinks = [
  { icon: Instagram, label: "Instagram", href: "#" },
  { icon: Youtube, label: "YouTube", href: "#" },
];

function ContactInfo() {
  return (
    <div className="space-y-4 sm:space-y-6">
      {contactDetails.map((detail) => (
        <Card key={detail.title}>
          <CardContent className="p-4 sm:p-6 flex items-start gap-3 sm:gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-linear-to-br from-orange-500/20 to-orange-600/10 border border-orange-500/20 flex items-center justify-center shrink-0">
              <detail.icon className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white mb-1">
                {detail.title}
              </h3>
              {detail.href ? (
                <a
                  href={detail.href}
                  className="text-zinc-400 hover:text-orange-400 transition-colors text-sm"
                >
                  {detail.value}
                </a>
              ) : (
                <p className="text-zinc-400 text-sm">{detail.value}</p>
              )}
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Socials */}
      <Card>
        <CardContent className="p-4 sm:p-6">
          <h3 className="text-xs sm:text-sm font-semibold text-white mb-3 sm:mb-4">Follow Us</h3>
          <div className="flex gap-2 sm:gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="w-10 h-10 rounded-lg bg-zinc-800/50 border border-zinc-700/50 flex items-center justify-center text-zinc-400 hover:text-orange-400 hover:border-orange-500/30 transition-all"
              >
                <social.icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// 
// FAQ SECTION
// 

const faqs = [
  {
    question: "Who can join The Integrity Man Network?",
    answer:
      "The network is open to every man who desires purposeful living, character growth, and alignment with God's eternal purpose. Whether you are a student, professional, leader, or simply seeking direction, there is a place for you.",
  },
  {
    question: "Is this a denomination or a church?",
    answer:
      "No. The Integrity Man Network is not a church or denomination. It is a faith-based community and movement focused on men's formation, leadership, and purposeful living. Members are encouraged to remain rooted in their local churches.",
  },
  {
    question: "How do I attend an event?",
    answer:
      "You can register for upcoming events through our Events page. We also send notifications to our members via email and social media. Join the network to stay updated.",
  },
  {
    question: "Can I partner or donate?",
    answer:
      "Yes! We welcome partnerships and donations. Visit our Donate page or contact us directly to discuss partnership opportunities and how you can support the vision.",
  },
  {
    question: "Where is The Integrity Man Network located?",
    answer:
      "We are currently based in Lagos, Nigeria, but our vision is global. Through our online platforms, events, and expanding chapters, we are reaching men across nations.",
  },
];

function FAQItem({
  faq,
  isOpen,
  onToggle,
}: {
  faq: (typeof faqs)[number];
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-zinc-800/50 last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-5 text-left group"
      >
        <span className="text-sm font-medium text-white group-hover:text-orange-400 transition-colors pr-4">
          {faq.question}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-zinc-500 shrink-0 transition-transform duration-300 ${
            isOpen ? "rotate-180 text-orange-400" : ""
          }`}
        />
      </button>
      <motion.div
        initial={false}
        animate={{
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden"
      >
        <p className="pb-5 text-sm text-zinc-400 leading-relaxed">
          {faq.answer}
        </p>
      </motion.div>
    </div>
  );
}

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="section-padding bg-zinc-900/30">
      <div className="absolute inset-0 bg-radial-dark pointer-events-none" />
      <div className="container-wide relative z-10">
        <motion.div {...fadeInUp}>
          <SectionHeading
            label="FAQ"
            title="Frequently Asked Questions"
            description="Quick answers to common questions about The Integrity Man Network."
          />
        </motion.div>

        <motion.div {...fadeInUp} className="mt-8 sm:mt-12 max-w-3xl mx-auto">
          <Card>
            <CardContent className="p-4 sm:p-6 md:p-8">
              {faqs.map((faq, index) => (
                <FAQItem
                  key={index}
                  faq={faq}
                  isOpen={openIndex === index}
                  onToggle={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                />
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}

// 
// PAGE
// 

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <div className="divider-gradient" />

      {/* Contact Form + Info Grid */}
      <section className="section-padding">
        <div className="container-wide">
          <motion.div {...fadeInUp}>
            <SectionHeading
              label="Reach Out"
              title="Send Us a Message"
              description="Fill out the form below and our team will respond within 2448 hours."
            />
          </motion.div>

          <div className="mt-8 sm:mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-12">
            <div className="lg:col-span-2">
              <motion.div {...fadeInUp}>
                <Card>
                  <CardContent className="p-4 sm:p-6 md:p-10">
                    <ContactForm />
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            <div>
              <motion.div {...fadeInUp}>
                <ContactInfo />
              </motion.div>

              {/* Contact image */}
              <motion.div {...fadeInUp} className="mt-4 sm:mt-6 hidden lg:block">
                <div className="relative aspect-4/3 rounded-xl sm:rounded-2xl overflow-hidden border border-zinc-800/50">
                  <ProtectedImage
                    src="/images/community-2.jpg"
                    alt="Our Community"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-zinc-950/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-white text-sm font-semibold">We&apos;d love to connect with you</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <div className="divider-gradient" />
      <FAQSection />
    </>
  );
}
