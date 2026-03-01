"use client";

import { useState } from "react";
import { Check, X, Sparkles, Zap, Building2, HelpCircle, ArrowRight } from "lucide-react";

const plans = [
  {
    name: "Starter",
    description: "Perfect for individual developers and small projects",
    monthlyPrice: 0,
    yearlyPrice: 0,
    icon: Sparkles,
    features: [
      { name: "1,000 API requests/month", included: true },
      { name: "Global inference (3 regions)", included: true },
      { name: "Vector storage (10MB)", included: true },
      { name: "Community support", included: true },
      { name: "Basic analytics", included: true },
      { name: "Custom embeddings", included: false },
      { name: "Priority support", included: false },
      { name: "Dedicated infrastructure", included: false },
    ],
    cta: "Start Free",
    popular: false,
  },
  {
    name: "Pro",
    description: "For growing teams needing more power",
    monthlyPrice: 99,
    yearlyPrice: 79,
    icon: Zap,
    features: [
      { name: "100,000 API requests/month", included: true },
      { name: "Global inference (all regions)", included: true },
      { name: "Vector storage (10GB)", included: true },
      { name: "Priority email support", included: true },
      { name: "Advanced analytics", included: true },
      { name: "Custom embeddings", included: true },
      { name: "Team collaboration", included: true },
      { name: "Dedicated infrastructure", included: false },
    ],
    cta: "Start Pro Trial",
    popular: true,
  },
  {
    name: "Enterprise",
    description: "For organizations requiring full control",
    monthlyPrice: null,
    yearlyPrice: null,
    icon: Building2,
    features: [
      { name: "Unlimited API requests", included: true },
      { name: "Global inference (all regions)", included: true },
      { name: "Unlimited vector storage", included: true },
      { name: "24/7 dedicated support", included: true },
      { name: "Custom analytics & reporting", included: true },
      { name: "Custom embeddings & fine-tuning", included: true },
      { name: "Team collaboration & RBAC", included: true },
      { name: "Dedicated infrastructure", included: true },
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

const faqs = [
  {
    question: "How does the pricing work?",
    answer: "We offer transparent, usage-based pricing. The Starter plan is free forever, Pro is $99/month (or $79/month billed yearly), and Enterprise is custom-priced based on your needs.",
  },
  {
    question: "Can I change plans anytime?",
    answer: "Yes! You can upgrade or downgrade your plan at any time. When upgrading, you'll get immediate access to new features. When downgrading, changes take effect at the next billing cycle.",
  },
  {
    question: "What happens if I exceed my API limits?",
    answer: "On the Starter plan, requests beyond 1,000/month will be queued. On Pro, overages are charged at $0.001/request. Enterprise plans have no overage concerns with unlimited requests.",
  },
  {
    question: "Do you offer startup or nonprofit discounts?",
    answer: "Yes! We offer 50% off Pro plans for qualified startups and nonprofits. Contact our sales team to learn more about eligibility.",
  },
];

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            Simple, <br /><span className="text-primary">Transparent</span> Pricing
          </h1>
          <p className="text-lg text-slate-400 leading-relaxed mb-8">
            Choose the plan that fits your needs. Scale as you grow with no hidden fees.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center gap-4 glass-panel rounded-full p-1.5">
            <button
              onClick={() => setIsYearly(false)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                !isYearly
                  ? "bg-primary text-black"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                isYearly
                  ? "bg-primary text-black"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Yearly
              <span className="text-xs bg-black/20 px-2 py-0.5 rounded-full">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative glass-panel rounded-3xl p-8 transition-all duration-300 ${
                plan.popular
                  ? "border-primary/50 card-ring-hover scale-105 z-10"
                  : "border-white/5 hover:border-primary/30"
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-black text-xs font-bold px-4 py-1.5 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-8">
                <div
                  className={`size-14 rounded-2xl mx-auto mb-4 flex items-center justify-center ${
                    plan.popular
                      ? "bg-primary/20 border border-primary/40"
                      : "bg-primary/10 border border-primary/20"
                  }`}
                >
                  <plan.icon
                    className={`w-7 h-7 ${plan.popular ? "text-primary" : "text-primary/80"}`}
                  />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-slate-400 text-sm">{plan.description}</p>
              </div>

              {/* Price */}
              <div className="text-center mb-8">
                {plan.monthlyPrice === null ? (
                  <div className="text-4xl font-bold text-white">Custom</div>
                ) : (
                  <>
                    <div className="flex items-end justify-center gap-1">
                      <span className="text-5xl font-bold text-white">
                        ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                      </span>
                      <span className="text-slate-400 mb-2">/month</span>
                    </div>
                    {isYearly && (
                      <p className="text-sm text-slate-500 mt-2">
                        Billed ${plan.yearlyPrice * 12}/year
                      </p>
                    )}
                  </>
                )}
              </div>

              {/* CTA Button */}
              <a
                href="/auth"
                className={`block w-full py-4 rounded-full text-center font-bold text-sm transition-all mb-8 ${
                  plan.popular
                    ? "bg-primary text-black hover:scale-105 vector-glow"
                    : "glass-panel border border-white/10 text-white hover:bg-white/5"
                }`}
              >
                {plan.cta}
              </a>

              {/* Features List */}
              <ul className="space-y-4">
                {plan.features.map((feature, fIndex) => (
                  <li
                    key={fIndex}
                    className="flex items-start gap-3 text-sm"
                  >
                    {feature.included ? (
                      <Check className="w-5 h-5 text-primary shrink-0" />
                    ) : (
                      <X className="w-5 h-5 text-slate-600 shrink-0" />
                    )}
                    <span
                      className={feature.included ? "text-slate-300" : "text-slate-600"}
                    >
                      {feature.name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Enterprise CTA */}
        <div className="glass-panel rounded-3xl p-12 text-center relative overflow-hidden card-ring mb-20">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          
          <div className="relative z-10 max-w-2xl mx-auto">
            <Building2 className="w-12 h-12 text-primary mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">Need a custom solution?</h2>
            <p className="text-slate-400 mb-8">
              Our enterprise team will work with you to create a tailored plan that meets your specific requirements, including custom SLAs, dedicated infrastructure, and on-premise deployment options.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="/contact"
                className="w-full sm:w-auto px-8 py-4 bg-primary text-black font-bold rounded-full hover:scale-105 transition-transform vector-glow"
              >
                Talk to Sales
              </a>
              <a
                href="#faq"
                className="w-full sm:w-auto px-8 py-4 glass-panel border border-white/10 text-white font-medium rounded-full hover:bg-white/5 transition-colors"
              >
                View FAQ
              </a>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div id="faq" className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-slate-400">
              Everything you need to know about our pricing and plans.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="glass-panel rounded-2xl border border-white/5 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left"
                >
                  <span className="font-medium text-white pr-4">{faq.question}</span>
                  <HelpCircle
                    className={`w-5 h-5 text-slate-500 shrink-0 transition-transform ${
                      openFaq === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-5">
                    <p className="text-slate-400 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center mt-16">
          <p className="text-slate-400 mb-6">Still have questions?</p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all"
          >
            Contact our team <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </main>
  );
}
