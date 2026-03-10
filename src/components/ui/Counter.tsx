import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

export function Counter({ end, suffix = '', duration = 2 }: { end: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const obj = useRef({ val: 0 })

  useGSAP(() => {
    gsap.to(obj.current, {
      val: end,
      duration,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 85%',
        once: true,
      },
      onUpdate: () => {
        if (ref.current) ref.current.textContent = Math.floor(obj.current.val) + suffix
      },
    })
  }, { scope: ref })

  return <span ref={ref}>0{suffix}</span>
}
