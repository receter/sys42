# Copilot instructions

This package contains some files with instructions for GitHub Copilot. These instructions are used to provide guidance to Copilot when it is generating code. The instructions are written in markdown and are stored in the `dist/instructions` directory.

## Instruction files

https://code.visualstudio.com/docs/copilot/copilot-customization

The following files contain instructions for Copilot:

- [commit-message-generation.md](./instructions/commit-message-generation.md): Instructions for writing commit messages.
- [code-generation.md](./instructions/code-generation.md): Instructions for generating code.
- [test-generation.md](./instructions/test-generation.md): Instructions for generating tests.
- [review-selection.md](./instructions/review-selection.md): Instructions for reviewing the current editor selection.
- [pull-request-description-generation.md](./instructions/pull-request-description-generation.md): Instructions for generating pull request titles and descriptions.

## Installation and Usage

1. Install npm package
```shell
npm i -D @sys42/copilot
```

2. In your `settings.json` add:

```
  "github.copilot.chat.codeGeneration.useInstructionFiles": true,
  "github.copilot.chat.codeGeneration.instructions": [
    {
      "file": "node_modules/@sys42/copilot/dist/instructions/code-generation.md"
    }
  ],
  "github.copilot.chat.testGeneration.instructions": [
    {
      "file": "node_modules/@sys42/copilot/dist/instructions/test-generation.md"
    }
  ],
  "github.copilot.chat.reviewSelection.instructions": [
    {
      "file": "node_modules/@sys42/copilot/dist/instructions/review-selection.md"
    }
  ],
  "github.copilot.chat.pullRequestDescriptionGeneration.instructions": [
    {
      "file": "node_modules/@sys42/copilot/dist/instructions/pull-request-description-generation.md"
    }
  ],
  "github.copilot.chat.commitMessageGeneration.instructions": [
    {
      "file": "node_modules/@sys42/copilot/dist/instructions/commit-message-generation.md"
    }
  ]
```
