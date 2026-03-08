import { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import BlurFade from "@/components/magicui/blur-fade";

export const metadata: Metadata = {
  title: "Law Labs - Token Efficiency Consulting",
  description: "Reduce your AI costs by 40-60% through expert token efficiency consulting, prompt engineering, and intelligent model routing.",
};

const BLUR_FADE_DELAY = 0.04;

const services = [
  {
    title: "Token Efficiency Audit",
    price: "€5K-€10K",
    duration: "2 weeks",
    description: "Comprehensive analysis of your AI infrastructure identifying $50K-$200K annual savings opportunities",
    features: [
      "Complete token usage analysis",
      "Model selection optimization",
      "Prompt engineering review",
      "Cost reduction roadmap",
      "ROI projections"
    ]
  },
  {
    title: "90-Day Optimization Program",
    price: "€25K-€75K",
    duration: "3 months",
    description: "Full implementation of cost optimization strategies with hands-on engineering support",
    features: [
      "Custom prompt optimization",
      "Intelligent model routing",
      "RAG system optimization",
      "Conversation history management",
      "Ongoing monitoring & support"
    ],
    featured: true
  },
  {
    title: "AI Implementation Consulting",
    price: "€100K-€250K",
    duration: "6-12 months",
    description: "End-to-end AI system design and implementation with cost efficiency built in from day one",
    features: [
      "Architecture design",
      "Technology selection",
      "Team training",
      "Production deployment",
      "Performance optimization"
    ]
  },
  {
    title: "Prompt Engineering Training",
    price: "€5K-€15K",
    duration: "1-2 weeks",
    description: "Hands-on training for your team on advanced prompt engineering and cost optimization techniques",
    features: [
      "Workshop sessions",
      "Best practices guide",
      "Real-world examples",
      "Team certification",
      "Ongoing support"
    ]
  },
  {
    title: "Retainer & Advisory",
    price: "€10K-€30K/month",
    duration: "Ongoing",
    description: "Continuous optimization support and strategic guidance for your AI initiatives",
    features: [
      "Monthly strategy sessions",
      "Priority support",
      "Cost monitoring",
      "Performance reviews",
      "Technology updates"
    ]
  }
];

const results = [
  {
    metric: "40-60%",
    label: "Average Cost Reduction"
  },
  {
    metric: "$50K-$200K",
    label: "Annual Savings Identified"
  },
  {
    metric: "2 weeks",
    label: "Time to First Results"
  },
  {
    metric: "10+",
    label: "Enterprise Clients"
  }
];

export default function ConsultingPage() {
  return (
    <main className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white">
        <div className="max-w-6xl mx-auto">
          <BlurFade delay={BLUR_FADE_DELAY}>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Reduce Your AI Costs by 40-60%
            </h1>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 2}>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl">
              Token efficiency consulting for enterprises. Stop overpaying for AI. Start optimizing your LLM infrastructure.
            </p>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 3}>
            <div className="flex flex-wrap gap-4">
              <Link href="https://cal.com/naoise-law/consultation">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-6">
                  Schedule Free Consultation
                </Button>
              </Link>
              <Link href="https://cal.com/naoise-law/audit">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 text-lg px-8 py-6">
                  Book Token Efficiency Audit
                </Button>
              </Link>
            </div>
          </BlurFade>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <BlurFade delay={BLUR_FADE_DELAY * 4}>
            <h2 className="text-3xl font-bold text-center mb-12">Proven Results</h2>
          </BlurFade>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {results.map((result, idx) => (
              <BlurFade key={result.label} delay={BLUR_FADE_DELAY * 5 + idx * 0.1}>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">
                    {result.metric}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {result.label}
                  </div>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <BlurFade delay={BLUR_FADE_DELAY * 6}>
            <h2 className="text-4xl font-bold text-center mb-4">Services</h2>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 7}>
            <p className="text-xl text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
              From quick audits to full implementation, choose the service that fits your needs
            </p>
          </BlurFade>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <BlurFade key={service.title} delay={BLUR_FADE_DELAY * 8 + idx * 0.1}>
                <div className={`border rounded-lg p-6 ${service.featured ? 'border-blue-600 shadow-lg scale-105' : ''}`}>
                  {service.featured && (
                    <Badge className="mb-4 bg-blue-600">Most Popular</Badge>
                  )}
                  <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                  <div className="text-3xl font-bold text-blue-600 mb-2">{service.price}</div>
                  <div className="text-sm text-muted-foreground mb-4">{service.duration}</div>
                  <p className="text-muted-foreground mb-6">{service.description}</p>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start">
                        <span className="text-blue-600 mr-2">✓</span>
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="https://cal.com/naoise-law/consultation">
                    <Button className="w-full">Get Started</Button>
                  </Link>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <BlurFade delay={BLUR_FADE_DELAY * 9}>
            <h2 className="text-4xl font-bold text-center mb-12">How It Works</h2>
          </BlurFade>
          <div className="space-y-8">
            {[
              {
                step: "1",
                title: "Free Consultation",
                description: "30-minute call to understand your AI infrastructure, current costs, and optimization opportunities"
              },
              {
                step: "2",
                title: "Audit & Analysis",
                description: "Comprehensive review of your token usage, model selection, and prompt engineering practices"
              },
              {
                step: "3",
                title: "Implementation",
                description: "Hands-on optimization of your AI systems with measurable cost reductions"
              },
              {
                step: "4",
                title: "Results",
                description: "40-60% cost reduction with improved performance and ongoing monitoring"
              }
            ].map((item, idx) => (
              <BlurFade key={item.step} delay={BLUR_FADE_DELAY * 10 + idx * 0.1}>
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <BlurFade delay={BLUR_FADE_DELAY * 11}>
            <h2 className="text-4xl font-bold mb-6">
              Ready to Reduce Your AI Costs?
            </h2>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 12}>
            <p className="text-xl mb-8">
              Book a free 30-minute consultation to identify where you're overspending and how much you can save
            </p>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 13}>
            <Link href="https://cal.com/naoise-law/consultation">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-6">
                Schedule Free Consultation
              </Button>
            </Link>
          </BlurFade>
        </div>
      </section>

      {/* Blog CTA */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <BlurFade delay={BLUR_FADE_DELAY * 14}>
            <h2 className="text-3xl font-bold mb-4">Learn More</h2>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 15}>
            <p className="text-xl text-muted-foreground mb-8">
              Read our blog for insights on token economics, AI cost optimization, and industry trends
            </p>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 16}>
            <Link href="/blog">
              <Button variant="outline" size="lg">
                View Blog →
              </Button>
            </Link>
          </BlurFade>
        </div>
      </section>
    </main>
  );
}