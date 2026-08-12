const fs = require("fs");
const path = require("path");
const shell = require("../utils/shell");

// Starting host port for deployed applications
let currentPort = 9001;

/**
 * Detects container port.
 * 1. Uses existing Dockerfile if present.
 * 2. Generates a temporary Nginx Dockerfile for static websites.
 * @param {string} projectPath
 * @returns {number}
 */
const detectContainerPort = (projectPath) => {
  const dockerfilePath = path.join(projectPath, "Dockerfile");
  const indexPath = path.join(projectPath, "index.html");

  // Case 1: Repository already contains a Dockerfile
  if (fs.existsSync(dockerfilePath)) {
    const dockerfileContent = fs.readFileSync(
      dockerfilePath,
      "utf-8"
    );

    // Match: EXPOSE 3000
    const match = dockerfileContent.match(/EXPOSE\s+(\d+)/i);

    // Default to 3000 if EXPOSE is missing
    return match ? parseInt(match[1], 10) : 3000;
  }

  // Case 2: Static website without Dockerfile
  if (fs.existsSync(indexPath)) {
    const nginxDockerfile = `
FROM nginx:alpine

COPY . /usr/share/nginx/html

EXPOSE 80
`;

    // Create Dockerfile automatically
    fs.writeFileSync(dockerfilePath, nginxDockerfile.trim());

    return 80;
  }

  // Case 3: Unsupported repository
  throw new Error(
    "No Dockerfile found and index.html is missing."
  );
};

/**
 * Builds Docker image
 * @param {string} projectPath
 * @param {string} projectName
 * @returns {object}
 */
const buildImage = async (projectPath, projectName) => {
  const imageName = projectName.toLowerCase();

  // Detect container port
  const containerPort = detectContainerPort(projectPath);

  try {
    // Build Docker image
    await shell.runCommand(
      `docker build -t ${imageName} "${projectPath}"`
    );
  } catch (error) {
    throw new Error(`Docker build failed: ${error.message}`);
  }

  return {
    imageName,
    containerPort,
  };
};

/**
 * Generates available host port
 * @returns {number}
 */
const getAvailablePort = () => {
  return currentPort++;
};

/**
 * Runs Docker container
 * @param {string} imageName
 * @param {number} containerPort
 * @returns {object}
 */
const runContainer = async (imageName, containerPort) => {
  const hostPort = getAvailablePort();

  const containerName = `${imageName}-${Date.now()}`;

  try {
    // Run container in detached mode
    await shell.runCommand(
      `docker run -d --name ${containerName} -p ${hostPort}:${containerPort} ${imageName}`
    );
  } catch (error) {
    throw new Error(`Docker run failed: ${error.message}`);
  }

  return {
    containerName,
    hostPort,
  };
};

// Export service
module.exports = {
  buildImage,
  runContainer,
};