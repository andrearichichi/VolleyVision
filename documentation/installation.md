# Installation Guide

Welcome to our application! Follow these instructions to set up and run the project locally on your machine.

## Prerequisites

Ensure you have the following software installed before proceeding:

- **Python**: Download and install Python from [Python's official website](https://python.org/).
- **Node.js**: Download and install Node.js from [Node.js's official website](https://nodejs.org/).
- **Git**: Download and install Git from [Git's official website](https://git-scm.com/).

## Getting Started

### 1. Clone the Repository

To get started, clone the project repository to your local machine:

```bash
git clone https://github.com/dclfbk/sportvisionai/tree/2e38edea49988af1ee76add4d982300fc79db96b/code/Web_app
cd my_app
```



### 2. Install Dependencies

#### Backend Dependencies

Navigate to the backend directory  and install Python dependencies:

```bash
cd backend  # Change this if your backend directory is named differently
pip install -r requirements.txt
```

This will install the necessary Python packages, including FastAPI and other libraries.

#### Frontend Dependencies

Navigate to the frontend directory (if applicable) and install Node.js dependencies:

```bash
cd ../frontend  # Adjust the path if necessary
npm install
```

### 3. Run the Application

#### Running the Backend

Start the backend server by running:

```bash
uvicorn main:app
```

This command starts the server on `http://localhost:8000`.

#### Running the Frontend

Launch the frontend by executing:

```bash
npm start
```

This will typically open the frontend in your default web browser at `http://localhost:3000`.

## Additional Information

### Configuration

Include any necessary environment setup or configuration files that must be edited before running the application, such as `.env` files.

### Troubleshooting

List common issues and their solutions to help users troubleshoot common problems they might encounter.
