"use client";

import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  User,
  ArrowLeft,
  Share2,
  BookOpen,
  Tag,
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function BlogPostPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-40 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-zinc-950" />
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="absolute inset-0 bg-radial-dark" />

        <div className="container-wide relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-3xl mx-auto">
            <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-orange-500 transition-colors mb-8">
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>

            <div className="flex items-center gap-3 mb-6">
              <Badge>Purpose</Badge>
              <span className="text-xs text-zinc-500">8 min read</span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight mb-6">
              Understanding Eternal Purpose: Why You Were Created
            </h1>

            <div className="flex items-center gap-6 text-sm text-zinc-500">
              <span className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
                  <User className="w-3.5 h-3.5 text-orange-500" />
                </div>
                TIMN Editorial
              </span>
              <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />Mar 1, 2025</span>
              <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />8 min read</span>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="divider-gradient" />

      {/* Article Body */}
      <section className="section-padding">
        <div className="container-wide">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="max-w-3xl mx-auto">
            <article className="prose prose-zinc prose-invert prose-orange max-w-none">
              <div className="space-y-6 text-zinc-300 leading-relaxed text-[17px]">
                <p className="text-xl text-zinc-200 leading-relaxed font-medium">
                  Every man was created with divine intention. Understanding your eternal purpose is the first step toward a life of integrity, alignment, and true fulfilment.
                </p>

                <p>
                  In a world consumed by the pursuit of wealth, status, and comfort, men often lose sight of the fundamental question: &ldquo;Why do I exist?&rdquo; The answer to this question is not found in cultural narratives or self-help strategies  it is found in the eternal purpose of God.
                </p>

                <h2 className="text-2xl font-bold text-white font-display mt-12 mb-4">What is Eternal Purpose?</h2>

                <p>
                  Eternal Purpose refers to God&apos;s original intent and blueprint for creation  the reason behind existence, the framework for living, and the destination of all things. It is not a concept reserved for theologians; it is the operating system of purposeful living.
                </p>

                <p>
                  When a man understands eternal purpose, his definition of success shifts. Wealth becomes stewardship. Work becomes worship. Influence becomes responsibility. And integrity becomes non-negotiable.
                </p>

                <blockquote className="border-l-2 border-orange-500/50 pl-6 italic text-orange-500/80 font-medium text-lg my-8">
                  &ldquo;But seek first the kingdom of God and his righteousness, and all these things will be added to you.&rdquo;  Matthew 6:33
                </blockquote>

                <h2 className="text-2xl font-bold text-white font-display mt-12 mb-4">The Crisis of Misalignment</h2>

                <p>
                  Many men are productive yet unfulfilled. They achieve targets but lack meaning. They accumulate wealth but lose their families. This is the crisis of misalignment  when a man moves fast in the wrong direction, thinking motion equals progress.
                </p>

                <p>
                  The Integrity Man Network exists because we believe there is a better way. A way that begins not with strategy but with surrender. Not with ambition but with alignment.
                </p>

                <h2 className="text-2xl font-bold text-white font-display mt-12 mb-4">How The Network Helps</h2>

                <p>
                  Through the School of Integrity, Integrity Houses, events, and community platforms, we create environments where men can discover, develop, and deploy their God-given purpose. Every initiative is designed to move men from confusion to clarity, from compromise to conviction.
                </p>

                <p>
                  This is not about religion. It is about restoration  restoring men to the original design of their Creator.
                </p>

                <div className="mt-12 p-6 rounded-xl bg-orange-500/5 border border-orange-500/20">
                  <p className="text-sm text-zinc-400">
                    <strong className="text-white">Ready to begin your journey?</strong>{" "}
                    Join The Integrity Man Network and connect with a community of men pursuing purpose with integrity.
                  </p>
                  <div className="mt-4">
                    <Link href="/join"><Button size="lg">Join The Network</Button></Link>
                  </div>
                </div>
              </div>
            </article>

            {/* Share / Tags */}
            <div className="mt-12 pt-8 border-t border-zinc-800/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-zinc-500" />
                <div className="flex gap-2">
                  <Badge variant="outline" className="text-xs">Purpose</Badge>
                  <Badge variant="outline" className="text-xs">Faith</Badge>
                  <Badge variant="outline" className="text-xs">Identity</Badge>
                </div>
              </div>
              <Button variant="outline" size="sm"><Share2 className="w-4 h-4" />Share Article</Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}