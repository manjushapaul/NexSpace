import Header from '@/components/Header'
import HeroBanner from '@/components/HeroBanner'
import AboutBlock from '@/components/AboutBlock'
import ExploreSpace from '@/components/ExploreSpace'
import TestimonialSlider from '@/components/TestimonialSlider'
import QuestionsFAQ from '@/components/QuestionsFAQ'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroBanner />
      <AboutBlock />
      <ExploreSpace />
      <TestimonialSlider />
      <QuestionsFAQ />
      <Footer />
    </main>
  )
}
