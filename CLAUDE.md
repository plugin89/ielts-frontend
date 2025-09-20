# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Commands

### Development
- `npm run dev` - Start development server with Vite
- `npm run build` - Build for production
- `npm run build:dev` - Build in development mode
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint to check code quality

### Dependencies
- `npm i` - Install dependencies

## Architecture Overview

This is an IELTS Writing Practice application built with React, TypeScript, Vite, and shadcn/ui components. The application helps users practice IELTS academic writing with timed exercises and AI-powered feedback.

### Key Application Flow
The app follows a state-driven navigation pattern:
1. **Home**: Part selection (Task 1 or Task 2)
2. **Questions**: Browse available practice questions for selected part
3. **Writing**: Timed essay writing interface with word count tracking
4. **Review**: AI feedback with band scores and improvement suggestions

### Core State Management
- Uses React hooks for local state management
- Main state types: `AppState` ("home" | "questions" | "writing" | "review")
- Key interfaces: `Question`, `Essay`, `WritingPart`

### Component Structure
- **Pages**: `/src/pages/Index.tsx` - Main application container
- **Core Components**:
  - `PartSelector` - Initial part selection (Task 1/Task 2)
  - `QuestionList` - Display available practice questions
  - `EssayWriter` - Main writing interface with timer and word count
  - `EssayReview` - AI feedback display with band scores
- **UI Components**: `/src/components/ui/` - shadcn/ui component library

### Styling System
- **Tailwind CSS** with custom configuration
- **Custom CSS classes**: 
  - `.gradient-primary` and `.gradient-secondary` for branded gradients
  - `.shadow-elegant` for consistent shadows
  - `.transition-smooth` for animations
- **Component styling**: Uses shadcn/ui design system with Tailwind

### Key Features
- **Timer functionality**: Built-in essay timer with pause/resume/stop controls
- **Word count tracking**: Real-time word count with minimum requirements
- **AI feedback simulation**: Mock band scoring system (Task Response, Coherence & Cohesion, Lexical Resource, Grammatical Accuracy)
- **Responsive design**: Works on desktop and mobile devices

### Development Notes
- Built with Vite for fast development and building
- TypeScript for type safety
- Uses React Router for navigation (though primarily state-based routing)
- No external API calls - all data is mocked/generated client-side
- ESLint configuration for code quality