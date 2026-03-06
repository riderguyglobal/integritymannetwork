"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ShoppingBag,
  Star,
  Minus,
  Plus,
  ShoppingCart,
  Heart,
  ArrowLeft,
  Truck,
  Shield,
  RotateCcw,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";

// Placeholder product  will be replaced with dynamic fetching
const PRODUCT = {
  slug: "integrity-journal",
  name: "The Integrity Journal",
  description:
    "A premium guided journal designed for men pursuing purpose. 90-day structured reflections with scripture, prompts, and accountability tracking.",
  longDescription: `
    The Integrity Journal is more than a notebook  it is a 90-day guided journey toward deeper clarity, stronger conviction, and purposeful living.

    Designed specifically for men within The Integrity Man Network community, each page includes:
    - Daily scripture meditation prompts
    - Reflection questions on purpose and integrity
    - Weekly accountability checkpoints
    - Goal-setting frameworks aligned with Kingdom principles
    - Space for personal prayer notes and revelations

    Premium quality: Hardcover binding, 160gsm paper, ribbon bookmark, and lay-flat design. The perfect companion for your formation journey.
  `,
  price: 15000,
  comparePrice: null,
  category: "Books & Journals",
  rating: 4.8,
  reviews: 24,
  isNew: true,
  inStock: true,
  images: [],
  features: [
    "90-day structured format",
    "Daily scripture prompts",
    "Accountability checkpoints",
    "Premium hardcover binding",
    "160gsm quality paper",
    "Lay-flat design",
  ],
};

const SHIPPING_INFO = [
  { icon: Truck, text: "Free shipping over 50,000" },
  { icon: Shield, text: "Secure payment processing" },
  { icon: RotateCcw, text: "30-day return policy" },
];

export default function ProductPage() {
  const [quantity, setQuantity] = useState(1);
  const product = PRODUCT;

  return (
    <>
      <section className="relative pt-32 pb-4 overflow-hidden">
        <div className="absolute inset-0 bg-white dark:bg-zinc-950" />
        <div className="absolute inset-0 bg-grid opacity-10" />
        <div className="container-wide relative z-10">
          <Link
            href="/store"
            className="inline-flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400 hover:text-orange-500 dark:hover:text-orange-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Store
          </Link>
        </div>
      </section>

      <section className="section-padding pt-8">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image Gallery */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="aspect-square bg-zinc-100 dark:bg-zinc-800/50 rounded-2xl border border-zinc-200 dark:border-zinc-800/50 flex items-center justify-center relative overflow-hidden">
                <ShoppingBag className="w-16 h-16 text-zinc-300 dark:text-zinc-700" />

                {product.isNew && (
                  <div className="absolute top-4 left-4">
                    <Badge>New</Badge>
                  </div>
                )}
              </div>

              {/* Thumbnail Gallery Placeholder */}
              <div className="flex gap-3 mt-4">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className={`w-20 h-20 rounded-lg border flex items-center justify-center cursor-pointer transition-all ${
                      i === 1
                        ? "border-orange-500/50 bg-zinc-100 dark:bg-zinc-800/50"
                        : "border-zinc-200 dark:border-zinc-800/50 bg-zinc-50 dark:bg-zinc-900/30 hover:border-zinc-300 dark:hover:border-zinc-700"
                    }`}
                  >
                    <ShoppingBag className="w-5 h-5 text-zinc-300 dark:text-zinc-700" />
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Product Details */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="space-y-6"
            >
              <div>
                <p className="text-xs text-zinc-500 uppercase tracking-wider mb-2">
                  {product.category}
                </p>
                <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white font-display mb-4">
                  {product.name}
                </h1>

                {/* Rating */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating)
                            ? "text-orange-500 dark:text-orange-400 fill-orange-500 dark:fill-orange-400"
                            : "text-zinc-300 dark:text-zinc-700"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-zinc-500 dark:text-zinc-400">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-bold text-zinc-900 dark:text-white">
                    {formatCurrency(product.price)}
                  </span>
                  {product.comparePrice && (
                    <span className="text-lg text-zinc-500 line-through">
                      {formatCurrency(product.comparePrice)}
                    </span>
                  )}
                </div>
              </div>

              {/* Description */}
              <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed">
                {product.description}
              </p>

              {/* Features */}
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">Features</h3>
                <div className="grid grid-cols-2 gap-2">
                  {product.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-orange-500 dark:text-orange-400 shrink-0" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>

              {/* Quantity + Add to Cart */}
              <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800/50 space-y-4">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium text-zinc-600 dark:text-zinc-300">
                    Quantity
                  </span>
                  <div className="flex items-center border border-zinc-200 dark:border-zinc-700/50 rounded-lg overflow-hidden">
                    <button
                      onClick={() =>
                        setQuantity(Math.max(1, quantity - 1))
                      }
                      className="p-3 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-zinc-500 dark:text-zinc-400"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-12 text-center text-zinc-900 dark:text-white font-medium text-sm">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-3 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-zinc-500 dark:text-zinc-400"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button size="xl" className="flex-1">
                    <ShoppingCart className="w-5 h-5" />
                    Add to Cart
                  </Button>
                  <Button
                    size="xl"
                    variant="outline"
                    className="px-4"
                  >
                    <Heart className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              {/* Shipping Info */}
              <div className="space-y-3 pt-4 border-t border-zinc-200 dark:border-zinc-800/50">
                {SHIPPING_INFO.map((info) => (
                  <div
                    key={info.text}
                    className="flex items-center gap-3 text-sm text-zinc-500 dark:text-zinc-400"
                  >
                    <info.icon className="w-4 h-4 text-orange-500 dark:text-orange-400" />
                    {info.text}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
