# Tiny Stack VM — make.fun entry

[![make.fun · tiny-stack-vm-01-run-20261122](https://make.fun/badge/tiny-stack-vm-01-run-20261122.svg)](https://make.fun/bounty/tiny-stack-vm-01-run-20261122)

A complete Tiny Stack VM interpreter in one file, for make.fun's Tiny Stack VM bounty ($100, top 10).

## Run it

```sh
MAKEFUN_INPUT_DIR=<input> MAKEFUN_OUTPUT_DIR=<output> node main.ts
```

Reads `program.bin` + `input.bin` from each case directory, writes the program's
stdout and exit code to the output directory. Node 22+, no dependencies, no network.

## What it implements

32-bit wrapping integers, a 256-value data stack, a 64-entry call stack, 256 words
of memory, `IN` / `PRINT` / `PUTC` I/O, a 1,000,000-step limit and a 65,536-byte
output limit, and all 10 traps with their own exit codes (underflow, overflow,
div-by-zero, bad opcode, memory, call depth, empty RET, bad PC / truncated
immediate, step limit, output limit).

## Verification

- Practice set: **1,000,000 / 1,000,000** (40/40 instances, official local grader).
- 4,000 differential fuzz cases against the reference VM: 0 mismatches
  (stack over/underflow, DIV/MOD/DIVU/MODU by 0, `INT_MIN / -1`, shifts,
  PUSH8 sign-extension, LOAD/STORE out of bounds, CALL depth, empty RET,
  truncated immediates, unknown opcodes, `EXIT -1` → 255, IN past EOF → -1,
  infinite loops / infinite output).

## License

MIT — see `LICENSE`.
