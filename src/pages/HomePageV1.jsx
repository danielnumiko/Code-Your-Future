import HeroV4 from '../components/HeroV4'
import PipelineStrategyV4 from '../components/PipelineStrategyV4'
import PartnerLogos from '../components/PartnerLogos'
import TestimonialCarousel from '../components/TestimonialCarousel'
import TraineeSectionV4 from '../components/TraineeSectionV4'
import BlogPreviewV4 from '../components/BlogPreviewV4'
import NewsletterV4 from '../components/NewsletterV4'
import FooterV4 from '../components/FooterV4'

export default function HomePageV1({ onSwitchConcept, activeConcept }) {
  return (
    <>
      {/* Content layer — sits above the fixed footer via z-index */}
      <div className="relative bg-white" style={{ zIndex: 2 }}>
        <main>
          <HeroV4 onSwitchConcept={onSwitchConcept} />
          <PipelineStrategyV4 />
          <PartnerLogos />
          <TraineeSectionV4 />
          <TestimonialCarousel />
          <BlogPreviewV4 />
          <NewsletterV4 />
        </main>
      </div>

      {/* Transparent spacer = footer height (100vh) */}
      <div aria-hidden="true" style={{ height: '100vh' }} />

      <FooterV4 />
    </>
  )
}
