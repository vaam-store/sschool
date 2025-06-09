# SSchool App

[![Lint](https://github.com/vaam-store/sschool/actions/workflows/lint-codebase.yml/badge.svg)](https://github.com/vaam-store/sschool/actions/workflows/lint-codebase.yml)
[![Dependabot Updates](https://github.com/vaam-store/sschool/actions/workflows/dependabot/dependabot-updates/badge.svg)](https://github.com/vaam-store/sschool/actions/workflows/dependabot/dependabot-updates)
[![Docker build](https://github.com/vaam-store/sschool/actions/workflows/build.yml/badge.svg)](https://github.com/vaam-store/sschool/actions/workflows/build.yml)

## Description

SSchool App is a modern, feature-rich platform designed to facilitate online learning and course management. It provides tools for creating, managing, and delivering educational content, as well as features for user enrollment, progress tracking, and interactive learning experiences.

## Key Features

- **Course Creation and Management:** Intuitive tools for creating and organizing course content, including lessons, assignments, and quizzes.
- **User Enrollment and Authentication:** Secure user accounts with role-based access control (Admin, Instructor, Student).
- **Interactive Learning:** Support for rich content, including Markdown-based lessons with code snippets, diagrams (Mermaid), and external links.
- **Progress Tracking:** Tools for students to track their progress and for instructors to monitor student performance.
- **Admin Interface:** Comprehensive admin panel for managing courses, users, and system settings.
- **API-Driven Architecture:** Robust API built with tRPC for efficient and type-safe data fetching and manipulation.
- **Cloud Storage Integration:** Seamless integration with S3-compatible storage for media assets.

## Technologies Used

- **Frontend:**
  - Next.js
  - React
  - Tailwind CSS
  - UIW React Markdown Editor
  - react-sortablejs
  - use-file-picker
- **Backend:**
  - Node.js
  - tRPC
  - Prisma
  - PostgreSQL
  - OpenAI API (for AI-assisted content generation)
- **Other:**
  - Docker
  - MinIO (S3-compatible storage)
  - Keycloak (Authentication)
  - Redis (Caching/Session Management)

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (>=18)
- Yarn or npm
- Docker (optional, for containerized deployment)

## Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/vaam-store/sschool.git
    cd sschool
    ```

2.  **Install dependencies:**

    ```bash
    yarn install
    # or
    npm install
    ```

3.  **Set up environment variables:**

    - Create a `.env` file based on `.env.example`.
    - Fill in the required values, such as database connection strings, authentication credentials, and API keys.

4.  **Database setup:**

    - Ensure you have a PostgreSQL database running.
    - Update the `DATABASE_URL` in your `.env` file.
    - Run the Prisma migrations:

      ```bash
      yarn prisma migrate dev
      ```

5.  **Start the development server:**

    ```bash
    yarn dev
    # or
    npm run dev
    ```

## Configuration

The following environment variables can be configured:

- `NEXTAUTH_SECRET`: Secret key for NextAuth.
- `AUTH_KEYCLOAK_ID`, `AUTH_KEYCLOAK_SECRET`, `AUTH_KEYCLOAK_ISSUER`: Keycloak authentication settings.
- `DATABASE_URL`: PostgreSQL database connection URL.
- `S3_ENDPOINT`, `S3_ACCESS_KEY`, `S3_SECRET_KEY`, `S3_PORT`, `S3_SCHEME`, `S3_BUCKET`, `S3_CDN_URL`: S3-compatible storage settings (e.g., MinIO).
- `OPENAI_KEY`, `OPENAI_URL`: OpenAI API credentials.
- `REDIS_URL`: Redis connection URL.

See `.env.example` for a complete list and descriptions.

## Running with Docker

1.  **Build the Docker image:**

    ```bash
    docker build -t sschool .
    ```

2.  **Run the Docker container:**

    ```bash
    docker run -p 3000:3000 sschool
    ```

    Ensure that all necessary environment variables are passed to the container.

## Contributing

Contributions are welcome! Please follow these steps:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Implement your changes.
4.  Submit a pull request.

## License

[MIT](LICENSE)
