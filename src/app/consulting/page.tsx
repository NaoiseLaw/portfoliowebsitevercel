import BlurFade from "@/components/magicui/blur-fade";
import { Badge } from "@/components/ui/badge";
import { DATA } from "@/data/resume";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Consulting",
  description:
    "AI consulting for teams that want AI to actually work — onboarding, automation, agent design, and knowledge architecture.",
  openGraph: {
    title: "Consulting | Naoise Law",
    description:
      "AI consulting for teams that want AI to actually work — onboarding, automation, agent design, and knowledge architecture.",
    url: `${DATA.url}/consulting`,
  },
};

const BLUR_FADE_DELAY = 0.04;

const services = [
  {
    title: "AI Enablement & Onboarding",
    description:
      "Get your team actually using AI — not just signed up to it. I build personalised onboarding programmes, skill libraries, and 1:1 coaching sessions that stick. One sales leader I worked with reported a 10-13× productivity improvement within 8 weeks.",
    tags: ["Windsurf", "Claude", "1:1 Coaching", "Skill Libraries"],
  },
  {
    title: "Automation Design",
    description:
      "End-to-end automation built for your actual workflows — not a template that half-fits. I design, build, test, and deploy automations across finance, people, sales, and operations using n8n, Zapier, and custom API integrations.",
    tags: ["n8n", "Zapier", "Microsoft Graph", "Webhooks"],
  },
  {
    title: "AI Agent Architecture",
    description:
      "Multi-agent systems that do real work: OKR management, notification engines, quality-checking pipelines, digest generation. I build agents that run reliably in production — not demos that fall over under real conditions.",
    tags: ["Notion AI", "Claude Agents", "Multi-Agent Systems", "Production"],
  },
  {
    title: "AI Education & Exec Enablement",
    description:
      "From weekly AI Round Tables to CIO briefings, I help leadership understand AI practically and strategically. I translate the technical into decisions — without the hype.",
    tags: ["Workshops", "Exec Briefings", "AI Strategy", "Change Management"],
  },
  {
    title: "AI Knowledge Architecture",
    description:
      "Your AI is only as good as what it knows. I design and build context libraries, knowledge bases, and shared memory systems that give your AI agents the institutional knowledge they need to be genuinely useful.",
    tags: ["Context Libraries", "Knowledge Bases", "Shared Memory", "RAG"],
  },
  {
    title: "Advisory & Retainer",
    description:
      "Ongoing strategic partnership — vendor evaluation, tool selection, architecture reviews, and monthly AI direction-setting. For teams scaling fast and wanting a clear head on their AI stack.",
    tags: ["Vendor Management", "Architecture Review", "AI Strategy", "Retainer"],
  },
];

const proof = [
  {
    metric: "25+ hrs/week",
    label: "Saved across a 250-person company through 11 live automations",
  },
  {
    metric: "10-13×",
    label: "Productivity improvement for one sales leader within 8 weeks of AI onboarding",
  },
  {
    metric: "40+ people",
    label: "Enabled across 7 teams with personalised AI tooling packages",
  },
  {
    metric: "18 agents",
    label: "Across 3 production multi-agent systems, including a company-wide OKR platform",
  },
];

const quotes = [
  {
    text: "Laser focused on execution and velocity... commitment to building solutions that don't just work today, but endure.",
    attribution: "Line Manager",
  },
  {
    text: "Genuinely impressed by your approach, your way of thinking, and the strong customer-centric lens. This work will have a meaningful impact on both the business and our people.",
    attribution: "People & OKR Lead",
  },
  {
    text: "Amazing how much you've achieved in the relatively short time you've been here.",
    attribution: "Senior Engineer",
  },
];

export default function ConsultingPage() {
  return (
    <main className="flex flex-col min-h-[100dvh] space-y-16">
      {/* Hero */}
      <section id="consulting-hero">
        <div className="space-y-4">
          <BlurFade delay={BLUR_FADE_DELAY}>
            <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
              Law Labs
            </div>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 2}>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Most teams have AI tools.
              <br />
              Few have AI that actually works.
            </h1>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 3}>
            <p className="text-muted-foreground text-lg max-w-xl">
              That&apos;s the gap I close. I help companies get real,
              measurable value from their AI investment — through onboarding,
              automation, agent design, and knowledge architecture.
            </p>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 4}>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                href={`mailto:${DATA.contact.email}`}
                className="inline-flex items-center rounded-md bg-foreground text-background px-4 py-2 text-sm font-medium hover:opacity-90 transition"
              >
                Book a free 30-min call →
              </Link>
              <Link
                href="/#contact"
                className="inline-flex items-center rounded-md border px-4 py-2 text-sm font-medium hover:bg-muted transition"
              >
                Get in touch
              </Link>
            </div>
          </BlurFade>
        </div>
      </section>

      {/* Proof numbers */}
      <section id="proof">
        <BlurFade delay={BLUR_FADE_DELAY * 5}>
          <h2 className="text-xl font-bold mb-6">By the numbers</h2>
        </BlurFade>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {proof.map((item, id) => (
            <BlurFade key={item.metric} delay={BLUR_FADE_DELAY * 6 + id * 0.05}>
              <div className="border rounded-lg p-4 space-y-1">
                <div className="text-3xl font-bold tracking-tight">
                  {item.metric}
                </div>
                <div className="text-sm text-muted-foreground">{item.label}</div>
              </div>
            </BlurFade>
          ))}
        </div>
        <BlurFade delay={BLUR_FADE_DELAY * 7}>
          <p className="text-xs text-muted-foreground mt-3">
            Metrics from production AI work at a 250-person enterprise technology company, 2025–2026.
          </p>
        </BlurFade>
      </section>

      {/* Services */}
      <section id="services">
        <div className="space-y-6">
          <BlurFade delay={BLUR_FADE_DELAY * 8}>
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                Services
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                What I do
              </h2>
              <p className="text-muted-foreground max-w-xl">
                Six service lines, all proven in production. Every one of these
                is validated by real work — not theoretical consulting.
              </p>
            </div>
          </BlurFade>
          <div className="flex flex-col gap-4">
            {services.map((service, id) => (
              <BlurFade
                key={service.title}
                delay={BLUR_FADE_DELAY * 9 + id * 0.05}
              >
                <div className="border rounded-lg p-5 space-y-3 hover:shadow-sm transition">
                  <h3 className="font-semibold text-lg">{service.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {service.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* Quotes */}
      <section id="testimonials">
        <BlurFade delay={BLUR_FADE_DELAY * 10}>
          <div className="space-y-2 mb-6">
            <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
              What people say
            </div>
            <h2 className="text-2xl font-bold">Recognition</h2>
          </div>
        </BlurFade>
        <div className="flex flex-col gap-4">
          {quotes.map((quote, id) => (
            <BlurFade key={id} delay={BLUR_FADE_DELAY * 11 + id * 0.05}>
              <figure className="border-l-2 border-foreground pl-4 space-y-1">
                <blockquote className="text-sm text-muted-foreground italic">
                  &ldquo;{quote.text}&rdquo;
                </blockquote>
                <figcaption className="text-xs font-medium">
                  — {quote.attribution}
                </figcaption>
              </figure>
            </BlurFade>
          ))}
        </div>
      </section>

      {/* Who this is for */}
      <section id="who-this-is-for">
        <BlurFade delay={BLUR_FADE_DELAY * 12}>
          <div className="border rounded-lg p-6 space-y-4 bg-muted/30">
            <h2 className="text-xl font-bold">Who this is for</h2>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {[
                "Your team has AI tools but nobody's really using them",
                "You're spending on LLMs and not sure you're getting value",
                "You want automations built properly — not brittle scripts",
                "You need someone who can talk to the exec team and write the code",
                "You're scaling and need an AI knowledge architecture before things break",
              ].map((point) => (
                <li key={point} className="flex items-start gap-2">
                  <span className="mt-0.5 text-foreground">→</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </BlurFade>
      </section>

      {/* CTA */}
      <section id="cta">
        <BlurFade delay={BLUR_FADE_DELAY * 13}>
          <div className="text-center space-y-4 py-8">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">
              Start with a free 30-minute review
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              We&apos;ll look at your current AI setup, identify the biggest
              gaps, and work out whether working together makes sense.
            </p>
            <Link
              href={`mailto:${DATA.contact.email}`}
              className="inline-flex items-center rounded-md bg-foreground text-background px-6 py-3 text-sm font-medium hover:opacity-90 transition"
            >
              Book your free review →
            </Link>
            <p className="text-xs text-muted-foreground pt-2">
              Or find me on{" "}
              <Link
                href="https://www.linkedin.com/in/naoise-law"
                className="underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </Link>
            </p>
          </div>
        </BlurFade>
      </section>
    </main>
  );
}
