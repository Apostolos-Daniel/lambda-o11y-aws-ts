# Welcome to your CDK TypeScript project

This is a blank project for CDK development with TypeScript.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

- `npm run build` compile typescript to js
- `npm run watch` watch for changes and compile
- `npm run test` perform the jest unit tests
- `cdk deploy` deploy this stack to your default AWS account/region
- `cdk diff` compare deployed stack with current state
- `cdk synth` emits the synthesized CloudFormation template

## Local Development 👩‍💻

### Git Hooks 🪝

To support local development this project uses [git hooks](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks) to provide automation during the local development lifecycle. Git hooks are managed using [Husky](https://typicode.github.io/husky/#/) and configuration is stored in `.husky/`

```bash
npm i -D husky lint-staged
npx mrm lint-staged
```

https://typicode.github.io/husky/

If you have any issues, have a read on this:
https://stackoverflow.com/questions/50048717/lint-staged-not-running-on-precommit

The following hooks are in place:

- `pre-commit` (light-touch checks which don't get in the way):
  - Type validation
  - Linting
- `pre-push` (more time-consuming checks):
  - Unit tests
- `post-merge`
  - NPM install

### Formatting and Linting 🧹

This project uses the [`eslint`](https://eslint.org/) linter which is configured in `.eslintrc` and `.eslintignore`.

Linting rules are inherited from `cinch-labs` however they are stated directly to remove the need for a dependency on that package and to ensure overall control of linting remains within this project.

Formatting is done by [`prettier`](https://prettier.io/) which is configured in `prettier.config.js` and `.prettierignore`. Formatting configuration is deliberately light-touch and focusses on compatibility with linting rules.

To run the linter and formatter:

- `npm run lint:fix` - look for linting and formatting violation and automatically fix them

test
