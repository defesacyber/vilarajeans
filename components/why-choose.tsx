import { Ruler, Sparkles, CreditCard, Package, CheckCircle } from "lucide-react"

const features = [
  {
    icon: Ruler,
    title: "Caimento que favorece",
    description: "Modelagens testadas em corpos reais para garantir conforto e estilo.",
  },
  {
    icon: Sparkles,
    title: "Toque premium",
    description: "Algodão acetinado e jeans stretch para máximo conforto durante todo o dia.",
  },
  {
    icon: CreditCard,
    title: "Checkout sem fricção",
    description: "Pix 5% OFF, boleto e cartão de crédito. Rápido e seguro.",
  },
  {
    icon: Package,
    title: "Troca facilitada",
    description: "30 dias para trocar — primeira troca grátis com código de logística reversa.",
  },
]

export function WhyChoose() {
  return (
    <section className="bg-secondary py-16 lg:py-24 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary rounded-full opacity-5 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent rounded-full opacity-5 blur-3xl" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">Por que escolher VILARA?</h2>
          <p className="text-lg text-muted-foreground">Qualidade, conforto e conveniência em cada detalhe</p>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-background rounded-xl p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 text-center space-y-4"
            >
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto">
                <feature.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Value Proposition Banner */}
        <div className="mt-16 bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-8 lg:p-12 text-center text-primary-foreground shadow-2xl">
          <div className="max-w-4xl mx-auto space-y-6">
            <h3 className="text-2xl lg:text-3xl font-bold">Entrega rápida em todo o Brasil</h3>
            <p className="text-lg opacity-90">
              Receba suas peças em 2 a 6 dias úteis. Rastreamento completo por email e WhatsApp.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-6 h-6" />
                <span className="font-medium">Embalagem premium</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-6 h-6" />
                <span className="font-medium">Rastreamento em tempo real</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-6 h-6" />
                <span className="font-medium">Suporte via WhatsApp</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
