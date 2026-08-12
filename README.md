# 🚀 One-Click DevOps Deployment Platform

A web-based deployment automation platform that allows users to deploy GitHub repositories with a single click.

The platform automatically:

- Clones a public GitHub repository
- Detects whether it is a Dockerized application or a static website
- Builds a Docker image
- Runs a Docker container
- Returns a live deployment URL

---

## ✨ Key Features

### Dockerized Application Deployment
Deploy repositories that already contain a `Dockerfile`.

### Static Website Deployment
Deploy repositories containing only static files such as:

- `index.html`
- `style.css`
- `script.js`

The platform automatically generates an Nginx Dockerfile when one is not provided.

### Real-Time Deployment Pipeline
Users can track deployment progress through the UI:

1. Cloning Repository
2. Building Docker Image
3. Starting Container
4. Deployment Completed

### Dynamic Port Allocation
Each deployment is automatically assigned a new host port (`9001`, `9002`, `9003`, ...).

### Clean Backend Architecture
The backend follows a layered structure:

- Routes
- Controllers
- Services
- Utilities

---

## 🏗️ Tech Stack

| Layer | Technologies |
|---|---|
| Frontend | React (Vite), Axios, CSS |
| Backend | Node.js, Express |
| DevOps | Git, Docker, Nginx |

---

## 📁 Project Structure

```text
one-click-devops-platform/
├── frontend/
├── backend/
│   ├── deployments/
│   └── src/
└── README.md
```

---

## ⚙️ Deployment Flow

```text
User
  ↓
React Frontend
  ↓
POST /api/deploy
  ↓
Express Backend
  ↓
Git Clone
  ↓
Docker Service
   ├── Existing Dockerfile
   └── Auto-generate Nginx Dockerfile
  ↓
Docker Build
  ↓
Docker Run
  ↓
Live URL Returned
```

---

# 🖥️ Run Locally

## Prerequisites

Install the following software:

- Node.js
- Git
- Docker Desktop

Verify installation:

```bash
node -v
npm -v
git --version
docker --version
```

---

## 1. Clone the Repository

```bash
git clone https://github.com/Jiya-del302/One-Click-Devops-Deployment-Platform.git
cd One-Click-Devops-Deployment-Platform
```

---

## 2. Start the Backend

Create a folder to store cloned repositories:

```bash
mkdir backend/deployments
```

Install dependencies and start the server:

```bash
cd backend
npm install
npm install cors dotenv
node src/server.js
```

Backend URL:

**http://localhost:5000**

---

## 3. Start the Frontend

Open a new terminal and run:

```bash
cd frontend
npm install
npm install axios
npm run dev
```

Frontend URL:

**http://localhost:5173**

---

# 🧪 Testing the Platform

## Dockerized Repository

Paste a public GitHub repository URL containing a `Dockerfile`.

Example:

```text
https://github.com/username/sample-node-app
```

---

## Static Website

Create a repository containing:

```text
index.html
style.css
```

Paste the repository URL into the application and click **Deploy Application**.

The platform will automatically generate a Dockerfile and deploy the website.

---

# 🔍 Verify Deployment

### Check cloned repositories

```text
backend/deployments/
```

### Check running containers

```bash
docker ps
```

### Open the deployed application

```text
http://localhost:9001
```

---

# 🛠️ API Endpoint

### Deploy Repository

**POST** `/api/deploy`

Request body:

```json
{
  "githubUrl": "https://github.com/username/repository"
}
```

Example response:

```json
{
  "projectName": "sample-app",
  "imageName": "sample-app",
  "hostPort": 9001,
  "url": "http://localhost:9001"
}
```

---

# 🚀 Future Enhancements

- AWS EC2 deployment
- Nginx reverse proxy for deployed applications
- Application Load Balancer
- Auto Scaling Group
- Terraform infrastructure provisioning
- Jenkins CI/CD integration
- Deployment history dashboard
- Container stop/remove functionality
- Custom subdomain support

---

# 👩‍💻 Author

**Jiya Pardeshi**

- B.Sc. Computer Science
- Cloud Application Developer
- Aspiring Cloud & DevOps Engineer

GitHub: https://github.com/Jiya-del302

---

# 📄 License

This project is created for educational and portfolio purposes.
