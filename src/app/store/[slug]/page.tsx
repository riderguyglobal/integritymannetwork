"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ShoppingBag,
  Star,
  Minus,
  Plus,
  ShoppingCart,
  ArrowLeft,
  Truck,
  Shield,
  RotateCcw,
  CheckCircle2,
  Package,
  ChevronRight,
  Share2,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, cn } from "@/lib/utils";
import { useCartStore } from "@/stores";

// Placeholder product — will be replaced with dynamic fetching
const PRODUCT = {
  slug: "integrity-journal",
  name: "The Integrity Journal",
  description:
    "A premium guided journal designed for men pursuing purpose. 90-day structured reflections with scripture, prompts, and accountability tracking.",
  longDescription: [
    "The Integrity Journal is more than a notebook — it is a 90-day guided journey toward deeper clarity, stronger conviction, and purposeful living.",
    "Designed specifically for men within The Integrity Man Network community, each page includes daily scripture meditation prompts, reflection questions on purpose and integrity, weekly accountability checkpoints, and goal-setting frameworks aligned with Kingdom principles.",
    "Premium quality: Hardcover binding, 160gsm paper, ribbon bookmark, and lay-flat design. The perfect companion for your formation journey.",
  ],
  price: 120,
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
  specs: [
    { label: "Format", value: "Hardcover" },
    { label: "Pages", value: "192" },
    { label: "Dimensions", value: "21 × 14.8 cm (A5)" },
    { label: "Paper Weight", value: "160 gsm" },
    { label: "Binding", value: "Thread-sewn, lay-flat" },
  ],
};

const RELATED_PRODUCTS = [
  { slug: "purpose-driven-man-book", name: "The Purpose-Driven Man", price: 70, comparePrice: 95, category: "Books & Journals", rating: 4.9, reviews: 56 },
  { slug: "integrity-mug", name: "Integrity Ceramic Mug", price: 40, comparePrice: null, category: "Accessories", rating: 4.5, reviews: 12 },
  { slug: "timn-tshirt-orange", name: "TIMN Statement Tee — Orange", price: 95, comparePrice: null, category: "Apparel", rating: 4.6, reviews: 32 },
];

const SHIPPING_INFO = [
  { icon: Truck, title: "Free Shipping", desc: "On orders over GH₵500" },
  { icon: Shield, title: "Secure Payment", desc: "256-bit SSL encrypted" },
  { icon: RotateCcw, title: "30-Day Returns", desc: "Hassle-free returns" },
  { icon: Package, title: "Quality Guaranteed", desc: "Premium materials" },
];

export default function ProductPage() {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"description" | "specs">("description");
  const [selectedThumb, setSelectedThumb] = useState(0);
  const product = PRODUCT;
  const { addItem, openCart } = useCartStore();

  const discount = product.comparePrice
    ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)
    : null;

  const handleAddToCart = () => {
    addItem({
      id: product.slug,
      name: product.name,
      slug: product.slug,
      price: product.price,
      salePrice: product.comparePrice ? product.price : undefined,
    }, quantity);
    openCart();
  };

  return (
    <>
      {/* ── Breadcrumb ── */}
      <section className="relative pt-28 sm:pt-32 pb-0 overflow-hidden">
        <div className="absolute inset-0 bg-zinc-950" />
        <div className="container-wide relative z-10">
          <nav className="flex items-center gap-1.5 text-xs text-zinc-500">
            <Link href="/store" className="hover:text-orange-500 transition-colors flex items-center gap-1">
              <ArrowLeft className="w-3 h-3" />
              Store
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-zinc-600">{product.category}</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-zinc-400">{product.name}</span>
          </nav>
        </div>
      </section>

      {/* ── Product Main ── */}
      <section className="py-6 sm:py-10 md:py-14">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* ── Image Gallery ── */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-6"
            >
              <div className="sticky top-28 space-y-3">
                {/* Main image */}
                <div className="aspect-square rounded-2xl bg-zinc-800/30 border border-zinc-800/50 flex items-center justify-center relative overflow-hidden">
                  <ShoppingBag className="w-20 h-20 text-zinc-700/40" />

                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-1.5">
                    {product.isNew && (
                      <span className="text-[9px] font-bold uppercase tracking-wider bg-white text-zinc-900 px-2.5 py-1 rounded shadow-lg">
                        New
                      </span>
                    )}
                    {discount && (
                      <span className="text-[9px] font-bold bg-emerald-500 text-white px-2.5 py-1 rounded shadow-lg">
                        -{discount}% OFF
                      </span>
                    )}
                  </div>

                  {/* Share button */}
                  <button className="absolute top-4 right-4 w-9 h-9 rounded-full bg-zinc-900/60 border border-zinc-700/40 backdrop-blur-sm flex items-center justify-center text-zinc-400 hover:text-white hover:border-zinc-600 transition-all">
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Thumbnails */}
                <div className="flex gap-2">
                  {[0, 1, 2, 3].map((i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedThumb(i)}
                      className={cn(
                        "w-16 h-16 sm:w-20 sm:h-20 rounded-xl border flex items-center justify-center transition-all",
                        selectedThumb === i
                          ? "border-orange-500/50 bg-zinc-800/50 ring-1 ring-orange-500/20"
                          : "border-zinc-800/40 bg-zinc-900/30 hover:border-zinc-700"
                      )}
                    >
                      <ShoppingBag className="w-4 h-4 text-zinc-700" />
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* ── Product Details ── */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-6 space-y-5 sm:space-y-6"
            >
              {/* Category */}
              <div>
                <p className="text-[10px] sm:text-xs text-zinc-500 uppercase tracking-wider mb-2">
                  {product.category}
                </p>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white font-display leading-tight mb-3 sm:mb-4">
                  {product.name}
                </h1>

                {/* Rating row */}
                <div className="flex items-center gap-4 flex-wrap">
                  <div className="flex items-center gap-1.5">
                    <div className="flex items-center">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            "w-4 h-4",
                            i < Math.floor(product.rating)
                              ? "text-orange-500 fill-orange-500"
                              : "text-zinc-700"
                          )}
                        />
                      ))}
                    </div>
                    <span className="text-sm font-medium text-white">
                      {product.rating}
                    </span>
                    <span className="text-xs text-zinc-500">
                      ({product.reviews} reviews)
                    </span>
                  </div>
                  {product.inStock && (
                    <Badge variant="success" className="text-[10px]">
                      <CheckCircle2 className="w-3 h-3 mr-1" />
                      In Stock
                    </Badge>
                  )}
                </div>
              </div>

              {/* Price block */}
              <div className="p-4 sm:p-5 rounded-xl bg-zinc-900/60 border border-zinc-800/50">
                <div className="flex items-baseline gap-3 mb-1">
                  <span className="text-3xl sm:text-4xl font-bold text-white font-display">
                    {formatCurrency(product.price)}
                  </span>
                  {product.comparePrice && (
                    <>
                      <span className="text-base text-zinc-600 line-through">
                        {formatCurrency(product.comparePrice)}
                      </span>
                      <Badge variant="success" className="text-[10px]">
                        Save {discount}%
                      </Badge>
                    </>
                  )}
                </div>
                {product.price >= 500 && (
                  <p className="text-xs text-emerald-400/80 flex items-center gap-1.5 mt-1">
                    <Truck className="w-3.5 h-3.5" />
                    Eligible for free shipping
                  </p>
                )}
              </div>

              {/* Description */}
              <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
                {product.description}
              </p>

              {/* Features */}
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider mb-3">
                  Key Features
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {product.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center gap-2.5 text-sm text-zinc-400 p-2 rounded-lg hover:bg-zinc-800/20 transition-colors"
                    >
                      <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quantity + Add to Cart */}
              <div className="pt-5 border-t border-zinc-800/50 space-y-4">
                <div className="flex items-center gap-5">
                  <span className="text-sm font-medium text-zinc-300">
                    Quantity
                  </span>
                  <div className="flex items-center border border-zinc-700/50 rounded-xl overflow-hidden bg-zinc-900/40">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-11 h-11 flex items-center justify-center hover:bg-zinc-800 transition-colors text-zinc-400 hover:text-white"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-12 text-center text-white font-bold text-sm border-x border-zinc-800/50">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-11 h-11 flex items-center justify-center hover:bg-zinc-800 transition-colors text-zinc-400 hover:text-white"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button size="xl" className="flex-1 group" onClick={handleAddToCart}>
                    <ShoppingCart className="w-5 h-5" />
                    Add to Cart — {formatCurrency(product.price * quantity)}
                  </Button>
                </div>

                <Button size="lg" variant="secondary" className="w-full">
                  <Zap className="w-4 h-4 text-orange-500" />
                  Buy Now
                </Button>
              </div>

              {/* Shipping guarantees */}
              <div className="grid grid-cols-2 gap-3 pt-5 border-t border-zinc-800/50">
                {SHIPPING_INFO.map((info) => (
                  <div
                    key={info.title}
                    className="flex items-start gap-2.5 p-3 rounded-xl bg-zinc-900/30 border border-zinc-800/30"
                  >
                    <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center shrink-0">
                      <info.icon className="w-3.5 h-3.5 text-orange-500" />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-white leading-tight">
                        {info.title}
                      </p>
                      <p className="text-[10px] text-zinc-500">{info.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ── Tabs: Description / Specs ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-14 sm:mt-20 max-w-4xl"
          >
            {/* Tab headers */}
            <div className="flex gap-1 border-b border-zinc-800/60 mb-6 sm:mb-8">
              {(["description", "specs"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    "px-5 py-3 text-sm font-semibold transition-all relative",
                    activeTab === tab
                      ? "text-orange-500"
                      : "text-zinc-500 hover:text-zinc-300"
                  )}
                >
                  {tab === "description" ? "Description" : "Specifications"}
                  {activeTab === tab && (
                    <motion.div
                      layoutId="product-tab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Tab content */}
            {activeTab === "description" && (
              <div className="space-y-4">
                {product.longDescription.map((paragraph, i) => (
                  <p key={i} className="text-sm sm:text-base text-zinc-400 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            )}

            {activeTab === "specs" && (
              <div className="rounded-xl border border-zinc-800/50 overflow-hidden">
                {product.specs.map((spec, i) => (
                  <div
                    key={spec.label}
                    className={cn(
                      "flex items-center justify-between px-5 py-3.5 text-sm",
                      i % 2 === 0 ? "bg-zinc-900/30" : "bg-transparent"
                    )}
                  >
                    <span className="text-zinc-500 font-medium">{spec.label}</span>
                    <span className="text-white">{spec.value}</span>
                  </div>
                ))}
              </div>
            )}
          </motion.div>

          {/* ── Related Products ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-14 sm:mt-20"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg sm:text-xl font-bold text-white font-display">
                You May Also Like
              </h2>
              <Link
                href="/store"
                className="text-xs font-medium text-orange-500 hover:text-orange-400 transition-colors flex items-center gap-1"
              >
                View All
                <ChevronRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
              {RELATED_PRODUCTS.map((item) => (
                <Link
                  key={item.slug}
                  href={`/store/${item.slug}`}
                  className="group rounded-2xl border border-zinc-800/60 bg-zinc-900/40 overflow-hidden hover:border-zinc-700/80 transition-all"
                >
                  <div className="aspect-square bg-zinc-800/20 flex items-center justify-center">
                    <ShoppingBag className="w-10 h-10 text-zinc-700/50" />
                  </div>
                  <div className="p-3 sm:p-4">
                    <p className="text-[10px] text-zinc-600 uppercase tracking-wider mb-1">
                      {item.category}
                    </p>
                    <h3 className="text-xs sm:text-sm font-bold text-white font-display line-clamp-1 group-hover:text-orange-500 transition-colors mb-2">
                      {item.name}
                    </h3>
                    <div className="flex items-center gap-1 mb-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            "w-2.5 h-2.5",
                            i < Math.floor(item.rating)
                              ? "text-orange-500 fill-orange-500"
                              : "text-zinc-700/60"
                          )}
                        />
                      ))}
                      <span className="text-[9px] text-zinc-600 ml-0.5">({item.reviews})</span>
                    </div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-sm sm:text-base font-bold text-white">
                        {formatCurrency(item.price)}
                      </span>
                      {item.comparePrice && (
                        <span className="text-[10px] text-zinc-600 line-through">
                          {formatCurrency(item.comparePrice)}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}