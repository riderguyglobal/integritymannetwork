"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ShoppingBag,
  Search,
  SlidersHorizontal,
  Star,
  ShoppingCart,
  Eye,
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

const SAMPLE_PRODUCTS = [
  { slug: "integrity-journal", name: "The Integrity Journal", description: "A premium guided journal designed for men pursuing purpose. 90-day structured reflections with scripture, prompts, and accountability tracking.", price: 15000, comparePrice: null, category: "Books & Journals", rating: 4.8, reviews: 24, isNew: true, inStock: true, image: null },
  { slug: "purpose-driven-man-book", name: "The Purpose-Driven Man", description: "A foundational teaching on eternal purpose, work, and integrity  distilled from the core teachings of The Integrity Man Network.", price: 8500, comparePrice: 12000, category: "Books & Journals", rating: 4.9, reviews: 56, isNew: false, inStock: true, image: null },
  { slug: "integrity-cap-black", name: "Integrity Cap  Midnight", description: "Premium structured cap with embroidered TIMN shield logo. Adjustable strap, breathable fabric.", price: 7500, comparePrice: null, category: "Apparel", rating: 4.7, reviews: 18, isNew: true, inStock: true, image: null },
  { slug: "timn-tshirt-orange", name: "TIMN Statement Tee  Orange", description: "Premium cotton tee with 'God. Work. Integrity.' statement print. Comfortable fit for everyday wear.", price: 12000, comparePrice: null, category: "Apparel", rating: 4.6, reviews: 32, isNew: false, inStock: true, image: null },
  { slug: "integrity-mug", name: "Integrity Ceramic Mug", description: "Matt black ceramic mug with orange TIMN branding. 350ml capacity, microwave & dishwasher safe.", price: 5000, comparePrice: null, category: "Accessories", rating: 4.5, reviews: 12, isNew: false, inStock: true, image: null },
  { slug: "matthew-633-wallart", name: "Matthew 6:33 Wall Art", description: "Premium canvas print featuring Matthew 6:33 in elegant typography with the TIMN brand treatment. 50x70cm.", price: 25000, comparePrice: 30000, category: "Accessories", rating: 5.0, reviews: 8, isNew: true, inStock: true, image: null },
];

const STORE_CATEGORIES = ["All", "Books & Journals", "Apparel", "Accessories"];

//  HERO 
function StoreHero() {
  return (
    <section className="relative pt-40 pb-20 overflow-hidden">
      <div className="absolute inset-0 bg-zinc-950" />
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute inset-0 bg-radial-dark" />

      <div className="container-wide relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 mb-8">
            <ShoppingBag className="w-3.5 h-3.5 text-orange-400" />
            <span className="text-xs font-semibold tracking-wider uppercase text-orange-400">Official Store</span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[0.95] mb-6">
            The <span className="text-gradient">Store</span>
          </h1>

          <p className="text-lg md:text-xl text-zinc-400 leading-relaxed max-w-2xl mx-auto">
            Purpose-branded resources, apparel, and merchandise to represent the values you stand for.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

//  PRODUCT CARD 
function ProductCard({ product }: { product: (typeof SAMPLE_PRODUCTS)[0] }) {
  return (
    <Link href={`/store/${product.slug}`}>
      <Card className="h-full overflow-hidden group hover:border-orange-500/20 transition-all duration-300">
        <div className="aspect-square bg-zinc-800/50 relative flex items-center justify-center overflow-hidden">
          <ShoppingBag className="w-10 h-10 text-zinc-700" />
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
            <Button size="sm" className="shadow-xl"><Eye className="w-4 h-4" />View</Button>
          </div>
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.isNew && <Badge className="text-[10px]">New</Badge>}
            {product.comparePrice && <Badge variant="destructive" className="text-[10px]">Sale</Badge>}
          </div>
        </div>

        <CardContent className="p-5">
          <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-2">{product.category}</p>
          <h3 className="text-base font-bold text-white font-display mb-2 line-clamp-1 group-hover:text-orange-400 transition-colors">{product.name}</h3>
          <p className="text-xs text-zinc-400 line-clamp-2 mb-3">{product.description}</p>
          <div className="flex items-center gap-1.5 mb-3">
            <div className="flex items-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`w-3 h-3 ${i < Math.floor(product.rating) ? "text-orange-400 fill-orange-400" : "text-zinc-700"}`} />
              ))}
            </div>
            <span className="text-[10px] text-zinc-500">({product.reviews})</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-white">{formatCurrency(product.price)}</span>
            {product.comparePrice && <span className="text-sm text-zinc-500 line-through">{formatCurrency(product.comparePrice)}</span>}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

//  PAGE 
export default function StorePage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = SAMPLE_PRODUCTS.filter((product) => {
    const matchesCategory = activeCategory === "All" || product.category === activeCategory;
    const matchesSearch = !searchQuery || product.name.toLowerCase().includes(searchQuery.toLowerCase()) || product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <StoreHero />
      <div className="divider-gradient" />

      <section className="section-padding">
        <div className="container-wide">
          <motion.div {...fadeInUp} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-10">
            <div className="flex flex-wrap gap-2">
              {STORE_CATEGORIES.map((cat) => (
                <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeCategory === cat ? "bg-orange-500 text-white shadow-lg shadow-orange-500/20" : "bg-zinc-800/50 text-zinc-400 hover:text-white border border-zinc-700/50 hover:border-zinc-600"}`}>
                  {cat}
                </button>
              ))}
            </div>
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <Input placeholder="Search products..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10 w-full sm:w-64" />
            </div>
          </motion.div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product, index) => (
                <motion.div key={product.slug} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}>
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <ShoppingBag className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
              <p className="text-zinc-400">No products found.</p>
              <Button variant="outline" className="mt-4" onClick={() => { setActiveCategory("All"); setSearchQuery(""); }}>Clear Filters</Button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
