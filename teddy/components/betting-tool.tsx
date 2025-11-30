"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { CarSpecs } from "@/components/car-specs"
import { DopamineDisplay } from "@/components/dopamine-display"
import type { Target } from "@/lib/calculate-bet"

export function BettingTool() {
  const [target, setTarget] = useState<Target>("winrate")

  const showCarSpecs =
    target === "winrate" || target === "profit" || target === "sharpe"
  const showRewardRatio = target === "profit" || target === "sharpe"
  const showDopamine = target === "dopamine"

  return (
    <div className="h-full flex flex-col gap-3">
      {/* Target Selection - compact inline */}
      <div className="flex items-center gap-3 p-3 bg-card rounded-lg border border-border">
        <Label
          htmlFor="target"
          className="text-primary font-medium whitespace-nowrap"
        >
          目標：
        </Label>
        <Select value={target} onValueChange={(v) => setTarget(v as Target)}>
          <SelectTrigger
            id="target"
            className="w-40 bg-secondary border-border"
          >
            <SelectValue placeholder="Select target" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="winrate">勝率</SelectItem>
            <SelectItem value="profit">報酬</SelectItem>
            <SelectItem value="sharpe">夏普</SelectItem>
            <SelectItem value="dopamine">多巴胺！！！</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Car Specs or Dopamine Display */}
      <div className="flex-1 min-h-0">
        {showCarSpecs && (
          <CarSpecs showRewardRatio={showRewardRatio} target={target} />
        )}
        {showDopamine && <DopamineDisplay />}
      </div>
    </div>
  )
}
