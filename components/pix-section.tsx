import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export function PixSection() {
  return (
    <section className="bg-gradient-to-br from-primary to-primary/80 py-16 lg:py-24 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary-foreground rounded-full opacity-5 blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-foreground rounded-full opacity-5 blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6 text-primary-foreground text-center lg:text-left">
              <div className="w-20 h-20 bg-primary-foreground rounded-full flex items-center justify-center mx-auto lg:mx-0">
                <svg className="w-10 h-10 text-primary" viewBox="0 0 512 512" fill="currentColor">
                  <path d="M242.4 292.5C247.8 287.1 257.1 287.1 262.5 292.5L339.5 369.5C353.7 383.7 372.6 391.5 392.6 391.5H407.7L310.6 488.6C280.3 518.1 231.1 518.1 200.8 488.6L103.3 391.2H112.6C132.6 391.2 151.5 383.4 165.7 369.2L242.4 292.5zM262.5 218.9C257.1 224.4 247.8 224.4 242.4 218.9L165.7 142.2C151.5 128 132.6 120.2 112.6 120.2H103.3L200.2 23.24C230.5-7.033 279.7-7.033 310 23.24L407.7 120.9H392.6C372.6 120.9 353.7 128.7 339.5 142.9L262.5 218.9zM112.6 142.7C126.4 142.7 139.1 148.3 149.7 158.1L226.4 234.8C233.6 241.1 243 245.6 252.5 245.6C## 261.9 245.6 271.3 241.1 278.5 234.8L355.5 157.8C## ## ## 366.1 148 378.8 142.4 392.6 142.4H430.3L488.6 200.8C518.9 231.1 518.9 280.3 488.6 310.6L430.3 369H392.6C378.8 369 366.1 363.4 355.5 353.6L278.5 276.6C264.6 262.6 240.3 262.6 226.4 276.6L149.7 353.3C## ## ## 139.1 363 126.4 368.6 112.6 368.6H80.78L22.7 310.6C-7.624 280.3-7.624 231.1 22.7 200.8L80.78 142.7H112.6z" />
                </svg>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">Pague com Pix e economize 5%</h2>
              <p className="text-lg opacity-90 leading-relaxed">
                Aprovação instantânea, seguro e com desconto automático no checkout. Simples assim.
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-1" />
                  <p className="text-left">
                    <strong>Instantâneo:</strong> Pagamento aprovado em segundos
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-1" />
                  <p className="text-left">
                    <strong>Seguro:</strong> Criptografia de ponta a ponta
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-1" />
                  <p className="text-left">
                    <strong>Desconto automático:</strong> Aplicado direto no carrinho
                  </p>
                </div>
              </div>
            </div>

            {/* Right CTA Card */}
            <div className="bg-background rounded-2xl p-8 lg:p-10 shadow-2xl space-y-6">
              <div className="text-center space-y-4">
                <div className="inline-block bg-secondary px-4 py-2 rounded-full">
                  <span className="text-primary font-bold text-sm uppercase tracking-wider">Oferta exclusiva</span>
                </div>
                <h3 className="text-3xl lg:text-4xl font-bold text-foreground">5% OFF em qualquer compra</h3>
                <p className="text-muted-foreground">Válido para todas as categorias, sem valor mínimo</p>
              </div>

              {/* Example Calculation */}
              <div className="bg-secondary rounded-xl p-6 space-y-3">
                <div className="flex justify-between items-center text-foreground">
                  <span>Valor da compra:</span>
                  <span className="font-semibold">R$ 199,90</span>
                </div>
                <div className="flex justify-between items-center text-primary font-semibold">
                  <span>Desconto Pix (5%):</span>
                  <span>- R$ 10,00</span>
                </div>
                <div className="border-t-2 border-primary pt-3 flex justify-between items-center">
                  <span className="text-lg font-bold text-foreground">Você paga:</span>
                  <span className="text-3xl font-bold text-primary">R$ 189,90</span>
                </div>
              </div>

              <Button
                size="lg"
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 text-lg py-6 shadow-lg hover:shadow-xl"
              >
                Garantir meu desconto
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                O desconto é aplicado automaticamente ao selecionar Pix no checkout
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
