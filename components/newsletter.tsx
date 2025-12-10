"use client"

import type React from "react"

import { useState } from "react"
import { Gift, Bell, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Newsletter() {
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter signup
    console.log("Newsletter signup:", email)
    setEmail("")
  }

  return (
    <section className="bg-secondary py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Newsletter Form */}
            <div className="order-2 lg:order-1 bg-background rounded-2xl p-8 lg:p-10 shadow-xl">
              <div className="space-y-6">
                <div className="space-y-3">
                  <div className="inline-block bg-primary text-primary-foreground px-4 py-2 rounded-lg">
                    <span className="font-bold text-lg">10% OFF</span>
                  </div>
                  <h3 className="text-3xl lg:text-4xl font-bold text-foreground">na sua primeira compra</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Cadastre-se e receba novidades, lançamentos e cupons exclusivos direto no seu email.
                  </p>
                </div>

                {/* Newsletter Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="newsletter-email" className="block text-sm font-semibold text-foreground mb-2">
                      Seu melhor email
                    </label>
                    <Input
                      type="email"
                      id="newsletter-email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="seuemail@exemplo.com"
                      required
                      className="w-full"
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 text-lg py-6 shadow-lg hover:shadow-xl"
                  >
                    Quero meu cupom
                  </Button>

                  <p className="text-xs text-muted-foreground text-center leading-relaxed">
                    Você pode cancelar a inscrição a qualquer momento. Respeitamos sua privacidade conforme a LGPD.
                  </p>
                </form>

                {/* Benefits List */}
                <div className="pt-4 space-y-3 border-t border-border">
                  <p className="text-sm font-semibold text-foreground mb-3">Ao se cadastrar, você recebe:</p>
                  <div className="flex items-center gap-3">
                    <Gift className="w-5 h-5 text-primary" />
                    <span className="text-sm text-muted-foreground">Cupom de 10% OFF na primeira compra</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Bell className="w-5 h-5 text-primary" />
                    <span className="text-sm text-muted-foreground">Acesso antecipado a lançamentos</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Tag className="w-5 h-5 text-primary" />
                    <span className="text-sm text-muted-foreground">Promoções exclusivas para assinantes</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Content */}
            <div className="order-1 lg:order-2 space-y-6">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                Fique por dentro das novidades
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Junte-se a mais de 15.000 clientes que já recebem nossas ofertas especiais, dicas de estilo e
                lançamentos exclusivos.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-6">
                <div className="text-center">
                  <p className="text-4xl font-bold text-primary">15k+</p>
                  <p className="text-sm text-muted-foreground mt-2">Assinantes</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-bold text-primary">10%</p>
                  <p className="text-sm text-muted-foreground mt-2">Desconto</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-bold text-primary">2x</p>
                  <p className="text-sm text-muted-foreground mt-2">por semana</p>
                </div>
              </div>

              {/* Social Proof */}
              <div className="bg-background rounded-xl p-6 shadow-md">
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-3">
                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold border-2 border-background">
                      M
                    </div>
                    <div className="w-12 h-12 rounded-full bg-primary/80 flex items-center justify-center text-primary-foreground font-bold border-2 border-background">
                      A
                    </div>
                    <div className="w-12 h-12 rounded-full bg-primary/60 flex items-center justify-center text-primary-foreground font-bold border-2 border-background">
                      C
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-foreground font-semibold">Maria, Ana e mais 523 pessoas</p>
                    <p className="text-xs text-muted-foreground">se inscreveram hoje</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
