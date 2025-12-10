import { Link } from "wouter";
import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">V</span>
              </div>
              <div>
                <div className="font-heading font-bold text-xl">VILARA</div>
                <div className="text-xs -mt-1">JEANS</div>
              </div>
            </div>
            <p className="text-sm text-background/80">
              Conforto que veste elegância. Sua loja de jeans em Jaraguá, Goiás.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/produtos">
                  <a className="text-sm text-background/80 hover:text-background transition-colors">
                    Produtos
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/sobre">
                  <a className="text-sm text-background/80 hover:text-background transition-colors">
                    Sobre Nós
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/loja">
                  <a className="text-sm text-background/80 hover:text-background transition-colors">
                    Loja Física
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/contato">
                  <a className="text-sm text-background/80 hover:text-background transition-colors">
                    Contato
                  </a>
                </Link>
              </li>
            </ul>
          </div>

          {/* Categorias */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Categorias</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/produtos?categoria=core-denim">
                  <a className="text-sm text-background/80 hover:text-background transition-colors">
                    Core Denim
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/produtos?categoria=camisaria-premium">
                  <a className="text-sm text-background/80 hover:text-background transition-colors">
                    Camisaria Premium
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/produtos?categoria=outlet">
                  <a className="text-sm text-background/80 hover:text-background transition-colors">
                    Outlet
                  </a>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Contato</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                <span className="text-sm text-background/80">
                  Jaraguá, Goiás<br />
                  Centro da cidade
                </span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm text-background/80">(62) 99999-9999</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm text-background/80">contato@vilarajeans.com.br</span>
              </li>
            </ul>
            <div className="flex items-center space-x-4 mt-4">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-background/80 hover:text-background transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-background/80 hover:text-background transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-background/20 mt-8 pt-8 text-center">
          <p className="text-sm text-background/60">
            © {new Date().getFullYear()} Vilara Jeans. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
