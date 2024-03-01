import React, { useState } from "react"

import { ICONS } from "~assets"
import Button from "~components/Button"
import Input from "~components/form/Input"

type Props = {
  insertMessage: (message: string) => void
  setStep: (step: number) => void
}

const WindowInput = ({ insertMessage, setStep }: Props) => {
  const [prompt, setPrompt] = useState("")
  const [showPrompt, setShowPrompt] = useState("")
  const [promptError, setPromptError] = useState(false)

  const dummyText = `Thank you for the opportunity! If you have any more questions or
  if there's anything else I can help you with, feel free to ask.`

  const [showMessage, setShowMessage] = useState(false)

  const handleGenerate = () => {
    console.log("prompt", prompt)

    if (!prompt) {
      setPromptError(true)
      return
    }
    setShowMessage(true)
    setShowPrompt(prompt)
    setPrompt("")
  }

  const handleOutsideClick = (e: any) => {
    setStep(0)
  }
  return (
    <div
      className="absolute z-auto bg-[rgba(0,0,0,0.5)] h-screen w-screen flex items-center justify-center overflow-hidden"
      onClick={handleOutsideClick}>
      <div
        className="p-[26px] w-auto bg-[white] shadow-lg rounded-[16px]"
        onClick={(e) => {
          e.stopPropagation()
        }}>
        {showMessage ? (
          <div className="w-full flex flex-col gap-[27px] text-[#666D80] mb-[27px] text-[24px]">
            <div className="self-end bg-[#DFE1E7] p-4 py-5 min-w-[450px] max-w-[500px] rounded-[12px]">
              {showPrompt}
            </div>
            <div className="slef-start bg-[#DBEAFE] p-4 min-w-[450px] max-w-[500px] rounded-[12px]">
              {dummyText}
            </div>
          </div>
        ) : null}
        <Input
          type="text"
          placeholder="Your prompt"
          value={prompt}
          onChange={(e: any) => {
            setPrompt(e.target.value)
            setPromptError(false)
          }}
          className={`max-w-[600px] min-w-[600px] text-2xl ${promptError ? "border-red-500" : ""}`}
        />
        {promptError ? (
          <p className="text-red-500">Prompt is required !</p>
        ) : null}
        {showMessage ? (
          <div className="flex justify-between mt-[27px]">
            <Button
              varient="secondary"
              onClick={() => {
                insertMessage(dummyText)
                console.log("prompt", prompt)
              }}>
              <>
                <img src={ICONS.DOWNLOAD} alt="" />
                Insert
              </>
            </Button>
            <Button>
              <>
                <img src={ICONS.REGENERATE} alt="" />
                Regenerate
              </>
            </Button>
          </div>
        ) : (
          <div className="flex justify-end mt-[27px]">
            <Button onClick={handleGenerate}>
              <>
                <img src={ICONS.SEND} alt="" />
                Generate
              </>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default WindowInput
