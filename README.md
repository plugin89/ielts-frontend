# IELTS Writing Practice

IELTS Academic Writing practice application with timed exercises and AI-powered feedback for Task 1 and Task 2.

## Features

- **Timed Practice**: Complete writing tasks with realistic time constraints
- **Two Task Types**: Practice both IELTS Task 1 (data description) and Task 2 (essay writing)
- **Word Count Tracking**: Real-time word count with minimum requirements
- **AI Feedback**: Get detailed feedback with band scores for each criterion
- **Firebase Authentication**: Login with Google to save your progress

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **UI Library**: shadcn/ui with Tailwind CSS
- **Authentication**: Firebase Auth
- **State Management**: React hooks
- **Development**: ESLint, TypeScript

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ielts-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Set up Firebase:
   - Create a Firebase project at https://console.firebase.google.com
   - Enable Google Authentication
   - Copy your Firebase config to `.env`:
```bash
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

4. Start the development server:
```bash
npm run dev
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/
│   ├── ui/              # shadcn/ui components
│   ├── PartSelector.tsx # Task selection component
│   ├── QuestionList.tsx # Question browser
│   ├── EssayWriter.tsx  # Writing interface
│   ├── EssayReview.tsx  # Feedback display
│   └── LoginButton.tsx  # Authentication component
├── contexts/
│   └── AuthContext.tsx  # Firebase auth context
├── lib/
│   ├── firebase.ts      # Firebase configuration
│   └── utils.ts         # Utility functions
└── pages/
    └── Index.tsx        # Main application page
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run linting: `npm run lint`
5. Commit your changes
6. Push to your fork
7. Create a Pull Request