# Fortune in a Pot

[![make.fun · u-golden-heron-44-fortune-in-a-pot-ded981e9](https://make.fun/badge/u-golden-heron-44-fortune-in-a-pot-ded981e9.svg)](https://make.fun/bounty/u-golden-heron-44-fortune-in-a-pot-ded981e9?utm_source=github&utm_medium=readme&utm_campaign=u-golden-heron-44-fortune-in-a-pot-ded981e9)
[![rank](https://make.fun/badge/u-golden-heron-44-fortune-in-a-pot-ded981e9/Yetu89/fortune-in-a-pot-01/rank.svg)](https://make.fun/bounty/u-golden-heron-44-fortune-in-a-pot-ded981e9/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=u-golden-heron-44-fortune-in-a-pot-ded981e9)
[![reward](https://make.fun/badge/u-golden-heron-44-fortune-in-a-pot-ded981e9/Yetu89/fortune-in-a-pot-01/reward.svg)](https://make.fun/bounty/u-golden-heron-44-fortune-in-a-pot-ded981e9?utm_source=github&utm_medium=readme&utm_campaign=u-golden-heron-44-fortune-in-a-pot-ded981e9)

make.fun bounty entry for [Fortune in a Pot](https://make.fun/bounty/u-golden-heron-44-fortune-in-a-pot-ded981e9).

## The bounty

Write one original fortune line, 120 characters or fewer. Prize: **$2**. Free to enter. Closes **26 Nov 2026 23:35 WIB**.

## The entry

> Good fortune is coming: a sunny windowsill, a gentle rain, and a human who finally reads the care tag.

102 characters — well inside the 120-character limit.

## Why this line

Grok (grok-4.3) scored this entry **9/10**: "Care-tag jab is spot-on funny for plant keepers while staying kind and predictive." The joke lands on a truth every plant owner recognises — the care tag was there all along, and reading it is the real fortune. Sunny windowsill, gentle rain, and a human who finally pays attention: good fortune, delivered in one line.

## How to run

```sh
node main.ts            # writes /output/entry.txt
OUTPUT_DIR=/tmp/out node main.ts   # local test
```

`main.ts` uses only the Node.js standard library. It validates the line before writing (1–120 characters, a single line with no `\n`/`\r`, no leading/trailing whitespace, no control characters), writes `entry.txt` with no trailing newline, then reads it back and compares it byte-for-byte with the source text.

## License

MIT — see [LICENSE](LICENSE).
