const express = require("express");

// Import deployment controller
const deploymentController = require("../controllers/deployment.controller");

// Create router instance
const router = express.Router();

/**
 * POST /api/deploy
 * Triggers repository deployment
 */
router.post("/deploy", deploymentController.deploy);

// Export router
module.exports = router;