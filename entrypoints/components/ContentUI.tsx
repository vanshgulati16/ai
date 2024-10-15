import React, { useEffect, useState, useRef } from 'react'
import ReactDOM from 'react-dom'
import PromptModal from './PromptModal'
import AiIcon from '@/public/AI.svg'

const ContentUI: React.FC = () => {
  const [showModal, setShowModal] = useState(false)
  const [showIcon, setShowIcon] = useState(false)
  const iconRef = useRef<HTMLDivElement | null>(null)
  const textBoxRef = useRef<Element | null>(null)
  const intervalIdRef = useRef<number | null>(null)

  useEffect(() => {
    const checkForTextBox = () => {
      const textBox = document.querySelector(".msg-form__contenteditable")
      if (textBox) {
        textBoxRef.current = textBox
        addEventListeners(textBox)
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
      removeEventListeners()
    }
  }, [])

  const addEventListeners = (textBox: Element) => {
    textBox.addEventListener('focus', handleTextBoxFocus)
    document.addEventListener('mousedown', handleClickOutside)
  }

  const removeEventListeners = () => {
    textBoxRef.current?.removeEventListener('focus', handleTextBoxFocus)
    document.removeEventListener('mousedown', handleClickOutside)
  }

  const handleTextBoxFocus = () => {
    setShowIcon(true)
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (iconRef.current && !iconRef.current.contains(event.target as Node) &&
        textBoxRef.current && !textBoxRef.current.contains(event.target as Node)) {
      setShowIcon(false)
    }
  }

  const handleIconClick = () => {
    setShowModal(prev => !prev)
  }

  useEffect(() => {
    if (showIcon) {
      addAiIcon()
    } else {
      removeAiIcon()
    }
  }, [showIcon])

  const addAiIcon = () => {
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
    iconRef.current = container
    textBoxRef.current?.parentElement?.appendChild(container)
  }

  const removeAiIcon = () => {
    const existingIcon = document.querySelector(".ai-icon-container")
    existingIcon?.remove()
    iconRef.current = null
  }

  return ReactDOM.createPortal(
    <PromptModal 
      open={showModal} 
      handleClose={() => {
        setShowModal(false)
      }} 
    />,
    document.body
  )
}

export default ContentUI
