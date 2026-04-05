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
    title: "Clinically Proven Weight Loss",
    subtitle: "GLP-1 Program",
    description:
      "Our physician-guided GLP-1 weight loss program combines cutting-edge medication with personalized coaching. Lose weight effectively and keep it off with ongoing medical support.",
    features: [
      "FDA-approved GLP-1 medications",
      "Personalized dosing plans",
      "Dedicated care coaching",
      "Monthly provider check-ins",
      "Nutrition guidance included",
    ],
    image: "/images/weight-loss.png",
    bgColor: "#d6f2da",
    accentColor: "rgb(46, 147, 111)",
    ctaText: "Start Your Journey",
  },
  {
    id: "womens-health",
    title: "Women's Health & Vitality",
    subtitle: "Hormones & Wellness",
    description:
      "Comprehensive women's health solutions addressing hormonal balance, vitality, and overall wellness. Tailored treatments for every stage of life.",
    features: [
      "Hormone optimization therapy",
      "Menopause support",
      "Thyroid management",
      "Vitality & energy programs",
      "Personalized wellness plans",
    ],
    image: "/images/womens-health.png",
    bgColor: "#ffe8f4",
    accentColor: "rgb(214, 144, 179)",
    comingSoon: true,
    reversed: true,
  },
  {
    id: "nutrition",
    title: "Trimora Meals",
    subtitle: "Metabolic Nutrition",
    description:
      "Chef-prepared, nutritionist-designed meals delivered fresh to your door. Optimize your metabolism and complement your treatment plan with perfect nutrition.",
    features: [
      "Chef-made fresh meals",
      "Nutritionist-designed menus",
      "Metabolic optimization focused",
      "Flexible meal plans",
      "Delivered fresh weekly",
    ],
    image: "/images/nutrition.png",
    bgColor: "#f1f5e9",
    accentColor: "rgb(46, 147, 111)",
    ctaText: "Order Meals",
  },
  {
    id: "supplements",
    title: "Doctor-Formulated Supplements",
    subtitle: "Premium Supplements",
    description:
      "Pharmaceutical-grade supplements formulated by our medical team. Backed by science, designed to complement your treatment and optimize results.",
    features: [
      "Physician-formulated blends",
      "Pharmaceutical-grade quality",
      "Third-party tested",
      "Subscription delivery",
      "Tailored to your plan",
    ],
    image: "/images/supplements.png",
    bgColor: "#eddff5",
    accentColor: "rgb(149, 107, 173)",
    comingSoon: true,
    reversed: true,
  },
  {
    id: "mens-health",
    title: "Men's Health & Performance",
    subtitle: "Hormones & Energy",
    description:
      "Reclaim your energy, vitality, and confidence. Our men's health program offers physician-guided hormone optimization and performance treatments.",
    features: [
      "Testosterone optimization",
      "Energy & vitality programs",
      "Performance enhancement",
      "Discreet online consultations",
      "Ongoing provider support",
    ],
    image: "/images/mens-health.png",
    bgColor: "#ebf6ff",
    accentColor: "rgb(140, 176, 178)",
    ctaText: "Get Started",
  },
  {
    id: "peptides",
    title: "Peptides & Longevity",
    subtitle: "Advanced Therapies",
    description:
      "Cutting-edge peptide therapies for recovery, longevity, and optimization. Access BPC-157, TB-500, and more under physician supervision.",
    features: [
      "BPC-157 & TB-500",
      "Recovery & healing protocols",
      "Anti-aging therapies",
      "Physician-supervised programs",
      "Personalized protocols",
    ],
    image: "/images/peptides.png",
    bgColor: "#e5f2f2",
    accentColor: "rgb(140, 176, 178)",
    comingSoon: true,
    reversed: true,
  },
  {
    id: "hair-restoration",
    title: "Hair Restoration",
    subtitle: "Regrowth Therapy",
    description:
      "Clinically proven treatments for thinning hair and hair loss. Our prescription-strength solutions help you regain confidence with a full, healthy head of hair.",
    features: [
      "Prescription-strength treatments",
      "Minoxidil & Finasteride options",
      "Custom compounded formulas",
      "Progress tracking",
      "Discreet delivery",
    ],
    image: "/images/hair-restoration.png",
    bgColor: "#ebe5dc",
    accentColor: "rgb(198, 166, 115)",
    comingSoon: true,
  },
  {
    id: "skincare",
    title: "Prescription Skincare",
    subtitle: "Medical-Grade Skincare",
    description:
      "Medical-grade skincare prescribed by dermatology experts. Target acne, aging, hyperpigmentation, and more with proven prescription treatments.",
    features: [
      "Prescription-strength formulas",
      "Tretinoin & custom compounds",
      "Anti-aging protocols",
      "Acne treatment plans",
      "Dermatologist oversight",
    ],
    image: "/images/skincare.png",
    bgColor: "#f2e0d8",
    accentColor: "rgb(235, 135, 113)",
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
