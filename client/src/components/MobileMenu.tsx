import { useState } from "react";
import { Link } from "wouter";
import { X, Menu, Home, ShoppingBag, Info, Mail, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const menuItems = [
    { href: "/", label: "Início", icon: Home },
    { href: "/produtos", label: "Produtos", icon: ShoppingBag },
    { href: "/sobre", label: "Sobre Nós", icon: Info },
    { href: "/contato", label: "Contato", icon: Mail },
    { href: "/loja", label: "Loja Física", icon: MapPin },
  ];

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={toggleMenu}
        className="lg:hidden p-2 text-foreground hover:text-primary transition-colors"
        aria-label="Menu"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={closeMenu}
      />

      {/* Menu Sidebar */}
      <div
        className={cn(
          "fixed top-0 right-0 h-full w-80 bg-background shadow-2xl z-50 lg:hidden transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">V</span>
              </div>
              <div>
                <h2 className="font-heading font-bold text-lg">VILARA</h2>
                <p className="text-xs text-muted-foreground">JEANS</p>
              </div>
            </div>
            <button
              onClick={closeMenu}
              className="p-2 hover:bg-accent rounded-full transition-colors"
              aria-label="Fechar menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 overflow-y-auto p-6">
            <ul className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.href}>
                    <Link href={item.href} onClick={closeMenu}>
                      <a className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-accent transition-colors group">
                        <Icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                        <span className="font-medium">{item.label}</span>
                      </a>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Footer */}
          <div className="p-6 border-t bg-secondary/50">
            <p className="text-sm text-muted-foreground text-center">
              Jaraguá, Goiás
            </p>
            <p className="text-xs text-muted-foreground text-center mt-1">
              Seg-Sex: 9h-18h | Sáb: 9h-13h
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
