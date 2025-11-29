export type CarConfig = {
  id: number
  type: "ur" | "royal"
  urMin?: number
  urMax?: number
  isUrRoyal?: boolean
  royalCount?: number
  rewardRatio: number
}

export type Target = "winrate" | "profit" | "sharpe" | "dopamine"

export interface BetResult {
  carId: number
  winrate: number
  profit: number
  sharpe: number
}

// Dummy function that returns random results for now
export function calculateBet(cars: CarConfig[], target: Target): BetResult[] {
  return cars.map((car) => {
    // Generate somewhat realistic dummy values based on car type
    const baseWinrate =
      car.type === "ur"
        ? 0.3 + Math.random() * 0.4 // 30-70% for UR
        : 0.1 + Math.random() * 0.2 // 10-30% for Royal

    const baseProfit =
      car.type === "ur"
        ? -20 + Math.random() * 60 // -20% to +40% for UR
        : -10 + Math.random() * 80 // -10% to +70% for Royal

    const baseSharpe =
      car.type === "ur"
        ? 0.5 + Math.random() * 1.5 // 0.5-2.0 for UR
        : 0.2 + Math.random() * 2.0 // 0.2-2.2 for Royal

    return {
      carId: car.id,
      winrate: Math.round(baseWinrate * 100),
      profit: Math.round(baseProfit * 10) / 10,
      sharpe: Math.round(baseSharpe * 100) / 100,
    }
  })
}

export function getBestCarId(results: BetResult[], target: Target): number {
  if (results.length === 0) return -1

  let best = results[0]
  for (const result of results) {
    switch (target) {
      case "winrate":
        if (result.winrate > best.winrate) best = result
        break
      case "profit":
        if (result.profit > best.profit) best = result
        break
      case "sharpe":
        if (result.sharpe > best.sharpe) best = result
        break
    }
  }
  return best.carId
}
