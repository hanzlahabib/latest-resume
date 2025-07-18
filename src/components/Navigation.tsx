'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Experience', href: '#experience' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
]

export function Navigation() {
  const navRef = useRef<HTMLElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial nav animation
      gsap.from('.nav-item', {
        y: -20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 3
      })
    }, navRef)

    // Scroll spy
    const handleScroll = () => {
      const sections = navItems.map(item => document.querySelector(item.href))
      const scrollPos = window.scrollY + 100

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i] as HTMLElement
        if (section && scrollPos >= section.offsetTop) {
          setActiveSection(navItems[i].href.slice(1))
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    
    return () => {
      ctx.revert()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsOpen(false)
  }

  return (
    <nav 
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800"
    >
      <div className="max-w-7xl mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="nav-item cursor-hover">
            <button 
              onClick={() => scrollToSection('#home')}
              className="text-xl font-black text-white hover:text-[#ff6b35] transition-colors"
            >
              HH<span className="text-[#ff6b35]">.</span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8 gap-4">
            {navItems.map((item, index) => (
              <button
                key={index}
                onClick={() => scrollToSection(item.href)}
                className={`nav-item cursor-hover relative px-4 py-2 text-sm font-medium transition-colors ${
                  activeSection === item.href.slice(1)
                    ? 'text-[#ff6b35]'
                    : 'text-white hover:text-[#ff6b35]'
                }`}
              >
                {item.name}
                {activeSection === item.href.slice(1) && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#ff6b35]" />
                )}
              </button>
            ))}
          </div>

          {/* CTA Button */}
          <div className="nav-item hidden lg:block">
            <button 
              onClick={() => scrollToSection('#contact')}
              className="cursor-hover px-6 py-2 bg-[#ff6b35] text-white rounded-full font-semibold transition-all duration-300 hover:bg-white hover:text-[#ff6b35] border-2 border-[#ff6b35]"
            >
              Let's Talk
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden nav-item cursor-hover p-2 text-white hover:text-[#ff6b35] transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-md border-b border-gray-800">
            <div className="px-6 py-4 space-y-4">
              {navItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => scrollToSection(item.href)}
                  className={`block w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${
                    activeSection === item.href.slice(1)
                      ? 'text-[#ff6b35] bg-[#ff6b35]/10'
                      : 'text-white hover:text-[#ff6b35] hover:bg-gray-800/50'
                  }`}
                >
                  {item.name}
                </button>
              ))}
              <button 
                onClick={() => scrollToSection('#contact')}
                className="w-full mt-4 px-6 py-3 bg-[#ff6b35] text-white rounded-full font-semibold transition-all duration-300"
              >
                Let's Talk
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}