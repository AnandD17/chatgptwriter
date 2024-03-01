import React from "react"

type Props = {
  children: React.ReactNode
  varient?: "primary" | "secondary"
  onClick?: () => void
}

const Button = ({ children, varient = "primary", onClick }: Props) => {
  const getClassName = () => {
    switch (varient) {
      case "primary":
        return "bg-[#3B82F6] text-white border border-[#3B82F6]"
      case "secondary":
        return "bg-transparent text-[#666D80] border border-[#666D80]"
      default:
        return "bg-[#3B82F6] text-white border border-[#3B82F6]"
    }
  }
  return (
    <button
      onClick={onClick}
      className={`text-[24px] flex items-center justify-center gap-2.5 py-[12px] px-[24px] rounded-lg ${getClassName()}`}>
      {children}
    </button>
  )
}

export default Button
