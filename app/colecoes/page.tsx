import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const colecoes = [
  {
    id: 1,
    nome: "Core Denim",
    descricao: "Jeans clássicos com cortes modernos para todas as ocasiões",
    imagem: "/classic-denim-jeans-collection.jpg",
    quantidade: "12 produtos",
  },
  {
    id: 2,
    nome: "Camisaria Premium",
    descricao: "Camisas e camisetas com tecidos de alta qualidade",
    imagem: "/premium-shirts-collection.jpg",
    quantidade: "8 produtos",
  },
  {
    id: 3,
    nome: "Outlet",
    descricao: "Ofertas imperdíveis com até 50% de desconto",
    imagem: "/outlet-sale-jeans.jpg",
    quantidade: "15 produtos",
  },
  {
    id: 4,
    nome: "Novidades",
    descricao: "As últimas tendências que acabaram de chegar",
    imagem: "/new-fashion-arrivals.png",
    quantidade: "6 produtos",
  },
]

export default function ColecoesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-foreground mb-4">Nossas Coleções</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Descubra peças únicas em cada coleção, criadas para combinar conforto e estilo no seu dia a dia
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {colecoes.map((colecao) => (
            <Link key={colecao.id} href="/loja" className="group relative rounded-2xl overflow-hidden aspect-[4/3]">
              <Image
                src={colecao.imagem || "/placeholder.svg"}
                alt={colecao.nome}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <span className="text-sm text-white/80 mb-1 block">{colecao.quantidade}</span>
                <h3 className="text-2xl font-bold mb-2">{colecao.nome}</h3>
                <p className="text-white/90 mb-4">{colecao.descricao}</p>
                <span className="inline-flex items-center text-primary font-semibold group-hover:underline">
                  Ver coleção <ArrowRight className="w-4 h-4 ml-2" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  )
}
