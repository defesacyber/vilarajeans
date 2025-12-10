import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Heart, Leaf, Users, Award } from "lucide-react"
import Image from "next/image"

const valores = [
  {
    icon: Heart,
    titulo: "Paixão pelo Jeans",
    descricao: "Cada peça é criada com dedicação e amor pelo que fazemos",
  },
  {
    icon: Leaf,
    titulo: "Sustentabilidade",
    descricao: "Processos que respeitam o meio ambiente e as pessoas",
  },
  {
    icon: Users,
    titulo: "Cliente em Primeiro",
    descricao: "Sua satisfação é nossa maior prioridade",
  },
  {
    icon: Award,
    titulo: "Qualidade Premium",
    descricao: "Tecidos selecionados e acabamento impecável",
  },
]

export default function SobrePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* Hero */}
        <section className="bg-secondary py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl font-bold text-foreground mb-6">Sobre a Vilara Jeans</h1>
                <p className="text-muted-foreground text-lg mb-4">
                  Nascemos da paixão por criar jeans que combinam conforto, qualidade e estilo. Desde 2018, vestimos
                  milhares de brasileiros com peças que fazem a diferença no dia a dia.
                </p>
                <p className="text-muted-foreground">
                  Nossa missão é democratizar o acesso a jeans de qualidade premium, com preços justos e atendimento
                  excepcional.
                </p>
              </div>
              <div className="relative aspect-square rounded-2xl overflow-hidden">
                <Image src="/jeans-factory-workshop.jpg" alt="Ateliê Vilara Jeans" fill className="object-cover" />
              </div>
            </div>
          </div>
        </section>

        {/* Valores */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-foreground mb-12">Nossos Valores</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {valores.map((valor, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <valor.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-bold text-foreground mb-2">{valor.titulo}</h3>
                  <p className="text-muted-foreground text-sm">{valor.descricao}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Números */}
        <section className="bg-primary text-primary-foreground py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <p className="text-4xl font-bold mb-2">15k+</p>
                <p className="text-primary-foreground/80">Clientes satisfeitos</p>
              </div>
              <div>
                <p className="text-4xl font-bold mb-2">10%</p>
                <p className="text-primary-foreground/80">Taxa de devolução</p>
              </div>
              <div>
                <p className="text-4xl font-bold mb-2">2x</p>
                <p className="text-primary-foreground/80">Mais resistente</p>
              </div>
              <div>
                <p className="text-4xl font-bold mb-2">7</p>
                <p className="text-primary-foreground/80">Anos de mercado</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
