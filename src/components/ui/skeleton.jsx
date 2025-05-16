
import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}) { // Type annotation removed
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  )
}

export { Skeleton }
