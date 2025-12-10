"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, ShoppingCart, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-2">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xl">V</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-foreground tracking-wider">VILARA</span>
                <span className="text-xs text-muted-foreground tracking-widest">JEANS</span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link href="/loja" className="text-foreground hover:text-primary font-medium transition-colors">
              Loja
            </Link>
            <Link href="/colecoes" className="text-foreground hover:text-primary font-medium transition-colors">
              Coleções
            </Link>
            <Link href="/sobre" className="text-foreground hover:text-primary font-medium transition-colors">
              Sobre Nós
            </Link>
            <Link href="/contato" className="text-foreground hover:text-primary font-medium transition-colors">
              Contato
            </Link>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              <ShoppingCart className="w-4 h-4 mr-2" />
              Ver Meu Carrinho
            </Button>
          </nav>

          {/* Mobile Menu Toggle */}
          <button className="lg:hidden text-foreground p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              <Link href="/loja" className="text-foreground hover:text-primary font-medium transition-colors py-2">
                Loja
              </Link>
              <Link href="/colecoes" className="text-foreground hover:text-primary font-medium transition-colors py-2">
                Coleções
              </Link>
              <Link href="/sobre" className="text-foreground hover:text-primary font-medium transition-colors py-2">
                Sobre Nós
              </Link>
              <Link href="/contato" className="text-foreground hover:text-primary font-medium transition-colors py-2">
                Contato
              </Link>
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 w-full mt-2">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Ver Meu Carrinho
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
