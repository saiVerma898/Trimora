"use client";

import { motion } from "framer-motion";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { trackEvent } from "@/lib/analytics";

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [tracked, setTracked] = useState(false);

  useEffect(() => {
    if (sessionId && !tracked) {
      trackEvent("checkout_completed", { session_id: sessionId });
      setTracked(true);
    }
  }, [sessionId, tracked]);

  return (
    <main className="min-h-screen bg-[#f5f0e8] flex items-center justify-center px-5 py-16" style={{ fontFamily: "'Red Hat Text', sans-serif" }}>
      <div className="max-w-[520px] mx-auto text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.6 }}
          className="w-[88px] h-[88px] rounded-full bg-[#2e936f] flex items-center justify-center mx-auto mb-7"
        >
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </motion.div>

        <h1
          className="text-[30px] md:text-[38px] font-extrabold tracking-[-0.02em] text-[#242220] mb-3"
          style={{ fontFamily: "var(--font-accent)" }}
        >
          You&rsquo;re in! Welcome to Trimora.
        </h1>
        <p className="text-[16px] text-[#242220]/55 font-medium leading-[1.6] mb-8">
          Your payment is confirmed and your prescription plan is officially active. A licensed Trimora provider will reach out within 24 hours to confirm your treatment plan.
        </p>

        <div className="bg-white rounded-[20px] p-6 shadow-sm mb-8 text-left">
          <p className="text-[12px] font-bold text-[#242220]/45 uppercase tracking-[0.06em] mb-4">What happens next</p>
          {[
            "Provider reviews your evaluation and treatment plan",
            "You receive a welcome email with your patient portal access",
            "Medication ships to your door with free expedited delivery",
            "24/7 support available whenever you need it",
          ].map((s, i) => (
            <div key={i} className="flex items-start gap-3 mb-3 last:mb-0">
              <div className="w-[24px] h-[24px] rounded-full bg-[#2e936f] flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-[11px] font-bold">{i + 1}</span>
              </div>
              <span className="text-[14px] text-[#242220]/70 font-medium leading-[1.5]">{s}</span>
            </div>
          ))}
        </div>

        <a
          href="/"
          className="inline-block px-9 py-3.5 rounded-full bg-[#2e936f] text-white font-bold text-[15px] hover:bg-[#257a5c] transition-all"
        >
          Back to Trimora
        </a>

        {sessionId && (
          <p className="mt-6 text-[11px] text-[#242220]/30 font-medium font-mono">Order ID: {sessionId.slice(0, 24)}…</p>
        )}
      </div>
    </main>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f5f0e8]" />}>
      <SuccessContent />
    </Suspense>
  );
}
