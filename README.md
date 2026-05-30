# Dev Daily

Dev Daily is a daily micro-learning tool designed for developers, delivering personalized, AI-generated lessons, challenges, and quizzes in under 10 minutes. The platform aims to build consistent coding skills through habit-sized sessions that adapt to each user's level and deepen on demand.

## Features

- **Personalized Learning**: Tailored lessons based on user preferences and skill levels.
- **Daily Challenges**: Engage with coding challenges to reinforce learning.
- **Progress Tracking**: Monitor your learning streak and progress over time.
- **Adaptive Difficulty**: Lessons adjust in complexity based on user performance.
- **Go Deeper**: Explore advanced topics after completing initial lessons.

## Tech Stack

### Frontend
- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: A typed superset of JavaScript for better tooling and type safety.
- **Vite**: A fast build tool for modern web projects.
- **Tailwind CSS**: A utility-first CSS framework for styling.
- **Zustand**: A lightweight state management solution.
- **CodeMirror**: A versatile text editor for code editing.

### Backend
- **Node.js**: JavaScript runtime for building server-side applications.
- **Hono**: A fast, edge-compatible web framework.
- **PostgreSQL**: A powerful, open-source relational database.
- **Redis**: An in-memory data structure store for caching.

### Authentication
- **Clerk**: A user management solution for handling authentication and session management.

### AI Integration
- **Anthropic SDK**: Utilized for generating lessons and challenges.

## Getting Started

1. **Clone the Repository**:
   ```
   git clone <repository-url>
   cd dev-daily
   ```

2. **Install Dependencies**:
   ```
   npm install
   ```

3. **Run the Development Server**:
   - For the frontend:
     ```
     cd apps/web
     npm run dev
     ```
   - For the backend:
     ```
     cd apps/api
     npm run dev
     ```

4. **Open in Browser**: Visit `http://localhost:3000` to access the application.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.