import { useRef } from 'react'
import { motion, useMotionValue, useAnimationFrame } from 'framer-motion'
import { FadeIn, EyebrowMark } from './FadeIn'
import { GREEN } from './BrandAssetsV4'

const partners = [
  { name: 'BBC',             logo: 'https://codeyourfuture.io/wp-content/uploads/2020/08/Logo-BBC.png' },
  { name: 'Capgemini',       logo: 'https://codeyourfuture.io/wp-content/uploads/2020/08/Logo-Capgemini-e1706736578566.png' },
  { name: 'Financial Times', logo: 'https://codeyourfuture.io/wp-content/uploads/2020/08/Logo-FT.png' },
  { name: 'Sky',             logo: 'https://codeyourfuture.io/wp-content/uploads/2025/10/Sky-spectrum-tile-scaled.webp' },
  { name: 'Deloitte',        logo: 'https://codeyourfuture.io/wp-content/uploads/2025/10/Deloitte-Logo.png' },
  { name: 'NatWest',         logo: 'https://codeyourfuture.io/wp-content/uploads/2025/10/NatWest-Logo-496x330-1.png' },
  { name: 'J.P. Morgan',     logo: 'https://codeyourfuture.io/wp-content/uploads/2025/10/JPM_logo_Thumbnail.png' },
  { name: "Sainsbury's",     logo: 'https://codeyourfuture.io/wp-content/uploads/2025/10/Sainsburys_Logo.svg' },
  { name: 'Fujitsu',         logo: 'https://codeyourfuture.io/wp-content/uploads/2025/10/Fujitsu.gif' },
  { name: 'AND Digital',     logo: 'https://codeyourfuture.io/wp-content/uploads/2020/08/Logo-ANDigital.png' },
  { name: 'HashiCorp',       logo: 'https://codeyourfuture.io/wp-content/uploads/2025/10/HashiCorp_PrimaryLogo_Black.png' },
  { name: 'Centrica',        logo: 'https://codeyourfuture.io/wp-content/uploads/2025/10/centrica-logo.svg' },
]

const CARD_W = 212
const TRACK_W = CARD_W * partners.length

function DragCarousel() {
  const x = useMotionValue(0)
  const isDragging = useRef(false)
  const pointerStartX = useRef(0)
  const motionStartX = useRef(0)

  useAnimationFrame(() => {
    if (isDragging.current) return
    let next = x.get() - 0.5
    if (next < -TRACK_W) next += TRACK_W
    x.set(next)
  })

  function onPointerDown(e) {
    isDragging.current = true
    pointerStartX.current = e.clientX
    motionStartX.current = x.get()
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  function onPointerMove(e) {
    if (!isDragging.current) return
    const dx = e.clientX - pointerStartX.current
    let next = motionStartX.current + dx
    if (next > 0) next -= TRACK_W
    if (next < -TRACK_W) next += TRACK_W
    x.set(next)
  }

  function onPointerUp() {
    isDragging.current = false
  }

  const track = [...partners, ...partners]

  return (
    <div
      className="overflow-hidden cursor-grab active:cursor-grabbing select-none"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      <motion.div
        className="flex"
        style={{ x, gap: '12px', paddingLeft: '12px', width: 'max-content' }}
      >
        {track.map((partner, i) => (
          <div
            key={`${partner.name}-${i}`}
            className="flex-shrink-0 flex items-center justify-center bg-black"
            style={{ width: '200px', height: '200px', border: '1px solid rgba(255,255,255,0.12)' }}
          >
            <img
              src={partner.logo}
              alt={partner.name}
              draggable={false}
              className="brightness-0 invert pointer-events-none"
              style={{ width: '130px', height: '65px', objectFit: 'contain' }}
            />
          </div>
        ))}
      </motion.div>
    </div>
  )
}

export default function PartnerLogosV1() {
  return (
    <section className="bg-black">

      {/* Quote block */}
      <div className="max-w-viewport mx-auto px-margins pt-slice pb-2xl">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-xl items-start">
          <FadeIn>
            <div className="flex items-center gap-xs pt-2">
              <EyebrowMark fill={GREEN} />
              <p className="font-raleway font-medium text-white uppercase tracking-widest text-xs">
                Our partners
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <blockquote>
              <p className="font-raleway font-medium text-white text-h4 tracking-tight leading-tight mb-m">
                "CYF graduates bring a work ethic and technical foundation that matches or exceeds
                what we'd expect from expensive senior hires. They're not a compromise — they're an upgrade."
              </p>
              <footer>
                <p className="font-raleway font-medium text-white text-base">Laura Carvajal</p>
                <p className="font-raleway text-white/50 text-s mt-2xs">Senior Principal Engineer</p>
              </footer>
            </blockquote>
          </FadeIn>
        </div>
      </div>

      {/* Draggable auto-scroll logo carousel */}
      <div className="pb-slice">
        <DragCarousel />
      </div>

    </section>
  )
}
