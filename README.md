# 📋 Kanban Board - React + TanStack Query

> A modern Kanban board application built with React, TypeScript, and TanStack Query for efficient server-state management.

![Kanban Board Screenshot](https://via.placeholder.com/800x400?text=Kanban+Board+Screenshot)

## 🚀 Live Demo

[View Live Demo](https://your-app-url.vercel.app) *(Optional - if deployed)*

## 📸 Screenshots

| Light Mode | Dark Mode |
|------------|-----------|
| ![Light Mode](https://via.placeholder.com/400x250?text=Light+Mode) | ![Dark Mode](https://via.placeholder.com/400x250?text=Dark+Mode) |

## ✨ Features

- ✅ **Real API Integration** - Fetches data from JSONPlaceholder API
- ✅ **TanStack Query** - Server-state management with caching
- ✅ **3-State Handling** - Loading, Error, and Success states
- ✅ **Dark Mode** - Toggle between light and dark themes
- ✅ **Search Functionality** - Filter posts in real-time
- ✅ **CRUD Operations** - Create, Read, Update, Delete posts
- ✅ **TypeScript** - Type-safe with strict interfaces (NO "any" types!)
- ✅ **Responsive Design** - Works on all screen sizes
- ✅ **Optimistic Updates** - Instant UI updates with useMutation

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 18** | UI Framework |
| **TypeScript** | Type Safety |
| **Vite** | Build Tool |
| **Tailwind CSS v4** | Styling |
| **TanStack Query** | Server-State Management |
| **Axios** | HTTP Client |
| **JSONPlaceholder** | Fake REST API |

## 📁 Project Structure
src/
├── api/
│ ├── client.ts # Axios instance
│ ├── endpoints/
│ │ ├── posts.api.ts # Posts API calls
│ │ └── todos.api.ts # Todos API calls
│ └── types/
│ ├── post.types.ts # Post TypeScript interfaces
│ └── todo.types.ts # Todo TypeScript interfaces
├── components/
│ ├── common/
│ │ ├── Loader.tsx # Loading spinner
│ │ ├── ErrorFallback.tsx # Error UI
│ │ └── Card.tsx # Post card component
│ └── kanban/
│ ├── KanbanBoard.tsx # Main board
│ ├── KanbanColumn.tsx # Column component
│ └── KanbanItem.tsx # Item component
├── hooks/
│ ├── usePosts.ts # Posts query hooks
│ └── useTodos.ts # Todos query hooks
├── providers/
│ └── QueryProvider.tsx # React Query provider
├── App.tsx # Main app
├── main.tsx # Entry point
└── index.css # Global styles

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/react-kanban-board.git

# Navigate to project
cd react-kanban-board

# Install dependencies
npm install

# Start development server
npm run dev
