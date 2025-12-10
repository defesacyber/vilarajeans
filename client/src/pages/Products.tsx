import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { Filter } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Products() {
  const [location] = useLocation();
  const searchParams = new URLSearchParams(location.split('?')[1]);
  const categorySlug = searchParams.get('categoria');
  
  const [selectedCategory, setSelectedCategory] = useState<number | undefined>();
  
  const { data: categories } = trpc.categories.list.useQuery();
  const { data: products } = trpc.products.list.useQuery({
    categoryId: selectedCategory,
    active: true,
  });

  useEffect(() => {
    if (categorySlug && categories) {
      const category = categories.find(c => c.slug === categorySlug);
      if (category) {
        setSelectedCategory(category.id);
      }
    }
  }, [categorySlug, categories]);

  const currentCategory = categories?.find(c => c.id === selectedCategory);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Header */}
        <section className="bg-secondary py-12">
          <div className="container">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
              {currentCategory ? currentCategory.name : 'Todos os Produtos'}
            </h1>
            <p className="text-lg text-muted-foreground">
              {currentCategory ? currentCategory.description : 'Explore nossa coleção completa de jeans e roupas casuais'}
            </p>
          </div>
        </section>

        {/* Filters */}
        <section className="py-8 border-b">
          <div className="container">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-muted-foreground" />
                <span className="text-sm font-medium">Filtrar por:</span>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <Select
                  value={selectedCategory?.toString() || "all"}
                  onValueChange={(value) => setSelectedCategory(value === "all" ? undefined : parseInt(value))}
                >
                  <SelectTrigger className="w-full sm:w-[200px]">
                    <SelectValue placeholder="Categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas as categorias</SelectItem>
                    {categories?.map((category) => (
                      <SelectItem key={category.id} value={category.id.toString()}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-12">
          <div className="container">
            {products && products.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product) => (
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
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-base text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                          {product.name}
                        </h3>
                        <div className="flex items-center gap-2 mb-3">
                          {product.compareAtPrice && (
                            <span className="text-sm text-muted-foreground line-through">
                              R$ {(product.compareAtPrice / 100).toFixed(2)}
                            </span>
                          )}
                          <span className="text-xl font-bold text-primary">
                            R$ {(product.price / 100).toFixed(2)}
                          </span>
                        </div>
                        <Button className="w-full" size="sm" variant="outline">
                          Ver detalhes
                        </Button>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-lg text-muted-foreground">
                  Nenhum produto encontrado nesta categoria.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
