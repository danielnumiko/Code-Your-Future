// Shared pixel-device primitives for Concept 3 sections.
// Import the patterns and PxDev you need in each component.
import { motion } from 'framer-motion'

export const PD_A      = [0,0,0, 1,0,0, 0,1,0]    // mid-left + bot-center
export const PD_B      = [0,0,0, 0,1,1, 0,0,1]    // center + mid-right + bot-right
export const PD_C      = [0,0,1, 0,1,0, 1,0,0]    // anti-diagonal
export const PD_D      = [1,0,1, 0,1,0, 0,0,0]    // top-left + top-right + center
export const PD_E      = [0,1,0, 1,0,1, 0,0,0]    // top-center + mid-left + mid-right
export const PD_CORNER = [0,1, 1,0]               // 2×2 diagonal

export function PixelDevice({ pattern, cols = 3, fill = '#fba3fa', bg = 'transparent' }) {
  const rows = Math.ceil(pattern.length / cols)
  const cw   = 100 / cols
  const ch   = 100 / rows
  let cellIdx = 0
  return (
    <>
      {pattern.map((on, i) => {
        if (!on && bg === 'transparent') return null
        const delay = cellIdx++ * 0.12
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-20px' }}
            transition={{ duration: 0.5, ease: 'easeOut', delay }}
            style={{
              position: 'absolute',
              left:     `${(i % cols) * cw}%`,
              top:      `${Math.floor(i / cols) * ch}%`,
              width:    `${cw}%`,
              height:   `${ch}%`,
              background: on ? fill : bg,
            }}
          />
        )
      })}
    </>
  )
}

// Absolutely-positioned wrapper.
export function PxDev({ pattern, cols = 3, w = 120, h, fill = '#fba3fa', bg = 'transparent', style }) {
  const height = h ?? w
  return (
    <div style={{ position: 'absolute', width: w, height, pointerEvents: 'none', ...style }}>
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        <PixelDevice pattern={pattern} cols={cols} fill={fill} bg={bg} />
      </div>
    </div>
  )
}
