import { CommandSet } from '../../config/schema.js';

export const goCommands: CommandSet = {
  build: 'go build ./...',
  test: 'go test -v ./...',
  dev: 'go run main.go',
  lint: 'golangci-lint run',
};

export const goRules = `### Go Conventions
- Handle every returned error explicitly; never discard errors with \`_\`.
- Use standard Go project layout (\`cmd/\`, \`internal/\`, \`pkg/\`).
- Favor composition over inheritance and keep interfaces small.`;
