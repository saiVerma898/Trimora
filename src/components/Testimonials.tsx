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
    <section id="testimonials" className="py-[72px] md:py-[100px] bg-[var(--background)] overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
        <AnimatedSection className="text-center mb-14">
          <span className="inline-block px-3.5 py-[5px] rounded-full bg-[var(--passion-fruit)]/[0.1] text-[var(--passion-fruit)] text-[11px] font-bold uppercase tracking-[0.08em] mb-5">
            Testimonials
          </span>
          <h2
            className="text-[30px] md:text-[38px] lg:text-[44px] font-extrabold tracking-[-0.025em] leading-[1.1] text-[var(--foreground)]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            What Our Patients Say
          </h2>
          <p className="mt-4 text-[17px] text-[var(--foreground)]/50 max-w-[560px] mx-auto font-medium leading-[1.6]">
            Real stories from real patients who transformed their health with Trimora.
          </p>
        </AnimatedSection>

        {/* Scrolling testimonial rows */}
        <div className="space-y-5">
          {/* Row 1 - scrolls left */}
          <div className="relative">
            <motion.div
              animate={{ x: [0, -2280] }}
              transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
              className="flex gap-5"
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
              animate={{ x: [-2280, 0] }}
              transition={{ duration: 55, repeat: Infinity, ease: "linear" }}
              className="flex gap-5"
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
    <div className="flex-shrink-0 w-[360px] p-6 bg-white rounded-[20px] shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-shadow duration-300">
      <div className="flex items-center gap-3 mb-4">
        <div className="relative w-11 h-11 rounded-full overflow-hidden ring-2 ring-[var(--primary)]/10">
          <Image
            src={testimonial.image}
            alt={testimonial.name}
            fill
            className="object-cover"
            sizes="44px"
          />
        </div>
        <div>
          <p className="font-bold text-[14px] text-[var(--foreground)]">{testimonial.name}</p>
          <p className="text-[12px] text-[var(--primary)] font-bold">
            {testimonial.program}
          </p>
        </div>
        <div className="ml-auto flex gap-[2px]">
          {Array.from({ length: testimonial.rating }).map((_, i) => (
            <span key={i} className="text-amber-400 text-[14px]">
              ★
            </span>
          ))}
        </div>
      </div>
      <p
        className="text-[14px] text-[var(--foreground)]/65 leading-[1.65] italic font-medium"
        style={{ fontFamily: "var(--font-accent)" }}
      >
        &ldquo;{testimonial.text}&rdquo;
      </p>
    </div>
  );
}
