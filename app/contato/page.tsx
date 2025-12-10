"use client"

import type React from "react"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, MessageCircle, Clock } from "lucide-react"
import { useState } from "react"

export default function ContatoPage() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    assunto: "",
    mensagem: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert("Mensagem enviada com sucesso! Entraremos em contato em breve.")
    setFormData({ nome: "", email: "", assunto: "", mensagem: "" })
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-foreground mb-4">Fale Conosco</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Tem alguma dúvida ou sugestão? Estamos aqui para ajudar!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Formulário */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-border">
            <h2 className="text-xl font-bold text-foreground mb-6">Envie sua mensagem</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Nome completo</label>
                <Input
                  type="text"
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  placeholder="Seu nome"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">E-mail</label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="seu@email.com"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Assunto</label>
                <Input
                  type="text"
                  value={formData.assunto}
                  onChange={(e) => setFormData({ ...formData, assunto: e.target.value })}
                  placeholder="Como podemos ajudar?"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Mensagem</label>
                <Textarea
                  value={formData.mensagem}
                  onChange={(e) => setFormData({ ...formData, mensagem: e.target.value })}
                  placeholder="Escreva sua mensagem..."
                  rows={5}
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                Enviar mensagem
              </Button>
            </form>
          </div>

          {/* Informações de contato */}
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-bold text-foreground mb-6">Outras formas de contato</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">E-mail</h3>
                    <p className="text-muted-foreground">contato@vilarajeans.com.br</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">WhatsApp</h3>
                    <p className="text-muted-foreground">(62) 9 9999-9999</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Telefone</h3>
                    <p className="text-muted-foreground">(62) 3333-3333</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Endereço</h3>
                    <p className="text-muted-foreground">
                      Rua Principal, 123 - Centro
                      <br />
                      Jaraguá - GO
                      <br />
                      CEP: 76330-000
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Horário de atendimento</h3>
                    <p className="text-muted-foreground">
                      Segunda a Sexta: 8h às 18h
                      <br />
                      Sábados: 8h às 12h
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto mt-12">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-border">
            <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              Nossa Localização
            </h2>
            <div className="rounded-xl overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30562.744632945144!2d-49.35!3d-15.755!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x935e3f9fe49d9d3f%3A0x4cf4c5e04a28e7e3!2sJaragua%2C%20GO%2C%2076330-000!5e0!3m2!1spt-BR!2sbr!4v1702147200000"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localização Vilara Jeans - Jaraguá, Goiás"
                className="w-full"
              />
            </div>
            <div className="mt-4 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
              <p className="text-muted-foreground text-sm">
                Estamos localizados em Jaraguá, Goiás - cidade conhecida pela tradição na confecção de jeans.
              </p>
              <a
                href="https://www.google.com/maps/dir//Jaragua,+GO"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium text-sm whitespace-nowrap"
              >
                <MapPin className="w-4 h-4" />
                Como chegar
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
