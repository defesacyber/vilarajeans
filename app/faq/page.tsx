import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FAQ } from "@/components/faq"

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-8">
        <FAQ />
      </main>
      <Footer />
    </div>
  )
}
