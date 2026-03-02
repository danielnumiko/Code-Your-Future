import { motion } from 'framer-motion'
import { FadeIn, TextReveal, EyebrowMark } from './FadeIn'
import { GREEN, PixelIcon } from './BrandAssetsV4'
const RED = GREEN

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

// Random stagger order — shuffled once on load, stable across renders
const RANDOM_DELAYS = [0, 0.12, 0.24, 0.36].sort(() => Math.random() - 0.5)

export default function TraineeSectionV1() {
  return (
    <section className="bg-black relative overflow-hidden">
      <div className="max-w-viewport mx-auto px-margins py-slice">

        <div className="grid lg:grid-cols-[1fr_2fr] gap-xl items-start mb-2xl">
          <FadeIn>
            <div className="flex items-center gap-xs">
              <EyebrowMark fill={RED} />
              <p className="font-raleway font-medium text-white uppercase tracking-widest text-xs">
                For trainees
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <TextReveal
              className="font-raleway font-medium text-white text-h3 tracking-tight leading-tight mb-l"
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
                  className="font-raleway font-semibold whitespace-nowrap transition-colors"
                  style={{ border: '2px solid white', color: 'white', padding: '12px 22px', borderRadius: 0, display: 'inline-block', fontSize: 18 }}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </FadeIn>
        </div>

        <div className="border-t border-white/10 mb-2xl" />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-xl">
          {journey.map((step, i) => (
            <motion.div
              key={step.name}
              className="flex flex-col"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: RANDOM_DELAYS[i] }}
            >
              <div className="mb-l">
                <PixelIcon index={i} inViewDelay={RANDOM_DELAYS[i]} fill={GREEN} />
              </div>
              <h3 className="font-raleway font-medium text-white text-h5 leading-snug mb-s">
                {step.name}
              </h3>
              <p className="font-raleway text-xs uppercase tracking-widest mb-s" style={{ color: GREEN }}>
                {step.detail}
              </p>
              <p className="font-raleway text-white/60 text-s leading-relaxed mb-m">
                {step.body}
              </p>
              <a
                href={step.href}
                className="font-raleway font-medium text-white text-xs underline underline-offset-4 transition-colors"
                onMouseEnter={e => e.target.style.color = RED}
                onMouseLeave={e => e.target.style.color = ''}
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
