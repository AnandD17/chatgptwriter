import React from "react"

type Props = {
  type: "text" | "password" | "email" | "number"
  placeholder: string
  value: string
  onChange: (e: any) => void
  className?: string
}

const Input = ({
  type = "text",
  placeholder,
  value,
  onChange,
  className
}: Props) => {
  return (
    <input
      className={`h-[60px] px-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500 transition-all duration-200 ease-in-out plasmo-overlay-input ${className || ""}`}
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      id="plasmo-overlay-input"
    />
  )
}

export default Input
