import { Button } from "@/components/ui/button"

const products = [
  {
    title: "Jeans Slim — Índigo Escuro",
    description: "Jeans stretch com lavagem escura clean, perfeito para trabalho ou fim de semana.",
    image: "/black-jeans-texture-denim.jpg",
    price: "R$ 189,90",
    originalPrice: "R$ 199,90",
    badge: "BEST SELLER",
    href: "/produto/slim-jeans-indigo",
  },
  {
    title: "Camiseta Básica — Unissex",
    description: "100% algodão acetinado, toque macio, caimento reto. Conforto absoluto.",
    image: "/african-woman-dressmaker-atelier-clothing.jpg",
    price: "R$ 75,90",
    originalPrice: "R$ 79,90",
    href: "/produto/basic-tee",
  },
  {
    title: "Camisa Oxford",
    description: "Textura clássica, fácil de combinar, tamanhos P a GG. Essencial no guarda-roupa.",
    image: "/closeup-blue-denim-jeans-pocket-rivets.jpg",
    price: "R$ 161,40",
    originalPrice: "R$ 169,90",
    href: "/produto/oxford-shirt",
  },
]

export function FeaturedProducts() {
  return (
    <section className="bg-background py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">Produtos em destaque</h2>
          <p className="text-lg text-muted-foreground">As peças mais amadas pelos nossos clientes</p>
        </div>

        {/* Products Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {products.map((product, index) => (
            <div
              key={index}
              className="group bg-secondary rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="relative overflow-hidden bg-background">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.title}
                  className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {product.badge && (
                  <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-lg text-sm font-bold">
                    {product.badge}
                  </div>
                )}
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">{product.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{product.description}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-bold text-foreground">{product.price}</span>
                    <span className="text-lg text-muted-foreground line-through">{product.originalPrice}</span>
                  </div>
                  <p className="text-sm text-primary font-semibold">com Pix</p>
                </div>
                <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:shadow-lg">
                  Adicionar ao carrinho
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  Entrega em 2-6 dias úteis • Troca grátis em 30 dias
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* View All Products CTA */}
        <div className="text-center mt-12">
          <Button
            size="lg"
            variant="outline"
            className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground text-lg px-8 py-6 transition-all bg-transparent"
          >
            Ver todos os produtos
          </Button>
        </div>
      </div>
    </section>
  )
}
