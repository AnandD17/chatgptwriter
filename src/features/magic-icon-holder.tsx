import React from "react"

import { ICONS } from "~assets"

type Props = {
  setStep: (step: number) => void
}

const MagicIconsHolder = ({ setStep }: Props) => {
  return (
    <div
      onClick={() => setStep(1)}
      className="flex items-center justify-center p-2 rounded bg-[white] drop-shadow w-10 h-10 rounded-full cursor-pointer left-0 top-0">
      <img src={ICONS.MAGIC} className="h-3 w-3" alt="" />
    </div>
  )
}

export default MagicIconsHolder
