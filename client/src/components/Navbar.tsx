import { Link } from "wouter";
import { ShoppingCart, Menu, X, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { getSessionId } from "@/lib/cart";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { data: cartItems } = trpc.cart.list.useQuery({ sessionId: getSessionId() });
  
  const cartCount = cartItems?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
      <div className="container">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/">
            <a className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">V</span>
              </div>
              <div>
                <div className="font-heading font-bold text-xl text-foreground">VILARA</div>
                <div className="text-xs text-muted-foreground -mt-1">JEANS</div>
              </div>
            </a>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/produtos">
              <a className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                Produtos
              </a>
            </Link>
            <Link href="/sobre">
              <a className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                Sobre Nós
              </a>
            </Link>
            <Link href="/contato">
              <a className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                Contato
              </a>
            </Link>
            <Link href="/loja">
              <a className="flex items-center space-x-1 text-sm font-medium text-foreground hover:text-primary transition-colors">
                <MapPin className="w-4 h-4" />
                <span>Loja Física</span>
              </a>
            </Link>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <Link href="/carrinho">
              <a className="relative">
                <Button variant="ghost" size="icon">
                  <ShoppingCart className="w-5 h-5" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </Button>
              </a>
            </Link>

            {/* Mobile Menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px]">
                <div className="flex flex-col space-y-6 mt-8">
                  <Link href="/produtos">
                    <a 
                      className="text-lg font-medium text-foreground hover:text-primary transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Produtos
                    </a>
                  </Link>
                  <Link href="/sobre">
                    <a 
                      className="text-lg font-medium text-foreground hover:text-primary transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Sobre Nós
                    </a>
                  </Link>
                  <Link href="/contato">
                    <a 
                      className="text-lg font-medium text-foreground hover:text-primary transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Contato
                    </a>
                  </Link>
                  <Link href="/loja">
                    <a 
                      className="flex items-center space-x-2 text-lg font-medium text-foreground hover:text-primary transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <MapPin className="w-5 h-5" />
                      <span>Loja Física</span>
                    </a>
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}


