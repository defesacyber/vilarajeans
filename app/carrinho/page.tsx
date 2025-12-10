"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

const produtosIniciais = [
  {
    id: 1,
    nome: "Jeans Slim - Indigo Escuro",
    tamanho: "40",
    preco: 189.9,
    quantidade: 1,
    imagem: "/dark-indigo-slim-jeans.jpg",
  },
  {
    id: 2,
    nome: "Camiseta Básica - Unissex",
    tamanho: "M",
    preco: 75.9,
    quantidade: 2,
    imagem: "/basic-white-t-shirt.jpg",
  },
]

export default function CarrinhoPage() {
  const [produtos, setProdutos] = useState(produtosIniciais)

  const atualizarQuantidade = (id: number, delta: number) => {
    setProdutos(produtos.map((p) => (p.id === id ? { ...p, quantidade: Math.max(1, p.quantidade + delta) } : p)))
  }

  const removerProduto = (id: number) => {
    setProdutos(produtos.filter((p) => p.id !== id))
  }

  const subtotal = produtos.reduce((acc, p) => acc + p.preco * p.quantidade, 0)
  const desconto = subtotal * 0.05
  const total = subtotal - desconto

  if (produtos.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-16 text-center">
          <ShoppingBag className="w-24 h-24 text-muted-foreground mx-auto mb-6" />
          <h1 className="text-2xl font-bold text-foreground mb-4">Seu carrinho está vazio</h1>
          <p className="text-muted-foreground mb-8">Adicione produtos para continuar comprando</p>
          <Link href="/loja">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Explorar produtos</Button>
          </Link>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-foreground mb-8">Meu Carrinho</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Lista de produtos */}
          <div className="lg:col-span-2 space-y-4">
            {produtos.map((produto) => (
              <div key={produto.id} className="bg-white rounded-xl p-4 shadow-sm border border-border flex gap-4">
                <div className="relative w-24 h-30 rounded-lg overflow-hidden flex-shrink-0">
                  <Image src={produto.imagem || "/placeholder.svg"} alt={produto.nome} fill className="object-cover" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">{produto.nome}</h3>
                  <p className="text-sm text-muted-foreground">Tamanho: {produto.tamanho}</p>
                  <p className="text-lg font-bold text-primary mt-2">R$ {produto.preco.toFixed(2).replace(".", ",")}</p>
                </div>
                <div className="flex flex-col items-end justify-between">
                  <button
                    onClick={() => removerProduto(produto.id)}
                    className="text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                  <div className="flex items-center gap-2 bg-secondary rounded-lg">
                    <button
                      onClick={() => atualizarQuantidade(produto.id, -1)}
                      className="p-2 hover:bg-muted rounded-l-lg transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center font-medium">{produto.quantidade}</span>
                    <button
                      onClick={() => atualizarQuantidade(produto.id, 1)}
                      className="p-2 hover:bg-muted rounded-r-lg transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Resumo */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-border h-fit">
            <h2 className="text-xl font-bold text-foreground mb-6">Resumo do pedido</h2>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>R$ {subtotal.toFixed(2).replace(".", ",")}</span>
              </div>
              <div className="flex justify-between text-green-600">
                <span>Desconto Pix (5%)</span>
                <span>- R$ {desconto.toFixed(2).replace(".", ",")}</span>
              </div>
              <div className="border-t border-border pt-3 flex justify-between text-lg font-bold text-foreground">
                <span>Total</span>
                <span>R$ {total.toFixed(2).replace(".", ",")}</span>
              </div>
            </div>
            <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 mb-3">
              Finalizar compra
            </Button>
            <Link href="/loja">
              <Button variant="outline" className="w-full bg-transparent">
                Continuar comprando
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
