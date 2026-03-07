"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, ArrowRight, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 relative overflow-hidden py-20 px-4">
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute inset-0 bg-radial-dark" />

      <div className="absolute top-1/4 -left-32 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3 group mb-6">
            <Image
              src="/images/Integrity Man Official Logo.png"
              alt="Integrity Man Network"
              width={48}
              height={48}
              className="w-12 h-12 object-contain group-hover:scale-105 transition-transform"
              priority
            />
            <span className="font-display text-lg font-bold text-white group-hover:text-orange-500 transition-colors">
              TIMN
            </span>
          </Link>
          <h1 className="text-2xl font-bold text-white font-display">
            {submitted ? "Check Your Email" : "Reset Password"}
          </h1>
          <p className="text-sm text-zinc-400 mt-2">
            {submitted
              ? "We've sent you a password reset link"
              : "Enter your email and we'll send you a reset link"}
          </p>
        </div>

        <Card className="bg-zinc-900/50 backdrop-blur-sm">
          <CardContent className="p-6 md:p-8">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-4"
              >
                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mx-auto mb-6">
                  <Mail className="w-7 h-7 text-orange-500" />
                </div>
                <p className="text-sm text-zinc-400 mb-6">
                  If an account exists with that email address, you&apos;ll
                  receive a password reset link shortly.
                </p>
                <Button
                  variant="outline"
                  onClick={() => setSubmitted(false)}
                  className="w-full"
                >
                  Try another email
                </Button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-zinc-300"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Reset Link
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>

        <p className="text-center mt-6">
          <Link
            href="/auth/login"
            className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-orange-500 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Sign In
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
