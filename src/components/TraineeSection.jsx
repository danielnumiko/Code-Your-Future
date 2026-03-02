import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { FadeIn, TextReveal, EyebrowMark } from './FadeIn'

const journey = [
  {
    name: 'Intro to Digital',
    detail: 'Self-paced · 20–40 hours',
    body: 'Learn the foundations of digital tools, how the web works, and whether a tech career is right for you.',
    href: '/train/eligibility',
  },
  {
    name: 'Intro to Programming',
    detail: '12 weeks part-time',
    body: 'Build your first real programs. Learn HTML, CSS, and JavaScript fundamentals alongside working mentors.',
    href: '/train/courses',
  },
  {
    name: 'The Piscine',
    detail: '3 weeks intensive',
    body: 'An intensive assessment period. The most motivated and able trainees progress to the full course.',
    href: '/train/courses',
  },
  {
    name: 'Software Development Course',
    detail: '12 months part-time',
    body: 'Full-stack development with real tools and real teams. Graduate work-ready for professional roles.',
    href: '/train/courses',
  },
]

const ctaLinks = [
  { label: 'Eligibility and how to apply', href: '/train/eligibility' },
  { label: 'Courses and curriculum',       href: '/train/courses' },
]

function AnimatedIcon({ index, inViewDelay = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  // Each path animates in via pathLength draw-on.
  // strokeLinecap butt + explicit gaps between segments = reference style.
  const P = (d, t) => ({
    d,
    stroke: '#EE4344', strokeWidth: '6', fill: 'none', strokeLinecap: 'butt',
    initial: { pathLength: 0, opacity: 0 },
    animate: inView ? { pathLength: 1, opacity: 1 } : {},
    transition: { duration: 0.38, ease: 'easeOut', delay: inViewDelay + t },
  })

  if (index === 0) return (
    // Intro to Digital — 2 parallel / diagonals
    <svg ref={ref} width="80" height="80" viewBox="0 0 80 80" fill="none" aria-hidden="true">
      <motion.path key="a" {...P('M14,54 L54,14', 0)} />
      <motion.path key="b" {...P('M26,66 L66,26', 0.18)} />
    </svg>
  )

  if (index === 1) return (
    // Intro to Programming — < > brackets at 45°, 22-unit arms, 8-unit gap at apex
    <svg ref={ref} width="80" height="80" viewBox="0 0 80 80" fill="none" aria-hidden="true">
      <motion.path key="a" {...P('M36,14 L14,36', 0)} />
      <motion.path key="b" {...P('M14,44 L36,66', 0.14)} />
      <motion.path key="c" {...P('M44,14 L66,36', 0.28)} />
      <motion.path key="d" {...P('M66,44 L44,66', 0.42)} />
    </svg>
  )

  if (index === 2) return (
    // The Piscine — upward ^ chevron, 22-unit arms, 8-unit gap at apex
    <svg ref={ref} width="80" height="80" viewBox="0 0 80 80" fill="none" aria-hidden="true">
      <motion.path key="a" {...P('M14,66 L36,44', 0)} />
      <motion.path key="b" {...P('M66,66 L44,44', 0.18)} />
    </svg>
  )

  if (index === 3) return (
    // Software Development — × cross: 4 spokes, 22-unit arms, 8-unit centre gap
    <svg ref={ref} width="80" height="80" viewBox="0 0 80 80" fill="none" aria-hidden="true">
      <motion.path key="a" {...P('M14,14 L36,36', 0)} />
      <motion.path key="b" {...P('M44,44 L66,66', 0.08)} />
      <motion.path key="c" {...P('M66,14 L44,36', 0.16)} />
      <motion.path key="d" {...P('M36,44 L14,66', 0.24)} />
    </svg>
  )

  return null
}

export default function TraineeSection() {
  return (
    <section className="bg-white">
      <div className="max-w-viewport mx-auto px-margins py-slice">

        {/* Header — eyebrow left, big merged heading + buttons right (matches Stats layout) */}
        <div className="grid lg:grid-cols-[1fr_2fr] gap-xl items-start mb-2xl">
          <FadeIn>
            <div className="flex items-center gap-xs">
              <EyebrowMark />
              <p className="font-raleway font-medium text-cyf-black uppercase tracking-widest text-xs">
                For trainees
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <TextReveal
              className="font-raleway font-medium text-cyf-black text-h3 tracking-tight leading-tight mb-l"
              delay={0.1}
            >
              Start your tech career. Whether you become a Software Developer, Data Analyst,
              Business Analyst, or IT Professional — you start here.
            </TextReveal>
            <nav className="flex items-center gap-s" aria-label="Trainee links">
              {ctaLinks.map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  className="font-raleway font-medium text-xs text-cyf-red border border-cyf-red px-m py-s hover:bg-cyf-red hover:text-white transition-colors whitespace-nowrap"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </FadeIn>
        </div>

        {/* Divider */}
        <div className="border-t border-cyf-black/10 mb-2xl" />

        {/* 4-column grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-xl">
          {journey.map((step, i) => (
            <motion.div
              key={step.name}
              className="flex flex-col"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: i * 0.1 }}
            >
              {/* Animated icon */}
              <div className="mb-l">
                <AnimatedIcon index={i} inViewDelay={i * 0.1} />
              </div>

              <h3 className="font-raleway font-medium text-cyf-black text-h5 leading-snug mb-s">
                {step.name}
              </h3>
              <p className="font-raleway text-cyf-ink/60 text-xs uppercase tracking-widest mb-s">
                {step.detail}
              </p>
              <p className="font-raleway text-cyf-ink text-s leading-relaxed mb-m">
                {step.body}
              </p>
              <a
                href={step.href}
                className="font-raleway font-medium text-cyf-black text-xs underline underline-offset-4 hover:text-cyf-red transition-colors"
              >
                View more
              </a>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
