"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Shield,
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const passwordRequirements = [
    { label: "At least 8 characters", met: password.length >= 8 },
    { label: "One uppercase letter", met: /[A-Z]/.test(password) },
    { label: "One number", met: /[0-9]/.test(password) },
  ];

  const handleGoogleSignUp = async () => {
    setIsGoogleLoading(true);
    setError("");
    try {
      await signIn("google", { callbackUrl: "/dashboard" });
    } catch {
      setError("Google sign-up failed. Please try again.");
      setIsGoogleLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;
    const pwd = formData.get("password") as string;

    try {
      // 1. Register the user
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, email, password: pwd }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Registration failed. Please try again.");
        setIsLoading(false);
        return;
      }

      // 2. Auto sign-in after successful registration
      const signInResult = await signIn("credentials", {
        email,
        password: pwd,
        redirect: false,
      });

      if (signInResult?.error) {
        // Registration succeeded but auto-login failed — redirect to login
        router.push("/auth/login?registered=true");
      } else {
        router.push("/dashboard");
      }
    } catch {
      setError("Something went wrong. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-zinc-950 relative overflow-hidden py-20 px-4">
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
            <div className="w-10 h-10 rounded-lg bg-linear-to-br from-orange-500 to-orange-600 flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="font-display text-lg font-bold text-zinc-900 dark:text-white group-hover:text-orange-500 dark:group-hover:text-orange-400 transition-colors">
              TIMN
            </span>
          </Link>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white font-display">
            Create Your Account
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2">
            Join the community and begin your journey
          </p>
        </div>

        <Card className="bg-zinc-50 dark:bg-zinc-900/50 backdrop-blur-sm">
          <CardContent className="p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Google Sign Up */}
              <button
                type="button"
                onClick={handleGoogleSignUp}
                disabled={isGoogleLoading}
                className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-lg bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/50 text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-600 transition-all disabled:opacity-50"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                {isGoogleLoading ? "Connecting..." : "Continue with Google"}
              </button>

              {/* Error Message */}
              {error && (
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-sm text-red-400">
                  {error}
                </div>
              )}

              <div className="flex items-center gap-4">
                <div className="flex-1 h-px bg-zinc-200 dark:bg-zinc-800" />
                <span className="text-xs text-zinc-500 uppercase">
                  or register with email
                </span>
                <div className="flex-1 h-px bg-zinc-200 dark:bg-zinc-800" />
              </div>

              {/* Name */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label
                    htmlFor="firstName"
                    className="text-sm font-medium text-zinc-600 dark:text-zinc-300"
                  >
                    First Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    <Input
                      id="firstName"
                      name="firstName"
                      placeholder="John"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="lastName"
                    className="text-sm font-medium text-zinc-600 dark:text-zinc-300"
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

              {/* Email */}
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-zinc-600 dark:text-zinc-300"
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

              {/* Password */}
              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-zinc-600 dark:text-zinc-300"
                >
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder=""
                    className="pl-10 pr-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* Password Requirements */}
                {password.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="space-y-1.5 pt-2"
                  >
                    {passwordRequirements.map((req) => (
                      <div
                        key={req.label}
                        className="flex items-center gap-2 text-xs"
                      >
                        <CheckCircle2
                          className={`w-3.5 h-3.5 ${
                            req.met ? "text-green-400" : "text-zinc-400 dark:text-zinc-600"
                          }`}
                        />
                        <span
                          className={
                            req.met ? "text-green-400" : "text-zinc-500"
                          }
                        >
                          {req.label}
                        </span>
                      </div>
                    ))}
                  </motion.div>
                )}
              </div>

              {/* Terms */}
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="terms"
                  required
                  className="mt-1 w-4 h-4 rounded border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 text-orange-500 focus:ring-orange-500"
                />
                <label
                  htmlFor="terms"
                  className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed"
                >
                  I agree to the{" "}
                  <Link
                    href="/terms"
                    className="text-orange-500 dark:text-orange-400 hover:underline"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy"
                    className="text-orange-500 dark:text-orange-400 hover:underline"
                  >
                    Privacy Policy
                  </Link>
                </label>
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
                    Creating account...
                  </>
                ) : (
                  <>
                    Create Account
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <p className="text-center text-sm text-zinc-500 mt-6">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="text-orange-500 dark:text-orange-400 hover:text-orange-600 dark:hover:text-orange-300 font-medium transition-colors"
          >
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
