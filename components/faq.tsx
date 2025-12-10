"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"

const faqs = [
  {
    question: "Quais formas de pagamento vocês aceitam?",
    answer:
      "Aceitamos Pix com 5% de desconto, boleto bancário e cartões de crédito com opção de parcelamento. Todas as transações são processadas de forma segura.",
  },
  {
    question: "Qual o prazo de entrega?",
    answer:
      "O prazo varia de acordo com seu CEP, mas normalmente é de 2 a 6 dias úteis. Você receberá um código de rastreamento por email e WhatsApp assim que o pedido for despachado.",
  },
  {
    question: "Como funciona a troca ou devolução?",
    answer:
      "Você tem 7 dias para arrependimento e 30 dias para trocar qualquer produto. A primeira troca é totalmente gratuita — fornecemos o código de logística reversa para você enviar o produto de volta sem custo.",
  },
  {
    question: "Posso rastrear meu pedido?",
    answer:
      "Sim! Assim que seu pedido for despachado, você receberá um link de rastreamento por email e WhatsApp. Você pode acompanhar a localização do seu pedido em tempo real.",
  },
  {
    question: "Os produtos têm garantia?",
    answer:
      "Sim! Todos os produtos têm garantia contra defeitos de fabricação por 30 dias. Se você identificar algum problema, entre em contato conosco e resolveremos rapidamente.",
  },
  {
    question: "Como posso entrar em contato?",
    answer:
      "Você pode nos contatar via WhatsApp (resposta rápida durante horário comercial) ou por email em contact@vilarajeans.com.br. Estamos aqui para ajudar!",
  },
]

export function FAQ() {
  return (
    <section className="bg-background py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">Perguntas frequentes</h2>
          <p className="text-lg text-muted-foreground">
            Tudo o que você precisa saber sobre compras, entregas e trocas
          </p>
        </div>

        {/* FAQ Items */}
        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-secondary rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-200 border-none"
              >
                <AccordionTrigger className="px-6 py-5 text-left hover:bg-background transition-colors duration-200 text-lg font-semibold text-foreground [&[data-state=open]>svg]:text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-5 text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Additional Help CTA */}
        <div className="text-center mt-12 pt-8 border-t border-border max-w-4xl mx-auto">
          <p className="text-muted-foreground mb-4">Ainda tem dúvidas?</p>
          <Button
            variant="outline"
            className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all bg-transparent"
          >
            Fale conosco
          </Button>
        </div>
      </div>
    </section>
  )
}
