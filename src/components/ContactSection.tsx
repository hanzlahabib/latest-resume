'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-item', {
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
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section 
      ref={sectionRef}
      className="relative py-32 px-6 bg-gradient-to-b from-black to-gray-900 mb-12"
      id="contact"
    >
      <div className="max-w-4xl mx-auto text-center">
        {/* Section Header */}
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            LET'S BUILD
            <span className="text-[#ff6b35]">.</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Ready for the next crisis? Let's turn challenges into opportunities and build something amazing together.
          </p>
        </div>

        {/* Contact Options */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* LinkedIn */}
          <div className="contact-item cursor-hover group bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 hover:border-[#0077b5] transition-all duration-300 hover:transform hover:scale-105">
            <div className="mb-4">
              <div className="w-16 h-16 bg-[#0077b5] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#0077b5] transition-colors">
                LinkedIn
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                Professional network and career journey
              </p>
              <span className="text-[#0077b5] font-medium">
                Hanzla Habib
              </span>
            </div>
          </div>

          {/* Email */}
          <div className="contact-item cursor-hover group bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 hover:border-[#ff6b35] transition-all duration-300 hover:transform hover:scale-105">
            <div className="mb-4">
              <div className="w-16 h-16 bg-[#ff6b35] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#ff6b35] transition-colors">
                Email
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                Direct line for project inquiries
              </p>
              <a 
                href="mailto:hanzla@example.com" 
                className="text-[#ff6b35] hover:text-white transition-colors font-medium"
              >
                hanzla@example.com →
              </a>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="contact-item bg-gradient-to-r from-[#ff6b35] to-purple-500 p-1 rounded-2xl">
          <div className="bg-black rounded-2xl px-8 py-12">
            <h3 className="text-3xl font-bold text-white mb-4">
              Ready to Turn Crisis into Opportunity? 🚀
            </h3>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Whether you're facing a technical challenge, need a senior frontend developer, 
              or want to collaborate on something amazing - I'm here to help solve problems and build solutions.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="cursor-hover group px-8 py-4 bg-[#ff6b35] text-white rounded-full font-semibold text-lg transition-all duration-300 hover:bg-white hover:text-[#ff6b35] border-2 border-[#ff6b35]">
                Start a Project
              </button>
              <button className="cursor-hover group px-8 py-4 border-2 border-white text-white rounded-full font-semibold text-lg transition-all duration-300 hover:bg-white hover:text-black">
                Schedule a Call
              </button>
            </div>
          </div>
        </div>

        {/* Fun Stats */}
        <div className="contact-item mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-2xl font-black text-[#ff6b35] mb-1">24/7</div>
            <p className="text-gray-400 text-sm">Problem-solving mindset</p>
          </div>
          <div>
            <div className="text-2xl font-black text-[#ff6b35] mb-1">∞</div>
            <p className="text-gray-400 text-sm">Learning capacity</p>
          </div>
          <div>
            <div className="text-2xl font-black text-[#ff6b35] mb-1">0%</div>
            <p className="text-gray-400 text-sm">Fear of challenges</p>
          </div>
          <div>
            <div className="text-2xl font-black text-[#ff6b35] mb-1">100%</div>
            <p className="text-gray-400 text-sm">Commitment to excellence</p>
          </div>
        </div>
      </div>
    </section>
  )
}