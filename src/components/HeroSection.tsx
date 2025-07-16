'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animations
      const tl = gsap.timeline({ delay: 2.5 })
      
      tl.from('.hero-title span', {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'power3.out'
      })
      .from('.hero-subtitle', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      }, '-=0.5')
      .from('.hero-cta', {
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out'
      }, '-=0.3')

      // Parallax effect
      gsap.to('.hero-bg', {
        yPercent: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
      id="home"
    >
      {/* Animated Background */}
      <div className="hero-bg absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-br from-[#ff6b35] via-purple-900 to-blue-900" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%227%22%20cy%3D%227%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] bg-repeat" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
        <h1 
          ref={titleRef}
          className="hero-title text-6xl md:text-8xl lg:text-9xl font-black leading-none mb-6"
        >
          <span className="inline-block text-white">HANZLA</span>
          <br />
          <span className="inline-block text-[#ff6b35]">HABIB</span>
        </h1>
        
        <p 
          ref={subtitleRef}
          className="hero-subtitle text-xl md:text-2xl lg:text-3xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed"
        >
          Senior Frontend Developer who evolved from Designer through crisis into a Full-Stack specialist
        </p>

        <div className="hero-cta flex flex-col md:flex-row gap-4 justify-center items-center max-w-lg mx-auto">
          <button className="cursor-hover group relative px-6 py-3 bg-[#ff6b35] text-white rounded-full font-semibold text-base overflow-hidden transition-all duration-300 hover:scale-105 w-full md:w-auto min-w-[160px]">
            <span className="relative z-10">View Journey</span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#ff6b35] to-red-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
          </button>
          
          <button className="cursor-hover group relative px-6 py-3 border-2 border-white text-white rounded-full font-semibold text-base transition-all duration-300 hover:bg-white hover:text-black w-full md:w-auto min-w-[160px]">
            Download CV
          </button>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-bounce" />
          </div>
          <p className="text-white text-sm mt-2">Scroll to explore</p>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-4 h-4 bg-[#ff6b35] rounded-full animate-float" />
        <div className="absolute top-40 right-20 w-6 h-6 border-2 border-white rounded-full animate-pulse-slow" />
        <div className="absolute bottom-40 left-20 w-3 h-3 bg-blue-500 rounded-full animate-bounce-slow" />
        <div className="absolute bottom-20 right-10 w-5 h-5 bg-purple-500 rounded-full animate-float" />
      </div>
    </section>
  )
}