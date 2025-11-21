import dynamic from 'next/dynamic'
import Header from '@/components/Header'
import HeroBanner from '@/components/HeroBanner'
import AboutBlock from '@/components/AboutBlock'
import ExploreSpace from '@/components/ExploreSpace'
import Footer from '@/components/Footer'

// Dynamic imports for heavy components (code splitting)
const TestimonialSlider = dynamic(() => import('@/components/TestimonialSlider'), {
  loading: () => <div className="w-full bg-[#fafbfc] py-10 lg:pb-8 px-4 sm:px-6 lg:px-8" />,
  ssr: true,
})

const QuestionsFAQ = dynamic(() => import('@/components/QuestionsFAQ'), {
  loading: () => <div className="w-full bg-white py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8" />,
  ssr: true,
})

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
