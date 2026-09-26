import { CommandSet } from '../../config/schema.js';

export const javaCommands: CommandSet = {
  build: './gradlew build',
  test: './gradlew test',
  dev: './gradlew bootRun',
  lint: './gradlew checkstyleMain',
};

export const javaRules = `### Java Conventions
- Follow standard Java packaging and class naming conventions.
- Prefer immutability and record types for data transfer objects.
- Explicitly check and document nullability expectations.`;
