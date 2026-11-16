# Claude Code video editing: the four-setup experiment

**Question:** which editing setup makes the strongest short when Claude Code receives the same clip and one instruction?

On November 15, 2026, four native Claude Code / Claude Opus 5.5 runs received the same 20.4-second excerpt of the 2015 White House Correspondents' Dinner. Each had the same task and published skill guidance, with an independent worker, 2 CPUs, 2816 MiB RAM, 10 GiB disk and a 55-minute limit. Only the editing setup changed. Model-call logs supplied token, time and API-equivalent cost figures.

One human judged shuffled, identically re-encoded clips with identifying metadata removed. Five criteria, each worth five points: hook; story and payoff; pacing; faithfulness to the source; captions and framing. Only these four setups are included in the scores and totals.

**Remotion led that four-way ranking with 21/25.** The pilot does not establish a universal winner or audience engagement: it has one source clip and one judge. Different tools and review loops were part of the setups being compared.

| Measurement | Total |
| --- | ---: |
| Agent elapsed time | 18.9 minutes |
| Model calls | 103 |
| Tokens, including cached reads | Approximately 5.27 million |
| API list-price equivalent | $4.50 |
| Incremental token charge under the Claude Max plan used | $0 |

The per-call logs include helper-agent calls; some native CLI result summaries undercounted them. CPU and RAM were reserved, not measured utilization. The compute figures are limits, not a claim of actual hardware consumption.

[Machine-readable results](experiment.json) · [All four shorts and scores](../README.md#compare-the-four-edits) · [Full comparison](https://github.com/intelligent-iterations/agentic-video-editing/blob/main/docs/experiment.md)

[Watch the exact original clip](https://www.youtube.com/watch?v=V46Ah6IN0oU) before the four edits. It is the unchanged source excerpt used as input, and is not a scored entry.

## What is reproducible here

This repository contains the extracted rendering demo: three editor image recipes, the same synthetic cuts/captions rendered by each editor, the installed II Agent Runtime integration, export checks, and a hostile-project fixture. `npm run demo` renders prepared projects; it does not launch Claude Code or collect model token costs.

The four compared shorts remain on YouTube. The original editing skill packs and the model gateway/orchestration harness are not copied here. A new authoring benchmark needs a supplied agent, its authorized model access, the original skill versions and a matched task. Do not treat running the synthetic sample as rerunning the historical experiment.

The next authoring experiment will improve the instruction, guide web research for relevant B-roll, explore Blender animation, and add more clips and judges. Those are planned changes, not implemented demo features.
