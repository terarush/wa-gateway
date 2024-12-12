<p align="center">
	<img src="https://wwebjs.dev/images/logo.png" alt="wa-gateway-banner" width="100">
</p>
<p align="center">
	This project provides an API gateway to send messages and media to WhatsApp using whatsapp-web.js. It allows users to interact with WhatsApp through a RESTful interface, enabling the sending of text messages and media (images, videos, etc.) to specified phone numbers.
</p>
<p align="center">
	<img src="https://img.shields.io/github/license/tuxedo-labs/wa-gateway?style=flat&logo=opensourceinitiative&logoColor=white&color=0080ff" alt="license">
	<img src="https://img.shields.io/github/last-commit/tuxedo-labs/wa-gateway?style=flat&logo=git&logoColor=white&color=0080ff" alt="last-commit">
	<img src="https://img.shields.io/github/languages/top/tuxedo-labs/wa-gateway?style=flat&color=0080ff" alt="repo-top-language">
	<img src="https://img.shields.io/github/languages/count/tuxedo-labs/wa-gateway?style=flat&color=0080ff" alt="repo-language-count">
</p>
<p align="center">Built with the tools and technologies:</p>
<p align="center">
	<img src="https://img.shields.io/badge/Express-000000.svg?style=flat&logo=Express&logoColor=white" alt="Express">
	<img src="https://img.shields.io/badge/npm-CB3837.svg?style=flat&logo=npm&logoColor=white" alt="npm">
	<img src="https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=flat&logo=JavaScript&logoColor=black" alt="JavaScript">
	<img src="https://img.shields.io/badge/Nodemon-76D04B.svg?style=flat&logo=Nodemon&logoColor=white" alt="Nodemon">
	<img src="https://img.shields.io/badge/Docker-2496ED.svg?style=flat&logo=Docker&logoColor=white" alt="Docker">
</p>
<br>

##  Getting Started

###  Prerequisites

Before getting started with wa-gateway, ensure your runtime environment meets the following requirements:

- **Programming Language:** JavaScript
- **Package Manager:** Npm
- **Container Runtime:** Docker


###  Installation

Install wa-gateway using one of the following methods:

**Build from source:**

1. Clone the wa-gateway repository:
```sh
❯ git clone https://github.com/tuxedo-labs/wa-gateway
```

2. Navigate to the project directory:
```sh
❯ cd wa-gateway
```

3. Install the project dependencies:


**Using `npm`** &nbsp; [<img align="center" src="https://img.shields.io/badge/npm-CB3837.svg?style={badge_style}&logo=npm&logoColor=white" />](https://www.npmjs.com/)

```sh
❯ npm install
```


**Using `docker`** &nbsp; [<img align="center" src="https://img.shields.io/badge/Docker-2CA5E0.svg?style={badge_style}&logo=docker&logoColor=white" />](https://www.docker.com/)

```sh
❯ docker build -t tuxedo-labs/wa-gateway .
```




###  Usage
Run wa-gateway using the following command:
**Using `npm`** &nbsp; [<img align="center" src="https://img.shields.io/badge/npm-CB3837.svg?style={badge_style}&logo=npm&logoColor=white" />](https://www.npmjs.com/)

```sh
❯ npm start
```


**Using `docker`** &nbsp; [<img align="center" src="https://img.shields.io/badge/Docker-2CA5E0.svg?style={badge_style}&logo=docker&logoColor=white" />](https://www.docker.com/)

```sh
❯ docker run -it {image_name}
```


###  Testing
Run the test suite using the following command:
**Using `npm`** &nbsp; [<img align="center" src="https://img.shields.io/badge/npm-CB3837.svg?style={badge_style}&logo=npm&logoColor=white" />](https://www.npmjs.com/)

```sh
❯ npm test
```

##  Contributing

- **💬 [Join the Discussions](https://github.com/tuxedo-labs/wa-gateway/discussions)**: Share your insights, provide feedback, or ask questions.
- **🐛 [Report Issues](https://github.com/tuxedo-labs/wa-gateway/issues)**: Submit bugs found or log feature requests for the `wa-gateway` project.
- **💡 [Submit Pull Requests](https://github.com/tuxedo-labs/wa-gateway/blob/main/CONTRIBUTING.md)**: Review open PRs, and submit your own PRs.

<details closed>
<summary>Contributing Guidelines</summary>

1. **Fork the Repository**: Start by forking the project repository to your github account.
2. **Clone Locally**: Clone the forked repository to your local machine using a git client.
   ```sh
   git clone https://github.com/tuxedo-labs/wa-gateway
   ```
3. **Create a New Branch**: Always work on a new branch, giving it a descriptive name.
   ```sh
   git checkout -b new-feature-x
   ```
4. **Make Your Changes**: Develop and test your changes locally.
5. **Commit Your Changes**: Commit with a clear message describing your updates.
   ```sh
   git commit -m 'Implemented new feature x.'
   ```
6. **Push to github**: Push the changes to your forked repository.
   ```sh
   git push origin new-feature-x
   ```
7. **Submit a Pull Request**: Create a PR against the original project repository. Clearly describe the changes and their motivations.
8. **Review**: Once your PR is reviewed and approved, it will be merged into the main branch. Congratulations on your contribution!
</details>

<details closed>
<summary>Contributor Graph</summary>
<br>
<p align="left">
   <a href="https://github.com{/tuxedo-labs/wa-gateway/}graphs/contributors">
      <img src="https://contrib.rocks/image?repo=tuxedo-labs/wa-gateway">
   </a>
</p>
</details>
