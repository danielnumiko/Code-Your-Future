import HeroV1 from '../components/HeroV1'
import PipelineStrategyV1 from '../components/PipelineStrategyV1'
import PartnerLogosV1 from '../components/PartnerLogosV1'
import TestimonialCarouselV1 from '../components/TestimonialCarouselV1'
import TraineeSectionV1 from '../components/TraineeSectionV1'
import BlogPreviewV1 from '../components/BlogPreviewV1'
import NewsletterV1 from '../components/NewsletterV1'
import FooterV1 from '../components/FooterV1'

export default function HomePageV2({ onSwitchConcept, activeConcept }) {
  return (
    <>
      {/* Content layer — sits above the fixed footer via z-index */}
      <div className="relative bg-black" style={{ zIndex: 2 }}>
        <main>
          <HeroV1 onSwitchConcept={onSwitchConcept} />
          <PipelineStrategyV1 />
          <PartnerLogosV1 />
          <TraineeSectionV1 />
          <TestimonialCarouselV1 />
          <BlogPreviewV1 />
          <NewsletterV1 />
        </main>
      </div>

      {/* Transparent spacer = footer height (100vh) */}
      <div aria-hidden="true" style={{ height: '100vh' }} />

      <FooterV1 />
    </>
  )
}
