import { CommandSet } from '../../config/schema.js';

export const rustCommands: CommandSet = {
  build: 'cargo build',
  test: 'cargo test',
  dev: 'cargo run',
  lint: 'cargo clippy -- -D warnings',
};

export const rustRules = `### Rust Conventions
- Explicitly propagate errors using the \`?\` operator; avoid \`unwrap()\` in non-test code.
- Minimize memory allocations and leverage borrowing rather than cloning where practical.
- Keep modules organized cleanly via \`lib.rs\` or \`main.rs\`.`;
