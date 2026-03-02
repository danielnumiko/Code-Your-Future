import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { FadeIn, TextReveal, EyebrowMark } from './FadeIn'


const steps = [
  {
    title: 'Work-ready from day one',
    body: 'Trained on real tools — GitHub, Agile, real codebases — not toy projects. Better prepared than bootcamp alternatives, at a fraction of the cost.',
    image: 'https://images.unsplash.com/photo-1528901166007-3784c7dd3653?auto=format&fit=crop&w=800&q=85',
    imageAlt: 'Student with laptop',
  },
  {
    title: 'Deeply diverse talent',
    body: 'CYF graduates come from backgrounds underrepresented in tech — bringing fresh perspectives, resilience, and a drive to prove themselves.',
    image: 'https://images.unsplash.com/photo-1713946598544-c3d106930f72?auto=format&fit=crop&w=800&q=85',
    imageAlt: 'Student at desk',
  },
  {
    title: 'Advance to intermediate within six months',
    body: 'Our graduates consistently exceed expectations. Companies report faster growth than typical junior hires — reducing your time-to-value.',
    image: 'https://images.unsplash.com/photo-1758270705317-3ef6142d306f?auto=format&fit=crop&w=800&q=85',
    imageAlt: 'Students around a laptop',
  },
]

const ctaLinks = [
  { label: 'Partner with us',    href: '/partner',             filled: true },
  { label: 'Book a hiring call', href: '/partner#hiring-chat', filled: false },
]

export default function PipelineStrategy() {
  const lineRef = useRef(null)

  // Drive the line height directly from scroll position.
  // Starts growing when the line container enters the viewport from the bottom,
  // finishes when the bottom of the container reaches 80% down the viewport.
  // Start when the container top reaches 50% down the viewport (so the line
  // arrives at each square just before it hits centre-screen).
  // Stop output at 88% so the line ends just above the buttons.
  const { scrollYProgress } = useScroll({
    target: lineRef,
    offset: ['start 65%', 'end 70%'],
  })
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section className="bg-cyf-offwhite">
      <div className="max-w-viewport mx-auto px-margins pt-slice pb-slice">

        {/* ── Header ─────────────────────────────────────────────────── */}
        <FadeIn className="text-center mb-2xl">
          <div className="flex items-center justify-center gap-xs mb-l">
            <EyebrowMark />
            <p className="font-raleway font-medium text-cyf-black uppercase tracking-widest text-xs">
              For employers
            </p>
          </div>
          <TextReveal
            className="font-raleway font-medium text-cyf-black text-h3 tracking-tight leading-tight mb-l max-w-xl mx-auto"
            delay={0.1}
          >
            The tech talent pipeline you've been missing.
          </TextReveal>
          <p className="font-raleway text-cyf-ink text-base leading-relaxed max-w-xl mx-auto">
            Companies avoiding junior hires are creating a talent cliff. When your seniors move on,
            who fills those roles? CYF graduates are production-ready, deeply loyal,
            and advance to intermediate within six months.
          </p>
        </FadeIn>

        {/* ── Line + items ───────────────────────────────────────────── */}
        {/* The red line animates downward through all three items        */}
        {/* and terminates at the CTA buttons below.                     */}
        <div ref={lineRef} className="relative">

          {/* Animated line — spans full height of this container */}
          <motion.div
            className="absolute bg-cyf-red pointer-events-none"
            style={{
              left: '50%',
              top: 0,
              width: 2,
              marginLeft: -1,
              height: lineHeight,
            }}
            aria-hidden="true"
          />

          {/* Three items — alternating left / right of the line */}
          {steps.map((step, i) => {
            const imageLeft = i % 2 === 0
            return (
              <motion.div
                key={step.title}
                className="grid grid-cols-[1fr_56px_1fr] gap-x-2xl items-center py-2xl"
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.65, ease: 'easeOut' }}
              >
                {/* Left column */}
                <div className="w-full">
                  {imageLeft ? (
                    <img
                      src={step.image}
                      alt={step.imageAlt}
                      className="w-full aspect-[4/3] object-cover"
                    />
                  ) : (
                    <div>
                      <p className="font-raleway font-medium text-cyf-red text-h3 leading-none mb-s">
                        {String(i + 1).padStart(2, '0')}
                      </p>
                      <h3 className="font-raleway font-medium text-cyf-black text-h5 leading-snug mb-s">
                        {step.title}
                      </h3>
                      <p className="font-raleway text-cyf-ink text-base leading-relaxed">
                        {step.body}
                      </p>
                    </div>
                  )}
                </div>

                {/* Centre — square node on the line */}
                <div className="flex justify-center">
                  <div className="w-4 h-4 bg-cyf-red shrink-0" aria-hidden="true" />
                </div>

                {/* Right column */}
                <div className="w-full">
                  {imageLeft ? (
                    <div>
                      <p className="font-raleway font-medium text-cyf-red text-h3 leading-none mb-s">
                        {String(i + 1).padStart(2, '0')}
                      </p>
                      <h3 className="font-raleway font-medium text-cyf-black text-h5 leading-snug mb-s">
                        {step.title}
                      </h3>
                      <p className="font-raleway text-cyf-ink text-base leading-relaxed">
                        {step.body}
                      </p>
                    </div>
                  ) : (
                    <img
                      src={step.image}
                      alt={step.imageAlt}
                      className="w-full aspect-[4/3] object-cover"
                    />
                  )}
                </div>
              </motion.div>
            )
          })}

        </div>

        {/* CTAs — sit below the line container so the line ends right at them */}
        <FadeIn className="flex flex-col sm:flex-row items-center justify-center gap-s pt-2xl">
          {ctaLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              className={
                link.filled
                  ? 'font-raleway font-medium text-xs text-white bg-cyf-red px-m py-s hover:bg-red-600 transition-colors whitespace-nowrap'
                  : 'font-raleway font-medium text-xs text-cyf-red border border-cyf-red px-m py-s hover:bg-cyf-red hover:text-white transition-colors whitespace-nowrap'
              }
            >
              {link.label}
            </a>
          ))}
        </FadeIn>

      </div>
    </section>
  )
}
