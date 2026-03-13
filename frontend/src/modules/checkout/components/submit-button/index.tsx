"use client"

import { Button } from "@medusajs/ui"
import React from "react"
import { useFormStatus } from "react-dom"
import { CheckCircleSolid } from "@medusajs/icons"

export function SubmitButton({
  children,
  variant = "primary",
  className,
  "data-testid": dataTestId,
}: {
  children: React.ReactNode
  variant?: "primary" | "secondary" | "transparent" | "danger" | null
  className?: string
  "data-testid"?: string
}) {
  const { pending } = useFormStatus()

  return (
    <Button
      size="large"
      className={`${className} bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 hover:shadow-[var(--shadow-elegant)]`}
      type="submit"
      isLoading={pending}
      variant={variant || "primary"}
      data-testid={dataTestId}
    >
      <CheckCircleSolid className="mr-2 h-5 w-5" />
      {children}
    </Button>
  )
}
