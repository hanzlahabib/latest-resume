'use client'

import { useEffect } from 'react'

export function SecurityProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Disable right-click context menu
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault()
      return false
    }

    // Disable F12, Ctrl+Shift+I, Ctrl+U, Ctrl+S
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && e.key === 'I') ||
        (e.ctrlKey && e.key === 'u') ||
        (e.ctrlKey && e.key === 's') ||
        (e.ctrlKey && e.key === 'a') ||
        (e.ctrlKey && e.key === 'c')
      ) {
        e.preventDefault()
        return false
      }
    }

    // Add event listeners
    document.addEventListener('contextmenu', handleContextMenu)
    document.addEventListener('keydown', handleKeyDown)

    // Disable drag and drop
    const handleDragStart = (e: DragEvent) => {
      e.preventDefault()
      return false
    }

    document.addEventListener('dragstart', handleDragStart)

    // Console protection and contact message
    const showContactMessage = () => {
      console.clear()
      console.log('%cSTOP!', 'color: red; font-size: 50px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);')
      console.log('%cThis is a browser feature intended for developers.', 'color: red; font-size: 16px; font-weight: bold;')
      console.log('%cSource code protection is active. 🔒', 'color: #ff4444; font-size: 14px;')
      console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #ff6b35;')
      console.log('%c🚀 IMPRESSED BY THIS PORTFOLIO?', 'color: #ff6b35; font-size: 18px; font-weight: bold;')
      console.log('%c💼 Looking for a Senior Frontend Developer?', 'color: #4CAF50; font-size: 14px; font-weight: bold;')
      console.log('%c📧 Contact Hanzla: hanzlahabib99@gmail.com', 'color: #2196F3; font-size: 14px; font-weight: bold;')
      console.log('%c🔗 LinkedIn: https://linkedin.com/in/hanzla-habib', 'color: #0077B5; font-size: 14px; font-weight: bold;')
      console.log('%c🌟 "From crisis to code - evolution through challenge"', 'color: #9C27B0; font-size: 12px; font-style: italic;')
      console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #ff6b35;')
    }

    // Show initial message
    showContactMessage()

    // Show message periodically (every 30 seconds)
    const messageInterval = setInterval(showContactMessage, 30000)

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu)
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('dragstart', handleDragStart)
      clearInterval(messageInterval)
    }
  }, [])

  return <>{children}</>
}