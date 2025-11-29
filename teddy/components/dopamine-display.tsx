"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"

export function DopamineDisplay() {
  const [carNumber, setCarNumber] = useState(1)
  const [isAnimating, setIsAnimating] = useState(false)

  const generateRandom = () => {
    setIsAnimating(true)
    let count = 0
    const interval = setInterval(() => {
      setCarNumber(Math.floor(Math.random() * 5) + 1)
      count++
      if (count > 10) {
        clearInterval(interval)
        setCarNumber(Math.floor(Math.random() * 5) + 1)
        setIsAnimating(false)
      }
    }, 100)
  }

  useEffect(() => {
    generateRandom()
  }, [])

  return (
    <div className="h-full flex flex-col bg-card rounded-lg border border-border overflow-hidden">
      <div className="flex-1 flex flex-col items-center justify-center bg-gradient-to-br from-primary/30 via-accent/20 to-primary/10 p-8">
        <div className={`transition-transform duration-100 ${isAnimating ? "scale-110" : "scale-100"}`}>
          <h2 className="text-5xl md:text-7xl font-black text-primary drop-shadow-lg mb-4 text-center text-balance">
            ALL IN {carNumber} CAR
          </h2>
        </div>

        <Button
          onClick={generateRandom}
          size="lg"
          className="bg-primary text-primary-foreground hover:bg-primary/80"
          disabled={isAnimating}
        >
          <Sparkles className="h-5 w-5 mr-2" />
          {isAnimating ? "Rolling..." : "Roll Again"}
        </Button>
      </div>

      <div className="p-3 bg-secondary text-center">
        <p className="text-muted-foreground text-sm">
          Warning: This strategy optimizes for entertainment, not financial returns.
        </p>
      </div>
    </div>
  )
}
