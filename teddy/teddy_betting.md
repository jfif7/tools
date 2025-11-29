# Teddy betting

This is a game in which players get reward with teddy (twitch's currency)

Mr.Mo will pull cards from a gacha game Master Duel. Typically pulls 1 to 40 packs (each pack contains 8 cards). The winner will be determined from this result.

He will set the table with 5 "cars", each car will have certain criteria, players bet on different cars. The car that wins will reward player with teddy

There are two types of car: UR car and Royal car. UR car specifies the range of numbers of UR cards pulled. Royal car specifies if a Royal UR card is pulled. Royal car has higher priority than UR car.

A typical table looks like this:

```text
Pull 40 packs

Car 1: 2~4
Car 2: 5~6
Car 3: 7~8
Car 4: 9+
Car 5: Royal UR
```

For example, if Mr. Mo pulls 7 UR cards and no Royal UR, then 3 car wins, players that betted on 3 car gets teddy rewards based on the reward ratio. Reward ratio is determined by the portion, $return_{wincar} = Teddy_{total} / Teddy_{wincar}$. For example, if 50% of teddy is betted on car 3, which is the winning car, all players from car 3 get a 200% return.

## Master duel probability

The gacha probability from Master duel is as follow:

There are three types of pack: Regular pack, SR pack, and UR pack.

| card                  | UR chance |
| --------------------- | --------- |
| first 1~7 cards       | 2.5%      |
| regular pack 8th card | 2.5%      |
| SR pack 8th cards     | 20%       |
| UR 8th cards          | 100%      |

### Different types of pull

There are three types of pulls: 1-pack pull, 10-pack pull, UR 10-pack pull

When doing 10-pack pull, the first 9 packs are regular pack and the last is SR pack. If a 10-pack pull results in no UR, the next 10-pack pull will be upgraded into a UR 10-pack pull.

When doing UR 10-pack pull, the first 9 packs are regular pack and the last is UR pack.

### Royal card

All cards have a 1% chance to become Royal.
