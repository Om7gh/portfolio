export const windows = [
    {
        name: 'project',
        type: 'folder',
        zIndex: 1000,
        isOpen: false,
        children: [
            {
                name: 'WorldWise App',
                type: 'folder',
                zIndex: 1001,
                isOpen: false,
                children: [
                    {
                        name: 'demo',
                        type: 'video',
                        videoPath: '/src/assets/videos/worldwise_app.mp4',
                        zIndex: 1002,
                        isOpen: false,
                    },
                    {
                        name: 'README.md',
                        type: 'file',
                        zIndex: 1002,
                        isOpen: false,
                        content: `# WorldWise App

A React application for tracking your travels around the world.

## Features
- Interactive world map
- Mark cities you've visited
- Add notes and dates for each location
- View travel statistics
- Beautiful, responsive UI

## Tech Stack
- React
- TypeScript
- Leaflet for maps
- Context API for state management
- CSS Modules for styling

## Getting Started
\`\`\`bash
npm install
npm run dev
\`\`\`

Visit the app and start marking your adventures!`,
                    },
                ],
            },
            {
                name: 'Pong-Chess App',
                type: 'folder',
                zIndex: 1001,
                isOpen: false,
                children: [
                    {
                        name: 'demo',
                        type: 'video',
                        videoPath: '/src/assets/videos/pong_chess_app.webm',
                        zIndex: 1002,
                        isOpen: false,
                    },
                    {
                        name: 'README.md',
                        type: 'file',
                        zIndex: 1002,
                        isOpen: false,
                        content: `# Pong/Chess App

A full-stack multiplayer gaming platform featuring classic Pong and Chess games.

## Features
- Real-time multiplayer gameplay
- Pong: Classic arcade action
- Chess: Strategic battles with full ruleset
- Live matchmaking
- Player rankings and statistics
- Responsive design for all devices

## Tech Stack
### Frontend
- React with TypeScript
- WebSocket for real-time communication
- Canvas API for game rendering
- Tailwind CSS

### Backend
- Node.js with Fastify
- WebSocket server
- PostgreSQL for game data
- JWT authentication

## Getting Started
\`\`\`bash
# Backend
cd server
npm install
npm run dev

# Frontend
cd client
npm install
npm run dev
\`\`\`

Challenge your friends and climb the leaderboard!`,
                    },
                ],
            },
        ],
    },
    {
        name: 'skills',
        type: 'folder',
        zIndex: 1000,
        isOpen: false,
    },
    {
        name: 'gallary',
        type: 'folder',
        zIndex: 1000,
        isOpen: false,
    },
    {
        name: 'education',
        type: 'folder',
        zIndex: 1000,
        isOpen: false,
    },
    {
        name: 'resume',
        type: 'file',
        zIndex: 1000,
        isOpen: false,
    },
];

export const zIndex = 1000;
