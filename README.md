# Question Manager

A modern React application for managing multilingual questions with support for multiple correct answers. Built with React, TypeScript, and Tailwind CSS.

## Overview

Question Manager is a powerful web application designed to create and manage multilingual questions with multiple-choice answers. Perfect for educators, content creators, and anyone needing to manage a question bank with support for multiple languages.

![Question Manager Screenshot](https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?auto=format&fit=crop&q=80&w=2070)

## Features

- ✨ Full CRUD operations for questions
- 🌍 Multilingual support (English and Portuguese-BR)
- 🌓 Dark/Light theme with system preference detection
- 📤 Export questions to JSON format
- 📥 Import questions from JSON files
- 🎯 Support for multiple correct answers
- 💡 Detailed explanations for each question
- 🔄 Real-time form validation
- 📱 Fully responsive design
- 🎨 Modern UI with Tailwind CSS
- 🚀 Built with Vite for optimal performance
- 🐳 Docker support for easy deployment

## Question Structure

Each question follows this TypeScript interface:

```typescript
interface Question {
  id: number;
  translations: {
    'pt-BR': Translation;
    'en': Translation;
  };
  correctAnswers: number[]; // 0-based indices
  minAnswers: number;
  maxAnswers: number;
}

interface Translation {
  text: string;
  options: string[];
  explanation: string;
}
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher) and npm
- OR Docker and Docker Compose

### Installation

#### Using Node.js

1. Clone the repository:
```bash
git clone https://github.com/yourusername/question-manager.git
cd question-manager
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

#### Using Docker

1. Clone the repository:
```bash
git clone https://github.com/yourusername/question-manager.git
cd question-manager
```

2. Build and start the container:
```bash
docker-compose up --build
```

The application will be available at `http://localhost:5173`

### Docker Commands

- Start the application: `docker-compose up`
- Build and start: `docker-compose up --build`
- Stop the application: `docker-compose down`
- View logs: `docker-compose logs -f`

## Usage Guide

### Creating Questions

1. Click "Add Question" in the top-right corner
2. Fill in the question details:
   - Question text in both languages
   - Answer options (click + to add more options)
   - Explanation for each language
3. Configure answer settings:
   - Set minimum required answers
   - Set maximum allowed answers
   - Specify correct answer numbers (comma-separated)
4. Click "Save Question" or "Cancel" to discard changes

### Managing Questions

- **View Details**: Click the expand/collapse button on any question
- **Edit**: Click the pencil icon to modify a question
- **Delete**: Click the trash icon to remove a question
- **Theme**: Toggle between light/dark modes using the theme button

### Import/Export

#### Exporting Questions
- Click "Download Questions" to save all questions as JSON
- The downloaded file preserves all question data and can be used for backup

#### Importing Questions
1. Click "Import Questions"
2. Select a JSON file containing questions
3. Questions will be added with new IDs to avoid conflicts
4. Validation ensures proper data structure

## Project Structure

```
src/
├── components/          # React components
│   ├── QuestionForm/   # Question creation/editing
│   ├── QuestionList/   # Questions display
│   └── FileActions/    # Import/export handling
├── contexts/           # React contexts
│   └── ThemeContext/   # Theme management
├── hooks/              # Custom React hooks
│   └── useQuestions/   # Question state management
├── types/              # TypeScript interfaces
├── utils/              # Utility functions
├── App.tsx            # Main component
└── main.tsx           # Entry point
```

## Development

### Key Technologies

- **React 18**: Modern React with hooks
- **TypeScript**: Type safety and better DX
- **Tailwind CSS**: Utility-first styling
- **Vite**: Next-generation frontend tooling
- **Lucide React**: Beautiful, consistent icons
- **Docker**: Containerization and deployment

### Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run preview`: Preview production build
- `npm run lint`: Lint code with ESLint

### Building for Production

```bash
# Using Node.js
npm run build

# Using Docker
docker-compose -f docker-compose.prod.yml up --build
```

Production files will be generated in the `dist` directory.

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Contribution Guidelines

- Follow the existing code style
- Add tests for new features
- Update documentation as needed
- Keep commits focused and descriptive

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [React](https://reactjs.org/) - UI library
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Vite](https://vitejs.dev/) - Build tool
- [Lucide Icons](https://lucide.dev/) - Icon set
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Docker](https://www.docker.com/) - Containerization