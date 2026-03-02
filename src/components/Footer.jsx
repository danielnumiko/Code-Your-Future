const footerSections = [
  {
    heading: 'Train with us',
    links: [
      { label: 'Eligibility & how to apply', href: '/train/eligibility' },
      { label: 'Courses and curriculum',     href: '/train/courses' },
      { label: 'Graduate success stories',   href: '/train/stories' },
    ],
  },
  {
    heading: 'Partner',
    links: [
      { label: 'Our partners',       href: '/partner/partners' },
      { label: 'Book a hiring chat', href: '/partner#hiring-chat' },
    ],
  },
  {
    heading: 'Volunteer',
    links: [
      { label: 'Get involved', href: '/volunteer' },
    ],
  },
  {
    heading: 'About',
    links: [
      { label: 'Our mission',   href: '/about/mission' },
      { label: 'Our impact',    href: '/about/impact' },
      { label: 'Meet the team', href: '/about/team' },
      { label: 'Blog',          href: '/blog' },
      { label: 'Jobs at CYF',   href: '/about/jobs' },
      { label: 'Press',         href: '/about/press' },
      { label: 'Governance',    href: '/about/governance' },
    ],
  },
]

export default function Footer() {
  return (
    <footer
      className="fixed bottom-0 left-0 right-0 bg-cyf-black text-white flex flex-col"
      style={{ height: '100vh', zIndex: 0 }}
    >
      <div className="max-w-viewport mx-auto px-margins w-full h-full flex flex-col">

        {/* Large CTA — top of footer, revealed last as content scrolls away */}
        <div className="flex-1 flex items-center py-2xl">
          <h2 className="font-raleway font-medium text-white leading-none tracking-tighter text-display">
            Code Your<br />Future.
          </h2>
        </div>

        {/* Nav columns */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-l py-m border-t border-white/10">
          {footerSections.map(section => (
            <div key={section.heading}>
              <p className="font-raleway font-medium text-white text-xs uppercase tracking-widest mb-s">
                {section.heading}
              </p>
              <ul className="space-y-3xs">
                {section.links.map(link => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="font-raleway text-white/50 text-xs hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar — revealed first as you scroll in */}
        <div className="border-t border-white/10 py-s flex flex-col sm:flex-row items-center justify-between gap-s">
          <a href="/" aria-label="Code Your Future home" className="inline-flex items-center gap-2">
            <svg width="24" height="22" viewBox="0 0 424.264 384.527" aria-hidden="true">
              <path fill="#EE4344" d="M424.264 192.264L232 384.527V285.532L325.27 192.264L232 98.9941V0L424.264 192.264Z" />
              <path fill="#EE4344" d="M0 192.264L192 384.264V285.269L98.9941 192.264L192 99.2578V0.263672L0 192.264Z" />
            </svg>
            <span className="font-raleway font-bold text-white tracking-tight" style={{ fontSize: '1.15rem' }}>
              Code Your Future
            </span>
          </a>
          <p className="font-raleway text-white/40 text-xs">
            © {new Date().getFullYear()} Code Your Future. Charity No. 1174929
          </p>
          <a href="/donate" className="font-raleway font-bold text-white text-s hover:text-cyf-offwhite transition-colors">
            Donate
          </a>
        </div>

      </div>
    </footer>
  )
}
