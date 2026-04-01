"use client"

import { Button } from "@/components/ui/button"
import { signIn } from "next-auth/react"

export function SignInButton() {
  return (
    <Button size="sm" onClick={() => signIn()}>
      Sign in
    </Button>
  )
}
