import cssText from "data-text:~style.css"
import type { PlasmoCSConfig, PlasmoGetOverlayAnchor } from "plasmo"
import React, { useEffect, useState, type CSSProperties } from "react"
import ReactDOM from "react-dom"

import { CountButton } from "~features/count-button"
import Main from "~features/main"

export const config: PlasmoCSConfig = {
  matches: ["https://*.com/*"]
}

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

const PlasmoOverlay = () => {
  const [anchorElement, setAnchorElement] = useState(null)
  const [step, setStep] = useState(0)

  useEffect(() => {
    const onFocusIn = (event) => {
      const el = event.target
      if (el == anchorElement) return
      if (step == 1) return

      const isEditable = el.contentEditable == "true"

      if (
        isEditable ||
        (el.matches("input, textarea") &&
          el.type.match(/email|number|search|text|url/))
      ) {
        setTimeout(() => {
          setAnchorElement(el)
          setStep(0)
        }, 1000)
      } else {
        setAnchorElement(null)
        setStep(0)
      }
    }

    document
      .getElementsByTagName("body")[0]
      .addEventListener("focusin", onFocusIn)

    return () => {
      document
        .getElementsByTagName("body")[0]
        .removeEventListener("focusin", onFocusIn)
    }
  }, [])

  console.log(step, "step")

  const baseStyle: CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0
  }

  const insertMessage = (message: string) => {
    if (anchorElement) {
      if (anchorElement.matches("input, textarea")) {
        anchorElement.value = message
        setStep(0)
      } else if (anchorElement.contentEditable) {
        anchorElement.innerHTML = "<p>" + message + "</p>"
        const placeholder = document.getElementsByClassName(
          "msg-form__placeholder"
        )
        const submitButton = document.getElementsByClassName(
          "msg-form__send-button"
        )
        if (placeholder.length > 0) {
          placeholder[0].remove()
        }
        if (submitButton.length > 0) {
          submitButton[0].removeAttribute("disabled")
        }
        // anchorElement.setAttribute("value", message)
        setStep(0)
      }
    }
  }

  return anchorElement ? (
    <div
      className="z-50"
      style={step == 1 ? baseStyle : getAnchorPosition(anchorElement)}>
      <Main
        insertMessage={insertMessage}
        anchorElement={anchorElement}
        step={step}
        setStep={setStep}
      />
    </div>
  ) : null
}

const getAnchorPosition = (el: HTMLElement): CSSProperties => {
  const rect = el.getBoundingClientRect()
  const top = rect.top + window.pageYOffset - 30
  const left = rect.left + window.pageXOffset - 30
  const width = rect.width
  const height = rect.height
  const windowWidth = window.innerWidth
  const windowHeight = window.innerHeight

  // Calculate position to place the overlay at the bottom right corner of the input field
  const position: CSSProperties = {
    position: "absolute",
    top: `${top + height}px`,
    left: `${left + width}px`
  }

  // Adjust position to ensure it fits within the viewport
  if (left + width > windowWidth) {
    position.left = `${windowWidth - width}px`
  }
  if (top + height > windowHeight) {
    position.top = `${windowHeight - height}px`
  }

  return position
}

export default PlasmoOverlay
