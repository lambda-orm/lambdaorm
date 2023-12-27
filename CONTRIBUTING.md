# Contributing to λORM

We would love for you to contribute to λORM and help us improve and grow the community! \

As a developer, you can contribute in many different ways, such as:

- Report bugs
- Help solve problems
- Improve documentation
- Write code labs in [lambdaorm-labs](https://github.com/lambda-orm/lambdaorm-labs).

As a collaborator, these are the guidelines we would like you to follow:

- [Question or problem?](#do-you-have-any-questions-or-problems)
- [Problems and Bugs](#did-you-find-a-bug)
- [Feature Requests](#missing-a-feature)
- [Shipping Guidelines](#shipping-guidelines)
- [Confirmation Message Format](#guidelines-for-confirmation-messages)

## Do you have any questions or problems?

There are several ways to ask your question:

- You can create a question on [StackOverflow](https://stackoverflow.com/questions/tagged/lambdaorm) where questions should be tagged with the `lambdaorm` tag.
- You can ask at [Slack](https://join.slack.com/t/nuevoespaciod-xo58767/shared_invite/zt-29ix7pc2r-Wd_ZBWnWRDv_5DM4NPtVhQ)
- You can create an issue at [github issues](https://github.com/lambda-orm/lambdaorm/issues)
- If you have Telegram, find me by (@flaviolrita`)

## Did you find a security vulnerability?

If you find a security vulnerability or something that needs to be discussed personally,
Please contact me at [lambdaorm@proton.me](mailto:lambdaorm@proton.me) with the subject vulnerability.

## Did you find a bug?

If you find a bug in the source code, you can help us [github issues](https://github.com/lambda-orm/lambdaorm/issues).

## Missing a feature?

You can *request* a new feature at [github issues](https://github.com/lambda-orm/lambdaorm/issues).
If you want to *implement* a new feature, please submit an issue with
First a proposal for your work, to be sure we can use it.
Please consider what type of exchange it is:

- For a **Main Feature**, first open an issue and describe your proposal so it can be
discussed. This will also allow us to better coordinate our efforts, avoid duplication of work,
and help you design the change so that it is successfully accepted into the project.
- **Small features** can be styled and submitted directly [submitted as a pull request] (#submit-pr).

## Shipping Guidelines

According to the Git Flow workflow, feature branches and bug fixes will be merged into `develop` via pull requests.

### Git Flow Start

Install:

```bash
apt-get install git-flow
```

**Init:**

Git Flow will ask us a series of questions from the terminal, we will answer by default (simply by pressing enter) each and every one of them. \
If we want to avoid this step, using the -d flag all default configurations will be established.

```bash
git flow init
```

Example:

```bash
Which branch should be used for bringing forth production releases?
   - develop
   - master
Branch name for production releases: [master]

Which branch should be used for integration of the "next release"?
   - develop
Branch name for "next release" development: [develop]

How to name your supporting branch prefixes?
Feature branches? [feature/]
Bugfix branches? [bugfix/]
Release branches? [release/]
Hotfix branches? [hotfix/]
Support branches? [support/]
Version tag prefix? []
Hooks and filters directory? [/Users/your-user/Sites/your-dirname]
```

By default, master will be our main branch, develop will be our development branch, new feature branches will be prefixed with feature/, branches to fix small bugs that have not reached production will be prefixed with bugfix/, branches to put Code in production will be prefixed with release/, bugfix branches in production will be prefixed with hotfix/, and support branches will be prefixed with support/.

### Features

When we are going to develop a new feature, or evolve/modify an existing one, we will use feature branches. \
For this Git Flow offers us the git flow feature command.

**feature:**

List existing feature branches

```bash
git flow feature
```

**Start:**

Create a feature branch. The name is mandatory (the prefix "feature/" will be automatically added), the base is optional and would allow us to create the feature from a specific branch. If it is not indicated, the default is developed

```bash
git flow feature start <name> [<base>]
```

**Publish:**

Upload the branch to the remote repository

```bash
git flow feature publish <name>
```

**Finish and Delete:**

They are replaced by merge request using GitLab

**Track:**

Used to track a feature branch that was created by another user on the team. This is useful when you are collaborating on a feature and want to sync your local repository with the remote version of that feature branch.

```bash
git flow feature track <name>
```

### Bugfix

If a bug is detected that has not yet reached production, we will make a bugfix. \
For this Git Flow offers us the git flow bugfix command. \
Bugfixes will be merged against develop.

**bugfix:**

List existing bugfix branches

```bash
git flow bugfix
```

**Start:**

Create a bugfix branch. The name is required (the prefix "bugfix/" will be automatically added, \
The base is optional and would allow us to create the bugfix from a specific branch. \
If not indicated, the default is developed

```bash
git flow bugfix start <name>
```

**Publish:**

Upload the branch to the remote repository

```bash
git flow bugfix publish <name>
```

**Finish and Delete:**

They are replaced by merge request using GitLab

## Guidelines for confirmation messages

We use commit messages to automatically generate the changelog and version, so it is important that you follow the [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) guidelines.

### Commitlint

Commitlint is a tool that allows us to validate the commit messages, and thus be able to standardize them. \
It is based on a configuration file, which is usually called commitlint.config.js, and in which we can define the rules that we want to apply to the commit messages.

Install:

```bash
npm install -g @commitlint/cli @commitlint/config-conventional
```

### Branch lint

Branch lint is a tool that allows us to validate the branch names, and thus be able to standardize them. \
It is based on a configuration file, which is usually called .branchlintrc, and in which we can define the rules that we want to apply to the branch names.

Install:

```bash
npm install -g branchlint
```

### Husky

What Husky is based on is Git Hooks, which are scripts that are executed at certain times, such as before a commit, push, etc... \
Husky allows us to configure these hooks in a very simple way, and also allows us configure them in the package.json, which allows us to have a more portable project.

Install:

```bash
npm install -g husky
npx husky install
```

Add hook for commitlint:

```bash
npx husky add .husky/commit-msg  'commitlint --edit ${1}'
npx husky add .husky/pre-push  'branchlint'
```

## Tasks

Main Tasks:

| task   															| Description                                  									  		|
|:-----------------------------------	|:--------------------------------------------------------------------|
| `npm run test`											| Run all tests. 															  											|
| `npm run release`										| Create a new release. 																							|

Subs Tasks:

| task   															| Description                                  									  		|
|:-----------------------------------	|:--------------------------------------------------------------------|
| `npm run lint`											| Run the linter. 																										|
| `npm run build`											| Build the project. 																									|
| `npm run dist`											| Build the project and create a prepare nuw distribution. 						|
| `npm run docs`											| Generate the documentation. 																				|

## License

By contributing, you agree that your contributions will be licensed under the [MIT License](https://github.com/lambda-orm/lambdaorm/blob/main/LICENSE).

## References

- Git flow
  - [Gitflow workflow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow)
  - [tutorial](https://desarrollowp.com/blog/tutoriales/aprende-git-de-manera-sencilla-git-flow/)
-Conventional Commits
  - [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/)
  - [Conventional Commits in 6 steps](https://angrynerds.co/blog/master-your-git-log-with-conventional-commits-in-6-steps/)
