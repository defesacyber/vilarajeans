import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Users, Award, MapPin } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-secondary py-16">
          <div className="container text-center">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
              Sobre a Vilara Jeans
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Conforto, qualidade e estilo para o seu dia a dia
            </p>
          </div>
        </section>

        {/* Story */}
        <section className="py-16">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-heading text-3xl font-bold mb-6">Nossa História</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    A Vilara Jeans nasceu em Jaraguá, Goiás, com o propósito de oferecer peças de qualidade 
                    que combinam conforto e elegância para o dia a dia.
                  </p>
                  <p>
                    Desde o início, nossa missão tem sido proporcionar a melhor experiência de compra, 
                    com produtos cuidadosamente selecionados e atendimento personalizado.
                  </p>
                  <p>
                    Acreditamos que cada pessoa merece se sentir bem consigo mesma, e é por isso que 
                    trabalhamos com tecidos premium e modelagens que valorizam todos os tipos de corpo.
                  </p>
                </div>
              </div>
              <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&h=600&fit=crop"
                  alt="Loja Vilara Jeans"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 bg-secondary">
          <div className="container">
            <h2 className="font-heading text-3xl font-bold text-center mb-12">Nossos Valores</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-heading font-bold text-lg mb-2">Paixão</h3>
                  <p className="text-sm text-muted-foreground">
                    Amamos o que fazemos e isso se reflete em cada produto
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-heading font-bold text-lg mb-2">Qualidade</h3>
                  <p className="text-sm text-muted-foreground">
                    Selecionamos apenas os melhores tecidos e materiais
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-heading font-bold text-lg mb-2">Atendimento</h3>
                  <p className="text-sm text-muted-foreground">
                    Cada cliente é único e merece atenção especial
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MapPin className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-heading font-bold text-lg mb-2">Local</h3>
                  <p className="text-sm text-muted-foreground">
                    Orgulhosamente de Jaraguá, Goiás
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
