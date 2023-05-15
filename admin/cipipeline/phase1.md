# CI/CD Pipeline Design
Our CI/CD pipeline consists of four phases as of now:

1) Running ESLint
2) Running Jest with our unit tests
3) Running Prettier to force consistent styling
4) Pushing to a dev branch

If both of these checks pass, then we move on to a build script that organizes our JS files into a branch that GitHub Pages builds off of.

This behavior is illustrated in this diagram:

![Phase 1 Diagram](./phase1.drawio.png)

As you can see in the diagram, we only run the script that builds the site if there was a push to the main branch, as we don't want to build the site every time someone makes a pull request.

This action runs every time someone makes a pull request or pushes to main.

We don't run the prettifier on pull requests, but when they get merged, the code pushed to main will have the prettifier automatically ran on it.

As of now, any building steps are not implemented, because we do not yet have a website to build.