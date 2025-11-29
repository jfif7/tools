"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Plus, Minus, X, Trophy } from "lucide-react"
import { calculateBet, getBestCarId, type CarConfig, type Target, type BetResult } from "@/lib/calculate-bet"

interface CarSpecsProps {
  showRewardRatio: boolean
  target: Target
}

export function CarSpecs({ showRewardRatio, target }: CarSpecsProps) {
  const [cars, setCars] = useState<CarConfig[]>([
    { id: 1, type: "ur", urMin: 2, urMax: 4, rewardRatio: 20 },
    { id: 2, type: "ur", urMin: 5, urMax: 6, rewardRatio: 20 },
    { id: 3, type: "ur", urMin: 7, urMax: 8, rewardRatio: 20 },
    { id: 4, type: "ur", urMin: 9, urMax: 99, rewardRatio: 20 },
    { id: 5, type: "royal", isUrRoyal: true, royalCount: 1, rewardRatio: 20 },
  ])

  const [results, setResults] = useState<BetResult[]>([])
  const [bestCarId, setBestCarId] = useState<number>(-1)

  useEffect(() => {
    const newResults = calculateBet(cars, target)
    setResults(newResults)
    setBestCarId(getBestCarId(newResults, target))
  }, [cars, target])

  const getResultForCar = (carId: number) => results.find((r) => r.carId === carId)

  const updateCar = (id: number, updates: Partial<CarConfig>) => {
    setCars(cars.map((car) => (car.id === id ? { ...car, ...updates } : car)))
  }

  const addCar = (type: "ur" | "royal") => {
    const newId = Math.max(...cars.map((c) => c.id), 0) + 1
    const newCar: CarConfig =
      type === "ur"
        ? { id: newId, type: "ur", urMin: 0, urMax: 1, rewardRatio: 0 }
        : { id: newId, type: "royal", isUrRoyal: true, royalCount: 1, rewardRatio: 0 }
    setCars([...cars, newCar])
  }

  const removeCar = (id: number) => {
    if (cars.length > 1) {
      setCars(cars.filter((car) => car.id !== id))
    }
  }

  const totalRatio = cars.reduce((sum, car) => sum + car.rewardRatio, 0)

  return (
    <div className="h-full flex flex-col bg-card rounded-lg border border-border p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-primary font-semibold">Car Specifications</h3>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => addCar("ur")}
            className="h-7 text-xs border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          >
            <Plus className="h-3 w-3 mr-1" /> UR
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => addCar("royal")}
            className="h-7 text-xs border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          >
            <Plus className="h-3 w-3 mr-1" /> Royal
          </Button>
        </div>
      </div>

      {/* Car list - compact rows */}
      <div className="flex-1 space-y-2 overflow-auto">
        {cars.map((car, index) => (
          <CarRow
            key={car.id}
            car={car}
            index={index}
            onUpdate={(updates) => updateCar(car.id, updates)}
            onRemove={() => removeCar(car.id)}
            showRewardRatio={showRewardRatio}
            canRemove={cars.length > 1}
            target={target}
            result={getResultForCar(car.id)}
            isBest={car.id === bestCarId}
          />
        ))}
      </div>

      {/* Total allocation indicator */}
      {showRewardRatio && (
        <div
          className={`mt-3 text-xs font-medium text-center py-1.5 rounded ${
            totalRatio === 100
              ? "bg-green-500/20 text-green-600 dark:text-green-400"
              : "bg-yellow-500/20 text-yellow-600 dark:text-yellow-400"
          }`}
        >
          Total: {totalRatio}% {totalRatio !== 100 && "(should be 100%)"}
        </div>
      )}
    </div>
  )
}

function CarRow({
  car,
  index,
  onUpdate,
  onRemove,
  showRewardRatio,
  canRemove,
  target,
  result,
  isBest,
}: {
  car: CarConfig
  index: number
  onUpdate: (updates: Partial<CarConfig>) => void
  onRemove: () => void
  showRewardRatio: boolean
  canRemove: boolean
  target: Target
  result?: BetResult
  isBest: boolean
}) {
  const getTargetDisplay = () => {
    if (!result) return "-"
    switch (target) {
      case "winrate":
        return `${result.winrate}%`
      case "profit":
        return `${result.profit > 0 ? "+" : ""}${result.profit}%`
      case "sharpe":
        return result.sharpe.toFixed(2)
      default:
        return "-"
    }
  }

  const getTargetLabel = () => {
    switch (target) {
      case "winrate":
        return "Win"
      case "profit":
        return "Profit"
      case "sharpe":
        return "Sharpe"
      default:
        return ""
    }
  }

  return (
    <div
      className={`flex items-center gap-3 p-2 rounded border transition-colors ${
        isBest ? "bg-primary/20 border-primary" : "bg-secondary/50 border-border/50"
      }`}
    >
      <div className="w-20 flex-shrink-0 text-center">
        <div className={`text-sm font-bold ${isBest ? "text-primary" : "text-foreground"}`}>
          {isBest && <Trophy className="h-3 w-3 inline mr-1" />}
          {getTargetDisplay()}
        </div>
        <div className="text-[10px] text-muted-foreground">{getTargetLabel()}</div>
      </div>

      {/* Car label with progress bar style indicator */}
      <div className="w-24 flex-shrink-0">
        <span className="text-primary text-sm font-medium">
          {car.type === "ur" ? `${car.urMin}~${car.urMax}` : `${car.royalCount}+ Royal`}
        </span>
        <div className="h-1 mt-1 bg-primary rounded-full" style={{ width: `${Math.min((index + 1) * 20, 100)}%` }} />
      </div>

      {/* Controls based on car type */}
      {car.type === "ur" ? (
        <div className="flex items-center gap-2">
          <NumberStepper value={car.urMin || 0} onChange={(v) => onUpdate({ urMin: v })} min={0} />
          <span className="text-muted-foreground">~</span>
          <NumberStepper value={car.urMax || 0} onChange={(v) => onUpdate({ urMax: v })} min={0} />
        </div>
      ) : (
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs">
            <span className={!car.isUrRoyal ? "text-foreground" : "text-muted-foreground"}>N</span>
            <Switch
              checked={car.isUrRoyal}
              onCheckedChange={(checked) => onUpdate({ isUrRoyal: checked })}
              className="scale-75"
            />
            <span className={car.isUrRoyal ? "text-foreground" : "text-muted-foreground"}>UR</span>
          </div>
          <NumberStepper value={car.royalCount || 1} onChange={(v) => onUpdate({ royalCount: v })} min={1} />
        </div>
      )}

      {/* Reward ratio slider */}
      {showRewardRatio && (
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <Slider
            value={[car.rewardRatio]}
            onValueChange={([value]) => onUpdate({ rewardRatio: value })}
            max={100}
            step={1}
            className="flex-1"
          />
          <span className="text-sm font-bold text-primary w-10 text-right">{car.rewardRatio}%</span>
        </div>
      )}

      {/* Remove button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={onRemove}
        disabled={!canRemove}
        className="h-6 w-6 text-destructive hover:text-destructive hover:bg-destructive/20"
      >
        <X className="h-3 w-3" />
      </Button>
    </div>
  )
}

function NumberStepper({ value, onChange, min = 0 }: { value: number; onChange: (v: number) => void; min?: number }) {
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
        onChange={(e) => onChange(Math.max(min, Number.parseInt(e.target.value) || min))}
        className="h-6 w-10 text-center border-0 bg-transparent p-0 text-sm"
      />
      <Button variant="ghost" size="icon" className="h-6 w-6 rounded-none" onClick={() => onChange(value + 1)}>
        <Plus className="h-3 w-3" />
      </Button>
    </div>
  )
}
