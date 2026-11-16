# Contributing

Keep this application independent of runtime infrastructure. Import only the
installed public II Agent Runtime package exports; do not vendor its source.

Before submitting a change, run:

```sh
npm ci
npm run check
npm run build
npm run test:package
```

Describe the changed behavior, verification and remaining limits. Security checks
use the pinned Semgrep and OSV tools in `scripts/`. Do not submit credentials,
private infrastructure identifiers or local run directories. Media additions need
clear provenance and must remain within the public export's size and format limits.
