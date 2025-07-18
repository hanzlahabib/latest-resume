'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const skillCategories = [
  {
    title: "Frontend",
    icon: "⚛️",
    skills: [
      { name: "JavaScript", level: 95, color: "from-yellow-400 to-yellow-600" },
      { name: "React.js", level: 90, color: "from-blue-400 to-blue-600" },
      { name: "TypeScript", level: 85, color: "from-blue-500 to-indigo-600" },
      { name: "Vue.js", level: 80, color: "from-green-400 to-green-600" }
    ]
  },
  {
    title: "Backend",
    icon: "🔧",
    skills: [
      { name: "Node.js", level: 85, color: "from-green-500 to-green-700" },
      { name: "PHP", level: 80, color: "from-purple-500 to-purple-700" },
      { name: "MongoDB", level: 85, color: "from-green-600 to-green-800" },
      { name: "SQL", level: 75, color: "from-blue-600 to-blue-800" }
    ]
  },
  {
    title: "Tools",
    icon: "🛠️",
    skills: [
      { name: "Git", level: 90, color: "from-red-400 to-red-600" },
      { name: "Redux", level: 85, color: "from-purple-400 to-purple-600" },
      { name: "AWS", level: 75, color: "from-yellow-400 to-orange-500" },
      { name: "WordPress", level: 80, color: "from-blue-600 to-blue-800" }
    ]
  },
  {
    title: "Design",
    icon: "🎨",
    skills: [
      { name: "UI/UX", level: 90, color: "from-purple-400 to-purple-600" },
      { name: "HTML/CSS", level: 95, color: "from-orange-400 to-orange-600" },
      { name: "Responsive Design", level: 85, color: "from-pink-400 to-pink-600" },
      { name: "User Experience", level: 80, color: "from-teal-400 to-teal-600" }
    ]
  }
]

export function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    // Simple fade-in animation without ScrollTrigger for now
    if (!sectionRef.current) return
    
    const ctx = gsap.context(() => {
      gsap.set('.skill-category', { opacity: 1, y: 0 })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section 
      ref={sectionRef}
      className="relative py-32 px-6 bg-gradient-to-b from-black to-gray-900"
      id="skills"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            SKILLS
            <span className="text-[#ff6b35]">.</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Self-taught mastery across the full stack - from pixel-perfect designs to scalable backend systems
          </p>
        </div>

        {/* Skills Grid */}
        <div className="skills-grid grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <div 
              key={categoryIndex}
              className="skill-category bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 hover:border-[#ff6b35] transition-all duration-300"
            >
              {/* Category Header */}
              <div className="text-center mb-6">
                <span className="text-3xl">{category.icon}</span>
                <h3 className="text-xl font-bold text-white mt-2">{category.title}</h3>
              </div>

              {/* Skills List */}
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="text-center">
                    {/* Skill Name */}
                    <div className="text-sm text-gray-300 mb-2">
                      {skill.name}
                    </div>
                    
                    {/* Percentage */}
                    <div className="text-xs text-[#ff6b35] font-mono mb-2">
                      {skill.level}%
                    </div>

                    {/* Progress Bar */}
                    <div className="mx-auto w-16 h-1 bg-gray-700 rounded-full">
                      <div 
                        className={`h-full bg-gradient-to-r ${skill.color} rounded-full transition-all duration-1000`}
                        style={{ width: `${(skill.level / 100) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Self-Taught Callout */}
        <div className="mt-16 text-center">
          <div className="inline-block bg-gradient-to-r from-[#ff6b35] to-purple-500 p-1 rounded-2xl">
            <div className="bg-black rounded-2xl px-8 py-6">
              <h3 className="text-2xl font-bold text-white mb-2">
                100% Self-Taught 🎓
              </h3>
              <p className="text-gray-300 max-w-2xl mx-auto">
                No formal CS degree. No bootcamp. Just pure curiosity, YouTube tutorials, documentation deep-dives, 
                and countless hours of building, breaking, and rebuilding. Crisis taught me more than any classroom ever could.
              </p>
            </div>
          </div>
        </div>

        {/* Learning Philosophy */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-4xl mb-4">📚</div>
            <h4 className="text-lg font-bold text-white mb-2">Learn by Doing</h4>
            <p className="text-gray-400 text-sm">Every project is a classroom, every bug is a teacher</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-4">🔥</div>
            <h4 className="text-lg font-bold text-white mb-2">Embrace Crisis</h4>
            <p className="text-gray-400 text-sm">Pressure creates diamonds, problems create solutions</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-4">🚀</div>
            <h4 className="text-lg font-bold text-white mb-2">Never Stop Growing</h4>
            <p className="text-gray-400 text-sm">Technology evolves, so do I - constantly learning</p>
          </div>
        </div>
      </div>
    </section>
  )
}