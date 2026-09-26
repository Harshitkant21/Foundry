import { Language } from '../config/schema.js';

export function renderGitignore(language: Language): string {
  const common = `# Operating System Artifacts
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db
Thumbs.db:encryptable
desktop.ini

# Environment Variables & Secrets
.env
.env.*
!.env.example
*.pem
*.key
*.cert
*.crt

# Editor & IDE State
.idea/
.vscode/*
!.vscode/settings.json
!.vscode/extensions.json
!.vscode/launch.json
*.sublime-project
*.sublime-workspace
*.swp
*.swo
*~

# Logs & Diagnostics
logs/
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
`;

  switch (language) {
    case 'typescript':
    case 'javascript':
      return `${common}
# Node / TypeScript Dependencies & Build Output
node_modules/
dist/
build/
coverage/
.nyc_output/
*.tsbuildinfo
*.tsbuildinfo.*
.npm/
*.tgz
`;
    case 'python':
      return `${common}
# Python Bytecode & Environments
__pycache__/
*.py[cod]
*$py.class
*.so
.Python
env/
venv/
.venv/
dist/
build/
*.egg-info/
.pytest_cache/
.ruff_cache/
.mypy_cache/
`;
    case 'go':
      return `${common}
# Go Binaries & Tests
bin/
dist/
*.exe
*.test
*.out
vendor/
`;
    case 'rust':
      return `${common}
# Rust Target & Backups
target/
**/*.rs.bk
Cargo.lock
`;
    case 'java':
      return `${common}
# Java / Gradle / Maven
target/
build/
.gradle/
*.class
*.jar
*.war
`;
    default:
      return `${common}
dist/
build/
`;
  }
}
