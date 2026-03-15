# ShadesX Server

Backend API for the ShadeX Crypto Application.

## Tech Stack
- Node.js
- Express
- MongoDB (Mongoose)

## Setup Instructions

1.  **Clone the repository** (if you haven't already).
2.  **Install dependencies**:
    ```bash
    npm install
    ```
3.  **Environment Variables**:
    - Copy `.env.example` to `.env`:
      ```bash
      cp .env.example .env
      ```
    - Fill in your specific configuration values (JWT Secret, MongoDB URI, etc.).
4.  **Start the server**:
    - For development:
      ```bash
      npm start
      ```
    - Or using nodemon:
      ```bash
      npx nodemon server.js
      ```

## API Endpoints
- `/api/auth`: Authentication (Register/Login)
- `/api/wallet`: Wallet management
- `/api/transaction`: Transaction history and processing
- `/api/market`: Market data and charts
