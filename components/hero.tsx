import { Star, Percent, RefreshCw, Truck, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="relative bg-secondary overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 py-16 lg:py-24 pb-20 lg:pb-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 order-2 lg:order-1">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight text-balance">
                Conforto que veste
                <br />
                elegância.
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                Jeans e essenciais do dia a dia com o caimento perfeito — feitos para o seu dia.
              </p>
            </div>

            {/* Social Proof */}
            <div className="flex items-center gap-2 text-foreground">
              <div className="flex text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
              <span className="text-sm font-semibold">4.8/5</span>
              <span className="text-sm text-muted-foreground">de 2.000+ clientes</span>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-6 shadow-lg hover:shadow-xl hover:scale-105 transition-all"
              >
                Ver a coleção
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground text-lg px-8 py-6 transition-all bg-transparent"
              >
                Economize 5% com Pix
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
              <div className="flex flex-col items-center text-center space-y-2">
                <Percent className="w-8 h-8 text-primary" />
                <span className="text-xs font-medium text-foreground">Pix -5%</span>
              </div>
              <div className="flex flex-col items-center text-center space-y-2">
                <RefreshCw className="w-8 h-8 text-primary" />
                <span className="text-xs font-medium text-foreground">
                  Troca fácil
                  <br />
                  30 dias
                </span>
              </div>
              <div className="flex flex-col items-center text-center space-y-2">
                <Truck className="w-8 h-8 text-primary" />
                <span className="text-xs font-medium text-foreground">
                  Entrega
                  <br />
                  rápida
                </span>
              </div>
              <div className="flex flex-col items-center text-center space-y-2">
                <Shield className="w-8 h-8 text-primary" />
                <span className="text-xs font-medium text-foreground">
                  Compra
                  <br />
                  segura
                </span>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="order-1 lg:order-2 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/fashionable-woman-wearing-elegant-outfit-in-studio.jpg"
                alt="Modelo com roupas elegantes"
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 via-transparent to-transparent" />
            </div>
            <div className="absolute -bottom-4 left-4 lg:-bottom-6 lg:-left-6 bg-primary text-primary-foreground px-6 py-4 rounded-xl shadow-xl">
              <p className="text-2xl font-bold">5% OFF</p>
              <p className="text-sm">com Pix</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
