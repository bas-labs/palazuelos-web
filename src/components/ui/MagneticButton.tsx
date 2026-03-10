import { useRef, useCallback } from 'react'
import gsap from 'gsap'

export function MagneticButton({ children, className = '', ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { children: React.ReactNode }) {
  const ref = useRef<HTMLAnchorElement>(null)

  const handleMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    gsap.to(ref.current, { x: x * 0.3, y: y * 0.3, duration: 0.4, ease: 'power2.out' })
  }, [])

  const handleLeave = useCallback(() => {
    if (!ref.current) return
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.3)' })
  }, [])

  return (
    <a ref={ref} className={className} onMouseMove={handleMove} onMouseLeave={handleLeave} {...props}>
      {children}
    </a>
  )
}
