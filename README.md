# Maran-GNews

## Overview

#### This project is a full-stack application with a frontend built using React and a backend built with node and express. This project is build to demonstrate my skill. This README provides instructions for setting up and running the project locally on your machine.

## Ensure you have the following installed on your machine:

        Node.js
        React.js
        npm

## Setup Instructions

### Setup Environment Variables

#### navigate to Server folder

    1. Create a .env file in the frontend directory and add the following variables:

         GNEWS_API_KEY="" // Get your key from gnews.io

    2. app.use(cors({
        origin: [ ], // Replace with your frontend URLs Here
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    }));

#### navigate to Client folder

    1. Create a .env file in the frontend directory and add the following variables:

        REACT_APP_BASE_URL = "http://localhost:5000"

    2. const BASE_URL = "";  // change this line with your backend URL while moving code to production

### Server

    1. open cmd and navigate to server folder
    2. npm install
    3. node server.js

### Frontend

    1. open cmd and navigate to client folder
    2. npm install
    3. npm start

    now our application starts run in port 3000

The frontend application will be available at http://localhost:3000

The backend server will be available at http://localhost:5000.

This project is licensed under the MIT License.
