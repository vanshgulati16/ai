import React from 'react'
import { createRoot } from 'react-dom/client'
import ContentUI from "./components/ContentUI"

export default defineContentScript({
  // Specifies that this script should run on LinkedIn pages
  matches: ['https://*.linkedin.com/*'],
  
  main() {
    // console.log("Content script is running");
    
    // Inject Tailwind styles
    const style = document.createElement('style')
    style.textContent = `
      @import 'https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css';
    `
    document.head.appendChild(style)

    // Create a new div element for extension to work
    const root = document.createElement('div')
    root.id = 'linkedin-ai-reply-root'
    // Append this new div to the body
    document.body.appendChild(root)

    createRoot(root).render(
      React.createElement(React.StrictMode, null,
        React.createElement(ContentUI)
      )
    )

    // console.log("ContentUI rendered");
  }
})

