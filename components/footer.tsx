import Link from "next/link"
import { Instagram, Facebook, Mail, MessageCircle, Shield, Lock } from "lucide-react"

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
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 text-primary-foreground" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-primary rounded-full flex items-center justify-center hover:bg-primary/80 transition-all"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5 text-primary-foreground" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-primary rounded-full flex items-center justify-center hover:bg-primary/80 transition-all"
                aria-label="TikTok"
              >
                <svg className="w-5 h-5 text-primary-foreground" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-primary rounded-full flex items-center justify-center hover:bg-primary/80 transition-all"
                aria-label="Pinterest"
              >
                <svg className="w-5 h-5 text-primary-foreground" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0a12 12 0 0 0-4.37 23.17c-.1-.94-.2-2.4.04-3.43.2-.93 1.4-5.9 1.4-5.9s-.36-.72-.36-1.77c0-1.66.96-2.9 2.16-2.9 1.02 0 1.51.76 1.51 1.68 0 1.02-.65 2.55-.99 3.97-.28 1.19.6 2.16 1.77 2.16 2.12 0 3.75-2.24 3.75-5.47 0-2.86-2.05-4.86-4.98-4.86-3.39 0-5.38 2.54-5.38 5.17 0 1.02.39 2.12.89 2.72.1.12.11.22.08.34-.09.38-.3 1.19-.34 1.35-.05.22-.18.27-.41.16-1.52-.71-2.47-2.92-2.47-4.71 0-3.83 2.79-7.35 8.04-7.35 4.22 0 7.5 3.01 7.5 7.02 0 4.19-2.64 7.56-6.31 7.56-1.23 0-2.39-.64-2.79-1.4l-.76 2.89c-.27 1.04-1.01 2.35-1.5 3.15A12 12 0 1 0 12 0z" />
                </svg>
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
                  contato@vilarajeans.com.br
                </p>
                <p className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-primary" />
                  WhatsApp: (62) 9 9999-9999
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-muted-foreground/20 pt-8 mb-8">
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-4">Formas de Pagamento</p>
            <div className="flex flex-wrap items-center justify-center gap-6 text-3xl text-muted-foreground">
              {/* Visa */}
              <svg className="w-12 h-8" viewBox="0 0 48 32" fill="currentColor" aria-label="Visa">
                <rect width="48" height="32" rx="4" fill="currentColor" fillOpacity="0.1" />
                <path
                  d="M19.5 21h-2.7l1.7-10.5h2.7L19.5 21zm-4.9 0h-2.8l-2.4-8.4-.3 1.6-.8 4.8c-.1.5-.4.7-.8.7h-4.1l-.1-.3c.8-.2 1.7-.5 2.2-.8.3-.2.4-.3.5-.6l2.1-7.5h2.9l4.4 10.5h-2.8zm17.2-6.8c0-.4.3-.8 1.1-1 .4-.1 1-.1 1.8.2l.4-2c-.4-.1-.9-.3-1.7-.3-1.8 0-3.1 1-3.1 2.4 0 1 .9 1.6 1.6 2 .7.4 1 .6 1 1 0 .5-.6.8-1.2.8-.9 0-1.5-.2-2-.4l-.4 2c.5.2 1.3.4 2.2.4 2 0 3.2-1 3.3-2.5 0-1.9-2.6-2-2.6-2.8l-.4.2zm7.7-3.7l-2.1 10.5h2.5l.3-1.4h3.1l.2 1.4h2.4l-2.1-10.5h-4.3zm.5 7.2l1.3-6.2 1.5 6.2h-2.8z"
                  fill="currentColor"
                />
              </svg>
              {/* Mastercard */}
              <svg className="w-12 h-8" viewBox="0 0 48 32" fill="currentColor" aria-label="Mastercard">
                <rect width="48" height="32" rx="4" fill="currentColor" fillOpacity="0.1" />
                <circle cx="18" cy="16" r="8" fill="currentColor" fillOpacity="0.6" />
                <circle cx="30" cy="16" r="8" fill="currentColor" fillOpacity="0.4" />
              </svg>
              {/* Amex */}
              <svg className="w-12 h-8" viewBox="0 0 48 32" fill="currentColor" aria-label="American Express">
                <rect width="48" height="32" rx="4" fill="currentColor" fillOpacity="0.1" />
                <text x="24" y="18" fontSize="8" fill="currentColor" textAnchor="middle" fontWeight="bold">
                  AMEX
                </text>
              </svg>
              {/* Pix */}
              <svg className="w-10 h-10" viewBox="0 0 512 512" fill="currentColor" aria-label="Pix">
                <path d="M242.4 292.5C247.8 287.1 257.1 287.1 262.5 292.5L339.5 369.5C353.7 383.7 372.6 391.5 392.6 391.5H407.7L310.6 488.6C280.3 518.1 231.1 518.1 200.8 488.6L103.3 391.2H112.6C132.6 391.2 151.5 383.4 165.7 369.2L242.4 292.5zM262.5 218.9C257.1 224.4 247.8 224.4 242.4 218.9L165.7 142.2C151.5 128 132.6 120.2 112.6 120.2H103.3L200.2 23.24C230.5-7.033 279.7-7.033 310 23.24L407.7 120.9H392.6C372.6 120.9 353.7 128.7 339.5 142.9L262.5 218.9zM112.6 142.7C126.4 142.7 139.1 148.3 149.7 158.1L226.4 234.8C233.6 241.1 243 245.6 252.5 245.6C261.9 245.6 271.3 241.1 278.5 234.8L355.5 157.8C366.1 148 378.8 142.4 392.6 142.4H430.3L488.6 200.8C518.9 231.1 518.9 280.3 488.6 310.6L430.3 369H392.6C378.8 369 366.1 363.4 355.5 353.6L278.5 276.6C264.6 262.6 240.3 262.6 226.4 276.6L149.7 353.3C139.1 363 126.4 368.6 112.6 368.6H80.78L22.7 310.6C-7.624 280.3-7.624 231.1 22.7 200.8L80.78 142.7H112.6z" />
              </svg>
              {/* Boleto */}
              <svg
                className="w-10 h-8"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-label="Boleto"
              >
                <rect x="2" y="4" width="2" height="16" />
                <rect x="6" y="4" width="1" height="16" />
                <rect x="9" y="4" width="2" height="16" />
                <rect x="13" y="4" width="1" height="16" />
                <rect x="16" y="4" width="2" height="16" />
                <rect x="20" y="4" width="2" height="16" />
              </svg>
            </div>
          </div>
        </div>

        <div className="border-t border-muted-foreground/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">© 2025 VILARA JEANS. Todos os direitos reservados.</p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-primary" />
                <span>Compra 100% segura</span>
              </div>
              <span>|</span>
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-primary" />
                <span>SSL Certificado</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
