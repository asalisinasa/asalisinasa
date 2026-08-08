#!/usr/bin/env bash
set -euo pipefail

mkdir -p .repomix

npx repomix -c repomix.config.ts --output .repomix/repomix-output.xml --style xml --instruction-file-path repomix-instruction.md

printf '%s\n' "Repomix output written to .repomix/repomix-output.xml"
