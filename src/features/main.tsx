import React, { useEffect } from "react"

import MagicIconsHolder from "./magic-icon-holder"
import WindowInput from "./window-input"

type Props = {
  anchorElement: HTMLElement | null
  step: number
  setStep: (step: number) => void
  insertMessage: (message: string) => void
}

const Main = ({ anchorElement, step, setStep, insertMessage }: Props) => {
  if (step === 0) {
    return <MagicIconsHolder setStep={setStep} />
  } else if (step === 1) {
    return <WindowInput setStep={setStep} insertMessage={insertMessage} />
  } else return null
}

export default Main
