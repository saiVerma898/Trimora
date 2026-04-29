"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { trackEvent } from "@/lib/analytics";

/* ──────────────────────────────────────────────────────────
   TYPES
   ────────────────────────────────────────────────────────── */

type FormState = {
  feet?: string;
  inches?: string;
  weight?: string;
  goalWeight?: string;
  sex?: string;
  priority?: string;
  motivation?: string;
  pace?: string;
  sleep?: string;
  sleepHours?: string;
  conditions?: string[];
  weightChange?: string;
  motivated?: string;
  firstName?: string;
  lastName?: string;
  state?: string;
  email?: string;
  phone?: string;
  agree?: boolean;
};

type StepGroup = "Start" | "Preliminary" | "Health" | "Details" | "Eligibility";

interface StepDef {
  id: string;
  group: StepGroup;
  render: (ctx: StepCtx) => React.ReactNode;
}

interface StepCtx {
  data: FormState;
  set: (patch: Partial<FormState>) => void;
  next: () => void;
  back: () => void;
  canNext: boolean;
}

/* ──────────────────────────────────────────────────────────
   PRIMITIVES
   ────────────────────────────────────────────────────────── */

const ACCENT = "#2e936f";
const ACCENT_LIGHT = "#eaf6ee";
const TEXT = "#1f3328";
const SUBTLE = "#75857c";

function H1({ children, accent }: { children: React.ReactNode; accent?: string }) {
  return (
    <h1
      className="text-[26px] sm:text-[30px] md:text-[36px] leading-[1.15] tracking-[-0.01em] font-semibold mb-3"
      style={{ color: TEXT, fontFamily: "'Lora', Georgia, serif" }}
    >
      {accent ? (
        <>
          {children} <span style={{ color: ACCENT, fontStyle: "italic" }}>{accent}</span>
        </>
      ) : (
        children
      )}
    </h1>
  );
}

function Subtitle({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[15px] md:text-[17px] font-light leading-[1.55] mb-7" style={{ color: SUBTLE }}>
      {children}
    </p>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[18px] md:text-[20px] mb-5 font-medium" style={{ color: TEXT, fontFamily: "'Lora', Georgia, serif" }}>
      {children}
    </p>
  );
}

function Note({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[13px] md:text-[14px] font-light mb-5" style={{ color: SUBTLE }}>
      {children}
    </p>
  );
}

/* Reusable hero image card for quiz steps */
function StepImage({
  src,
  alt,
  ratio = "16/9",
  rounded = 14,
}: {
  src: string;
  alt: string;
  ratio?: string;
  rounded?: number;
}) {
  return (
    <div
      className="relative w-full overflow-hidden mb-6"
      style={{
        aspectRatio: ratio,
        borderRadius: rounded,
        border: "1px solid #e3e7e4",
      }}
    >
      <Image src={src} alt={alt} fill className="object-cover" sizes="(min-width: 768px) 700px, 100vw" />
    </div>
  );
}

/* Card buttons (radio/checkbox cards) */
interface CardOption {
  label: string;
  value: string;
  icon?: string; // emoji
}

function RadioCards({
  options,
  value,
  onChange,
  cols = 1,
}: {
  options: CardOption[];
  value?: string;
  onChange: (v: string) => void;
  cols?: 1 | 2 | 3;
}) {
  const gridClass = cols === 1 ? "grid-cols-1" : cols === 2 ? "grid-cols-2" : "grid-cols-2 sm:grid-cols-3";
  return (
    <div className={`grid ${gridClass} gap-3`}>
      {options.map((opt) => {
        const selected = value === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className="flex items-center gap-3 px-4 py-4 rounded-[10px] bg-white text-left transition-all"
            style={{
              border: `1px solid ${selected ? ACCENT : "#e3e7e4"}`,
              boxShadow: selected ? `inset 0 0 0 1px ${ACCENT}` : "none",
              color: TEXT,
            }}
          >
            {/* radio circle */}
            <span
              className="flex-shrink-0 rounded-full"
              style={{
                width: 22,
                height: 22,
                border: `2px solid ${selected ? ACCENT : "#cdd5cf"}`,
                background: selected ? ACCENT : "transparent",
                boxShadow: selected ? `inset 0 0 0 3px white` : "none",
                transition: "all 0.2s",
              }}
            />
            {opt.icon && <span className="text-[22px]">{opt.icon}</span>}
            <span className="text-[15px] md:text-[16px] font-medium flex-1">{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
}

function CheckCards({
  options,
  values,
  onToggle,
}: {
  options: CardOption[];
  values: string[];
  onToggle: (v: string) => void;
}) {
  return (
    <div className="space-y-2.5">
      {options.map((opt) => {
        const checked = values.includes(opt.value);
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onToggle(opt.value)}
            className="w-full flex items-center gap-3 px-4 py-4 rounded-[10px] bg-white text-left transition-all"
            style={{
              border: `1px solid ${checked ? ACCENT : "#e3e7e4"}`,
              boxShadow: checked ? `inset 0 0 0 1px ${ACCENT}` : "none",
              color: TEXT,
            }}
          >
            <span
              className="flex-shrink-0 rounded"
              style={{
                width: 22,
                height: 22,
                border: `2px solid ${checked ? ACCENT : "#cdd5cf"}`,
                background: checked ? ACCENT : "transparent",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.2s",
              }}
            >
              {checked && (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </span>
            {opt.icon && <span className="text-[20px]">{opt.icon}</span>}
            <span className="text-[15px] md:text-[16px] font-medium flex-1">{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
}

function NumberInput({
  value,
  onChange,
  placeholder,
  min,
  max,
  suffix,
}: {
  value?: string;
  onChange: (v: string) => void;
  placeholder?: string;
  min?: number;
  max?: number;
  suffix?: string;
}) {
  return (
    <div className="relative">
      <input
        type="number"
        inputMode="numeric"
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        min={min}
        max={max}
        className="block w-full rounded-[6px] bg-white px-4 py-3.5 text-[16px] font-medium focus:outline-none transition-colors"
        style={{
          border: `1px solid #cdd5cf`,
          color: TEXT,
        }}
        onFocus={(e) => (e.currentTarget.style.borderColor = ACCENT)}
        onBlur={(e) => (e.currentTarget.style.borderColor = "#cdd5cf")}
      />
      {suffix && (
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[14px] font-medium pointer-events-none" style={{ color: SUBTLE }}>
          {suffix}
        </span>
      )}
    </div>
  );
}

function TextInput({
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  value?: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <input
      type={type}
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="block w-full rounded-[6px] bg-white px-4 py-3.5 text-[16px] font-medium focus:outline-none transition-colors"
      style={{
        border: `1px solid #cdd5cf`,
        color: TEXT,
      }}
      onFocus={(e) => (e.currentTarget.style.borderColor = ACCENT)}
      onBlur={(e) => (e.currentTarget.style.borderColor = "#cdd5cf")}
    />
  );
}

/* ──────────────────────────────────────────────────────────
   STEPS DEFINITION
   ────────────────────────────────────────────────────────── */

const STATES = [
  "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA","KS",
  "KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY",
  "NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY",
];

function calcBmi(feet?: string, inches?: string, weight?: string): number | null {
  const ft = Number(feet);
  const inch = Number(inches);
  const w = Number(weight);
  if (!ft || isNaN(ft) || isNaN(inch) || !w) return null;
  const totalIn = ft * 12 + (inch || 0);
  if (totalIn <= 0) return null;
  return Math.round(((w / (totalIn * totalIn)) * 703) * 100) / 100;
}

const steps: StepDef[] = [
  /* ─── 1. height_weight ─── */
  {
    id: "height_weight",
    group: "Start",
    render: ({ data, set }) => (
      <>
        <StepImage src="/images/quiz/hero-trim.png" alt="Confident woman achieving her health goals" ratio="16/10" />
        <H1 accent="without restrictive diets and exercise.">Reach your goal weight fast</H1>
        <Subtitle>
          Let&rsquo;s calculate your BMI to make sure you&rsquo;re a good candidate for medical weight loss.
        </Subtitle>
        <Label>What is your height and weight?</Label>
        <div className="space-y-3 max-w-[420px]">
          <NumberInput value={data.feet} onChange={(v) => set({ feet: v })} placeholder="Feet (e.g. 5)" min={4} max={7} suffix="ft" />
          <NumberInput value={data.inches} onChange={(v) => set({ inches: v })} placeholder="Inches (e.g. 6)" min={0} max={11} suffix="in" />
          <NumberInput value={data.weight} onChange={(v) => set({ weight: v })} placeholder="Weight (e.g. 200)" min={100} max={500} suffix="lbs" />
        </div>
      </>
    ),
  },

  /* ─── 2. weight_goal ─── */
  {
    id: "weight_goal",
    group: "Start",
    render: ({ data, set }) => {
      const bmi = calcBmi(data.feet, data.inches, data.weight);
      return (
        <>
          {bmi && (
            <div className="mb-7 px-4 py-3 rounded-[10px]" style={{ background: ACCENT_LIGHT, color: TEXT }}>
              <p className="text-[14px] font-medium">
                <strong>Perfect!</strong> With a BMI of <strong>{bmi}</strong>, we can continue.
              </p>
            </div>
          )}
          <H1 accent="Your goal is our goal.">We&rsquo;re in this together.</H1>
          <StepImage src="/images/quiz/goal-target.png" alt="Setting your weight loss goal" ratio="16/9" />
          <Label>What is your goal weight?</Label>
          <div className="max-w-[420px]">
            <NumberInput value={data.goalWeight} onChange={(v) => set({ goalWeight: v })} placeholder="e.g. 160" min={100} max={400} suffix="lbs" />
          </div>
          <div className="mt-10 grid grid-cols-3 gap-2 text-center">
            <Stat top="500K+" label="Patients" />
            <Stat top="93%" label="Keep weight off" />
            <Stat top="18%" label="Avg weight loss" />
          </div>
        </>
      );
    },
  },

  /* ─── 3. sex ─── */
  {
    id: "sex",
    group: "Start",
    render: ({ data, set }) => (
      <>
        <StepImage src="/images/quiz/doctor-friendly.png" alt="A friendly Trimora physician" ratio="16/9" />
        <H1 accent="your unique needs,">Medication can be tailored to</H1>
        <Subtitle>so let&rsquo;s get to know you a little better.</Subtitle>
        <Label>Are you male or female?</Label>
        <Note>This helps us understand your hormones and body so we can assess you better.</Note>
        <RadioCards
          cols={2}
          value={data.sex}
          onChange={(v) => set({ sex: v })}
          options={[
            { label: "Male", value: "male", icon: "♂️" },
            { label: "Female", value: "female", icon: "♀️" },
          ]}
        />
      </>
    ),
  },

  /* ─── 4. priority ─── */
  {
    id: "priority",
    group: "Start",
    render: ({ data, set }) => (
      <>
        <StepImage src="/images/quiz/fitness-pace.png" alt="Athletic woman lacing running shoes" ratio="16/9" />
        <H1 accent="most important for you.">We can help with all of these, but choose the</H1>
        <Label>Which of these is your priority?</Label>
        <RadioCards
          value={data.priority}
          onChange={(v) => set({ priority: v })}
          options={[
            { label: "Lose Weight", value: "lose", icon: "⚖️" },
            { label: "Gain Muscle", value: "muscle", icon: "💪" },
            { label: "Maintain my current body", value: "maintain", icon: "✨" },
          ]}
        />
      </>
    ),
  },

  /* ─── 5. ranking — interstitial press card ─── */
  {
    id: "ranking",
    group: "Preliminary",
    render: () => (
      <>
        <H1 accent="ranked among the best">Trimora is proud to be</H1>
        <Subtitle>Featured by leading publications and trusted by 500,000+ patients across the country.</Subtitle>
        <div className="rounded-[14px] bg-white p-6 md:p-8 mt-6" style={{ border: "1px solid #e3e7e4" }}>
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] mb-5" style={{ color: SUBTLE }}>
            Featured In
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-5 gap-x-4 items-center">
            {[
              { name: "Forbes", style: { fontFamily: "Georgia, serif", fontWeight: 900, fontStyle: "italic", fontSize: 22 } },
              { name: "BLOOMBERG", style: { fontFamily: "Helvetica, sans-serif", fontWeight: 900, fontSize: 13, letterSpacing: "0.04em" } },
              { name: "Yahoo!", style: { fontFamily: "Helvetica, sans-serif", fontWeight: 900, fontStyle: "italic", fontSize: 22, letterSpacing: "-0.04em" } },
              { name: "Healthline", style: { fontFamily: "Helvetica, sans-serif", fontWeight: 700, fontSize: 16, letterSpacing: "-0.02em" } },
              { name: "WebMD", style: { fontFamily: "Helvetica, sans-serif", fontWeight: 800, fontSize: 18, letterSpacing: "-0.03em" } },
              { name: "The New York Times", style: { fontFamily: "Georgia, serif", fontWeight: 700, fontSize: 13 } },
            ].map((m) => (
              <span key={m.name} className="text-center" style={{ color: TEXT, opacity: 0.7, ...m.style }}>
                {m.name}
              </span>
            ))}
          </div>
        </div>
        <p className="mt-5 text-[12px] font-light text-center" style={{ color: SUBTLE }}>
          Tap Next to continue your assessment.
        </p>
      </>
    ),
  },

  /* ─── 6. magic — science interstitial ─── */
  {
    id: "magic",
    group: "Preliminary",
    render: ({ data }) => (
      <>
        <H1 accent="metabolic science.">It feels like magic, but it&rsquo;s</H1>
        <Subtitle>
          On average, Trimora patients lose over <strong style={{ color: TEXT }}>20% of their body weight</strong>.
        </Subtitle>
        <StepImage src="/images/quiz/science-chart.png" alt="Weight loss progress curve" ratio="16/9" />
        <p className="mt-1 text-[15px] md:text-[16px]" style={{ color: SUBTLE }}>
          GLP-1 medications are <strong style={{ color: TEXT }}>extremely effective</strong> — offering a strong path
          {data.goalWeight ? <> toward your <strong style={{ color: TEXT }}>{data.goalWeight} lb</strong> goal weight.</> : <>.</>}
        </p>
      </>
    ),
  },

  /* ─── 7. testimonial ─── */
  {
    id: "testimonial",
    group: "Preliminary",
    render: () => (
      <>
        <H1 accent="I dropped 28 pounds of fat">It really does work — once it kicked in,</H1>
        <Subtitle>and haven&rsquo;t looked back. Thank you Trimora!</Subtitle>
        <StepImage src="/images/funnel/transformation-1.png" alt="Real Trimora patient transformation" ratio="4/3" />
        <p className="-mt-2 text-[14px] italic font-light" style={{ color: SUBTLE }}>
          <strong style={{ color: TEXT }}>Tania</strong> took control and <strong style={{ color: TEXT }}>doubled her confidence</strong> in only 2 months.
        </p>
      </>
    ),
  },

  /* ─── 8. motivation (why) ─── */
  {
    id: "motivation",
    group: "Preliminary",
    render: ({ data, set }) => (
      <>
        <StepImage src="/images/quiz/motivation.png" alt="Setting intentions" ratio="16/9" />
        <H1 accent="motivation.">Improving your life requires</H1>
        <Label>What is your primary reason for taking weight loss seriously?</Label>
        <RadioCards
          value={data.motivation}
          onChange={(v) => set({ motivation: v })}
          options={[
            { label: "I want to live longer", value: "longer", icon: "⏳" },
            { label: "I want to feel and look better", value: "look", icon: "✨" },
            { label: "I want to reduce my current health issues", value: "health", icon: "❤️" },
            { label: "All of these", value: "all", icon: "🎯" },
          ]}
        />
      </>
    ),
  },

  /* ─── 9. pace ─── */
  {
    id: "pace",
    group: "Preliminary",
    render: ({ data, set }) => {
      const goal = Number(data.goalWeight);
      const start = Number(data.weight);
      const diff = !isNaN(goal) && !isNaN(start) && start > goal ? start - goal : null;
      return (
        <>
          <H1 accent={diff ? `${(diff * 0.06).toFixed(1)} to ${(diff * 0.07).toFixed(1)} lbs per week.` : "1.5 to 2 lbs per week."}>
            With medication, you&rsquo;ll lose
          </H1>
          <StepImage src="/images/quiz/healthy-meal.png" alt="A healthy plated meal" ratio="16/9" />
          <Label>How is that pace for you?</Label>
          <RadioCards
            value={data.pace}
            onChange={(v) => set({ pace: v })}
            options={[
              { label: "Works for me", value: "good", icon: "✅" },
              { label: "I want it faster", value: "faster", icon: "🏃" },
              { label: "That's too fast", value: "slow", icon: "⏱️" },
            ]}
          />
        </>
      );
    },
  },

  /* ─── 10. sleep ─── */
  {
    id: "sleep",
    group: "Preliminary",
    render: ({ data, set }) => (
      <>
        <StepImage src="/images/quiz/sleep.png" alt="Restful morning bedroom" ratio="16/9" />
        <H1 accent="cortisol and efficiency.">How you sleep tells us a lot about your</H1>
        <Label>How is your sleep, overall?</Label>
        <RadioCards
          value={data.sleep}
          onChange={(v) => set({ sleep: v })}
          options={[
            { label: "Pretty good", value: "good", icon: "😴" },
            { label: "A bit restless", value: "restless", icon: "😐" },
            { label: "I don't sleep well", value: "poor", icon: "😩" },
          ]}
        />
      </>
    ),
  },

  /* ─── 11. health_conditions ─── */
  {
    id: "health_conditions",
    group: "Health",
    render: ({ data, set }) => {
      const opts: CardOption[] = [
        { label: "None of these", value: "none" },
        { label: "End-stage kidney or liver disease", value: "kidney_liver" },
        { label: "Current suicidal thoughts", value: "suicidal" },
        { label: "Active cancer treatment (within 5 years)", value: "cancer" },
        { label: "Severe gastrointestinal condition", value: "gi" },
        { label: "Substance use disorder", value: "substance" },
      ];
      const current = data.conditions || [];
      const toggle = (v: string) => {
        let next: string[];
        if (v === "none") next = current.includes("none") ? [] : ["none"];
        else next = current.includes(v) ? current.filter((x) => x !== v) : [...current.filter((x) => x !== "none"), v];
        set({ conditions: next });
      };
      return (
        <>
          <StepImage src="/images/quiz/medical-clipboard.png" alt="Medical safety review" ratio="16/9" />
          <H1 accent="safe,">GLP-1 is</H1>
          <Subtitle>but these health conditions might prevent you from being prescribed.</Subtitle>
          <Note>Your answers are completely confidential and protected by HIPAA.</Note>
          <Label>Do any of these apply to you?</Label>
          <CheckCards options={opts} values={current} onToggle={toggle} />
        </>
      );
    },
  },

  /* ─── 12. weight_change ─── */
  {
    id: "weight_change",
    group: "Health",
    render: ({ data, set }) => (
      <>
        <StepImage src="/images/quiz/scale.png" alt="Bathroom scale" ratio="16/9" />
        <H1 accent="last year?">Has your weight changed in the</H1>
        <RadioCards
          value={data.weightChange}
          onChange={(v) => set({ weightChange: v })}
          options={[
            { label: "Lost a significant amount", value: "lost_lot" },
            { label: "Lost a little", value: "lost_some" },
            { label: "About the same", value: "same" },
            { label: "Gained a little", value: "gained_some" },
            { label: "Gained a significant amount", value: "gained_lot" },
          ]}
        />
      </>
    ),
  },

  /* ─── 13. testimonial 2 ─── */
  {
    id: "testimonial_2",
    group: "Health",
    render: () => (
      <>
        <H1 accent="the weight vanished">Being a mom made it so hard, but</H1>
        <Subtitle>with GLP-1 medication.</Subtitle>
        <StepImage src="/images/funnel/transformation-2.png" alt="Real Trimora patient transformation" ratio="4/3" />
        <p className="-mt-2 text-[14px] italic font-light" style={{ color: SUBTLE }}>
          <strong style={{ color: TEXT }}>Daiene</strong> lost <strong style={{ color: TEXT }}>41 lbs</strong> and came off her blood pressure medication.
        </p>
      </>
    ),
  },

  /* ─── 14. motivated ─── */
  {
    id: "motivated",
    group: "Details",
    render: ({ data, set }) => (
      <>
        <StepImage src="/images/quiz/support-chat.png" alt="Care team support chat" ratio="16/9" />
        <H1 accent="state of mind.">Let&rsquo;s better understand your current</H1>
        <Label>How motivated are you to reach your weight goal?</Label>
        <RadioCards
          value={data.motivated}
          onChange={(v) => set({ motivated: v })}
          options={[
            { label: "I'm Ready!", value: "ready", icon: "🚀" },
            { label: "I'm feeling hopeful", value: "hopeful", icon: "🙂" },
            { label: "I'm cautious", value: "cautious", icon: "🤔" },
          ]}
        />
      </>
    ),
  },

  /* ─── 15. medical_review (name + state) ─── */
  {
    id: "medical_review",
    group: "Eligibility",
    render: ({ data, set }) => (
      <>
        <StepImage src="/images/quiz/doctor-friendly.png" alt="Trimora medical provider" ratio="16/9" />
        <H1>Your medical checkup</H1>
        <Subtitle>
          You are a strong candidate with a <strong style={{ color: ACCENT }}>94% chance</strong> of treatment success if you qualify.
        </Subtitle>
        <Note>Your information is never shared and is protected by HIPAA.</Note>
        <div className="space-y-3 max-w-[480px]">
          <TextInput value={data.firstName} onChange={(v) => set({ firstName: v })} placeholder="First name" />
          <TextInput value={data.lastName} onChange={(v) => set({ lastName: v })} placeholder="Last name" />
          <select
            value={data.state || ""}
            onChange={(e) => set({ state: e.target.value })}
            className="block w-full rounded-[6px] bg-white px-4 py-3.5 text-[16px] font-medium focus:outline-none transition-colors appearance-none"
            style={{ border: `1px solid #cdd5cf`, color: data.state ? TEXT : SUBTLE }}
          >
            <option value="">What state will your medication be shipped to?</option>
            {STATES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </>
    ),
  },

  /* ─── 16. contact (final step) ─── */
  {
    id: "contact",
    group: "Eligibility",
    render: ({ data, set }) => (
      <>
        <StepImage src="/images/quiz/handoff-package.png" alt="Discreet medication delivery" ratio="16/9" />
        <H1>
          {data.firstName ? `${data.firstName}, how can we reach you?` : "How can we reach you?"}
        </H1>
        <Subtitle>Our medical team and pharmacy use email and text to communicate with patients.</Subtitle>
        <div className="space-y-3 max-w-[480px]">
          <TextInput value={data.email} onChange={(v) => set({ email: v })} placeholder="email@example.com" type="email" />
          <TextInput value={data.phone} onChange={(v) => set({ phone: v })} placeholder="(555) 123-4567" type="tel" />
          <label className="flex items-start gap-3 mt-4 cursor-pointer">
            <input
              type="checkbox"
              checked={!!data.agree}
              onChange={(e) => set({ agree: e.target.checked })}
              className="mt-1 w-4 h-4 cursor-pointer"
              style={{ accentColor: ACCENT }}
            />
            <span className="text-[12px] font-light leading-[1.55]" style={{ color: SUBTLE }}>
              I understand my information is protected by HIPAA, agree to the terms and privacy policy, and consent to be contacted by Trimora and its medical partners. I can opt out at any time.
            </span>
          </label>
        </div>
      </>
    ),
  },
];

/* Helpers */
function Stat({ top, label }: { top: string; label: string }) {
  return (
    <div className="rounded-[10px] py-4 px-2" style={{ background: ACCENT_LIGHT }}>
      <p className="text-[22px] md:text-[26px] font-bold" style={{ color: ACCENT, fontFamily: "'Lora', Georgia, serif" }}>{top}</p>
      <p className="text-[11px] font-medium mt-0.5" style={{ color: TEXT, opacity: 0.7 }}>{label}</p>
    </div>
  );
}

/* Validation: when can user click Next? */
function isStepValid(stepId: string, data: FormState): boolean {
  switch (stepId) {
    case "height_weight":
      return !!data.feet && !!data.weight;
    case "weight_goal":
      return !!data.goalWeight;
    case "sex":
      return !!data.sex;
    case "priority":
      return !!data.priority;
    case "motivation":
      return !!data.motivation;
    case "pace":
      return !!data.pace;
    case "sleep":
      return !!data.sleep;
    case "health_conditions":
      return (data.conditions?.length || 0) > 0;
    case "weight_change":
      return !!data.weightChange;
    case "motivated":
      return !!data.motivated;
    case "medical_review":
      return !!data.firstName && !!data.lastName && !!data.state;
    case "contact":
      return !!data.email && !!data.phone && !!data.agree;
    // Interstitials (no input required)
    case "ranking":
    case "magic":
    case "testimonial":
    case "testimonial_2":
      return true;
    default:
      return true;
  }
}

/* ──────────────────────────────────────────────────────────
   PROGRESS BAR
   ────────────────────────────────────────────────────────── */

const GROUPS: StepGroup[] = ["Start", "Preliminary", "Health", "Details", "Eligibility"];

function ProgressBar({ currentGroup }: { currentGroup: StepGroup }) {
  const activeIdx = GROUPS.indexOf(currentGroup);
  return (
    <div className="bg-white border-b border-black/[0.05] py-4 px-4 sticky top-0 z-30">
      <div className="max-w-[700px] mx-auto flex items-center justify-between gap-2">
        {GROUPS.map((g, i) => {
          const isActive = i === activeIdx;
          const isPast = i < activeIdx;
          const dotColor = isActive ? ACCENT : isPast ? ACCENT : "#cdd5cf";
          const fillColor = isActive ? ACCENT : isPast ? ACCENT : "transparent";
          return (
            <div key={g} className="flex items-center flex-1 last:flex-none">
              <div className="flex items-center gap-1.5 md:gap-2">
                <span
                  className="rounded-full"
                  style={{
                    width: 14,
                    height: 14,
                    border: `2px solid ${dotColor}`,
                    background: fillColor,
                    transition: "all 0.3s",
                  }}
                />
                <span
                  className={`text-[10px] md:text-[12px] font-medium whitespace-nowrap ${
                    isActive ? "" : "hidden lg:inline"
                  }`}
                  style={{ color: isActive || isPast ? ACCENT : SUBTLE }}
                >
                  {g}
                </span>
              </div>
              {i < GROUPS.length - 1 && (
                <div
                  className="flex-1 h-[2px] mx-1.5 md:mx-2.5 rounded"
                  style={{
                    background: i < activeIdx ? ACCENT : "#e3e7e4",
                    transition: "background 0.3s",
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   MAIN PAGE
   ────────────────────────────────────────────────────────── */

export default function IntakePage() {
  const [stepIdx, setStepIdx] = useState(0);
  const [data, setData] = useState<FormState>({});

  const step = steps[stepIdx];
  const canNext = useMemo(() => isStepValid(step.id, data), [step.id, data]);

  useEffect(() => {
    trackEvent("intake_started");
  }, []);

  useEffect(() => {
    trackEvent("intake_step_viewed", { step: stepIdx + 1, id: step.id, group: step.group });
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    }
  }, [stepIdx, step.id, step.group]);

  const set = (patch: Partial<FormState>) => setData((d) => ({ ...d, ...patch }));

  const next = () => {
    if (!canNext) return;
    trackEvent("intake_step_completed", { step: stepIdx + 1, id: step.id });
    if (stepIdx >= steps.length - 1) {
      trackEvent("intake_completed", { ...data });
      window.location.href = "/intake/approved";
      return;
    }
    setStepIdx((i) => i + 1);
  };

  const back = () => {
    if (stepIdx === 0) return;
    trackEvent("intake_step_back", { from: stepIdx + 1 });
    setStepIdx((i) => Math.max(0, i - 1));
  };

  const ctx: StepCtx = { data, set, next, back, canNext };

  return (
    <main
      className="min-h-screen pb-44"
      style={{
        background: "#fafbfc",
        fontFamily: "'Lora', Georgia, serif",
      }}
    >
      {/* Header */}
      <header className="bg-white py-4 px-4">
        <div className="max-w-[700px] mx-auto flex items-center justify-between">
          {stepIdx > 0 ? (
            <button
              onClick={back}
              className="flex items-center gap-1.5 text-[13px] font-medium px-2 py-1 -ml-2"
              style={{ color: ACCENT }}
              aria-label="Go back"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
              Back
            </button>
          ) : (
            <div className="w-[60px]" />
          )}
          <a href="/" className="flex items-center gap-2">
            <span
              className="text-[22px] font-bold tracking-[-0.01em]"
              style={{ color: TEXT, fontFamily: "'Lora', Georgia, serif" }}
            >
              Trimora
            </span>
          </a>
          <div className="w-[60px] flex justify-end">
            <span className="text-[11px] font-medium" style={{ color: SUBTLE }}>
              {stepIdx + 1} / {steps.length}
            </span>
          </div>
        </div>
      </header>

      {/* Progress */}
      <ProgressBar currentGroup={step.group} />

      {/* Content */}
      <div className="max-w-[700px] mx-auto px-4 md:px-6 pt-7 md:pt-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={step.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
          >
            {step.render(ctx)}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Sticky Next CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-20 px-4 pb-5 pt-3 pointer-events-none"
        style={{
          background: "linear-gradient(to top, #fafbfc 70%, rgba(250,251,252,0))",
        }}
      >
        <div className="max-w-[700px] mx-auto pointer-events-auto">
          <button
            onClick={next}
            disabled={!canNext}
            className="w-full py-[14px] rounded-full text-[16px] font-semibold tracking-[0.01em] transition-all duration-200 flex items-center justify-center gap-2"
            style={{
              background: canNext ? ACCENT : "#cdd5cf",
              color: "white",
              boxShadow: canNext ? "0 6px 24px rgba(46, 147, 111, 0.25)" : "none",
              cursor: canNext ? "pointer" : "not-allowed",
            }}
          >
            {stepIdx === steps.length - 1 ? "Submit my application" : "Next"}
            {stepIdx < steps.length - 1 && (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            )}
          </button>
          <p className="mt-2.5 text-center text-[10px] font-light tracking-[0.04em]" style={{ color: SUBTLE }}>
            HIPAA Protected · 256-bit encrypted
          </p>
        </div>
      </div>
    </main>
  );
}
