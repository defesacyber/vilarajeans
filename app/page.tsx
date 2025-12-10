import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Collections } from "@/components/collections"
import { WhyChoose } from "@/components/why-choose"
import { FeaturedProducts } from "@/components/featured-products"
import { PixSection } from "@/components/pix-section"
import { Newsletter } from "@/components/newsletter"
import { FAQ } from "@/components/faq"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Collections />
      <WhyChoose />
      <FeaturedProducts />
      <PixSection />
      <Newsletter />
      <FAQ />
      <Footer />
    </main>
  )
}
