'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    id: 1,
    title: "Eclipse AI Platform",
    company: "Eclipse AI",
    description: "Led frontend development of an AI-powered analytics platform. Built with React, TypeScript, and cutting-edge AI integrations.",
    tech: ["React", "TypeScript", "AI/ML", "GraphQL", "GSAP"],
    category: "AI Platform",
    year: "2024",
    impact: "50% increase in user engagement",
    color: "from-purple-500 to-pink-500"
  },
  {
    id: 2,
    title: "Healthcare Connect",
    company: "Attend Anywhere",
    description: "Telehealth solution connecting patients globally. Implemented WebRTC for real-time video consultations and built responsive UI.",
    tech: ["React", "WebRTC", "Node.js", "Socket.io", "AWS"],
    category: "Healthcare",
    year: "2023",
    impact: "1M+ patients served",
    color: "from-green-500 to-teal-500"
  },
  {
    id: 3,
    title: "Enterprise Dashboard",
    company: "InnoSTARK",
    description: "Complex data visualization dashboard for enterprise clients. Self-taught advanced D3.js and performance optimization techniques.",
    tech: ["Vue.js", "D3.js", "Python", "PostgreSQL", "Docker"],
    category: "Enterprise",
    year: "2022",
    impact: "30% faster data insights",
    color: "from-blue-500 to-indigo-500"
  },
  {
    id: 4,
    title: "E-commerce Evolution",
    company: "Regbits",
    description: "Full-stack e-commerce platform that marked my transition from designer to developer. Crisis project that changed everything.",
    tech: ["JavaScript", "React", "Node.js", "MongoDB", "Stripe"],
    category: "E-commerce",
    year: "2020",
    impact: "Career transformation",
    color: "from-orange-500 to-red-500"
  },
  {
    id: 5,
    title: "Design System Library",
    company: "Multiple Projects",
    description: "Comprehensive component library used across multiple projects. Designer roots meeting developer skills.",
    tech: ["React", "TypeScript", "Storybook", "CSS-in-JS", "Figma"],
    category: "Design System",
    year: "2021-Present",
    impact: "80% faster development",
    color: "from-cyan-500 to-blue-500"
  },
  {
    id: 6,
    title: "Crisis Learning Platform",
    company: "Personal Project",
    description: "Learning management system built during my self-taught journey. Meta project - built while learning to build.",
    tech: ["Next.js", "TypeScript", "Prisma", "tRPC", "Vercel"],
    category: "Education",
    year: "2019",
    impact: "Personal growth catalyst",
    color: "from-violet-500 to-purple-500"
  }
]

export function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeProject, setActiveProject] = useState<number | null>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Projects animation
      gsap.from('.project-card', {
        y: 100,
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
      className="relative py-32 px-6 bg-gradient-to-b from-gray-900 to-black"
      id="projects"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            PROJECTS
            <span className="text-[#ff6b35]">.</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            From crisis-driven learning projects to enterprise-scale solutions - each one a milestone in my evolution
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.map((project, index) => (
            <div 
              key={project.id}
              className="project-card cursor-hover group relative bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 hover:border-[#ff6b35] transition-all duration-300 hover:transform hover:scale-102"
              onMouseEnter={() => setActiveProject(project.id)}
              onMouseLeave={() => setActiveProject(null)}
            >
              {/* Project Header */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-[#ff6b35] font-semibold px-3 py-1 bg-[#ff6b35]/20 rounded-full">
                    {project.category}
                  </span>
                  <span className="text-sm text-gray-400 font-mono">{project.year}</span>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-[#ff6b35] transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-sm text-gray-400 mb-3">{project.company}</p>
              </div>

              {/* Description */}
              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                {project.description}
              </p>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-1 mb-4">
                {project.tech.map((tech, techIndex) => (
                  <span 
                    key={techIndex}
                    className="text-xs px-2 py-1 bg-gray-700/50 text-gray-300 rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Impact */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#ff6b35] font-medium">
                  {project.impact}
                </span>
                <div className="flex space-x-2">
                  <button className="text-gray-400 hover:text-white transition-colors">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Gradient Border Effect */}
              <div className={`absolute -inset-1 bg-gradient-to-r ${project.color} rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-10`} />
              
              {/* Active Indicator */}
              {activeProject === project.id && (
                <div className="absolute top-4 right-4 w-3 h-3 bg-[#ff6b35] rounded-full animate-pulse" />
              )}
            </div>
          ))}
        </div>

        {/* Crisis to Success Story */}
        <div className="mt-16 bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-white mb-4">
              The Crisis Project That Changed Everything 🔥
            </h3>
            <p className="text-gray-300 max-w-3xl mx-auto leading-relaxed">
              The e-commerce project at Regbits wasn't just a job - it was survival. Faced with complex requirements 
              I didn't understand, using technologies I'd never touched, with a deadline that seemed impossible. 
              That crisis forced me to evolve from designer to developer overnight.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl mb-2">😰</div>
              <h4 className="text-lg font-bold text-white mb-2">The Crisis</h4>
              <p className="text-gray-400 text-sm">Complex project, zero backend knowledge, tight deadline</p>
            </div>
            <div>
              <div className="text-3xl mb-2">🔥</div>
              <h4 className="text-lg font-bold text-white mb-2">The Evolution</h4>
              <p className="text-gray-400 text-sm">72-hour coding marathons, YouTube university, trial by fire</p>
            </div>
            <div>
              <div className="text-3xl mb-2">🚀</div>
              <h4 className="text-lg font-bold text-white mb-2">The Transformation</h4>
              <p className="text-gray-400 text-sm">Full-stack developer born, career trajectory changed forever</p>
            </div>
          </div>
        </div>

        {/* GitHub Stats */}
        <div className="mt-12 text-center">
          <p className="text-gray-400 mb-4">Curious about the code behind these projects?</p>
          <button className="cursor-hover group relative px-8 py-4 bg-gray-800 text-white rounded-full font-semibold transition-all duration-300 hover:bg-[#ff6b35] border border-gray-600 hover:border-[#ff6b35]">
            <span className="flex items-center space-x-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
              </svg>
              <span>View on GitHub</span>
            </span>
          </button>
        </div>
      </div>
    </section>
  )
}