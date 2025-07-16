'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Text reveal animation
      gsap.from('.about-text', {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      })

      // Stats counter animation
      gsap.from('.stat-number', {
        textContent: 0,
        duration: 2,
        ease: 'power3.out',
        snap: { textContent: 1 },
        scrollTrigger: {
          trigger: '.stats-grid',
          start: 'top 80%',
        },
        stagger: 0.2
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section 
      ref={sectionRef}
      className="relative py-32 px-6 bg-gradient-to-b from-gray-900 to-black"
      id="about"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
            ABOUT
            <span className="text-[#ff6b35]">.</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Story */}
          <div className="space-y-6">
            <div className="about-text">
              <h3 className="text-3xl font-bold text-white mb-4">
                The Self-Taught Journey 🚀
              </h3>
              <p className="text-lg text-gray-300 leading-relaxed">
                Started as a <span className="text-[#ff6b35] font-semibold">designer</span> with a passion for creating beautiful interfaces. 
                But life had bigger plans. Through a series of crises and challenges, I evolved into something more powerful.
              </p>
            </div>

            <div className="about-text">
              <p className="text-lg text-gray-300 leading-relaxed">
                <span className="text-[#ff6b35] font-semibold">Self-taught developer</span> who learned to code not from textbooks, 
                but from necessity, curiosity, and an unrelenting drive to build solutions. Every crisis became a classroom, 
                every setback a setup for a comeback.
              </p>
            </div>

            <div className="about-text">
              <p className="text-lg text-gray-300 leading-relaxed">
                Today, I'm a <span className="text-[#ff6b35] font-semibold">Senior Frontend Developer</span> specializing in React, 
                TypeScript, and cutting-edge web technologies. From startup chaos to enterprise scale, 
                I've seen it all and built through it all.
              </p>
            </div>

            <div className="about-text">
              <div className="bg-gradient-to-r from-[#ff6b35]/20 to-purple-500/20 rounded-2xl p-6 border border-[#ff6b35]/30">
                <p className="text-white font-medium italic">
                  "Crisis didn't break me, it made me. From designer to developer, 
                  each challenge forged the engineer I am today."
                </p>
                <p className="text-[#ff6b35] mt-2 font-semibold">- Hanzla Habib</p>
              </div>
            </div>
          </div>

          {/* Stats & Skills */}
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="stats-grid grid grid-cols-2 gap-6">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 text-center border border-gray-700 hover:border-[#ff6b35] transition-colors">
                <div className="stat-number text-3xl font-black text-[#ff6b35] mb-2">7</div>
                <p className="text-gray-300 font-medium">Years Experience</p>
              </div>
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 text-center border border-gray-700 hover:border-[#ff6b35] transition-colors">
                <div className="stat-number text-3xl font-black text-[#ff6b35] mb-2">50</div>
                <p className="text-gray-300 font-medium">Projects Built</p>
              </div>
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 text-center border border-gray-700 hover:border-[#ff6b35] transition-colors">
                <div className="stat-number text-3xl font-black text-[#ff6b35] mb-2">4</div>
                <p className="text-gray-300 font-medium">Companies Grown</p>
              </div>
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 text-center border border-gray-700 hover:border-[#ff6b35] transition-colors">
                <div className="stat-number text-3xl font-black text-[#ff6b35] mb-2">100</div>
                <p className="text-gray-300 font-medium">Problems Solved</p>
              </div>
            </div>

            {/* Core Values */}
            <div className="space-y-4">
              <h4 className="text-xl font-bold text-white mb-4">Core Values</h4>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[#ff6b35] rounded-full"></div>
                  <span className="text-gray-300">Self-taught and proud of it</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[#ff6b35] rounded-full"></div>
                  <span className="text-gray-300">Crisis breeds innovation</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[#ff6b35] rounded-full"></div>
                  <span className="text-gray-300">Evolution over perfection</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[#ff6b35] rounded-full"></div>
                  <span className="text-gray-300">Code with purpose</span>
                </div>
              </div>
            </div>

            {/* Certifications */}
            <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700">
              <h4 className="text-lg font-bold text-white mb-4">Latest Certifications</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">🍃 MongoDB Node.js Developer</span>
                  <span className="text-[#ff6b35] font-mono text-xs">2023</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">📘 TypeScript Complete Guide</span>
                  <span className="text-[#ff6b35] font-mono text-xs">2022</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">⚡ JavaScript Certified</span>
                  <span className="text-[#ff6b35] font-mono text-xs">2021</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">✅ Multiple LinkedIn Assessments</span>
                  <span className="text-[#ff6b35] font-mono text-xs">Passed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}