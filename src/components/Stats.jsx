import { useRef, useEffect, useState } from 'react'
import { animate, useInView } from 'framer-motion'
import { FadeIn, StaggerContainer, StaggerItem, EyebrowMark, TextReveal } from './FadeIn'

const stats = [
  { number: '300+', label: 'Graduates employed' },
  { number: '5.5×', label: 'Lower attrition than industry average' },
  { number: '70%',  label: 'Find jobs or further study' },
  { number: '95%',  label: 'Trainee satisfaction' },
]

function CountUp({ value }) {
  const match = value.match(/^([\d.]+)(.*)$/)
  if (!match) return <>{value}</>
  const [, numStr, suffix] = match
  const target = parseFloat(numStr)
  const isDecimal = numStr.includes('.')

  const [display, setDisplay] = useState('0')
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, target, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(v) {
        setDisplay(isDecimal ? v.toFixed(1) : String(Math.round(v)))
      },
    })
    return () => controls.stop()
  }, [inView, target, isDecimal])

  return <span ref={ref}>{display}{suffix}</span>
}

export default function Stats() {
  return (
    <section className="bg-white" aria-label="Key statistics">
      <div className="max-w-viewport mx-auto px-margins py-slice">

        {/* Top: eyebrow left + intro paragraph right */}
        <div className="grid lg:grid-cols-[1fr_2fr] gap-xl items-start mb-2xl">
          <FadeIn>
            <div className="flex items-center gap-xs">
              <EyebrowMark />
              <p className="font-raleway font-medium text-cyf-black uppercase tracking-widest text-xs">
                By the numbers
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <TextReveal
              as="p"
              className="font-raleway font-medium text-cyf-black text-h3 tracking-tight leading-tight mb-l"
              delay={0.1}
            >
              Changing lives through free, world-class tech training for people from low-income backgrounds.
            </TextReveal>
            <nav className="flex items-center gap-s" aria-label="Stats section links">
              <a
                href="/partner"
                className="font-raleway font-medium text-white bg-cyf-red border border-cyf-red hover:bg-red-600 hover:border-red-600 transition-colors text-xs px-l py-s whitespace-nowrap"
              >
                Partner with us
              </a>
              <a
                href="/train"
                className="font-raleway font-medium text-cyf-black border border-cyf-black/20 hover:border-cyf-black hover:text-cyf-red transition-colors text-xs px-l py-s whitespace-nowrap"
              >
                Apply to train
              </a>
            </nav>
          </FadeIn>
        </div>

        {/* Bottom: 4 giant stats */}
        <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 border-t border-cyf-black/10">
          {stats.map(stat => (
            <StaggerItem key={stat.number}>
              <div className="pt-l pb-l pr-l lg:border-r border-cyf-black/10 last:border-r-0">
                <p className="font-raleway font-medium text-cyf-red text-display tracking-tight mb-m">
                  <CountUp value={stat.number} />
                </p>
                <p className="font-raleway font-medium text-cyf-ink text-xs uppercase tracking-widest">
                  {stat.label}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

      </div>
    </section>
  )
}
