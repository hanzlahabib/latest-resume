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
    const ctx = gsap.context(() => {
      // Timeline animation
      gsap.from('.timeline-item', {
        x: -100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      })

      // Progress line animation
      gsap.fromTo('.timeline-line', 
        { height: '0%' },
        {
          height: '100%',
          duration: 2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            end: 'bottom 40%',
            scrub: 1
          }
        }
      )

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section 
      ref={sectionRef}
      className="relative py-32 px-6 bg-gradient-to-b from-black to-gray-900"
      id="experience"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            EXPERIENCE
            <span className="text-[#ff6b35]">.</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            The journey from crisis to mastery - each role shaped my evolution into a senior frontend specialist
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 md:left-1/2 top-0 w-1 bg-gray-700 transform md:-translate-x-1/2">
            <div className="timeline-line w-full bg-gradient-to-b from-[#ff6b35] to-purple-500" />
          </div>

          {/* Timeline Items */}
          <div className="space-y-16">
            {experiences.map((exp, index) => (
              <div 
                key={exp.id}
                className={`timeline-item relative flex items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline Dot */}
                <div className={`absolute left-8 md:left-1/2 w-4 h-4 bg-gradient-to-r ${exp.color} rounded-full transform md:-translate-x-1/2 z-10 shadow-lg`}>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#ff6b35] to-purple-500 rounded-full animate-ping opacity-75" />
                </div>

                {/* Content Card */}
                <div className={`ml-16 md:ml-0 md:w-5/12 ${index % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'}`}>
                  <div className="cursor-hover group relative bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 hover:border-[#ff6b35] transition-all duration-300 hover:transform hover:scale-102">
                    {/* Company & Role */}
                    <div className="mb-4">
                      <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[#ff6b35] transition-colors">
                        {exp.title}
                      </h3>
                      <p className="text-lg text-[#ff6b35] font-semibold">
                        {exp.company}
                      </p>
                      <div className="flex flex-wrap gap-2 text-sm text-gray-400 mt-1">
                        <span>{exp.period}</span>
                        <span>•</span>
                        <span>{exp.duration}</span>
                        <span>•</span>
                        <span>{exp.type}</span>
                      </div>
                      {exp.location && (
                        <p className="text-sm text-gray-500 mt-1">{exp.location}</p>
                      )}
                    </div>

                    {/* Description */}
                    <p className="text-gray-300 mb-4 leading-relaxed">
                      {exp.description}
                    </p>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-2">
                      {exp.skills.map((skill, skillIndex) => (
                        <span 
                          key={skillIndex}
                          className="px-3 py-1 bg-[#ff6b35]/20 text-[#ff6b35] rounded-full text-sm font-medium border border-[#ff6b35]/30"
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
        <div className="mt-16 text-center">
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