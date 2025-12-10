import { useEffect, useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Clock, Navigation } from "lucide-react";
import { MapView } from "@/components/Map";

export default function Store() {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [directionsRenderer, setDirectionsRenderer] = useState<google.maps.DirectionsRenderer | null>(null);
  
  const storeLocation = {
    lat: -15.756389,
    lng: -49.332778,
  };

  const handleMapReady = (mapInstance: google.maps.Map) => {
    setMap(mapInstance);
    
    // Add marker for store location
    new google.maps.Marker({
      position: storeLocation,
      map: mapInstance,
      title: "Vilara Jeans",
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 10,
        fillColor: "#B91C1C",
        fillOpacity: 1,
        strokeColor: "#FFFFFF",
        strokeWeight: 2,
      },
    });

    // Initialize directions renderer
    const renderer = new google.maps.DirectionsRenderer({
      map: mapInstance,
      suppressMarkers: false,
    });
    setDirectionsRenderer(renderer);
  };

  const handleGetDirections = () => {
    if (!map || !directionsRenderer) return;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const origin = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          const directionsService = new google.maps.DirectionsService();
          directionsService.route(
            {
              origin,
              destination: storeLocation,
              travelMode: google.maps.TravelMode.DRIVING,
            },
            (result, status) => {
              if (status === "OK" && result) {
                directionsRenderer.setDirections(result);
              }
            }
          );
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Não foi possível obter sua localização. Por favor, permita o acesso à localização.");
        }
      );
    } else {
      alert("Geolocalização não é suportada pelo seu navegador.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-secondary py-16">
          <div className="container text-center">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
              Nossa Loja Física
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Visite nossa loja em Jaraguá, Goiás e experimente nossos produtos pessoalmente
            </p>
          </div>
        </section>

        {/* Store Info */}
        <section className="py-16">
          <div className="container">
            <div className="grid lg:grid-cols-3 gap-8 mb-12">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MapPin className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-heading font-bold text-lg mb-2">Endereço</h3>
                  <p className="text-sm text-muted-foreground">
                    Centro, Jaraguá - GO<br />
                    CEP: 76330-000
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-heading font-bold text-lg mb-2">Horário</h3>
                  <p className="text-sm text-muted-foreground">
                    Seg-Sex: 9h às 18h<br />
                    Sábado: 9h às 13h<br />
                    Domingo: Fechado
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Phone className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-heading font-bold text-lg mb-2">Contato</h3>
                  <p className="text-sm text-muted-foreground">
                    (62) 99999-9999<br />
                    contato@vilarajeans.com.br
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Map */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-heading text-2xl font-bold">Localização</h2>
                  <Button onClick={handleGetDirections} disabled={!map}>
                    <Navigation className="mr-2 w-4 h-4" />
                    Como Chegar
                  </Button>
                </div>
                <div className="h-[500px] rounded-lg overflow-hidden border">
                  <MapView
                    initialCenter={storeLocation}
                    initialZoom={15}
                    onMapReady={handleMapReady}
                  />
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  Clique em "Como Chegar" para obter direções a partir da sua localização atual.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-primary text-white">
          <div className="container text-center">
            <h2 className="font-heading text-3xl font-bold mb-4">
              Venha nos visitar!
            </h2>
            <p className="text-lg mb-6 max-w-2xl mx-auto opacity-90">
              Nossa equipe está pronta para oferecer o melhor atendimento e ajudar você a encontrar 
              as peças perfeitas para o seu estilo.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
