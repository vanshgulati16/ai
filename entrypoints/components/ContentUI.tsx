import React, { useEffect, useState, useRef } from 'react'
import ReactDOM from 'react-dom'
import PromptModal from './PromptModal'
import AiIcon from '@/public/AI.svg'

const ContentUI: React.FC = () => {
  const [showModal, setShowModal] = useState(false)
  const intervalIdRef = useRef<number | null>(null)

  useEffect(() => {
    const checkForTextBox = () => {
      const textBox = document.querySelector(".msg-form__contenteditable")
      if (textBox) {
        addAiIcon(textBox)
        if (intervalIdRef.current) {
          clearInterval(intervalIdRef.current)
        }
      }
    }

    intervalIdRef.current = window.setInterval(checkForTextBox, 1000)

    return () => {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current)
      }
      removeAiIcon()
    }
  }, [])

  const addAiIcon = (textBox: Element) => {
    removeAiIcon() // Remove existing icon if any
    const container = document.createElement("div")
    container.className = "ai-icon-container"
    container.setAttribute("style", "position:absolute; bottom:0; right:6rem; z-index:9999;")
    const imgElement = document.createElement("img")
    imgElement.src = AiIcon
    imgElement.alt = "ai-icon"
    imgElement.setAttribute("style", "width: 32px; height: 32px; cursor:pointer;")
    imgElement.addEventListener("click", handleIconClick)
    container.appendChild(imgElement)
    textBox.parentElement?.appendChild(container)
  }

  const removeAiIcon = () => {
    const existingIcon = document.querySelector(".ai-icon-container")
    existingIcon?.remove()
  }

  const handleIconClick = () => {
    // console.log("AI icon clicked")
    setShowModal(prev => {
      console.log("Setting showModal to:", !prev)
      return !prev
    })
  }

  // useEffect(() => {
  //   console.log("showModal state changed:", showModal) 
  // }, [showModal])

  return ReactDOM.createPortal(
    <PromptModal 
      open={showModal} 
      handleClose={() => {
        // console.log("Closing modal")
        setShowModal(false)
      }} 
    />,
    document.body
  )
}

export default ContentUI
