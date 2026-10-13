# CareConnect — Wellness & Mental Health Platform

**CareConnect** is a full-stack wellness platform designed to connect patients and counselors through a single application. It brings together wellness tracking, assessments, appointments, journaling, community interaction, and communication to create a more accessible and engaging wellness experience.

**Live Demo:** [CareConnect](https://care-connect-eta-inky.vercel.app/)

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Application Architecture](#application-architecture)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [Deployment](#deployment)
- [Future Enhancements](#future-enhancements)

## Overview

CareConnect provides separate experiences for patients and counselors, with access to functionality based on user roles.

The platform aims to make wellness activities easier to manage by bringing assessments, appointments, personal reflection, community participation, and patient–counselor communication into one place.

It also incorporates interactive wellness games and AI-generated daily challenges to encourage users to engage with small, positive activities as part of their routine.

## Features

### Patient Experience
- **Patient Dashboard:** Access important information and wellness activities from a centralized dashboard.
- **Assessments:** Complete assessments assigned by counselors and track submission status.
- **Appointments:** Access appointment information and related actions.
- **Mood Tracking:** Record and reflect on mood patterns.
- **Journaling:** Maintain personal journal entries for self-reflection.
- **Community:** Create posts, explore community content, and interact through comments.
- **Chat:** Communicate with counselors through messaging functionality.
- **Notifications:** Receive updates about relevant activities.
- **Wellness Games:** Participate in interactive games designed to encourage positive daily habits.

### Counselor Experience
- **Counselor Dashboard:** Access counselor-related functionality from a dedicated interface.
- **Patient Management:** Access authorized patient-related information.
- **Assessment Management:** Assign assessments and review submitted responses.
- **Appointment Management:** Manage appointment-related workflows.
- **Communication:** Interact with patients through the platform's messaging functionality.

### Gamification and AI
- **Nature Scavenger Hunt:** Complete daily nature-inspired activities.
- **Wellness Bingo:** Participate in a daily wellness activity board.
- **XP and Levels:** Earn experience points and progress through levels.
- **Streaks and Badges:** Track activity consistency and unlock achievements.
- **AI-Generated Challenges:** Use OpenAI integration to generate daily game content.
- **Fallback Content:** Keep daily challenges available when AI generation is unsuccessful.

## Technology Stack

| Technology | Purpose |
|---|---|
| Next.js | Application framework, routing, rendering, and API routes |
| React | Component-based user interface |
| JavaScript | Application logic and interactions |
| Tailwind CSS | Responsive styling and UI design |
| MongoDB Atlas | Cloud-hosted database |
| Mongoose | Data models, schema validation, and database queries |
| NextAuth | Authentication and session management |
| bcrypt | Password hashing |
| Socket.IO | Real-time communication functionality |
| OpenAI API | AI-generated wellness-game content |
| Lucide React | Icons |
| Framer Motion | UI animations |
| Vercel | Application deployment |

## Application Architecture

CareConnect follows a full-stack architecture in which the frontend, API routes, authentication logic, and database operations work together.

```text
Patient / Counselor
        |
        v
Next.js + React Interface
        |
        v
API Routes and Server Logic
        |
        +------------------+
        |                  |
        v                  v
 Authentication      Business Logic
 and Authorization         |
                           v
                    MongoDB Atlas
                           |
                           v
                    JSON Responses
                           |
                           v
                    Updated UI
```

Additional integrations support real-time communication and AI-generated game content.

### Request Flow

1. A user interacts with a page or submits an action.
2. The frontend sends an HTTP request to the appropriate API route.
3. The server validates the request and checks authentication and authorization.
4. The application performs the required operation using its data models or external integrations.
5. The API returns a response, and the frontend updates the displayed information.

Access to patient-related records should be enforced on the server, including checks for the user's role and permission to access the requested record.

## Getting Started

### Prerequisites

Make sure you have the following installed or configured:

- [Node.js](https://nodejs.org/) — a version compatible with the project's dependencies.
- npm, included with Node.js, or another supported package manager.
- A [MongoDB Atlas](https://www.mongodb.com/atlas) cluster or another configured MongoDB deployment.
- The environment variables required by the application.
- An OpenAI API key if you want to use AI-generated game content.

### 1. Clone the Repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd <YOUR_PROJECT_DIRECTORY>
```

Replace the placeholders with your repository URL and project directory.

### 2. Install Dependencies

If the project uses npm:

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the project root and add the variables required by your implementation.

For example:

```env
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=your_authentication_secret
NEXTAUTH_URL=http://localhost:3000
OPENAI_API_KEY=your_openai_api_key
```

**Important:** These are example variable names. Verify the actual names used in your source code before configuring the file. Add any additional variables required by your authentication, database, or real-time communication setup.

Never commit `.env.local` or expose database credentials, authentication secrets, or API keys in client-side code.

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

The application will reload as you make changes to the source code.

## Running the Application

### Development

```bash
npm run dev
```

### Production Build

```bash
npm run build
```

### Start the Production Server

```bash
npm run start
```

Run the production start command after successfully building the application.

The commands above assume the corresponding scripts exist in your `package.json`.

## Deployment

CareConnect is deployed on Vercel.

**Live application:** [https://care-connect-eta-inky.vercel.app/](https://care-connect-eta-inky.vercel.app/)

To deploy your own instance:

1. Push the project to a Git repository.
2. Import the repository into [Vercel](https://vercel.com/).
3. Configure the required environment variables in the Vercel project settings.
4. Ensure the MongoDB deployment allows connections from the deployed application.
5. Deploy the application and verify authentication, database connectivity, API routes, and external integrations.

Keep production secrets in the deployment environment rather than committing them to the repository.

## Future Enhancements

Potential areas for further development include:

- Personalized wellness recommendations.
- Enhanced mood-trend analysis.
- Expanded wellness games and achievements.
- Improved accessibility and performance.
- Additional automated tests and monitoring.
- More personalized AI-assisted wellness interactions.

## Contributing

Contributions and suggestions are welcome. You can open an issue to discuss a bug or propose an enhancement before submitting changes.

## Disclaimer

CareConnect is a wellness-oriented application and is not a substitute for professional medical advice, diagnosis, or treatment. Users experiencing mental health concerns should seek assistance from an appropriately qualified professional.

---

**Built with Next.js, React, MongoDB, and a focus on accessible digital wellness.**
