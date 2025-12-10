import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "sonner";
import { getSessionId } from "@/lib/cart";

export default function Cart() {
  const { data: cartItems, isLoading } = trpc.cart.list.useQuery({ sessionId: getSessionId() });
  const updateQuantityMutation = trpc.cart.updateQuantity.useMutation();
  const removeItemMutation = trpc.cart.remove.useMutation();
  const utils = trpc.useUtils();

  const subtotal = cartItems?.reduce((sum, item) => sum + (item.product.price * item.quantity), 0) || 0;
  const shipping = 1500; // R$ 15.00
  const total = subtotal + shipping;

  const handleUpdateQuantity = async (itemId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    try {
      await updateQuantityMutation.mutateAsync({ id: itemId, quantity: newQuantity });
      utils.cart.list.invalidate();
    } catch (error) {
      toast.error("Erro ao atualizar quantidade");
    }
  };

  const handleRemoveItem = async (itemId: number) => {
    try {
      await removeItemMutation.mutateAsync({ id: itemId });
      utils.cart.list.invalidate();
      toast.success("Item removido do carrinho");
    } catch (error) {
      toast.error("Erro ao remover item");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <div className="container py-12">
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8">
            Carrinho de Compras
          </h1>

          {cartItems && cartItems.length > 0 ? (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {cartItems.map((item) => (
                  <Card key={item.id}>
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        {/* Product Image */}
                        <div className="w-24 h-24 flex-shrink-0 bg-muted rounded-lg overflow-hidden">
                          <img
                            src={item.product.imageUrl || 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=200&h=200&fit=crop'}
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Product Info */}
                        <div className="flex-1">
                          <Link href={`/produto/${item.product.slug}`}>
                            <h3 className="font-semibold text-foreground hover:text-primary transition-colors mb-1">
                              {item.product.name}
                            </h3>
                          </Link>
                          <div className="text-sm text-muted-foreground space-y-1">
                            {item.size && <p>Tamanho: {item.size}</p>}
                            {item.color && <p>Cor: {item.color}</p>}
                            <p className="font-semibold text-primary">
                              R$ {(item.product.price / 100).toFixed(2)}
                            </p>
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex items-center gap-3 mt-3">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                              disabled={updateQuantityMutation.isPending}
                            >
                              <Minus className="w-4 h-4" />
                            </Button>
                            <span className="text-sm font-semibold w-8 text-center">
                              {item.quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                              disabled={updateQuantityMutation.isPending}
                            >
                              <Plus className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>

                        {/* Remove Button */}
                        <div className="flex flex-col items-end justify-between">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleRemoveItem(item.id)}
                            disabled={removeItemMutation.isPending}
                          >
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                          <p className="font-bold text-lg">
                            R$ {((item.product.price * item.quantity) / 100).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <Card className="sticky top-24">
                  <CardContent className="p-6 space-y-4">
                    <h2 className="font-heading text-xl font-bold">Resumo do Pedido</h2>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span className="font-semibold">R$ {(subtotal / 100).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Frete</span>
                        <span className="font-semibold">R$ {(shipping / 100).toFixed(2)}</span>
                      </div>
                      <div className="border-t pt-2 flex justify-between text-lg font-bold">
                        <span>Total</span>
                        <span className="text-primary">R$ {(total / 100).toFixed(2)}</span>
                      </div>
                    </div>

                    <Link href="/checkout">
                      <Button size="lg" className="w-full">
                        Finalizar Compra
                      </Button>
                    </Link>

                    <Link href="/produtos">
                      <Button variant="outline" className="w-full">
                        Continuar Comprando
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </div>
          ) : (
            <div className="text-center py-16">
              <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Seu carrinho está vazio</h2>
              <p className="text-muted-foreground mb-6">
                Adicione produtos ao carrinho para continuar
              </p>
              <Link href="/produtos">
                <Button size="lg">
                  Ver Produtos
                </Button>
              </Link>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
