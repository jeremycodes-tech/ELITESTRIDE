// ============================================================================
// Configuration File for Basketball Shoes Landing Page
// ============================================================================
// Edit this file to customize all content on your site.
// Do NOT modify component files - they read from this config.

// Navigation Configuration
export interface NavigationConfig {
  logo: string;
  links: Array<{ label: string; href: string }>;
}

export const navigationConfig: NavigationConfig = {
  logo: "WITDASHIFTS",
  links: [
    { label: "COLLECTION", href: "#collection" },
    { label: "FEATURED", href: "#featured" },
    { label: "PLAYERS", href: "#players" },
    { label: "SHOP", href: "#shop" },
    { label: "CONTACT", href: "#contact" },
  ],
};

// Hero Section Configuration
export interface HeroConfig {
  heroImage: string;
  titleText: string;
  subtitleLabel: string;
  ctaText: string;
}

export const heroConfig: HeroConfig = {
  heroImage: "images/hero_basketball.jpeg",
  titleText: "ELEVATEGAME",
  subtitleLabel: "2026 COLLECTION",
  ctaText: "SHOP NOW",
};

// Manifesto Section Configuration
export interface ManifestoConfig {
  image: string;
  phrases: string[];
}

export const manifestoConfig: ManifestoConfig = {
  image: "images/manifesto_player.jpeg",
  phrases: [
    "DOMINATE",
    "THE",
    "COURT",
    "WITH",
    "EVERY",
    "STEP",
    "YOU",
    "TAKE",
    "FORWARD",
  ],
};

// Product Spotlight Section Configuration
export interface ProductSpotlightConfig {
  productImage: string;
  portraitImage: string;
  titlePhrases: string[];
  ctaText: string;
  price: string;
}

export const productSpotlightConfig: ProductSpotlightConfig = {
  productImage: "images/spotlight_shoe.jpeg",
  portraitImage: "images/spotlight_player.jpeg",
  titlePhrases: [
    "AIR",
    "ELITE",
    "PRO",
    "SERIES",
    "PERFORMANCE",
    "REDEFINED",
  ],
  ctaText: "SHOP AIR ELITE",
  price: "$189",
};

// Texture Section Configuration
export interface TextureConfig {
  portraitImage: string;
  macroImage: string;
  titlePhrases: string[];
  subtitle: string;
}

export const textureConfig: TextureConfig = {
  portraitImage: "images/texture_player.jpeg",
  macroImage: "images/texture_macro.jpeg",
  titlePhrases: [
    "GRIP",
    "THAT",
    "NEVER",
    "QUITS",
    "CUSHION",
    "THAT",
  ],
  subtitle: "ADVANCED TRACTION TECHNOLOGY",
};

// Shade Range Section Configuration
export interface ShadeConfig {
  name: string;
  image: string;
}

export interface ShadeRangeConfig {
  heading: string[];
  headingAccent: string;
  shades: ShadeConfig[];
  price: string;
  ctaText: string;
}

export const shadeRangeConfig: ShadeRangeConfig = {
  heading: ["FIND", "YOUR"],
  headingAccent: "STYLE",
  shades: [
    { name: "Ja 3's", image: "images/shoe_1.jpeg" },
    { name: "Lafrance", image: "images/shoe_2.jpeg" },
    { name: "Kobe xrays", image: "images/shoe_3.jpeg" },
    { name: "Adidas ants", image: "images/shoe_4.jpeg" },
    { name: "Sabrina 2", image: "images/shoe_5.jpeg" },
    { name: "LeBron XXIII", image: "images/shoe_6.jpeg" },
  ],
  price: "$499",
  ctaText: "ADD TO CART",
};

// Final Statement Section Configuration
export interface FinalStatementConfig {
  image1: string;
  image2: string;
  phrases: string[];
  subtitle: string;
}

export const finalStatementConfig: FinalStatementConfig = {
  image1: "images/closing_1.jpeg",
  image2: "images/closing_2.jpeg",
  phrases: [
    "OWN",
    "THE",
    "GAME",
    "WRITE",
    "YOUR",
    "LEGEND",
    "TODAY",
  ],
  subtitle: "WITDASHIFTS - WHERE CHAMPIONS ARE MADE",
};

// Contact Section Configuration
export interface ContactConfig {
  leftLinks: string[];
  formHeading: string[];
  formHeadingAccent: string;
  formDescription: string;
  emailPlaceholder: string;
  subscribeButtonText: string;
  socialLinks: Array<{ label: string; href: string }>;
  copyright: string;
  tagline: string;
}

export const contactConfig: ContactConfig = {
  leftLinks: [
    "MEN'S SHOES",
    "WOMEN'S SHOES",
    "KIDS' SHOES",
    "ACCESSORIES",
    "NEW ARRIVALS",
    "BEST SELLERS",
  ],
  formHeading: ["JOIN", "THE"],
  formHeadingAccent: "SQUAD",
  formDescription: "Get exclusive drops, early access to new releases, and member-only discounts.",
  emailPlaceholder: "Enter your email",
  subscribeButtonText: "SUBSCRIBE",
  socialLinks: [
    { label: "INSTAGRAM", href: "#" },
    { label: "TWITTER", href: "#" },
    { label: "YOUTUBE", href: "#" },
    { label: "TIKTOK", href: "#" },
  ],
  copyright: "© 2026 WITDASHIFTS. ALL RIGHTS RESERVED.",
  tagline: "ELEVATE YOUR GAME",
};

// Site Metadata
export interface SiteConfig {
  title: string;
  description: string;
  language: string;
}

export const siteConfig: SiteConfig = {
  title: "witdashifts | Premium Basketball Shoes",
  description: "Elevate your game with witdashifts premium basketball shoes. Designed for champions, built for performance.",
  language: "en",
};
