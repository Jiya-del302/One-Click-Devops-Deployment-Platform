# 🚀 One-Click DevOps Deployment Platform

A web-based deployment automation platform that allows users to deploy GitHub repositories with a single click.

The platform automatically:

- Clones a public GitHub repository
- Detects whether it is a Dockerized application or a static website
- Builds a Docker image
- Runs a Docker container
- Returns a live deployment URL

---

## ✨ Features

### ✅ Dockerized Application Deployment
Deploy repositories containing a `Dockerfile`.

### ✅ Static Website Deployment
Deploy repositories containing only:

- `index.html`
- `style.css`
- `script.js`

The platform automatically generates an Nginx Dockerfile when one is not provided for static websites.

### ✅ Real-Time Deployment Pipeline UI
- Cloning Repository
- Building Docker Image
- Starting Container
- Deployment Completed

### ✅ Dynamic Port Allocation
Each deployment is assigned a new host port automatically (`9001`, `9002`, `9003`, ...).

### ✅ Clean Architecture
- Routes
- Controllers
- Services
- Utilities

---

## 🏗️ Tech Stack

### Frontend
- React (Vite)
- Axios
- CSS

### Backend
- Node.js
- Express

### DevOps
- Git
- Docker
- Nginx (for static site container generation)

---

## 📁 Project Structure

```text
one-click-devops-platform/
│
├── frontend/
│   ├── src/
│   └── package.json
│
├── backend/
│   ├── deployments/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── app.js
│   │   └── server.js
│   └── package.json
│
└── README.md
```
````

---

## ⚙️ How It Works

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

## 🖥️ Run Locally

### Prerequisites

Install:

* Node.js
* Git
* Docker Desktop

Verify:

```bash
node -v
npm -v
git --version
docker --version
```

---

### 1. Clone the Repository

```bash
git clone https://github.com/Jiya-del302/One-Click-Devops-Deployment-Platform.git
cd One-Click-Devops-Deployment-Platform
```

---

### 2. Start Backend
mkdir deployments (to store the cloned repo and files)
```bash
cd backend
npm install
npm install cors dotenv
node src/server.js
```

Backend runs on:

```text
http://localhost:5000
```

---

### 3. Start Frontend

Open a new terminal:

```bash
cd frontend
npm install
npm install axios
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

## 🧪 Testing the Platform

### Test with Dockerized Repository

Paste a public GitHub repository containing a `Dockerfile`.

Example:

```text
https://github.com/username/sample-node-app
```

---

### Test with Static Website

Create a repository containing only:

```text
index.html
style.css
```

Paste the repository URL and click **Deploy Application**.

The platform will automatically generate a Dockerfile and deploy the site.

---

## 📦 Example Static Website

```html
<!DOCTYPE html>
<html>
<head>
  <title>Static Test</title>
</head>
<body>
  <h1>Hello from Static Website</h1>
</body>
</html>
```

---

## 🔍 Verify Deployment

### Check cloned repository

```text
backend/deployments/
```

### Check Docker containers

```bash
docker ps
```

### Open deployed application

Example:

```text
http://localhost:9001
```

---

## 🛠️ API Endpoint

### Deploy Repository

**POST** `/api/deploy`

Request:

```json
{
  "githubUrl": "https://github.com/username/repository"
}
```

Success Response:

```json
{
  "projectName": "sample-app",
  "imageName": "sample-app",
  "hostPort": 9001,
  "url": "http://localhost:9001"
}
```

---
## 🚀 Future Enhancements

* AWS EC2 deployment
* Nginx reverse proxy for deployed applications
* Application Load Balancer
* Auto Scaling Group
* Terraform infrastructure provisioning
* Jenkins CI/CD integration
* Deployment history dashboard
* Container stop/remove functionality
* Custom subdomain support

---

## 👩‍💻 Author

**Jiya Pardeshi**

* B.Sc. Computer Science
* Cloud Application Developer
* Aspiring Cloud & DevOps Engineer

GitHub: https://github.com/Jiya-del302

---

## 📄 License

This project is created for educational and portfolio purposes.

````

---

