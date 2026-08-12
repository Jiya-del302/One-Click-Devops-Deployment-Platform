import { useState } from "react";
import { deployRepository } from "./services/api";

const steps = [
  "Cloning Repository",
  "Building Docker Image",
  "Starting Container",
  "Deployment Completed",
];

function App() {
  const [githubUrl, setGithubUrl] = useState("");
  const [currentStep, setCurrentStep] = useState(-1);
  const [isDeploying, setIsDeploying] = useState(false);
  const [deployedUrl, setDeployedUrl] = useState("");
  const [error, setError] = useState("");

  const handleDeploy = async () => {
    if (!githubUrl.trim()) return;

    setIsDeploying(true);
    setCurrentStep(0);
    setDeployedUrl("");
    setError("");

    try {
      // Simulated progress
      setTimeout(() => setCurrentStep(1), 1000);
      setTimeout(() => setCurrentStep(2), 2500);

      const response = await deployRepository(githubUrl);

      // Final success
      setCurrentStep(3);
      setDeployedUrl(response.data.url);
    } catch (err) {
      setError(
        err.response?.data?.message || "Deployment failed."
      );
      setCurrentStep(-1);
    } finally {
      setIsDeploying(false);
    }
  };

  return (
    <div className="dashboard">
      {/* Left Panel */}
      <div className="panel form-panel">
        <div className="brand">
          <div className="brand-icon">☁️</div>
          <div>
            <h1>One-Click DevOps</h1>
            <p>Automated Docker deployment platform</p>
          </div>
        </div>

        <label className="label">GitHub Repository</label>

        <input
          type="text"
          placeholder="https://github.com/username/repository"
          value={githubUrl}
          onChange={(e) => setGithubUrl(e.target.value)}
          className="input"
        />

        <button
          onClick={handleDeploy}
          className="button"
          disabled={isDeploying}
        >
          {isDeploying ? "Deploying..." : "Deploy Application"}
        </button>

        <div className="hint">
          Paste a public GitHub repository containing a Dockerfile.
        </div>

        {error && <div className="error-box">{error}</div>}
      </div>

      {/* Right Panel */}
      <div className="panel pipeline-panel">
        <div className="pipeline-header">
          <h2>Deployment Pipeline</h2>
          <span className="status-chip">
            {currentStep === 3
              ? "Completed"
              : isDeploying
              ? "Running"
              : "Idle"}
          </span>
        </div>

        <div className="pipeline">
          {steps.map((step, index) => {
            const completed =
              currentStep > index || currentStep === 3;
            const active =
              currentStep === index && currentStep !== 3;

            return (
              <div className="step" key={step}>
                <div
                  className={`step-icon ${
                    completed
                      ? "done"
                      : active
                      ? "active"
                      : "pending"
                  }`}
                >
                  {completed ? "✓" : active ? "" : ""}
                </div>

                <div className="step-content">
                  <div className="step-title">{step}</div>

                  {active && (
                    <div className="loader">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {currentStep === 3 && deployedUrl && (
          <div className="success-card">
            <div className="success-icon">🚀</div>
            <div>
              <h3>Project is Live</h3>
              <p>Your application has been deployed successfully.</p>
              <a
                href={deployedUrl}
                target="_blank"
                rel="noreferrer"
              >
                {deployedUrl}
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;