import Link from "next/link"
import { Instagram, Facebook, Mail, MessageCircle } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-foreground text-background pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Column 1: Brand */}
          <div>
            <Link href="/" className="inline-block mb-6">
              <div className="flex items-center gap-2">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-xl">V</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-bold text-background tracking-wider">VILARA</span>
                  <span className="text-xs text-muted-foreground tracking-widest">JEANS</span>
                </div>
              </div>
            </Link>
            <p className="text-muted-foreground mb-6">
              Conforto que veste elegância. Jeans e essenciais com caimento perfeito para o seu dia.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 bg-primary rounded-full flex items-center justify-center hover:bg-primary/80 transition-all"
              >
                <Instagram className="w-5 h-5 text-primary-foreground" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-primary rounded-full flex items-center justify-center hover:bg-primary/80 transition-all"
              >
                <Facebook className="w-5 h-5 text-primary-foreground" />
              </a>
            </div>
          </div>

          {/* Column 2: Loja */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-background">Loja</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/loja" className="text-muted-foreground hover:text-primary transition-colors">
                  Todos os Produtos
                </Link>
              </li>
              <li>
                <Link href="/colecoes" className="text-muted-foreground hover:text-primary transition-colors">
                  Coleções
                </Link>
              </li>
              <li>
                <Link href="/novidades" className="text-muted-foreground hover:text-primary transition-colors">
                  Novidades
                </Link>
              </li>
              <li>
                <Link href="/pix" className="text-muted-foreground hover:text-primary transition-colors">
                  Vantagem Pix
                </Link>
              </li>
              <li>
                <Link href="/tamanhos" className="text-muted-foreground hover:text-primary transition-colors">
                  Guia de Tamanhos
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Ajuda */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-background">Ajuda</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/faq" className="text-muted-foreground hover:text-primary transition-colors">
                  Perguntas Frequentes
                </Link>
              </li>
              <li>
                <Link href="/contato" className="text-muted-foreground hover:text-primary transition-colors">
                  Contato
                </Link>
              </li>
              <li>
                <Link href="/trocas" className="text-muted-foreground hover:text-primary transition-colors">
                  Trocas e Devoluções
                </Link>
              </li>
              <li>
                <Link href="/rastreamento" className="text-muted-foreground hover:text-primary transition-colors">
                  Rastreamento
                </Link>
              </li>
              <li>
                <Link href="/carrinho" className="text-muted-foreground hover:text-primary transition-colors">
                  Meu Carrinho
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Institucional */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-background">Institucional</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/sobre" className="text-muted-foreground hover:text-primary transition-colors">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link href="/privacidade" className="text-muted-foreground hover:text-primary transition-colors">
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link href="/termos" className="text-muted-foreground hover:text-primary transition-colors">
                  Termos de Uso
                </Link>
              </li>
            </ul>

            <div className="mt-6">
              <h4 className="text-sm font-bold mb-3 text-background">Contato</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-primary" />
                  contact@vilarajeans.com.br
                </p>
                <p className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-primary" />
                  WhatsApp: (11) 9 9999-9999
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-muted-foreground/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">© 2025 Vilara Jeans. Todos os direitos reservados.</p>
            <div className="flex items-center gap-4">
              <span className="text-xs text-muted-foreground">Pagamentos seguros:</span>
              <div className="flex gap-2">
                <div className="bg-background/10 px-2 py-1 rounded text-xs">Pix</div>
                <div className="bg-background/10 px-2 py-1 rounded text-xs">Visa</div>
                <div className="bg-background/10 px-2 py-1 rounded text-xs">Master</div>
                <div className="bg-background/10 px-2 py-1 rounded text-xs">Boleto</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
