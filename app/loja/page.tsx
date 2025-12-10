import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Filter } from "lucide-react"
import Image from "next/image"

const produtos = [
  {
    id: 1,
    nome: "Jeans Slim - Indigo Escuro",
    preco: 189.9,
    precoOriginal: 249.9,
    parcelas: "3x de R$ 63,30",
    imagem: "/dark-indigo-slim-jeans.jpg",
    tag: "Mais Vendido",
  },
  {
    id: 2,
    nome: "Camiseta Básica - Unissex",
    preco: 75.9,
    precoOriginal: 99.9,
    parcelas: "2x de R$ 37,95",
    imagem: "/basic-white-t-shirt.jpg",
    tag: null,
  },
  {
    id: 3,
    nome: "Camisa Oxford",
    preco: 161.4,
    precoOriginal: 199.9,
    parcelas: "3x de R$ 53,80",
    imagem: "/blue-oxford-shirt.png",
    tag: null,
  },
  {
    id: 4,
    nome: "Jeans Wide Leg",
    preco: 199.9,
    precoOriginal: 269.9,
    parcelas: "3x de R$ 66,63",
    imagem: "/wide-leg-jeans-woman.jpg",
    tag: "Novidade",
  },
  {
    id: 5,
    nome: "Calça Cargo",
    preco: 179.9,
    precoOriginal: 229.9,
    parcelas: "3x de R$ 59,97",
    imagem: "/cargo-pants-beige.jpg",
    tag: null,
  },
  {
    id: 6,
    nome: "Jeans Skinny Clássico",
    preco: 169.9,
    precoOriginal: 219.9,
    parcelas: "3x de R$ 56,63",
    imagem: "/classic-skinny-jeans.jpg",
    tag: null,
  },
]

export default function LojaPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Todos os Produtos</h1>
            <p className="text-muted-foreground mt-2">Encontre o jeans perfeito para você</p>
          </div>
          <Button variant="outline" className="flex items-center gap-2 bg-transparent">
            <Filter className="w-4 h-4" />
            Filtrar
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {produtos.map((produto) => (
            <div
              key={produto.id}
              className="bg-white rounded-xl overflow-hidden shadow-sm border border-border hover:shadow-md transition-shadow group"
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                {produto.tag && (
                  <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full z-10">
                    {produto.tag}
                  </span>
                )}
                <Image
                  src={produto.imagem || "/placeholder.svg"}
                  alt={produto.nome}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-foreground mb-2">{produto.nome}</h3>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-xl font-bold text-primary">
                    R$ {produto.preco.toFixed(2).replace(".", ",")}
                  </span>
                  <span className="text-sm text-muted-foreground line-through">
                    R$ {produto.precoOriginal.toFixed(2).replace(".", ",")}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mb-4">ou {produto.parcelas}</p>
                <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Adicionar ao carrinho
                </Button>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  )
}
