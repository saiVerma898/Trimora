import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import BenefitsTicker from "@/components/BenefitsTicker";
import ServiceSection from "@/components/ServiceSection";
import WhyTrimora from "@/components/WhyTrimora";
import Doctors from "@/components/Doctors";
import Testimonials from "@/components/Testimonials";
import CTABanner from "@/components/CTABanner";
import Footer from "@/components/Footer";

const services = [
  {
    id: "weight-loss",
    label: "Doctor-Guided GLP-1 Care",
    title: "Weight loss made easy with personalized care",
    accentWord: "made easy",
    listHeading: "Everything you need—included:",
    features: [
      "Prescription to fast, effective GLP-1",
      "1:1 physician guidance",
      "24/7 support",
      "Weight loss guarantee",
      "Fast & discreet shipping",
    ],
    images: [
      "/images/wl-product.png",
      "/images/wl-woman.png",
      "/images/wl-injection.png",
    ] as [string, string, string],
    bgColor: "#f1f5e9",
    accentColor: "#2e936f",
    ctaText: "Get Started",
  },
  {
    id: "womens-health",
    label: "Care Designed for Women's Health",
    title: "Whole-body care for her balance, vitality, and confidence",
    accentWord: "care for her",
    listHeading: "Benefits that support every stage",
    features: [
      "Hormone balance",
      "Healthy weight management",
      "Hair strength & growth support",
      "Skin health & radiance",
      "Fast & discreet shipping",
    ],
    images: [
      "/images/wh-portrait.png",
      "/images/wh-walking.png",
      "/images/wh-happy.png",
    ] as [string, string, string],
    bgColor: "#faf9f7",
    accentColor: "#d690b3",
    comingSoon: true,
    reversed: true,
  },
  {
    id: "nutrition",
    label: "Metabolic Nutrition Program",
    title: "Chef-made meals designed to fuel your results",
    accentWord: "designed to fuel",
    listHeading: "What's included:",
    features: [
      "Chef-prepared fresh meals weekly",
      "Nutritionist-designed for your plan",
      "Metabolic optimization focused",
      "Flexible portions & preferences",
      "Delivered fresh to your door",
    ],
    images: [
      "/images/nut-meals.png",
      "/images/nut-cooking.png",
      "/images/nut-ingredients.png",
    ] as [string, string, string],
    bgColor: "#f1f5e9",
    accentColor: "#2e936f",
    ctaText: "Order Meals",
  },
  {
    id: "supplements",
    label: "Doctor-Formulated Supplements",
    title: "Premium supplements backed by science and care",
    accentWord: "backed by science",
    listHeading: "Why our supplements are different:",
    features: [
      "Physician-formulated blends",
      "Pharmaceutical-grade quality",
      "Third-party tested for purity",
      "Subscription delivery",
      "Tailored to your treatment plan",
    ],
    images: [
      "/images/supplements.png",
      "/images/sup-capsules.png",
      "/images/sup-lifestyle.png",
    ] as [string, string, string],
    bgColor: "#eddff5",
    accentColor: "#956bad",
    comingSoon: true,
    reversed: true,
  },
  {
    id: "mens-health",
    label: "Men's Health & Performance",
    title: "Reclaim your energy with expert-guided care",
    accentWord: "your energy",
    listHeading: "Comprehensive men's care:",
    features: [
      "Testosterone optimization",
      "Energy & vitality programs",
      "Performance enhancement",
      "Discreet online consultations",
      "Ongoing provider support",
    ],
    images: [
      "/images/mh-man.png",
      "/images/mh-fitness.png",
      "/images/mh-product.png",
    ] as [string, string, string],
    bgColor: "#ebf6ff",
    accentColor: "#8cb0b2",
    ctaText: "Get Started",
  },
  {
    id: "peptides",
    label: "Peptides & Longevity",
    title: "Advanced therapies for recovery and longevity",
    accentWord: "recovery and longevity",
    listHeading: "Cutting-edge protocols:",
    features: [
      "BPC-157 & TB-500 access",
      "Recovery & healing protocols",
      "Anti-aging therapies",
      "Physician-supervised programs",
      "Personalized treatment plans",
    ],
    images: [
      "/images/peptides.png",
      "/images/pep-vials.png",
      "/images/pep-research.png",
    ] as [string, string, string],
    bgColor: "#e5f2f2",
    accentColor: "#8cb0b2",
    comingSoon: true,
    reversed: true,
  },
  {
    id: "hair-restoration",
    label: "Hair Regrowth Therapy",
    title: "Clinically proven solutions for thicker, fuller hair",
    accentWord: "thicker, fuller hair",
    listHeading: "Your regrowth plan includes:",
    features: [
      "Prescription-strength treatments",
      "Minoxidil & Finasteride options",
      "Custom compounded formulas",
      "Progress tracking",
      "Discreet delivery",
    ],
    images: [
      "/images/hair-restoration.png",
      "/images/hair-man.png",
      "/images/hair-product.png",
    ] as [string, string, string],
    bgColor: "#ebe5dc",
    accentColor: "#c6a673",
    comingSoon: true,
  },
  {
    id: "skincare",
    label: "Medical-Grade Skincare",
    title: "Prescription skincare that actually works",
    accentWord: "actually works",
    listHeading: "Dermatologist-backed care:",
    features: [
      "Prescription-strength formulas",
      "Tretinoin & custom compounds",
      "Anti-aging protocols",
      "Acne treatment plans",
      "Dermatologist oversight",
    ],
    images: [
      "/images/skincare.png",
      "/images/skin-woman.png",
      "/images/skin-products.png",
    ] as [string, string, string],
    bgColor: "#f2e0d8",
    accentColor: "#eb8771",
    comingSoon: true,
    reversed: true,
  },
];

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <BenefitsTicker />
      {services.map((service) => (
        <ServiceSection key={service.id} {...service} />
      ))}
      <WhyTrimora />
      <Doctors />
      <Testimonials />
      <CTABanner />
      <Footer />
    </>
  );
}
