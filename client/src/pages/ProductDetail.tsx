import { useState } from "react";
import { useRoute, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { ArrowLeft, ShoppingCart, Check } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "sonner";
import { getSessionId } from "@/lib/cart";

export default function ProductDetail() {
  const [, params] = useRoute("/produto/:slug");
  const slug = params?.slug || "";
  
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [quantity, setQuantity] = useState(1);

  const { data: product, isLoading } = trpc.products.getBySlug.useQuery({ slug });
  const addToCartMutation = trpc.cart.add.useMutation();
  const utils = trpc.useUtils();

  const sizes = product?.sizes ? JSON.parse(product.sizes) : [];
  const colors = product?.colors ? JSON.parse(product.colors) : [];

  const handleAddToCart = async () => {
    if (!product) return;
    
    if (sizes.length > 0 && !selectedSize) {
      toast.error("Por favor, selecione um tamanho");
      return;
    }
    
    if (colors.length > 0 && !selectedColor) {
      toast.error("Por favor, selecione uma cor");
      return;
    }

    try {
      await addToCartMutation.mutateAsync({
        productId: product.id,
        quantity,
        size: selectedSize || undefined,
        color: selectedColor || undefined,
        sessionId: getSessionId(),
      });
      
      toast.success("Produto adicionado ao carrinho!");
      utils.cart.list.invalidate();
    } catch (error) {
      toast.error("Erro ao adicionar produto ao carrinho");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Produto não encontrado</h2>
            <Link href="/produtos">
              <Button>Voltar para produtos</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <div className="container py-8">
          <Link href="/produtos">
            <Button variant="ghost" className="mb-6">
              <ArrowLeft className="mr-2 w-4 h-4" />
              Voltar para produtos
            </Button>
          </Link>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Product Image */}
            <div className="relative">
              <Card className="overflow-hidden">
                <div className="relative h-[500px] md:h-[600px] bg-muted">
                  {product.compareAtPrice && (
                    <div className="absolute top-4 left-4 bg-destructive text-white px-4 py-2 rounded-lg font-bold text-sm z-10">
                      -{Math.round((1 - product.price / product.compareAtPrice) * 100)}%
                    </div>
                  )}
                  <img
                    src={product.imageUrl || 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&h=1000&fit=crop'}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </Card>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
                  {product.name}
                </h1>
                <div className="flex items-center gap-3 mb-4">
                  {product.compareAtPrice && (
                    <span className="text-xl text-muted-foreground line-through">
                      R$ {(product.compareAtPrice / 100).toFixed(2)}
                    </span>
                  )}
                  <span className="text-3xl font-bold text-primary">
                    R$ {(product.price / 100).toFixed(2)}
                  </span>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Size Selection */}
              {sizes.length > 0 && (
                <div>
                  <label className="block text-sm font-medium mb-3">
                    Tamanho: {selectedSize && <span className="text-primary">{selectedSize}</span>}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {sizes.map((size: string) => (
                      <Button
                        key={size}
                        variant={selectedSize === size ? "default" : "outline"}
                        className="w-16 h-12"
                        onClick={() => setSelectedSize(size)}
                      >
                        {size}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Color Selection */}
              {colors.length > 0 && (
                <div>
                  <label className="block text-sm font-medium mb-3">
                    Cor: {selectedColor && <span className="text-primary">{selectedColor}</span>}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {colors.map((color: string) => (
                      <Button
                        key={color}
                        variant={selectedColor === color ? "default" : "outline"}
                        onClick={() => setSelectedColor(color)}
                      >
                        {selectedColor === color && <Check className="mr-2 w-4 h-4" />}
                        {color}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div>
                <label className="block text-sm font-medium mb-3">Quantidade</label>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </Button>
                  <span className="text-lg font-semibold w-12 text-center">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  >
                    +
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  {product.stock} unidades disponíveis
                </p>
              </div>

              {/* Add to Cart */}
              <Button
                size="lg"
                className="w-full"
                onClick={handleAddToCart}
                disabled={addToCartMutation.isPending || product.stock === 0}
              >
                <ShoppingCart className="mr-2 w-5 h-5" />
                {product.stock === 0 ? 'Fora de estoque' : 'Adicionar ao carrinho'}
              </Button>

              {/* Product Features */}
              <Card className="p-6 bg-secondary">
                <h3 className="font-semibold mb-4">Informações do produto</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>✓ Tecido de alta qualidade</li>
                  <li>✓ Caimento perfeito</li>
                  <li>✓ Durabilidade garantida</li>
                  <li>✓ Fácil manutenção</li>
                </ul>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
