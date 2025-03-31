# Next.js Frontend with Authentication Backend Integration

This project is a Next.js frontend application designed to interact with a separate authentication backend. It utilizes `next/font` for optimized font loading and provides a basic structure to build upon.

## Prerequisites

Before getting started, ensure you have the following installed:

-   **Node.js (>= 18.17.0):** You can download it from [nodejs.org](https://nodejs.org/).
-   **npm (>= 6.14.0) or yarn (>= 1.22.0) or pnpm:** These are package managers that come with Node.js.

## Getting Started

1.  **Clone the Repository:**

    ```bash
    git clone https://github.com/Sonupatel15/authentication-frontend.git
    cd authentication-frontend
    ```

2.  **Install Dependencies:**

    Since the `node_modules` directory is not included in the repository, you need to install the project dependencies. Choose your preferred package manager:

    -   **npm:**

        ```bash
        npm install
        ```

3.  **Run the Development Server:**

    Start the Next.js development server:

    ```bash
    npm run dev
    ```

    This will start the server on [http://localhost:3000](http://localhost:3000). Open this URL in your browser to view the application.

4.  **Backend Setup:**

    This frontend application relies on an external authentication backend. You can find the backend repository here: [https://github.com/Sonupatel15/authentication-backend](https://github.com/Sonupatel15/authentication-backend)

    **Important:** You need to set up and run the backend server separately. Follow the instructions in the backend repository's README to configure and start the backend.

    **Backend Configuration:**

    -   Ensure the backend server is running on the correct port and accessible from your frontend.
    -   Note the backend API endpoints for authentication. You will need to use these in your frontend code.

5.  **Frontend Configuration:**

    -   **Environment Variables:** You might need to configure environment variables in your frontend application to point to the backend API endpoints. Create a `.env.local` file in the root of your project and add the necessary variables. For example:

        ```
        NEXT_PUBLIC_BACKEND_API_URL=http://localhost:8081
        ```

        Replace `http://localhost:8081` with the actual URL of your backend API.

    
## Backend Repository

-   **Authentication Backend:** [https://github.com/Sonupatel15/authentication-backend](https://github.com/Sonupatel15/authentication-backend)

## Frontend Snapshot
<img width="859" alt="post-management" src="https://github.com/user-attachments/assets/f157161b-db23-43b7-82ad-fa1ce3d928d8" />

