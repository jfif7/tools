"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BettingTool } from "@/components/betting-tool"
import { Writeup } from "@/components/writeup"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Home() {
  return (
    <main className="h-screen bg-background overflow-hidden">
      <div className="h-full flex flex-col p-4 max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-2xl font-bold text-primary">
            泰迪資源最佳化AI解決方案
          </h1>
          <div className="flex items-center gap-3">
            <p className="text-muted-foreground text-sm">
              相信統計學，明天睡公園
            </p>
            <ThemeToggle />
          </div>
        </div>

        <Tabs defaultValue="tool" className="flex-1 flex flex-col min-h-0">
          <TabsList className="grid w-full max-w-xs grid-cols-2 bg-secondary">
            <TabsTrigger
              value="tool"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              工具
            </TabsTrigger>
            <TabsTrigger
              value="writeup"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              ？
            </TabsTrigger>
          </TabsList>

          <TabsContent value="tool" className="flex-1 mt-3 min-h-0">
            <BettingTool />
          </TabsContent>

          <TabsContent
            value="writeup"
            className="flex-1 mt-3 min-h-0 overflow-auto"
          >
            <Writeup />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}
