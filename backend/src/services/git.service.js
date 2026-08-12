const fs = require("fs");
const path = require("path");
const shell = require("../utils/shell");

/**
 * Validates GitHub repository URL
 * @param {string} githubUrl
 */
const validateGithubUrl = (githubUrl) => {
  const githubRegex =
    /^https:\/\/github\.com\/[\w.-]+\/[\w.-]+(\.git)?$/;

  if (!githubRegex.test(githubUrl)) {
    throw new Error("Invalid GitHub repository URL");
  }
};

/**
 * Generates unique project folder name
 * @param {string} githubUrl
 * @returns {string}
 */
const generateProjectName = (githubUrl) => {
  const repoName = githubUrl
    .split("/")
    .pop()
    .replace(".git", "");

  return `${repoName}-${Date.now()}`;
};

/**
 * Clones GitHub repository
 * @param {string} githubUrl
 * @returns {object}
 */
const cloneRepository = async (githubUrl) => {
  // Validate URL
  validateGithubUrl(githubUrl);

  // Generate unique project name
  const projectName = generateProjectName(githubUrl);

  // Create deployments path
  const deploymentsPath = path.join(__dirname, "../../deployments");

  // Ensure deployments folder exists
  fs.mkdirSync(deploymentsPath, { recursive: true });

  // Final project path
  const projectPath = path.join(deploymentsPath, projectName);

  // Clone repository
  await shell.runCommand(
    `git clone ${githubUrl} "${projectPath}"`
  );

  return {
    projectName,
    projectPath,
  };
};

// Export service
module.exports = {
  cloneRepository,
};