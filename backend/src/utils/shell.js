const { exec } = require("child_process");

/**
 * Executes shell command
 * @param {string} command
 * @returns {Promise<string>}
 */
const runCommand = (command) => {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        return reject(
          new Error(stderr || error.message)
        );
      }

      resolve(stdout.trim());
    });
  });
};

// Export utility
module.exports = {
  runCommand,
};