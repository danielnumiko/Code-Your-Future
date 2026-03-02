/**
 * HeroV2 — faithful port of the Waabi.ai hero mechanic
 *
 * Section 1  h-[250vh]  mb-[-75vh]  zIndex:2
 *   Sticky, full-screen video that clip-path shrinks to a centred
 *   10vw square as you scroll. Background is white (same as Section 2),
 *   so the reveal is seamless. Heading fades before clip begins.
 *
 * Section 2  h-[150vh]  overflow-hidden  zIndex:1
 *   Four absolutely-positioned columns of 10vw square tiles.
 *   Each column is h-[150vh] with flex-col justify-between so 3 tiles
 *   span the full section height.
 *   - Outer columns (left-edge / right-edge): translateY(600 → -600)
 *     driven by scroll — they FLY THROUGH the section.
 *   - Inner columns (left-[16.667%] / right-[16.667%]): STATIC, no motion.
 *   Center text sits between the inner columns at absolute center.
 *
 * Tile size is the same throughout: 10vw × 10vw with 1.5rem border-radius.
 */

import { useRef, useEffect, useState } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, animate } from 'framer-motion'

// ─── Constants ────────────────────────────────────────────────────────────────

const POSTER = 'https://images.unsplash.com/photo-1671726203454-5d7a5370a9f4?auto=format&fit=crop&w=1920&q=85'

// Final tile size — clip target in S1 and all mosaic tiles in S2.
const TILE_VW = 10

// Clip animation window (as fraction of Section 1 scrollYProgress)
const CLIP_S = 0.20
const CLIP_E = 0.55

// ─── Image data — 12 unique images across 4 columns ──────────────────────────

const COL_OUTER_L = [
  { src: 'https://images.unsplash.com/photo-1671726203454-5d7a5370a9f4?auto=format&fit=crop&w=800&q=85', alt: 'Student with dreadlocks at laptop' },
  { src: 'https://images.unsplash.com/photo-1573164713712-03790a178651?auto=format&fit=crop&w=800&q=85', alt: 'Student at laptop' },
  { src: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=85', alt: 'Person studying on laptop' },
]

const COL_INNER_L = [
  { src: 'https://images.unsplash.com/photo-1710770563074-6d9cc0d3e338?auto=format&fit=crop&w=800&q=85', alt: 'Student coding' },
]

const COL_INNER_R = [
  { src: 'https://images.unsplash.com/photo-1580894896813-652ff5aa8146?auto=format&fit=crop&w=800&q=85', alt: 'Woman coding at desk' },
  { src: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=85', alt: 'Student using laptop' },
  { src: 'https://images.unsplash.com/photo-1528901166007-3784c7dd3653?auto=format&fit=crop&w=800&q=85', alt: 'Student with laptop' },
]

const COL_OUTER_R = [
  { src: 'https://images.unsplash.com/photo-1713946598544-c3d106930f72?auto=format&fit=crop&w=800&q=85', alt: 'Student at desk' },
  { src: 'https://images.unsplash.com/photo-1618477247222-acbdb0e159b3?auto=format&fit=crop&w=800&q=85', alt: 'Person using laptop' },
  { src: 'https://images.unsplash.com/photo-1758270705317-3ef6142d306f?auto=format&fit=crop&w=800&q=85', alt: 'Students around a laptop' },
]

// ─── Stats data — scroll-driven Section 3 ─────────────────────────────────────

// The peeling tile — Reza.jpg, bottom of the inner-left column (COL_INNER_L[2]).
// It is removed from that column and rendered as a single standalone sticky element
// that travels from its mosaic grid position into the stats column.
const STATS_IMAGE = {
  src: 'https://images.unsplash.com/photo-1543270122-f7a11ad44f3a?auto=format&fit=crop&w=800&q=85',
  alt: 'Student with laptop',
}

const STATS_DATA = [
  {
    numericValue: 300,
    suffix: '+',
    decimals: 0,
    label: 'graduates placed in tech roles',
    body: 'Our graduates now work at BBC, Financial Times, Morgan Stanley, Capgemini, and hundreds more leading employers.',
    image: { src: 'https://images.unsplash.com/photo-1543270122-f7a11ad44f3a?auto=format&fit=crop&w=800&q=85', alt: 'Student with laptop' },
  },
  {
    numericValue: 5.5,
    suffix: '×',
    decimals: 1,
    label: 'average salary increase',
    body: 'CYF graduates typically earn 5.5 times more after completing the programme than before they joined.',
    image: { src: 'https://images.unsplash.com/photo-1580894895938-bd31a62ed8ba?auto=format&fit=crop&w=800&q=85', alt: 'Student coding' },
  },
  {
    numericValue: 95,
    suffix: '%',
    decimals: 0,
    label: 'employed within six months',
    body: 'Nearly all our graduates secure a tech role within six months of completing the programme.',
    image: { src: 'https://images.unsplash.com/photo-1671726203454-5d7a5370a9f4?auto=format&fit=crop&w=800&q=85', alt: 'Student with dreadlocks' },
  },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

function clamp(v, lo = 0, hi = 1) { return Math.min(hi, Math.max(lo, v)) }
function easeSnappy(t) { return 1 - Math.pow(1 - clamp(t), 4) }

// ─── Tile (reusable square image) ────────────────────────────────────────────

function Tile({ img }) {
  return (
    <div
      className="relative overflow-hidden flex-shrink-0"
      style={{ width: `${TILE_VW}vw`, height: `${TILE_VW}vw` }}
    >
      <img
        src={img.src}
        alt={img.alt}
        className="absolute inset-0 w-full h-full object-cover"
        draggable={false}
      />
    </div>
  )
}

// ─── CountUp ─────────────────────────────────────────────────────────────────

function CountUp({ to, decimals = 0, suffix = '' }) {
  const ref    = useRef(null)
  const hasRun = useRef(false)
  const [value, setValue] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasRun.current) {
          hasRun.current = true
          animate(0, to, {
            duration: 1.8,
            ease: [0.16, 1, 0.3, 1],
            onUpdate: v => setValue(v),
          })
        }
      },
      { threshold: 0.5 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [to])

  const display = decimals > 0 ? value.toFixed(decimals) : Math.floor(value).toString()
  return <span ref={ref}>{display}{suffix}</span>
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function HeroV2() {
  const heroRef   = useRef(null)
  const mosaicRef = useRef(null)
  const videoRef  = useRef(null)
  const [activeStatIndex, setActiveStatIndex] = useState(0)

  useEffect(() => {
    if (videoRef.current) videoRef.current.playbackRate = 0.0625
  }, [])

  // ── Section 1: video clip ─────────────────────────────────────────────────
  const { scrollYProgress: hero } = useScroll({
    target: heroRef,
    offset: ['start start', 'end end'],
  })

  // Clip-path collapses symmetrically inward to a centred TILE_VW square.
  const videoClip = useTransform(hero, v => {
    const t  = easeSnappy(clamp((v - CLIP_S) / (CLIP_E - CLIP_S)))
    const vw = window.innerWidth
    const vh = window.innerHeight
    const sq = TILE_VW / 100 * vw           // tile size in px
    const rl = t * (vw - sq) / 2            // left & right inset
    const tb = t * (vh - sq) / 2            // top & bottom inset (symmetric)
    return `inset(${tb.toFixed(0)}px ${rl.toFixed(0)}px ${tb.toFixed(0)}px ${rl.toFixed(0)}px)`
  })

  // Scale applied to the INNER wrapper — zooms OUT as the clip closes,
  // so the video appears to shrink/pull back while being masked.
  const videoScale = useTransform(hero, v => {
    const t = easeSnappy(clamp((v - CLIP_S) / (CLIP_E - CLIP_S)))
    return 1 - t * 0.7   // 1.0 → 0.3 (zooms out)
  })


  // Dark scrim inside video fades out as clip starts
  const scrimOp = useTransform(hero, [0, CLIP_S, CLIP_E], [0.4, 0.4, 0])

  // Heading is visible until the clip starts, then fades out quickly
  // so white bg is never visible behind live white text.
  const heroOp = useTransform(hero, [CLIP_S - 0.08, CLIP_S], [1, 0])
  const heroY  = useTransform(hero, [CLIP_S - 0.08, CLIP_S], [0, -20])

  // Scroll cue fades early
  const cueOp = useTransform(hero, [0, 0.08], [1, 0])

  // ── Section 2: outer column parallax ──────────────────────────────────────
  const { scrollYProgress: mosaic } = useScroll({
    target: mosaicRef,
    offset: ['start end', 'end start'],
  })

  // Outer columns travel 600px → -200px as section scrolls through.
  // Inner columns: no motion — they are rendered as plain divs.
  const outerY = useTransform(mosaic, [0, 1], [600, -200])

  // ── Single-element tile peel — driven entirely by `mosaic` scroll progress.
  //
  //    The sticky div has marginTop: calc(-10vh - 10vw) which pulls its layout
  //    position from Section 3's top (150vh) back to the tile's natural page
  //    position (140vh - 10vw). This means sticky activates exactly when the
  //    tile would otherwise exit the viewport top — the tile never disappears.
  //
  //    Animation window: mosaic [stickyAt, 1.0] where stickyAt is the mosaic
  //    progress value at sticky activation. At mosaic=1 Section 3 begins, so
  //    the tile is fully settled before the first stat appears.
  //
  //    tileY is not needed: the sticky position handles Y, and because the
  //    element's layout top = tile's natural page position, no y correction needed.

  // stickyAt in mosaic progress: (2.3·VH − 10vw) / (2.5·VH)
  // (derived from mosaic offset ['start end', 'end start'], section height 150vh)
  function stickyProgress() {
    const VH = window.innerHeight
    const vw = window.innerWidth
    return (2.3 * VH - (TILE_VW / 100) * vw) / (2.5 * VH)
  }

  const tileScale = useTransform(mosaic, v => {
    const s = stickyProgress()
    const t = easeSnappy(clamp((v - s) / (1 - s)))
    const vw = window.innerWidth
    const margin = Math.min(80, Math.max(20, 8 + 0.0375 * vw))
    const gap    = Math.min(72, Math.max(40, 33.6 + 0.02 * vw))
    const colW   = (vw - 2 * margin - 3 * gap) / 4
    const minScale = (TILE_VW / 100 * vw) / colW
    return minScale + t * (1 - minScale)
  })

  const tileX = useTransform(mosaic, v => {
    const s = stickyProgress()
    const t = easeSnappy(clamp((v - s) / (1 - s)))
    const vw = window.innerWidth
    const margin = Math.min(80, Math.max(20, 8 + 0.0375 * vw))
    const gap    = Math.min(72, Math.max(40, 33.6 + 0.02 * vw))
    const colW   = (vw - 2 * margin - 3 * gap) / 4
    const col2Left = margin + colW + gap   // left edge of col 2 (image column)
    const innerLeft = vw / 6
    return (1 - t) * (innerLeft - col2Left)
  })

  // Corrects for the tile's position inside the 100vh flex container.
  // The container's alignItems:center places the tile's natural top at
  // (100vh − colW)/2 from the container top — far below the mosaic tile.
  // tileY offsets that back to 0 at t=0 (inline with the mosaic tile),
  // then eases to 0 at t=1 (tile is centred in the sticky container).
  const tileY = useTransform(mosaic, v => {
    const s = stickyProgress()
    const t = easeSnappy(clamp((v - s) / (1 - s)))
    const vh = window.innerHeight
    const vw = window.innerWidth
    const margin = Math.min(80, Math.max(20, 8 + 0.0375 * vw))
    const gap    = Math.min(72, Math.max(40, 33.6 + 0.02 * vw))
    const colW   = (vw - 2 * margin - 3 * gap) / 4
    return -(1 - t) * (vh - colW) / 2
  })

  return (
    <>
      {/* ================================================================
          Section 1 — sticky hero (250 vh)
          bg-white so when video clips the background matches Section 2.
          ================================================================ */}
      <section
        ref={heroRef}
        style={{ height: '170vh', marginBottom: '-70vh', position: 'relative', zIndex: 2 }}
      >
        <div className="sticky top-0 h-screen">

          {/* Video — outer div clips in screen-space, inner div scales content */}
          <motion.div
            className="absolute inset-0"
            style={{ clipPath: videoClip }}
          >
            <motion.div
              className="absolute inset-0"
              style={{ scale: videoScale, willChange: 'transform' }}
            >
              <style>{`
                @keyframes kenBurns {
                  0%   { transform: scale(1.08) translate(0%, 0%); }
                  100% { transform: scale(1.16) translate(-2%, -1.5%); }
                }
                .ken-burns {
                  animation: kenBurns 18s ease-in-out infinite alternate;
                  transform-origin: center center;
                }
              `}</style>
              <video
                ref={videoRef}
                autoPlay muted loop playsInline
                className="absolute inset-0 w-full h-full object-cover ken-burns"
                poster={POSTER}
              >
                <source src="/hero-video.mp4" type="video/mp4" />
              </video>
              <motion.div
                className="absolute inset-0 bg-black pointer-events-none"
                style={{ opacity: scrimOp }}
              />
            </motion.div>
          </motion.div>

          {/* Heading — bottom-left, fades before clip */}
          <motion.div
            className="absolute bottom-0 left-0 w-full pointer-events-none"
            style={{ opacity: heroOp, y: heroY, zIndex: 10 }}
          >
            <div className="px-margins pb-2xl" style={{ maxWidth: '70vw' }}>
              <h1 className="font-raleway font-medium text-white text-h2 tracking-tight leading-tight">
                Changing the face of tech, together.
              </h1>
            </div>
          </motion.div>

          {/* Scroll cue */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
            style={{ opacity: cueOp, zIndex: 10 }}
          >
            <p className="font-raleway text-white/50 text-xs uppercase tracking-widest">Scroll</p>
            <motion.div
              className="w-px h-6 bg-white/40 origin-top"
              animate={{ scaleY: [0, 1, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear', times: [0, 0.3, 0.7, 1] }}
            />
          </motion.div>

        </div>
      </section>

      {/* ================================================================
          Shared wrapper — contains Section 2 (mosaic) + Section 3 (stats).
          position: relative here is the containing block for the sticky
          image in Section 3, so it pins for the full combined height.
          ================================================================ */}
      <div style={{ position: 'relative' }}>

      {/* ================================================================
          Section 2 — mosaic tile grid (150 vh)
          Four columns of 10vw tiles, justify-between across full height.
          Outer cols scroll 600→-200. Inner cols static.
          ================================================================ */}
      <section
        ref={mosaicRef}
        className="bg-white"
        style={{ height: '150vh', position: 'relative', overflow: 'clip', overflowClipMargin: '600px', zIndex: 1 }}
      >

        {/* Outer left — animated. All 3 tiles fly through the section. */}
        <motion.div
          className="absolute flex flex-col justify-between"
          style={{ left: '1.5vw', top: '-10vh', height: '150vh', y: outerY, willChange: 'transform' }}
        >
          {COL_OUTER_L.map((img, i) => <Tile key={i} img={img} />)}
        </motion.div>

        {/* Inner left — static */}
        <div
          className="absolute flex flex-col justify-between"
          style={{ left: '16.667%', top: '-10vh', height: '150vh' }}
        >
          {COL_INNER_L.map((img, i) => <Tile key={i} img={img} />)}
        </div>

        {/* Inner right — static */}
        <div
          className="absolute flex flex-col justify-between"
          style={{ right: '16.667%', top: '-10vh', height: '150vh' }}
        >
          {COL_INNER_R.map((img, i) => <Tile key={i} img={img} />)}
        </div>

        {/* Outer right — animated */}
        <motion.div
          className="absolute flex flex-col justify-between"
          style={{ right: '1.5vw', top: '-10vh', height: '150vh', y: outerY, willChange: 'transform' }}
        >
          {COL_OUTER_R.map((img, i) => <Tile key={i} img={img} />)}
        </motion.div>

        {/* Centre text */}
        <div
          className="absolute inset-x-0 flex flex-col items-center pointer-events-none"
          style={{ top: '38%', transform: 'translateY(-50%)', zIndex: 10 }}
        >
          <div className="text-center" style={{ maxWidth: '32vw', paddingTop: '120px' }}>
            <p className="font-raleway font-medium text-cyf-black text-h4 tracking-tight leading-tight">
              Changing lives through free, world-class tech training for people from low-income
              backgrounds.
            </p>
            <div className="flex items-center justify-center gap-s mt-l pointer-events-auto">
              <a
                href="/partner"
                className="font-raleway font-medium text-xs text-white bg-cyf-red px-m py-s hover:bg-red-600 transition-colors whitespace-nowrap"
              >
                Partner with us
              </a>
              <a
                href="/apply"
                className="font-raleway font-medium text-xs text-cyf-red border border-cyf-red px-m py-s hover:bg-cyf-red hover:text-white transition-colors whitespace-nowrap"
              >
                Apply to train
              </a>
            </div>
          </div>
        </div>

        {/* Centre image — below the text */}
        <div
          className="absolute inset-x-0 flex justify-center"
          style={{ top: '68%', zIndex: 5 }}
        >
          <Tile img={{ src: 'https://images.unsplash.com/photo-1573164713712-03790a178651?auto=format&fit=crop&w=800&q=85', alt: 'Student at laptop' }} />
        </div>

      </section>

      {/* ================================================================
          Section 3 — 4-column grid: spacer | sticky tile | scrolling stats | spacer
          Image and stats are centred on screen. Stats scroll one at a time.
          ================================================================ */}
      <section className="bg-white">
        <div
          className="max-w-viewport mx-auto"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr 1fr',
            gap: 'clamp(40px, calc(33.6px + 2vw), 72px)',
            padding: '0 clamp(20px, calc(8px + 3.75vw), 80px)',
            alignItems: 'start',
          }}
        >

          {/* Col 1 — spacer */}
          <div />

          {/* Col 2 — sticky tile, vertically centred */}
          <div style={{
            alignSelf: 'start',
            position: 'sticky',
            top: 0,
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            marginTop: `calc(-10vh - ${TILE_VW}vw)`,
            zIndex: 2,
          }}>
            <motion.div
              className="relative overflow-hidden w-full"
              style={{ aspectRatio: '1 / 1', scale: tileScale, x: tileX, y: tileY, transformOrigin: 'top left' }}
            >
              <AnimatePresence mode="sync">
                <motion.img
                  key={activeStatIndex}
                  src={STATS_DATA[activeStatIndex].image.src}
                  alt={STATS_DATA[activeStatIndex].image.alt}
                  className="absolute inset-0 w-full h-full object-cover object-center"
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  draggable={false}
                />
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Col 3 — scrolling stats, centred */}
          <div style={{ paddingTop: '10vh', paddingBottom: '25vh' }}>
            {STATS_DATA.map((stat, i) => (
              <motion.div
                key={i}
                className="flex flex-col items-center text-center"
                style={{ minHeight: '100vh', justifyContent: 'center' }}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                onViewportEnter={() => setActiveStatIndex(i)}
                viewport={{ once: false, margin: '-38% 0px -38% 0px' }}
                transition={{ duration: 0.65, ease: 'easeOut' }}
              >
                <div style={{ paddingBottom: '8vh' }}>
                  <p
                    className="font-raleway font-medium text-cyf-red mb-s"
                    style={{ fontSize: 'clamp(56px, 6vw, 96px)', lineHeight: 1 }}
                  >
                    <CountUp to={stat.numericValue} decimals={stat.decimals} suffix={stat.suffix} />
                  </p>
                  <h3 className="font-raleway font-medium text-cyf-black text-h5 tracking-tight leading-snug mb-xs">
                    {stat.label}
                  </h3>
                  <p className="font-raleway text-cyf-ink text-base leading-relaxed">
                    {stat.body}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Col 4 — spacer */}
          <div />

        </div>
      </section>

      </div>{/* end shared wrapper */}
    </>
  )
}
