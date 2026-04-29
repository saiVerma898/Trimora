import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import BenefitsTicker from "@/components/BenefitsTicker";
import PressStrip from "@/components/PressStrip";
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
    label: "Metabolic Nutrition",
    title: "Fuel your transformation, protect your progress",
    accentWord: "Fuel",
    listHeading: "Meal prep made simple:",
    features: [
      "Chef-made, portion-controlled",
      "Weekly rotating meals",
      "Nutritionally balanced",
      "Macro-friendly options",
      "Completely hassle-free",
    ],
    images: [
      "/images/nut-meals.png",
      "/images/nut-cooking.png",
      "/images/nut-ingredients.png",
    ] as [string, string, string],
    bgColor: "#fcf9f7",
    accentColor: "#eb8771",
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
    label: "Care for Energy, Hormones, and Performance",
    title: "Men's healthcare, built for men who expect more",
    accentWord: "expect more",
    listHeading: "Care designed to help you feel stronger:",
    features: [
      "Physical performance",
      "Hormone balance",
      "Energy levels",
      "Mental focus",
      "Fast & discreet shipping",
    ],
    images: [
      "/images/mh-man.png",
      "/images/mh-fitness.png",
      "/images/mh-product.png",
    ] as [string, string, string],
    bgColor: "#ebf6ff",
    accentColor: "#a58979",
    ctaText: "Get Started",
  },
  {
    id: "peptides",
    label: "Advanced Peptide Support",
    title: "Targeted support for recovery, performance, and longevity",
    accentWord: "Targeted support",
    listHeading: "Unlock what your body can do:",
    features: [
      "Recovery support (BPC-157, TB-500)",
      "Performance (CJC-1295, Ipamorelin)",
      "Recovery cycles (Sermorelin, MK-677)",
      "Strength (Tesamorelin)",
      "And more—all to support your goals",
    ],
    images: [
      "/images/peptides.png",
      "/images/pep-vials.png",
      "/images/pep-research.png",
    ] as [string, string, string],
    bgColor: "#e5f2f2",
    accentColor: "#7aa5c9",
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
    label: "Personalized Care for Healthier, Clearer Skin",
    title: "Skincare that goes deeper than the surface",
    accentWord: "Skincare",
    listHeading: "Why our skincare works:",
    features: [
      "Clinician-guided tailored care",
      "Prescription-strength options",
      "Simple daily routines",
      "Visible skin results",
      "Personalized treatment plans",
    ],
    images: [
      "/images/skincare.png",
      "/images/skin-woman.png",
      "/images/skin-products.png",
    ] as [string, string, string],
    bgColor: "#f2e0d8",
    accentColor: "#8cb0b2",
    comingSoon: true,
    reversed: true,
  },
];

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <PressStrip bg="#fff" />
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
