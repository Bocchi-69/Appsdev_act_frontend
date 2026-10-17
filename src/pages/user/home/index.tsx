import { useState } from "react";
import { PageHeader } from "@/components/common/page-header";
import { RecipeCollection } from "@/components/features/recipe/recipe-collection";
import { Section } from "@/components/ui/section";
import { Input } from "@/components/ui/input";

export default function HomePage() {
  const [search, setSearch] = useState("");

  return (
    <Section className="pb-0">
      <PageHeader
        eyebrow="A little inspiration for your next meal"
        title={<>Good food starts<br className="hidden sm:block" /> with a good idea.</>}
        description="Keep the recipes you love close, and find something lovely to make tonight."
        className="home-hero mb-10 sm:mb-14"
      >
        <div className="hero-photo" aria-label="Fresh pasta with tomatoes and herbs">
          <img
            src="https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?auto=format&fit=crop&w=1400&q=85"
            alt=""
            fetchPriority="high"
          />
          <div className="hero-photo__wash" />
          <div className="hero-photo__note">
            <span className="hero-photo__spark">✳</span>
            <span>Made to be<br />shared</span>
          </div>
        </div>
      </PageHeader>

      {/* Search bar */}
      <div className="max-w-2xl mx-auto mb-12 sm:mb-16">
        <div className="relative">
          <Input
            id="search-recipes"
            type="search"
            placeholder="Search recipes by name, cuisine, or tag…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="recipe-search pl-12 pr-4 py-4 text-base"
          />
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-brown-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      <RecipeCollection search={search} />
    </Section>
  );
}

