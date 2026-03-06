"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  Calendar,
  Clock,
  User,
  Search,
  ArrowRight,
  Tag,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/ui/section-heading";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
};

const SAMPLE_POSTS = [
  {
    slug: "understanding-eternal-purpose",
    title: "Understanding Eternal Purpose: Why You Were Created",
    excerpt: "Every man was created with divine intention. Understanding your eternal purpose is the first step toward a life of integrity, alignment, and true fulfilment.",
    category: "Purpose",
    author: "TIMN Editorial",
    date: "2025-03-01",
    readTime: "8 min read",
    featured: true,
    image: null,
  },
  {
    slug: "integrity-in-the-marketplace",
    title: "Integrity in the Marketplace: Leading Without Compromise",
    excerpt: "The corporate world tests integrity daily. Here's how men of purpose can thrive professionally while maintaining unwavering moral standards.",
    category: "Leadership",
    author: "TIMN Editorial",
    date: "2025-02-20",
    readTime: "6 min read",
    featured: false,
    image: null,
  },
  {
    slug: "the-power-of-brotherhood",
    title: "The Power of Brotherhood: Why Men Need Community",
    excerpt: "Isolation weakens men, but covenant community strengthens destiny. Discover why every man needs an Integrity House.",
    category: "Community",
    author: "TIMN Editorial",
    date: "2025-02-15",
    readTime: "5 min read",
    featured: false,
    image: null,
  },
  {
    slug: "raising-sons-with-purpose",
    title: "Raising Sons With Purpose: Formation Over Information",
    excerpt: "In a world overflowing with information, our children need formation. How Purpose Centers are reshaping early childhood development.",
    category: "Family",
    author: "TIMN Editorial",
    date: "2025-02-10",
    readTime: "7 min read",
    featured: false,
    image: null,
  },
  {
    slug: "work-as-worship",
    title: "Work as Worship: Redefining Success Through Scripture",
    excerpt: "Matthew 6:33 reveals the divine order for true success. When we seek first His kingdom, everything else is added.",
    category: "Faith",
    author: "TIMN Editorial",
    date: "2025-02-05",
    readTime: "9 min read",
    featured: false,
    image: null,
  },
  {
    slug: "the-absent-father-crisis",
    title: "The Absent Father Crisis: Reclaiming Presence in the Home",
    excerpt: "Men have vacated their God-given role. It's time to reclaim authority and presence in the family, not through provision alone, but through intentional fatherhood.",
    category: "Family",
    author: "TIMN Editorial",
    date: "2025-01-28",
    readTime: "10 min read",
    featured: false,
    image: null,
  },
];

const CATEGORIES = ["All", "Purpose", "Leadership", "Community", "Family", "Faith"];

//  HERO 
function BlogHero() {
  return (
    <section className="relative hero-padding overflow-hidden">
      <div className="absolute inset-0 bg-zinc-950" />
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute inset-0 bg-radial-dark" />

      <div className="container-wide relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 mb-5 sm:mb-8">
            <BookOpen className="w-3.5 h-3.5 text-orange-400" />
            <span className="text-[10px] sm:text-xs font-semibold tracking-wider uppercase text-orange-400">Insights & Teachings</span>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-white leading-[0.95] mb-4 sm:mb-6">
            The <span className="text-gradient">Blog</span>
          </h1>

          <p className="text-sm sm:text-lg md:text-xl text-zinc-400 leading-relaxed max-w-2xl mx-auto">
            Thought-provoking articles, devotionals, and teachings for men pursuing purpose, integrity, and alignment with God&apos;s eternal plan.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

//  FEATURED POST 
function FeaturedPost({ post }: { post: (typeof SAMPLE_POSTS)[0] }) {
  return (
    <motion.div {...fadeInUp}>
      <Link href={`/blog/${post.slug}`}>
        <Card className="overflow-hidden group hover:border-orange-500/20 transition-all duration-500">
          <div className="h-1.5 bg-linear-to-r from-orange-500 via-orange-400 to-orange-600" />
          <CardContent className="p-0">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              <div className="aspect-16/10 lg:aspect-auto bg-zinc-800/50 relative flex items-center justify-center border-b lg:border-b-0 lg:border-r border-zinc-800/50">
                <div className="text-center">
                  <BookOpen className="w-12 h-12 text-zinc-700 mx-auto mb-3" />
                  <p className="text-xs text-zinc-600">Featured Article</p>
                </div>
              </div>

              <div className="p-5 sm:p-8 md:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <Badge>{post.category}</Badge>
                  <Badge variant="outline">Featured</Badge>
                </div>

                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white font-display mb-3 sm:mb-4 group-hover:text-orange-400 transition-colors">
                  {post.title}
                </h2>

                <p className="text-sm sm:text-base text-zinc-400 leading-relaxed mb-4 sm:mb-6">
                  {post.excerpt}
                </p>

                <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-[10px] sm:text-xs text-zinc-500">
                  <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5" />{post.author}</span>
                  <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />{new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                  <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{post.readTime}</span>
                </div>

                <div className="mt-4 sm:mt-6">
                  <span className="inline-flex items-center gap-2 text-sm font-medium text-orange-400 group-hover:gap-3 transition-all">
                    Read Article
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}

//  POST CARD 
function PostCard({ post }: { post: (typeof SAMPLE_POSTS)[0] }) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <Card className="h-full overflow-hidden group hover:border-orange-500/20 transition-all duration-300">
        <div className="aspect-video bg-zinc-800/50 relative flex items-center justify-center">
          <BookOpen className="w-8 h-8 text-zinc-700" />
        </div>

        <CardContent className="p-4 sm:p-6">
          <div className="flex items-center gap-2 mb-2 sm:mb-3">
            <Badge className="text-[10px]">{post.category}</Badge>
            <span className="text-[10px] text-zinc-500">{post.readTime}</span>
          </div>

          <h3 className="text-base sm:text-lg font-bold text-white font-display mb-2 sm:mb-3 line-clamp-2 group-hover:text-orange-400 transition-colors">
            {post.title}
          </h3>

          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed line-clamp-2 sm:line-clamp-3 mb-3 sm:mb-4">
            {post.excerpt}
          </p>

          <div className="flex items-center justify-between text-xs text-zinc-500">
            <span className="flex items-center gap-1.5"><User className="w-3 h-3" />{post.author}</span>
            <span>{new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

//  PAGE 
export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const featuredPost = SAMPLE_POSTS.find((p) => p.featured);
  const regularPosts = SAMPLE_POSTS.filter((p) => !p.featured);

  const filteredPosts = regularPosts.filter((post) => {
    const matchesCategory = activeCategory === "All" || post.category === activeCategory;
    const matchesSearch = !searchQuery || post.title.toLowerCase().includes(searchQuery.toLowerCase()) || post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <BlogHero />
      <div className="divider-gradient" />

      <section className="section-padding">
        <div className="container-wide">
          {featuredPost && (
            <div className="mb-10 sm:mb-16">
              <FeaturedPost post={featuredPost} />
            </div>
          )}

          <motion.div {...fadeInUp} className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6 mb-8 sm:mb-10">
            <div className="flex overflow-x-auto gap-2 pb-1 -mx-1 px-1 scrollbar-hide">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                    activeCategory === cat
                      ? "bg-orange-500 text-white shadow-lg shadow-orange-500/20"
                      : "bg-zinc-800/50 text-zinc-400 hover:text-white border border-zinc-700/50 hover:border-zinc-600"
                  }`}>
                  {cat}
                </button>
              ))}
            </div>

            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <Input placeholder="Search articles..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10 w-full sm:w-64" />
            </div>
          </motion.div>

          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filteredPosts.map((post, index) => (
                <motion.div key={post.slug} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}>
                  <PostCard post={post} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <BookOpen className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
              <p className="text-zinc-400">No articles found matching your criteria.</p>
              <Button variant="outline" className="mt-4" onClick={() => { setActiveCategory("All"); setSearchQuery(""); }}>
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
