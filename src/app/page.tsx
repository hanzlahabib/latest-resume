'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CustomCursor } from '@/components/CustomCursor'
import { HeroSection } from '@/components/HeroSection'
import { AboutSection } from '@/components/AboutSection'
import { ExperienceTimeline } from '@/components/ExperienceTimeline'
import { SkillsSection } from '@/components/SkillsSection'
import { ProjectsSection } from '@/components/ProjectsSection'
import { ContactSection } from '@/components/ContactSection'
import { Navigation } from '@/components/Navigation'
import { ParticleBackground } from '@/components/ParticleBackground'

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  const mainRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Smooth scroll setup
      gsap.set('body', { overflow: 'hidden' })
      
      // Initial loading animation
      const tl = gsap.timeline()
      
      tl.from('.loading-text', {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      })
      .to('.loading-screen', {
        y: '-100%',
        duration: 1.5,
        ease: 'power3.inOut',
        delay: 1
      })
      .set('body', { overflow: 'auto' })
      
    }, mainRef)

    return () => ctx.revert()
  }, [])

  return (
    <main ref={mainRef} className="relative min-h-screen bg-black text-white overflow-x-hidden">
      {/* Loading Screen */}
      <div className="loading-screen fixed inset-0 bg-black z-50 flex items-center justify-center">
        <div className="loading-text">
          <h1 className="text-6xl font-bold text-center">
            <span className="text-[#ff6b35]">HANZLA</span>
            <br />
            <span className="text-white">HABIB</span>
          </h1>
          <p className="text-center mt-4 text-xl text-gray-400">
            Senior Frontend Developer
          </p>
        </div>
      </div>

      {/* Background Elements */}
      <ParticleBackground />
      
      {/* Custom Cursor */}
      <CustomCursor />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Sections */}
      <HeroSection />
      <AboutSection />
      <ExperienceTimeline />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
      
      {/* Footer */}
      <footer className="relative z-10 bg-black/90 backdrop-blur-sm border-t border-gray-800 py-6">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-400">
            © 2024 Hanzla Habib. Crafted with 💻 and lots of ☕
          </p>
          <p className="text-sm text-gray-500 mt-2">
            "From designer to developer - evolution through crisis"
          </p>
        </div>
      </footer>
    </main>
  )
}