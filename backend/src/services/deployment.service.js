// Import services
const gitService = require("./git.service");
const dockerService = require("./docker.service");

/**
 * Main deployment workflow
 * @param {string} githubUrl
 * @returns {object} deployment result
 */
const deploy = async (githubUrl) => {
  // Step 1: Clone repository
  const cloneResult = await gitService.cloneRepository(githubUrl);

  // Step 2: Build Docker image and detect container port
  const buildResult = await dockerService.buildImage(
    cloneResult.projectPath,
    cloneResult.projectName
  );

  // Step 3: Run Docker container using detected container port
  const containerResult = await dockerService.runContainer(
    buildResult.imageName,
    buildResult.containerPort
  );

  // Step 4: Return deployment details
  return {
    projectName: cloneResult.projectName,
    imageName: buildResult.imageName,
    containerPort: buildResult.containerPort,
    hostPort: containerResult.hostPort,
    url: `http://localhost:${containerResult.hostPort}`,
  };
};

// Export service
module.exports = {
  deploy,
};