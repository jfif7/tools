import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function Writeup() {
  return (
    <div className="space-y-4">
      <Card className="bg-card border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-cyan-400">What is Teddy Betting?</CardTitle>
          <CardDescription>Understanding the game mechanics</CardDescription>
        </CardHeader>
        <CardContent className="text-sm space-y-3">
          <p className="text-muted-foreground">
            Teddy betting is a game where players bet Teddy (Twitch's currency) on the outcome of Master Duel gacha
            pulls. Mr. Mo pulls cards from 1 to 40 packs (each pack contains 8 cards), and winners are determined based
            on which "car" correctly predicts the result.
          </p>

          <div>
            <h3 className="text-cyan-400 font-medium mb-1">The Cars</h3>
            <ul className="text-muted-foreground space-y-1 list-disc list-inside">
              <li>
                <span className="text-foreground">UR Cars:</span> Specify a range of UR cards that must be pulled
              </li>
              <li>
                <span className="text-foreground">Royal Car:</span> Wins if a Royal UR card is pulled (higher priority)
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-cyan-400 text-base">Example Betting Table</CardTitle>
          <CardDescription>Pull 40 packs</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-border">
                <TableHead className="text-cyan-400">Car</TableHead>
                <TableHead className="text-cyan-400">Criteria</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                ["Car 1", "2-4 URs"],
                ["Car 2", "5-6 URs"],
                ["Car 3", "7-8 URs"],
                ["Car 4", "9+ URs"],
                ["Car 5", "Royal UR"],
              ].map(([car, criteria]) => (
                <TableRow key={car} className="border-border">
                  <TableCell className="font-medium text-primary">{car}</TableCell>
                  <TableCell className="text-muted-foreground">{criteria}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-cyan-400 text-base">Master Duel Probabilities</CardTitle>
          <CardDescription>Understanding the gacha mechanics</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Table>
            <TableHeader>
              <TableRow className="border-border">
                <TableHead className="text-cyan-400">Card Position</TableHead>
                <TableHead className="text-cyan-400">UR Chance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                ["Cards 1-7 (any pack)", "2.5%"],
                ["8th card (Regular)", "2.5%"],
                ["8th card (SR pack)", "20%"],
                ["8th card (UR pack)", "100%"],
              ].map(([pos, chance]) => (
                <TableRow key={pos} className="border-border">
                  <TableCell className="text-muted-foreground">{pos}</TableCell>
                  <TableCell className="text-primary font-medium">{chance}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="bg-secondary p-3 rounded-lg text-sm">
            <h4 className="font-medium text-cyan-400 mb-1">Pull Types</h4>
            <ul className="text-muted-foreground space-y-1">
              <li>
                <span className="text-foreground">10-pack:</span> 9 regular + 1 SR pack
              </li>
              <li>
                <span className="text-foreground">UR 10-pack:</span> 9 regular + 1 UR pack (pity)
              </li>
              <li>
                <span className="text-foreground">Royal:</span> 1% chance on any card
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-cyan-400 text-base">Reward Calculation</CardTitle>
          <CardDescription>How winnings are determined</CardDescription>
        </CardHeader>
        <CardContent className="text-sm space-y-2">
          <p className="text-muted-foreground">The reward ratio is determined by how much Teddy is bet on each car:</p>
          <div className="bg-secondary p-3 rounded-lg font-mono text-center text-primary">
            Return = Teddy_total / Teddy_winning_car
          </div>
          <p className="text-muted-foreground">Example: If 50% is bet on the winning car, winners get 2x return.</p>
        </CardContent>
      </Card>
    </div>
  )
}
