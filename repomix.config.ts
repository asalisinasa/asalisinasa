import { defineConfig } from "repomix";

export default defineConfig({
  $schema: "https://repomix.com/schemas/latest/schema.json",
  input: {
    maxFileSize: 5242880
  },
  output: {
    filePath: ".repomix/repomix-output.xml",
    instructionFilePath: "repomix-instruction.md",
    style: "xml",
    parsableStyle: false,
    fileSummary: true,
    directoryStructure: true,
    files: true,
    removeComments: false,
    removeEmptyLines: false,
    compress: false,
    topFilesLength: 10,
    showLineNumbers: false,
    truncateBase64: true,
    copyToClipboard: false,
    includeFullDirectoryStructure: false,
    tokenCountTree: false,
    git: {
      sortByChanges: true,
      sortByChangesMaxCommits: 100,
      includeDiffs: false,
      includeLogs: false,
      includeLogsCount: 50
    }
  },
  include: [],
  ignore: {
    useGitignore: true,
    useDotIgnore: true,
    useDefaultPatterns: true,
    customPatterns: [
      ".git/**",
      ".next/**",
      ".repomix/**",
      "coverage/**",
      "dist/**",
      "node_modules/**",
      "out/**",
      "output/**",
      ".agents/hooks/state/**",
      ".agents/node_modules/**",
      ".agents/plans/*.deck.html",
      "**/.DS_Store",
      "**/.env",
      "**/.env.*",
      "**/*.pem",
      "**/*.png",
      "**/*.jpg",
      "**/*.jpeg",
      "**/*.gif",
      "**/*.webp",
      "**/*.ico"
    ]
  },
  security: {
    enableSecurityCheck: true
  },
  tokenCount: {
    encoding: "o200k_base"
  }
});
