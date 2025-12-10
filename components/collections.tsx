import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const collections = [
  {
    title: "Core Denim",
    description: "Do skinny ao reto, tecidos stretch e lavagens premium.",
    image: "/blue-jeans-denim-texture.jpg",
    href: "/colecoes/denim",
  },
  {
    title: "Camisaria Premium",
    description: "Caimento inteligente, toque macio, fácil de combinar.",
    image: "/fashion-shirt-flatlay-casual-style.jpg",
    href: "/colecoes/camisas",
  },
  {
    title: "Outlet",
    description: "Últimas peças com preços especiais. Aproveite!",
    image: "/stack-of-blue-jeans.jpg",
    href: "/colecoes/outlet",
    badge: "ATÉ 50% OFF",
  },
]

export function Collections() {
  return (
    <section className="bg-background py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">Essenciais para o seu dia</h2>
          <p className="text-lg text-muted-foreground">
            Descubra peças versáteis com caimento perfeito e tecidos premium
          </p>
        </div>

        {/* Collection Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {collections.map((collection, index) => (
            <div
              key={index}
              className="group relative bg-secondary rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              {collection.badge && (
                <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-4 py-2 rounded-lg font-bold text-sm z-10 shadow-lg">
                  {collection.badge}
                </div>
              )}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={collection.image || "/placeholder.svg"}
                  alt={collection.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
              </div>
              <div className="p-6 space-y-3">
                <h3 className="text-2xl font-bold text-foreground">{collection.title}</h3>
                <p className="text-muted-foreground text-sm">{collection.description}</p>
                <a
                  href={collection.href}
                  className="inline-flex items-center text-primary font-semibold hover:gap-3 gap-2 transition-all duration-200"
                >
                  Ver coleção <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Button
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-6 shadow-lg hover:shadow-xl"
          >
            Encontre meu tamanho
          </Button>
        </div>
      </div>
    </section>
  )
}
