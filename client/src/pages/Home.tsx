import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { ArrowRight, ShoppingBag, MapPin, Truck, Shield } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Home() {
  const { data: categories } = trpc.categories.list.useQuery();
  const { data: featuredProducts } = trpc.products.list.useQuery({ featured: true, active: true });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-secondary">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-8 items-center py-12 md:py-20">
              {/* Left Content */}
              <div className="space-y-6 animate-fade-in-up">
                <div className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
                  Jaraguá, Goiás
                </div>
                <h1 className="font-heading text-4xl md:text-6xl font-bold text-foreground leading-tight">
                  Conforto que veste elegância.
                </h1>
                <p className="text-lg text-muted-foreground">
                  Descubra a coleção perfeita de jeans e roupas casuais que combinam estilo, qualidade e conforto para o seu dia a dia.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/produtos" className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-base font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 w-full sm:w-auto">
                    Explorar Coleção
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                  <Link href="/loja" className="inline-flex items-center justify-center rounded-md border border-input bg-transparent px-8 py-3 text-base font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 w-full sm:w-auto">
                    <MapPin className="mr-2 w-4 h-4" />
                    Visite Nossa Loja
                  </Link>
                </div>
                
                {/* Features */}
                <div className="grid grid-cols-3 gap-4 pt-8">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Truck className="w-6 h-6 text-primary" />
                    </div>
                    <p className="text-xs text-muted-foreground">Entrega para todo Brasil</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Shield className="w-6 h-6 text-primary" />
                    </div>
                    <p className="text-xs text-muted-foreground">Compra 100% segura</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                      <ShoppingBag className="w-6 h-6 text-primary" />
                    </div>
                    <p className="text-xs text-muted-foreground">Qualidade premium</p>
                  </div>
                </div>
              </div>

              {/* Right Image */}
              <div className="relative animate-fade-in delay-200">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&h=1000&fit=crop"
                    alt="Modelo usando jeans Vilara"
                    className="w-full h-[500px] md:h-[600px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                  <div className="absolute bottom-8 left-8 right-8">
                    <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                      <p className="text-sm font-medium text-foreground">Nova Coleção</p>
                      <p className="text-xs text-muted-foreground mt-1">Modelos exclusivos chegando</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-4">
                Essenciais para o seu dia
              </h2>
              <p className="text-lg text-muted-foreground">
                Descubra peças versáteis com caimento perfeito e tecidos premium
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {categories?.map((category) => (
                <Link key={category.id} href={`/produtos?categoria=${category.slug}`}>
                  <Card className="group cursor-pointer overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={getCategoryImage(category.slug)}
                        alt={category.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent" />
                      {category.slug === 'outlet' && (
                        <div className="absolute top-4 right-4 bg-primary text-white px-4 py-2 rounded-lg font-bold text-sm shadow-lg">
                          ATÉ 50% OFF
                        </div>
                      )}
                    </div>
                    <CardContent className="p-6">
                      <h3 className="font-heading text-2xl font-bold text-foreground mb-2">
                        {category.name}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4">
                        {category.description}
                      </p>
                      <div className="flex items-center text-primary font-semibold group-hover:gap-3 gap-2 transition-all">
                        Ver coleção <ArrowRight className="w-4 h-4" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-16 md:py-24 bg-secondary">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-4">
                Produtos em destaque
              </h2>
              <p className="text-lg text-muted-foreground">
                Nossas peças mais populares escolhidas especialmente para você
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts?.slice(0, 3).map((product) => (
                <Link key={product.id} href={`/produto/${product.slug}`}>
                  <Card className="group cursor-pointer overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div className="relative h-80 overflow-hidden bg-muted">
                      {product.compareAtPrice && (
                        <div className="absolute top-4 left-4 bg-destructive text-white px-3 py-1 rounded-lg font-bold text-sm z-10">
                          -{Math.round((1 - product.price / product.compareAtPrice) * 100)}%
                        </div>
                      )}
                      <img
                        src={product.imageUrl || 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=500&fit=crop'}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
                        {product.name}
                      </h3>
                      <div className="flex items-center gap-2">
                        {product.compareAtPrice && (
                          <span className="text-sm text-muted-foreground line-through">
                            R$ {(product.compareAtPrice / 100).toFixed(2)}
                          </span>
                        )}
                        <span className="text-xl font-bold text-primary">
                          R$ {(product.price / 100).toFixed(2)}
                        </span>
                      </div>
                      <div className="w-full mt-4 inline-flex items-center justify-center rounded-md border border-input bg-transparent px-4 py-2 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                        Ver detalhes
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link href="/produtos" className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-base font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                Ver todos os produtos
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-primary text-white">
          <div className="container text-center">
            <h2 className="font-heading text-3xl md:text-5xl font-bold mb-4">
              Visite nossa loja física
            </h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
              Venha conhecer nossa coleção completa e experimentar o caimento perfeito. 
              Estamos localizados no centro de Jaraguá, Goiás.
            </p>
            <Link href="/loja">
              <Button size="lg" variant="secondary">
                <MapPin className="mr-2 w-5 h-5" />
                Ver localização e horários
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function getCategoryImage(slug: string): string {
  const images: Record<string, string> = {
    'core-denim': 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=300&fit=crop',
    'camisaria-premium': 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=300&fit=crop',
    'outlet': 'https://images.unsplash.com/photo-1582552938357-32b906df40cb?w=400&h=300&fit=crop',
  };
  return images[slug] || 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=300&fit=crop';
}
