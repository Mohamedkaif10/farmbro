# Farmer's Portal

This project is a Farmer's Portal that provides farmers with essential information and services. The portal includes functionalities for user authentication, storing farmer data, and accessing government schemes based on their region.

## Features

- User authentication using JWT.
- CRUD operations for farmer information.
- Access to government schemes based on the farmer's region.
- Audio description of schemes.

## Technologies Used

- **Client**: React, Axios
- **Server**: Node.js, Express.js, MongoDB, Mongoose, JWT
- **Database**: MongoDB

## Prerequisites

- Node.js and npm installed.
- MongoDB installed and running.
- `.env` file with the following environment variables:

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-repo/farmers-portal.git
cd farmers-portal
```

### 2. Install dependencies

#### Client-side

```bash
cd client
npm install
```

#### Server-side

```bash
cd ../server
npm install
```

### 3. Set up the environment variables

Create a `.env` file in the `server` directory and add the following:

```bash
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

### 4. Start the development servers

- Client-side

```bash
npm start
```

- Server-side

```bash
npm run dev
```

### 5. Access the Application

- Open your browser and navigate to `http://localhost:3000` for the client and `http://localhost:5000` for the server API.


