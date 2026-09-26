#!/usr/bin/env node
import { runCli } from './cli/command.js';

runCli().catch((err) => {
  console.error('\n[Foundry Error]:', err.message || err);
  process.exit(1);
});
