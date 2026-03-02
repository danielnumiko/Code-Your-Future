import Nav from '../components/Nav'
import Hero from '../components/Hero'
import Stats from '../components/Stats'
import PipelineStrategy from '../components/PipelineStrategy'
import PartnerLogos from '../components/PartnerLogos'
import TestimonialCarousel from '../components/TestimonialCarousel'
import TraineeSection from '../components/TraineeSection'
import BlogPreview from '../components/BlogPreview'
import Newsletter from '../components/Newsletter'
import Footer from '../components/Footer'

export default function HomePage({ onSwitchConcept, activeConcept }) {
  return (
    <>
      {/* Content layer — sits above the fixed footer via z-index */}
      <div className="relative bg-white" style={{ zIndex: 2 }}>
        <Nav onSwitchConcept={onSwitchConcept} activeConcept={activeConcept} />
        <main>
          <Hero />
          <Stats />
          <PipelineStrategy />
          <PartnerLogos />
          <TraineeSection />
          <TestimonialCarousel />
          <BlogPreview />
          <Newsletter />
        </main>
      </div>

      {/* Transparent spacer = footer height (100vh).
          No background → fixed footer shows through as content scrolls away. */}
      <div aria-hidden="true" style={{ height: '100vh' }} />

      <Footer />
    </>
  )
}
