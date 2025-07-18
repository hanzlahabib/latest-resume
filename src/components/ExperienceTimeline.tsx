'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const experiences = [
  {
    id: 1,
    title: "Senior Software Engineer",
    company: "Rihal",
    period: "2022 - Present",
    duration: "2+ years",
    type: "Full-time • Remote",
    description: "Leading frontend architecture and development, building scalable web applications with modern technologies and mentoring development teams.",
    skills: ["React", "TypeScript", "Next.js", "Team Leadership"],
    color: "from-purple-500 to-pink-500"
  },
  {
    id: 2,
    title: "Senior Software Engineer",
    company: "Eclipse AI 🚀",
    period: "Jan 2023 - Present",
    duration: "2 yrs 7 mos",
    type: "Full-time",
    description: "Leading frontend architecture and development at Eclipse AI, building next-generation AI-powered solutions.",
    skills: ["React", "TypeScript", "AI Integration", "Team Leadership"],
    color: "from-indigo-500 to-purple-500"
  },
  {
    id: 3,
    title: "Senior Frontend Developer",
    company: "InnoSTARK Technologies Pvt. Ltd.",
    period: "Jan 2020 - Present",
    duration: "5 yrs 7 mos",
    type: "Full-time",
    description: "Spearheading frontend development initiatives, mentoring junior developers, and delivering cutting-edge web applications.",
    skills: ["React", "Next.js", "Vue.js", "GraphQL"],
    color: "from-blue-500 to-cyan-500"
  },
  {
    id: 4,
    title: "Software Engineer",
    company: "Attend Anywhere",
    period: "Jan 2020 - Present",
    duration: "5 yrs 7 mos",
    type: "Full-time • Remote",
    location: "Melbourne, Victoria, Australia",
    description: "Developing telehealth solutions connecting patients and healthcare providers globally. Remote collaboration across time zones.",
    skills: ["React", "Node.js", "WebRTC", "Healthcare Tech"],
    color: "from-green-500 to-teal-500"
  },
  {
    id: 5,
    title: "JavaScript/React Developer",
    company: "Regbits Private Limited",
    period: "Jan 2019 - Present",
    duration: "6 yrs 7 mos",
    type: "Full-time",
    location: "Pakistan",
    description: "Managing SaaS projects, refactoring codebases, implementing Test Driven Development. Training junior resources and leading teams through complete design-to-code processes.",
    skills: ["JavaScript", "React", "Redux.js", "AWS", "TDD"],
    color: "from-cyan-500 to-blue-500"
  },
  {
    id: 6,
    title: "Frontend & PHP Developer",
    company: "GET GROUP",
    period: "Jan 2018 - Feb 2019",
    duration: "1 yr 2 mos",
    type: "Full-time",
    location: "Pakistan",
    description: "Managed Frontend Development process and improved application performance by 27% through codebase refactoring and optimization.",
    skills: ["Frontend Development", "PHP", "Performance Optimization"],
    color: "from-teal-500 to-green-500"
  },
  {
    id: 7,
    title: "Frontend Web Developer",
    company: "Vision Bird",
    period: "Sep 2015 - Dec 2017",
    duration: "2 yrs 4 mos",
    type: "Full-time",
    location: "Pakistan",
    description: "Created UI/UX design wireframes and converted them to actual code using HTML, CSS, and Bootstrap. Also provided SEO/SEM and PPC services.",
    skills: ["HTML", "CSS", "Bootstrap", "UI/UX Design", "SEO"],
    color: "from-orange-500 to-red-500"
  }
]

export function ExperienceTimeline() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    // Simple fade-in animation without ScrollTrigger for now
    if (!sectionRef.current) return
    
    const ctx = gsap.context(() => {
      gsap.set('.timeline-item', { opacity: 1, x: 0 })
      gsap.set('.timeline-line', { height: '100%' })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section 
      ref={sectionRef}
      className="relative py-16 md:py-32 px-4 md:px-6 bg-gradient-to-b from-black to-gray-900"
      id="experience"
    >
      <div className="max-w-6xl mx-auto ">
        {/* Section Header */}
        <div className="text-center mb-20 md:mb-[300px]">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4 md:mb-6">
            EXPERIENCE
            <span className="text-[#ff6b35]">.</span>
          </h2>
          <p className="text-base md:text-lg text-gray-300 max-w-3xl mx-auto px-4">
            The journey from crisis to mastery - each role shaped my evolution into a senior frontend specialist
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-4 md:left-1/2 top-0 w-0.5 md:w-1 bg-gray-700 transform md:-translate-x-1/2">
            <div className="timeline-line w-full bg-gradient-to-b from-[#ff6b35] to-purple-500" />
          </div>

          {/* Timeline Items */}
          <div className="space-y-8 md:space-y-16">
            {experiences.map((exp, index) => (
              <div 
                key={exp.id}
                className={`timeline-item relative flex items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline Dot */}
                <div className={`absolute left-4 md:left-1/2 w-3 h-3 md:w-4 md:h-4 bg-gradient-to-r ${exp.color} rounded-full transform -translate-x-1/2 md:-translate-x-1/2 z-10 shadow-lg`}>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#ff6b35] to-purple-500 rounded-full animate-ping opacity-75" />
                </div>

                {/* Content Card */}
                <div className={`ml-8 md:ml-0 md:w-5/12 ${index % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'}`}>
                  <div className="cursor-hover group relative bg-gray-800/50 backdrop-blur-sm rounded-xl md:rounded-2xl p-3 md:p-6 border border-gray-700 hover:border-[#ff6b35] transition-all duration-300 hover:transform hover:scale-102">
                    {/* Company & Role */}
                    <div className="mb-3 md:mb-4">
                      <h3 className="text-sm md:text-xl lg:text-2xl font-bold text-white mb-1 md:mb-2 group-hover:text-[#ff6b35] transition-colors">
                        {exp.title}
                      </h3>
                      <p className="text-sm md:text-lg text-[#ff6b35] font-semibold">
                        {exp.company}
                      </p>
                      <div className="flex flex-wrap gap-1 md:gap-2 text-xs md:text-sm text-gray-400 mt-1">
                        <span>{exp.period}</span>
                        <span>•</span>
                        <span>{exp.duration}</span>
                        <span>•</span>
                        <span>{exp.type}</span>
                      </div>
                      {exp.location && (
                        <p className="text-xs md:text-sm text-gray-500 mt-1">{exp.location}</p>
                      )}
                    </div>

                    {/* Description */}
                    <p className="text-xs md:text-base text-gray-300 mb-3 md:mb-4 leading-relaxed">
                      {exp.description}
                    </p>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-1 md:gap-2">
                      {exp.skills.map((skill, skillIndex) => (
                        <span 
                          key={skillIndex}
                          className="px-2 py-0.5 md:px-3 md:py-1 bg-[#ff6b35]/20 text-[#ff6b35] rounded-full text-xs md:text-sm font-medium border border-[#ff6b35]/30"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* Decorative Elements */}
                    <div className={`absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r ${exp.color} rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Crisis & Evolution Callout */}
        <div className="mt-60 text-center">
          <div className="inline-block bg-gradient-to-r from-[#ff6b35] to-purple-500 p-1 rounded-2xl">
            <div className="bg-black rounded-2xl px-8 py-6">
              <h3 className="text-2xl font-bold text-white mb-2">
                Evolution Through Crisis 🔥
              </h3>
              <p className="text-gray-300">
                Each challenge became a stepping stone. From designer roots to senior frontend mastery - 
                <br />
                crisis didn't break me, it made me stronger.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}