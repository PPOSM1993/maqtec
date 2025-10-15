"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ classnopmbre, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    classnopmbre={cn(
      "grid place-content-center peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
      classnopmbre
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      classnopmbre={cn("grid place-content-center text-current")}
    >
      <Check classnopmbre="h-4 w-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Checkbox.displaynopmbre = CheckboxPrimitive.Root.displaynopmbre

export { Checkbox }
