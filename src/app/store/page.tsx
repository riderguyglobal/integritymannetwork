"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingBag,
  Search,
  Star,
  ShoppingCart,
  Eye,
  Truck,
  Shield,
  Tag,
  ChevronDown,
  X,
  Grid3X3,
  LayoutList,
  ArrowUpDown,
  Package,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, cn } from "@/lib/utils";
import { useCartStore } from "@/stores";

// ──────────────────────────────────────────
// DATA
// ──────────────────────────────────────────

const PRODUCTS = [
  {
    slug: "integrity-journal",
    name: "The Integrity Journal",
    description: "A premium guided journal designed for men pursuing purpose. 90-day structured reflections with scripture, prompts, and accountability tracking.",
    price: 120,
    comparePrice: null,
    category: "Books & Journals",
    rating: 4.8,
    reviews: 24,
    isNew: true,
    inStock: true,
    image: null,
    badge: "Bestseller",
  },
  {
    slug: "purpose-driven-man-book",
    name: "The Purpose-Driven Man",
    description: "A foundational teaching on eternal purpose, work, and integrity — distilled from the core teachings of The Integrity Man Network.",
    price: 70,
    comparePrice: 95,
    category: "Books & Journals",
    rating: 4.9,
    reviews: 56,
    isNew: false,
    inStock: true,
    image: null,
    badge: null,
  },
  {
    slug: "integrity-cap-black",
    name: "Integrity Cap — Midnight",
    description: "Premium structured cap with embroidered TIMN shield logo. Adjustable strap, breathable fabric.",
    price: 60,
    comparePrice: null,
    category: "Apparel",
    rating: 4.7,
    reviews: 18,
    isNew: true,
    inStock: true,
    image: null,
    badge: null,
  },
  {
    slug: "timn-tshirt-orange",
    name: "TIMN Statement Tee — Orange",
    description: "Premium cotton tee with 'God. Work. Integrity.' statement print. Comfortable fit for everyday wear.",
    price: 95,
    comparePrice: null,
    category: "Apparel",
    rating: 4.6,
    reviews: 32,
    isNew: false,
    inStock: true,
    image: null,
    badge: null,
  },
  {
    slug: "integrity-mug",
    name: "Integrity Ceramic Mug",
    description: "Matt black ceramic mug with orange TIMN branding. 350ml capacity, microwave & dishwasher safe.",
    price: 40,
    comparePrice: null,
    category: "Accessories",
    rating: 4.5,
    reviews: 12,
    isNew: false,
    inStock: true,
    image: null,
    badge: null,
  },
  {
    slug: "matthew-633-wallart",
    name: "Matthew 6:33 Wall Art",
    description: "Premium canvas print featuring Matthew 6:33 in elegant typography with the TIMN brand treatment. 50×70cm.",
    price: 200,
    comparePrice: 250,
    category: "Accessories",
    rating: 5.0,
    reviews: 8,
    isNew: true,
    inStock: true,
    image: null,
    badge: "Limited",
  },
];

const CATEGORIES = [
  { id: "all", label: "All Products", count: PRODUCTS.length },
  { id: "Books & Journals", label: "Books & Journals", count: PRODUCTS.filter((p) => p.category === "Books & Journals").length },
  { id: "Apparel", label: "Apparel", count: PRODUCTS.filter((p) => p.category === "Apparel").length },
  { id: "Accessories", label: "Accessories", count: PRODUCTS.filter((p) => p.category === "Accessories").length },
];

type SortOption = "featured" | "price-asc" | "price-desc" | "rating" | "newest";

const SORT_OPTIONS: { id: SortOption; label: string }[] = [
  { id: "featured", label: "Featured" },
  { id: "price-asc", label: "Price: Low to High" },
  { id: "price-desc", label: "Price: High to Low" },
  { id: "rating", label: "Avg. Customer Rating" },
  { id: "newest", label: "Newest Arrivals" },
];

// ──────────────────────────────────────────
// HERO — Compact store banner
// ──────────────────────────────────────────

function StoreHero() {
  return (
    <section className="relative pt-28 pb-10 sm:pt-32 sm:pb-14 md:pt-36 md:pb-16 overflow-hidden">
      <div className="absolute inset-0 bg-zinc-950" />
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute inset-0 bg-radial-dark" />

      <div className="container-wide relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-5 sm:mb-6">
            <ShoppingBag className="w-3.5 h-3.5 text-orange-500" />
            <span className="text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-orange-400">
              Official Store
            </span>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[0.95] mb-4">
            Shop <span className="text-gradient">TIMN</span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-zinc-400 leading-relaxed max-w-xl mb-6 sm:mb-8">
            Purpose-branded resources, apparel, and merchandise that represent
            the values you stand for.
          </p>

          {/* Trust bar */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-zinc-500">
            {[
              { icon: Truck, text: "Free shipping over GH₵500" },
              { icon: Shield, text: "Secure checkout" },
              { icon: Package, text: "Quality guaranteed" },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-2">
                <item.icon className="w-3.5 h-3.5 text-orange-500/60" />
                <span className="text-[10px] sm:text-xs font-medium">{item.text}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ──────────────────────────────────────────
// PRODUCT CARD — Amazon-style
// ──────────────────────────────────────────

function ProductCard({
  product,
  layout,
}: {
  product: (typeof PRODUCTS)[0];
  layout: "grid" | "list";
}) {
  const { addItem, openCart } = useCartStore();

  const discount = product.comparePrice
    ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)
    : null;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: product.slug,
      name: product.name,
      slug: product.slug,
      price: product.price,
      salePrice: product.comparePrice ? product.price : undefined,
      image: product.image ?? undefined,
    });
    openCart();
  };

  if (layout === "list") {
    return (
      <Link href={`/store/${product.slug}`}>
        <div className="group flex gap-4 sm:gap-6 p-4 rounded-2xl border border-zinc-800/60 bg-zinc-900/40 hover:border-zinc-700/80 hover:bg-zinc-900/60 transition-all duration-300">
          {/* Image */}
          <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-xl bg-zinc-800/40 border border-zinc-800/40 flex items-center justify-center shrink-0 relative overflow-hidden">
            <ShoppingBag className="w-8 h-8 text-zinc-700" />
            {product.badge && (
              <div className="absolute top-2 left-2">
                <span className="text-[9px] font-bold uppercase tracking-wider bg-orange-500 text-white px-2 py-0.5 rounded">
                  {product.badge}
                </span>
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
            <div>
              <p className="text-[10px] text-zinc-600 uppercase tracking-wider mb-1">{product.category}</p>
              <h3 className="text-sm sm:text-base font-bold text-white font-display group-hover:text-orange-500 transition-colors line-clamp-1 mb-1.5">
                {product.name}
              </h3>
              <p className="text-xs text-zinc-500 line-clamp-2 leading-relaxed hidden sm:block">
                {product.description}
              </p>

              {/* Rating */}
              <div className="flex items-center gap-1.5 mt-2">
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "w-3 h-3",
                        i < Math.floor(product.rating)
                          ? "text-orange-500 fill-orange-500"
                          : "text-zinc-700"
                      )}
                    />
                  ))}
                </div>
                <span className="text-[10px] text-zinc-500">{product.rating} ({product.reviews})</span>
              </div>
            </div>

            <div className="flex items-end justify-between mt-3">
              <div className="flex items-baseline gap-2">
                <span className="text-lg sm:text-xl font-bold text-white">{formatCurrency(product.price)}</span>
                {product.comparePrice && (
                  <>
                    <span className="text-xs text-zinc-600 line-through">{formatCurrency(product.comparePrice)}</span>
                    <span className="text-[10px] font-bold text-emerald-400">-{discount}%</span>
                  </>
                )}
              </div>
              <Button size="sm" className="hidden sm:inline-flex" onClick={handleAddToCart}>
                <ShoppingCart className="w-3.5 h-3.5" />
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  // Grid layout
  return (
    <Link href={`/store/${product.slug}`}>
      <div className="group h-full rounded-2xl border border-zinc-800/60 bg-zinc-900/40 overflow-hidden hover:border-zinc-700/80 hover:bg-zinc-900/60 transition-all duration-300 flex flex-col">
        {/* Image area */}
        <div className="aspect-square bg-zinc-800/30 relative flex items-center justify-center overflow-hidden">
          <ShoppingBag className="w-12 h-12 text-zinc-700/60" />

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-zinc-950/70 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-2">
            <Button size="sm" variant="white" className="shadow-xl text-xs">
              <Eye className="w-3.5 h-3.5" />
              Quick View
            </Button>
            <Button size="sm" className="shadow-xl text-xs" onClick={handleAddToCart}>
              <ShoppingCart className="w-3.5 h-3.5" />
              Add
            </Button>
          </div>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.badge && (
              <span className="text-[9px] font-bold uppercase tracking-wider bg-orange-500 text-white px-2 py-0.5 rounded shadow-lg shadow-orange-500/20">
                {product.badge}
              </span>
            )}
            {product.isNew && !product.badge && (
              <span className="text-[9px] font-bold uppercase tracking-wider bg-white text-zinc-900 px-2 py-0.5 rounded shadow-lg">
                New
              </span>
            )}
            {discount && (
              <span className="text-[9px] font-bold bg-emerald-500 text-white px-2 py-0.5 rounded shadow-lg">
                -{discount}%
              </span>
            )}
          </div>

          {/* Stock indicator */}
          {product.inStock && (
            <div className="absolute bottom-3 right-3">
              <span className="text-[9px] font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full backdrop-blur-sm">
                In Stock
              </span>
            </div>
          )}
        </div>

        {/* Product info */}
        <div className="p-4 sm:p-5 flex flex-col flex-1">
          <p className="text-[10px] text-zinc-600 uppercase tracking-wider mb-1.5">
            {product.category}
          </p>

          <h3 className="text-sm sm:text-base font-bold text-white font-display mb-1.5 line-clamp-2 group-hover:text-orange-500 transition-colors leading-snug">
            {product.name}
          </h3>

          <p className="text-[11px] sm:text-xs text-zinc-500 line-clamp-2 mb-3 leading-relaxed flex-1">
            {product.description}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mb-3">
            <div className="flex items-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "w-3 h-3",
                    i < Math.floor(product.rating)
                      ? "text-orange-500 fill-orange-500"
                      : "text-zinc-700/60"
                  )}
                />
              ))}
            </div>
            <span className="text-[10px] text-zinc-500">
              {product.rating}
            </span>
            <span className="text-[10px] text-zinc-600">
              ({product.reviews})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2 mt-auto">
            <span className="text-lg font-bold text-white">
              {formatCurrency(product.price)}
            </span>
            {product.comparePrice && (
              <span className="text-xs text-zinc-600 line-through">
                {formatCurrency(product.comparePrice)}
              </span>
            )}
          </div>

          {/* Shipping hint */}
          {product.price >= 500 && (
            <p className="text-[10px] text-emerald-400/70 mt-1.5 flex items-center gap-1">
              <Truck className="w-3 h-3" />
              Free shipping
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}

// ──────────────────────────────────────────
// PAGE
// ──────────────────────────────────────────

export default function StorePage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const [layout, setLayout] = useState<"grid" | "list">("grid");
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const filteredProducts = useMemo(() => {
    let results = PRODUCTS.filter((product) => {
      const matchesCategory =
        activeCategory === "all" || product.category === activeCategory;
      const matchesSearch =
        !searchQuery ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    // Sort
    switch (sortBy) {
      case "price-asc":
        results = [...results].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        results = [...results].sort((a, b) => b.price - a.price);
        break;
      case "rating":
        results = [...results].sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        results = [...results].sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      default:
        break;
    }

    return results;
  }, [activeCategory, searchQuery, sortBy]);

  const clearFilters = () => {
    setActiveCategory("all");
    setSearchQuery("");
    setSortBy("featured");
  };

  const hasActiveFilters = activeCategory !== "all" || searchQuery || sortBy !== "featured";

  return (
    <>
      <StoreHero />
      <div className="divider-gradient" />

      <section className="py-8 sm:py-10 md:py-14">
        <div className="container-wide">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* ── SIDEBAR — Desktop ── */}
            <aside className="hidden lg:block w-60 shrink-0 space-y-6">
              {/* Categories */}
              <div>
                <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
                  Categories
                </h3>
                <nav className="space-y-0.5">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={cn(
                        "w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-all",
                        activeCategory === cat.id
                          ? "bg-orange-500/10 text-orange-500 font-semibold"
                          : "text-zinc-400 hover:text-white hover:bg-zinc-800/40"
                      )}
                    >
                      <span>{cat.label}</span>
                      <span className={cn(
                        "text-[10px] font-medium px-1.5 py-0.5 rounded-full",
                        activeCategory === cat.id
                          ? "bg-orange-500/20 text-orange-400"
                          : "bg-zinc-800 text-zinc-500"
                      )}>
                        {cat.count}
                      </span>
                    </button>
                  ))}
                </nav>
              </div>

              {/* Price ranges */}
              <div>
                <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
                  Price Range
                </h3>
                <div className="space-y-0.5">
                  {[
                    { label: "Under GH₵50", filter: () => {} },
                    { label: "GH₵50 – GH₵100", filter: () => {} },
                    { label: "GH₵100 – GH₵200", filter: () => {} },
                    { label: "Over GH₵200", filter: () => {} },
                  ].map((range) => (
                    <button
                      key={range.label}
                      className="w-full text-left px-3 py-2 rounded-lg text-sm text-zinc-400 hover:text-white hover:bg-zinc-800/40 transition-all"
                    >
                      {range.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Promo card */}
              <div className="rounded-xl bg-linear-to-br from-orange-500/10 to-orange-600/5 border border-orange-500/20 p-4">
                <Tag className="w-5 h-5 text-orange-500 mb-2" />
                <p className="text-sm font-bold text-white font-display mb-1">
                  Free Shipping
                </p>
                <p className="text-[11px] text-zinc-400 leading-relaxed">
                  On all orders over GH₵500. No code needed.
                </p>
              </div>
            </aside>

            {/* ── MAIN CONTENT ── */}
            <div className="flex-1 min-w-0">
              {/* Toolbar */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-6">
                {/* Search */}
                <div className="relative w-full sm:max-w-xs">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  <Input
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-10 bg-zinc-900/40 border-zinc-800/60 text-sm"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                      <X className="w-3.5 h-3.5 text-zinc-500 hover:text-white transition-colors" />
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  {/* Mobile filter toggle */}
                  <button
                    onClick={() => setShowMobileFilters(!showMobileFilters)}
                    className="lg:hidden flex items-center gap-2 px-3 py-2 rounded-lg border border-zinc-800/60 text-xs font-medium text-zinc-400 hover:text-white transition-colors"
                  >
                    <Tag className="w-3.5 h-3.5" />
                    Filters
                  </button>

                  {/* Sort dropdown */}
                  <div className="relative ml-auto sm:ml-0">
                    <button
                      onClick={() => setShowSortMenu(!showSortMenu)}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg border border-zinc-800/60 text-xs font-medium text-zinc-400 hover:text-white transition-colors"
                    >
                      <ArrowUpDown className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">
                        {SORT_OPTIONS.find((s) => s.id === sortBy)?.label}
                      </span>
                      <span className="sm:hidden">Sort</span>
                      <ChevronDown className="w-3 h-3" />
                    </button>

                    <AnimatePresence>
                      {showSortMenu && (
                        <>
                          <div className="fixed inset-0 z-40" onClick={() => setShowSortMenu(false)} />
                          <motion.div
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            className="absolute right-0 top-full mt-1 z-50 w-52 rounded-xl border border-zinc-800/80 bg-zinc-900 shadow-2xl shadow-black/40 overflow-hidden"
                          >
                            {SORT_OPTIONS.map((option) => (
                              <button
                                key={option.id}
                                onClick={() => {
                                  setSortBy(option.id);
                                  setShowSortMenu(false);
                                }}
                                className={cn(
                                  "w-full text-left px-4 py-2.5 text-xs font-medium transition-colors",
                                  sortBy === option.id
                                    ? "text-orange-500 bg-orange-500/5"
                                    : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
                                )}
                              >
                                {option.label}
                                {sortBy === option.id && (
                                  <CheckCircle2 className="w-3 h-3 inline ml-2 text-orange-500" />
                                )}
                              </button>
                            ))}
                          </motion.div>
                        </>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Layout toggle */}
                  <div className="hidden sm:flex items-center border border-zinc-800/60 rounded-lg overflow-hidden">
                    <button
                      onClick={() => setLayout("grid")}
                      className={cn(
                        "p-2 transition-colors",
                        layout === "grid"
                          ? "bg-zinc-800 text-white"
                          : "text-zinc-500 hover:text-white"
                      )}
                    >
                      <Grid3X3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setLayout("list")}
                      className={cn(
                        "p-2 transition-colors",
                        layout === "list"
                          ? "bg-zinc-800 text-white"
                          : "text-zinc-500 hover:text-white"
                      )}
                    >
                      <LayoutList className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Mobile filters panel */}
              <AnimatePresence>
                {showMobileFilters && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="lg:hidden overflow-hidden mb-4"
                  >
                    <div className="flex flex-wrap gap-2 p-4 rounded-xl border border-zinc-800/60 bg-zinc-900/40">
                      {CATEGORIES.map((cat) => (
                        <button
                          key={cat.id}
                          onClick={() => setActiveCategory(cat.id)}
                          className={cn(
                            "px-3 py-1.5 rounded-lg text-xs font-medium transition-all",
                            activeCategory === cat.id
                              ? "bg-orange-500 text-white"
                              : "bg-zinc-800/50 text-zinc-400 border border-zinc-700/40"
                          )}
                        >
                          {cat.label} ({cat.count})
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Results header */}
              <div className="flex items-center justify-between mb-5">
                <p className="text-xs text-zinc-500">
                  Showing{" "}
                  <span className="text-zinc-300 font-medium">{filteredProducts.length}</span>{" "}
                  {filteredProducts.length === 1 ? "product" : "products"}
                  {activeCategory !== "all" && (
                    <> in <span className="text-orange-500">{CATEGORIES.find((c) => c.id === activeCategory)?.label}</span></>
                  )}
                </p>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="text-[10px] font-medium text-orange-500 hover:text-orange-400 transition-colors flex items-center gap-1"
                  >
                    <X className="w-3 h-3" />
                    Clear all
                  </button>
                )}
              </div>

              {/* Product grid/list */}
              {filteredProducts.length > 0 ? (
                <div
                  className={cn(
                    layout === "grid"
                      ? "grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4"
                      : "space-y-3"
                  )}
                >
                  {filteredProducts.map((product, index) => (
                    <motion.div
                      key={product.slug}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.4,
                        delay: index * 0.05,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <ProductCard product={product} layout={layout} />
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-24">
                  <div className="w-16 h-16 rounded-2xl bg-zinc-800/40 border border-zinc-800/60 flex items-center justify-center mx-auto mb-5">
                    <Search className="w-7 h-7 text-zinc-700" />
                  </div>
                  <p className="text-white font-display font-bold text-lg mb-1">
                    No products found
                  </p>
                  <p className="text-sm text-zinc-500 mb-6">
                    Try adjusting your filters or search term.
                  </p>
                  <Button variant="outline" onClick={clearFilters}>
                    <X className="w-3.5 h-3.5" />
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
