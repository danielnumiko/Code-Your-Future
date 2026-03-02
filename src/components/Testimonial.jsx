import { FadeIn, EyebrowMark } from './FadeIn'

export default function Testimonial({ quote, name, role, variant = 'light', image, imageAlt = '', ctaLabel, ctaHref }) {
  const isRed = variant === 'red'
  const bg = isRed ? 'bg-cyf-red' : 'bg-cyf-offwhite'
  const eyebrowColor = isRed ? 'bg-white/50' : 'bg-cyf-red'
  const labelColor = isRed ? 'text-white/70' : 'text-cyf-black'
  const quoteColor = isRed ? 'text-white' : 'text-cyf-black'
  const nameColor = isRed ? 'text-white' : 'text-cyf-black'
  const roleColor = isRed ? 'text-white/60' : 'text-cyf-ink/60'

  // Image layout — same as TraineeSection
  if (image) {
    return (
      <section className={bg}>
        <div className="max-w-viewport mx-auto px-margins py-slice">
          <div className="grid lg:grid-cols-2 gap-2xl items-stretch">

            {/* Left: tall image */}
            <FadeIn>
              <img
                src={image}
                alt={imageAlt}
                className="w-full h-full min-h-[480px] object-cover"
              />
            </FadeIn>

            {/* Right: eyebrow + quote + attribution */}
            <FadeIn delay={0.1} className="flex flex-col justify-center">
              <div className="flex items-center gap-s mb-l">
                <EyebrowMark />
                <p className={`font-raleway font-medium ${labelColor} uppercase tracking-widest text-xs`}>
                  {isRed ? 'From our graduates' : 'From our partners'}
                </p>
              </div>
              <blockquote>
                <p className={`font-raleway font-medium ${quoteColor} text-h4 tracking-tight leading-tight mb-m`}>
                  "{quote}"
                </p>
                <footer className="mb-l">
                  <p className={`font-raleway font-medium ${nameColor} text-base`}>{name}</p>
                  <p className={`font-raleway ${roleColor} text-s mt-2xs`}>{role}</p>
                </footer>
              </blockquote>
              {ctaLabel && ctaHref && (
                <a
                  href={ctaHref}
                  className="self-start inline-flex items-center font-raleway font-medium text-white border border-white/40 hover:border-white transition-colors text-s px-l py-s"
                >
                  {ctaLabel}
                </a>
              )}
            </FadeIn>

          </div>
        </div>
      </section>
    )
  }

  // Default: eyebrow left + quote right
  return (
    <section className={bg}>
      <div className="max-w-viewport mx-auto px-margins py-slice">
        <div className="grid lg:grid-cols-[1fr_3fr] gap-xl items-start">

          <FadeIn>
            <div className="flex items-center gap-s pt-2">
                <EyebrowMark />
              <p className={`font-raleway font-medium ${labelColor} uppercase tracking-widest text-xs`}>
                {isRed ? 'From our graduates' : 'From our partners'}
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <blockquote>
              <p className={`font-raleway font-medium ${quoteColor} text-h4 tracking-tight leading-tight mb-xl`}>
                "{quote}"
              </p>
              <footer>
                <p className={`font-raleway font-medium ${nameColor} text-base`}>{name}</p>
                <p className={`font-raleway ${roleColor} text-s mt-2xs`}>{role}</p>
              </footer>
            </blockquote>
          </FadeIn>

        </div>
      </div>
    </section>
  )
}
