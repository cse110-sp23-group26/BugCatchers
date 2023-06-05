# CI/CD Pipeline Design
Our CI/CD pipeline consists of four phases as of now:

1) Running ESLint to assess the style of the code and make sure it adheres to a consistent format. If it does not adhere to the styles we decide to use for our project, it automatically rejects the code and doesn't allow merging.
2) Running Jest with our unit tests. We are using Jest to run all of the tests in the `/tests` directory. If the tests pass, then the code is allowed to be merged into the main branch.
3) Running Prettier to force consistent styling.
4) Building and pushing to the dev branch.

When code is pushed to a branch and a pull request is made, the first three checks are run on the code. If all of these checks pass, then we move on to a build script that mirrors the `/src` directory to the `/docs` directory on the `dev` branch. GitHub Pages is being built off of this branch, so a live version of the website is immediately visible when code is pushed to main.

This behavior is illustrated in this diagram:

![Phase 1 Diagram](./phase1.drawio.png)

As you can see in the diagram, we only run the script that builds the site if there was a push to the main branch, as we don't want to build the site every time someone makes a pull request.

This action runs every time someone makes a pull request or pushes to main.

We don't run the prettifier on pull requests, but when they get merged, the code pushed to main will have the prettifier automatically ran on it. As of now, any building steps are not implemented, because we do not yet have a website to build. All of the CI/CD pipeline functions are currently implemented in the GitHub Actions.
