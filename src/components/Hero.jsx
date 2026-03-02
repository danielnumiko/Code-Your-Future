import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { TextReveal } from './FadeIn'

export default function Hero() {
  const videoRef = useRef(null)

  useEffect(() => {
    if (videoRef.current) videoRef.current.playbackRate = 0.0625
  }, [])

  return (
    <section className="relative min-h-screen overflow-hidden">

      {/* Ambient background video — autoplay, looping, muted */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        poster="https://images.unsplash.com/photo-1671726203454-5d7a5370a9f4?auto=format&fit=crop&w=1920&q=85"
      >
        {/* Replace with your hosted video file */}
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-cyf-black/60" />

      {/* H1 — anchored to bottom-left */}
      <div className="absolute bottom-0 left-0 w-full">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="px-margins pb-2xl"
        >
          <div style={{ maxWidth: '70vw' }}>
            <TextReveal
              as="h1"
              onMount
              delay={0.2}
              className="font-raleway font-medium text-white text-h2 tracking-tight leading-tight"
            >
              Stop Overpaying for Seniors Who Leave. Start Building a Team That Stays.
            </TextReveal>
          </div>
        </motion.div>
      </div>

    </section>
  )
}
