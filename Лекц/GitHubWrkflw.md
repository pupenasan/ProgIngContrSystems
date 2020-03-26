# Building actions

## [Про Actions (дії)](https://help.github.com/en/actions/building-actions/about-actions#about-actions)

**Actions** (**дії**) - це індивідуальні завдання, які можна комбінувати для створення робіт та налаштування робочого процесу. Ви можете створювати власні дії, а також використовувати та налаштовувати дії, якими ділиться спільнота GitHub.

Ви можете створювати дії, записуючи власний код, який взаємодіє з вашим сховищем будь-яким способом, включаючи інтеграцію з GitHub API та будь-яким стороннім доступним стороннім API. Наприклад, дія може публікувати npm-модулі, надсилати SMS-сповіщення, коли створюються нагальні питання (issues), або розгортати готовий до виробництва код.

Дії можуть виконуватися безпосередньо на машині або в контейнері Docker. Ви можете визначити вхідні, вихідні змінні та змінні середовища для дії.

### [Типи дій](https://help.github.com/en/actions/building-actions/about-actions#types-of-actions)

You can build Docker container and JavaScript actions. Actions  require a metadata file to define the inputs, outputs and main  entrypoint for your action. The metadata filename must be either `action.yml` or `action.yaml`. For more information, see "[Metadata syntax for GitHub Actions](https://help.github.com/en/articles/metadata-syntax-for-github-actions)."

| Type             | Operating system      |
| ---------------- | --------------------- |
| Docker container | Linux                 |
| JavaScript       | Linux, MacOS, Windows |

#### [Docker container actions](https://help.github.com/en/actions/building-actions/about-actions#docker-container-actions)

Docker containers package the environment with the GitHub Actions  code. This creates a more consistent and reliable unit of work because  the consumer of the action does not need to worry about the tools or  dependencies. Docker container actions can only execute in the  GitHub-hosted Linux environment.

A Docker container allows you to use specific versions of an  operating system, dependencies, tools, and code. For actions that must  run in a specific environment configuration, Docker is an ideal option  because you can customize the operating system and tools. Because of the latency to build and retrieve the container, Docker container actions  are slower than JavaScript actions.

Self-hosted runners must use a Linux operating system and have Docker installed to run Docker container actions. For more information about  the requirements of self-hosted runners, see "[About self-hosted runners](https://help.github.com/en/actions/hosting-your-own-runners/about-self-hosted-runners#requirements-for-self-hosted-runner-machines)."

#### [JavaScript actions](https://help.github.com/en/actions/building-actions/about-actions#javascript-actions)

JavaScript actions can run directly on a runner machine, and separate the action code from the environment used to run the code. Using a  JavaScript action simplifies the action code and executes faster than a  Docker container action.

To ensure your JavaScript actions are compatible with all  GitHub-hosted runners (Ubuntu, Windows, and macOS), the packaged  JavaScript code you write should be pure JavaScript and not rely on  other binaries. JavaScript actions run directly on the runner and use  binaries that already exist in the virtual environment.

Self-hosted runners must have Node.js installed to run JavaScript  actions. For more information about the requirements of self-hosted  runners, see "[About self-hosted runners](https://help.github.com/en/actions/hosting-your-own-runners/about-self-hosted-runners#requirements-for-self-hosted-runner-machines)."

If you're developing a Node.js project, the GitHub Actions Toolkit  provides packages that you can use in your project to speed up  development. For more information, see the [actions/toolkit](https://github.com/actions/toolkit) repository.

### [Choosing a location for your action](https://help.github.com/en/actions/building-actions/about-actions#choosing-a-location-for-your-action)

If you're developing an action for other people to use, we recommend  keeping the action in its own repository instead of bundling it with  other application code. This allows you to version, track, and release  the action just like any other software.

Storing an action in its own repository makes it easier for the  GitHub community to discover the action, narrows the scope of the code  base for developers fixing issues and extending the action, and  decouples the action's versioning from the versioning of other  application code.

If you're building an action that you don't plan to make available to the public, you can store the action's files in any location in your  repository. If you plan to combine action, workflow, and application  code in a single repository, we recommend storing actions in the `.github` directory. For example, `.github/actions/action-a` and `.github/actions/action-b`.

### [Versioning your action](https://help.github.com/en/actions/building-actions/about-actions#versioning-your-action)

Workflows can reference specific versions of actions using a commit SHA, branch, or tag.

```yaml
steps:    
  - uses: actions/setup-node@74bc508 # Reference a specific commit
  - uses: actions/setup-node@v1.0    # Reference the major version of a release   
  - uses: actions/setup-node@master  # Reference a branch
```

GitHub recommends using semantic versioning when creating actions to  provide people with a stable experience. For more information, see "[Semantic versioning](http://semver.org/)."

1. Create a release using semantic versioning (v1.0.9). For more information, see "[Creating releases](https://help.github.com/en/articles/creating-releases)."
2. Move the major version tag (v1, v2, etc.) to point to the Git ref of the current release. For more information, see "[Git basics - tagging](https://git-scm.com/book/en/v2/Git-Basics-Tagging)."
3. Introduce a new major version tag (v2) for breaking changes that  will break existing workflows. For example, changing an action's inputs  would be a breaking change.

### [Creating a README file for your action](https://help.github.com/en/actions/building-actions/about-actions#creating-a-readme-file-for-your-action)

If you plan to publicly share your action, we recommend creating a  README file to help people learn how to use your action. You can include this information in your `README.md`:

- A detailed description of what the action does
- Required input and output arguments
- Optional input and output arguments
- Secrets the action uses
- Environment variables the action uses
- An example of how to use your action in a workflow

### [Comparing GitHub Actions to GitHub Apps](https://help.github.com/en/actions/building-actions/about-actions#comparing-github-actions-to-github-apps)

GitHub Marketplace offers tools to improve your workflow.  Understanding the differences and the benefits of each tool will allow  you to select the best tool for your job. For more information about  building actions and apps, see "[About GitHub Actions](https://help.github.com/en/actions/getting-started-with-github-actions/about-github-actions)" and "[About apps](https://developer.github.com/apps/about-apps/)" in the GitHub Developer documentation.

#### [Strengths of GitHub Actions and GitHub Apps](https://help.github.com/en/actions/building-actions/about-actions#strengths-of-github-actions-and-github-apps)

While both GitHub Actions and GitHub Apps provide ways to build  automation and workflow tools, they each have strengths that make them  useful in different ways.

GitHub Apps:

- Run persistently and can react to events quickly.
- Work great when persistent data is needed.
- Work best with API requests that aren't time consuming.
- Run on a server or compute infrastructure that you provide.

GitHub Actions:

- Provide automation that can perform continuous integration and continuous deployment.
- Can run directly on runner machines or in Docker containers.
- Can include access to a clone of your repository, enabling  deployment and publishing tools, code formatters, and command line tools to access your code.
- Don't require you to deploy code or serve an app.
- Have a simple interface to create and use secrets, which enables  actions to interact with third-party services without needing to store  the credentials of the person using the action.