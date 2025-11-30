import { Button } from "@/components/ui/button"
import { Plus, Minus } from "lucide-react"
import { Input } from "@/components/ui/input"

function NumberStepper({
  value,
  onChange,
  min = 0,
}: {
  value: number
  onChange: (v: number) => void
  min?: number
}) {
  return (
    <div className="flex items-center bg-background rounded border border-border">
      <Button
        variant="ghost"
        size="icon"
        className="h-6 w-6 rounded-none"
        onClick={() => onChange(Math.max(min, value - 1))}
      >
        <Minus className="h-3 w-3" />
      </Button>
      <Input
        type="number"
        value={value}
        onChange={(e) =>
          onChange(Math.max(min, Number.parseInt(e.target.value) || min))
        }
        className="h-6 w-10 text-center border-0 bg-transparent p-0 text-sm"
      />
      <Button
        variant="ghost"
        size="icon"
        className="h-6 w-6 rounded-none"
        onClick={() => onChange(value + 1)}
      >
        <Plus className="h-3 w-3" />
      </Button>
    </div>
  )
}

export { NumberStepper }
