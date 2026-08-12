// Import deployment service
const deploymentService = require("../services/deployment.service");

/**
 * Handles deployment request
 * POST /api/deploy
 */
const deploy = async (req, res) => {
  try {
    // Read GitHub URL from request body
    const { githubUrl } = req.body;

    // Basic validation
    if (!githubUrl) {
      return res.status(400).json({
        success: false,
        message: "GitHub repository URL is required",
      });
    }

    // Call service layer
    const result = await deploymentService.deploy(githubUrl);

    // Return success response
    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Deployment controller error:", error.message);

    // Return error response
    return res.status(500).json({
      success: false,
      message: error.message || "Deployment failed",
    });
  }
};

// Export controller functions
module.exports = {
  deploy,
};