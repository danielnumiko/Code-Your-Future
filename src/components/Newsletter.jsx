import { motion } from 'framer-motion'
import { FadeIn, TextReveal } from './FadeIn'

export default function Newsletter() {
  return (
    <section className="bg-white">
      <div className="max-w-viewport mx-auto px-margins py-slice text-center">

        {/* Animated red line drawing down into the heading */}
        <div className="flex justify-center mb-l">
          <motion.div
            className="w-0.5 bg-cyf-red"
            style={{ height: 'clamp(48px, 6vw, 96px)', transformOrigin: 'top' }}
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            aria-hidden="true"
          />
        </div>

        <FadeIn>
          <TextReveal className="font-raleway font-medium text-cyf-black text-h2 tracking-tight mb-l max-w-3xl mx-auto" delay={0.05}>
            Ready to build a team that stays?
          </TextReveal>
          <p className="font-raleway text-cyf-ink text-base mb-m max-w-xl mx-auto leading-relaxed">
            Partner with CYF to access trained, work-ready tech talent — or start your own journey into tech today.
          </p>

          <div className="flex flex-col sm:flex-row gap-s justify-center">
            <a
              href="/partner"
              className="font-raleway font-medium text-xs text-white bg-cyf-red px-m py-s hover:bg-red-600 transition-colors whitespace-nowrap"
            >
              Partner with us
            </a>
            <a
              href="/train"
              className="font-raleway font-medium text-xs text-cyf-red border border-cyf-red px-m py-s hover:bg-cyf-red hover:text-white transition-colors whitespace-nowrap"
            >
              Apply to train
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
