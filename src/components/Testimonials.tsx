"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import AnimatedSection from "./AnimatedSection";

const testimonials = [
  {
    name: "Jessica M.",
    image: "/images/testimonial-1.png",
    text: "Trimora changed my life! I lost 45 lbs in 6 months with their GLP-1 program. The care coaching kept me motivated throughout.",
    rating: 5,
    program: "Weight Loss",
  },
  {
    name: "Robert K.",
    image: "/images/testimonial-2.png",
    text: "The men's health program gave me my energy back. The process was seamless and the doctors really listened to my concerns.",
    rating: 5,
    program: "Men's Health",
  },
  {
    name: "Linda S.",
    image: "/images/testimonial-3.png",
    text: "Finally, a telehealth service that actually delivers. The convenience of having everything shipped to my door is incredible.",
    rating: 5,
    program: "Weight Loss",
  },
  {
    name: "Marcus T.",
    image: "/images/testimonial-4.png",
    text: "I was skeptical at first, but the results speak for themselves. Down 30 lbs and feeling better than I have in years.",
    rating: 5,
    program: "Weight Loss",
  },
  {
    name: "Priya D.",
    image: "/images/testimonial-1.png",
    text: "The meal plans from Trimora Meals made healthy eating so much easier. Combined with the GLP-1 treatment, it's been amazing.",
    rating: 5,
    program: "Nutrition",
  },
  {
    name: "Thomas W.",
    image: "/images/testimonial-2.png",
    text: "Professional, discreet, and effective. The monthly check-ins with my provider make me feel like they truly care about my progress.",
    rating: 5,
    program: "Men's Health",
  },
  {
    name: "Catherine L.",
    image: "/images/testimonial-3.png",
    text: "I appreciate the transparent pricing — no hidden fees, no surprises. The quality of care has exceeded my expectations.",
    rating: 5,
    program: "Weight Loss",
  },
  {
    name: "David R.",
    image: "/images/testimonial-4.png",
    text: "The 24/7 support team is phenomenal. Any question I had was answered promptly. This is how healthcare should be.",
    rating: 5,
    program: "Men's Health",
  },
  {
    name: "Emily J.",
    image: "/images/testimonial-1.png",
    text: "From consultation to medication delivery, everything was fast and easy. Lost 25 lbs and counting!",
    rating: 5,
    program: "Weight Loss",
  },
  {
    name: "Michael P.",
    image: "/images/testimonial-2.png",
    text: "The best investment in my health I've ever made. The personalized approach makes all the difference.",
    rating: 5,
    program: "Weight Loss",
  },
  {
    name: "Sarah H.",
    image: "/images/testimonial-3.png",
    text: "I love that I can manage everything from my phone. The care team checks in regularly and adjusts my plan as needed.",
    rating: 5,
    program: "Weight Loss",
  },
  {
    name: "Andrew B.",
    image: "/images/testimonial-4.png",
    text: "Trimora made getting treatment so simple. No long waits, no awkward appointments. Just great results.",
    rating: 5,
    program: "Men's Health",
  },
];

export default function Testimonials() {
  return (
    <section className="py-16 md:py-24 bg-[var(--background)] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <span className="inline-block px-3 py-1 rounded-full bg-[var(--passion-fruit)]/15 text-[var(--passion-fruit)] text-xs font-bold uppercase tracking-wider mb-4">
            Testimonials
          </span>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-extrabold"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            What Our Patients Say
          </h2>
          <p className="mt-4 text-lg text-[var(--foreground)]/50 max-w-2xl mx-auto">
            Real stories from real patients who transformed their health with Trimora.
          </p>
        </AnimatedSection>

        {/* Scrolling testimonial rows */}
        <div className="space-y-6">
          {/* Row 1 - scrolls left */}
          <div className="relative">
            <motion.div
              animate={{ x: [0, -1500] }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="flex gap-6"
            >
              {[...testimonials.slice(0, 6), ...testimonials.slice(0, 6)].map(
                (t, i) => (
                  <TestimonialCard key={`row1-${i}`} testimonial={t} />
                )
              )}
            </motion.div>
          </div>

          {/* Row 2 - scrolls right */}
          <div className="relative">
            <motion.div
              animate={{ x: [-1500, 0] }}
              transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
              className="flex gap-6"
            >
              {[...testimonials.slice(6), ...testimonials.slice(6)].map(
                (t, i) => (
                  <TestimonialCard key={`row2-${i}`} testimonial={t} />
                )
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({
  testimonial,
}: {
  testimonial: (typeof testimonials)[0];
}) {
  return (
    <div className="flex-shrink-0 w-[350px] p-6 bg-white rounded-3xl shadow-sm hover:shadow-lg transition-shadow">
      <div className="flex items-center gap-3 mb-4">
        <div className="relative w-12 h-12 rounded-full overflow-hidden">
          <Image
            src={testimonial.image}
            alt={testimonial.name}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <p className="font-bold text-sm">{testimonial.name}</p>
          <p className="text-xs text-[var(--primary)] font-medium">
            {testimonial.program}
          </p>
        </div>
        <div className="ml-auto flex gap-0.5">
          {Array.from({ length: testimonial.rating }).map((_, i) => (
            <span key={i} className="text-yellow-400 text-sm">
              ★
            </span>
          ))}
        </div>
      </div>
      <p
        className="text-sm text-[var(--foreground)]/70 leading-relaxed italic"
        style={{ fontFamily: "var(--font-accent)" }}
      >
        &ldquo;{testimonial.text}&rdquo;
      </p>
    </div>
  );
}
