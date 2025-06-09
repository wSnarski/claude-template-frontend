# Claude Template - Frontend

This is a React frontend template designed to work with the Claude Template backend API. It provides a modern, responsive todo application with TypeScript integration.

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **TypeScript** - Type safety
- **Material-UI (MUI)** - Component library
- **TanStack Query** - Server state management
- **Axios** - HTTP client
- **Vitest** - Testing framework

## Project Structure

```
src/
├── api/           # API client and endpoints
├── components/    # Reusable UI components
│   ├── layout/    # Layout components (AppLayout)
│   └── todos/     # Todo-specific components
├── hooks/         # Custom React hooks (TanStack Query)
├── theme/         # MUI theme configuration
├── types/         # TypeScript type definitions
└── views/         # Page-level components
```

## API Integration

The frontend is configured to connect to the Claude Template backend API:
- **Production**: `https://claude-template-api.onrender.com`
- **Development**: `http://localhost:3000`

The API client automatically detects the environment and uses the appropriate base URL.

## Key Features

- **Responsive Design**: Mobile-first approach with MUI breakpoints
- **Type Safety**: Full TypeScript integration with backend types
- **State Management**: TanStack Query for server state, local state for UI
- **Error Handling**: Comprehensive error states and user feedback
- **Loading States**: Loading indicators for async operations
- **Real-time Updates**: Optimistic updates with automatic refetching

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run test` - Run Vitest tests

## Development Guidelines

1. **Components**: Use functional components with hooks
2. **Styling**: Use MUI's `sx` prop for styling, avoid CSS files
3. **State**: Use TanStack Query for server state, useState for local UI state
4. **Types**: Import types from `types/` directory, sync with backend
5. **API**: Use the hooks in `hooks/use-todos.ts` for all API interactions

## Environment Variables

Create a `.env.local` file for local development:

```
VITE_API_BASE_URL=http://localhost:3000
```

## Testing

The project uses Vitest for testing. Test files should be co-located with source files using the `.test.tsx` extension.

## Docker Support

A Dockerfile is provided for containerized deployment. The container serves the built static files.

## Deployment

### Render.com (Recommended)

This template includes a `render.yaml` file for easy deployment to Render:

1. Push your code to GitHub
2. Connect your GitHub repository to Render
3. The `render.yaml` will automatically configure the deployment
4. The app will be built using Docker and served via nginx

The deployment includes:
- Multi-stage Docker build for optimized production image
- nginx configuration with SPA routing support
- Static asset caching and gzip compression
- Security headers

### Other Platforms

This template can also be deployed to:
- Vercel (auto-detects Vite projects)
- Netlify (auto-detects build commands)
- Any static hosting service

For static hosting, run `npm run build` and deploy the `dist/` folder.

## Future Claude Sessions

When working with this template:

1. **API Changes**: If the backend API changes, update types in `src/types/todo.types.ts`
2. **New Features**: Follow the existing patterns in `components/` and `hooks/`
3. **Testing**: Run `npm run lint` and `npm run test` before committing
4. **Deployment**: The app expects the backend to be available at the configured API URL

## Component Architecture

- **TodosView**: Main page component that orchestrates all todo functionality
- **TodoForm**: Form for creating new todos with validation
- **TodoList**: Displays list of todos with loading/error states
- **TodoItem**: Individual todo item with complete/remove actions
- **AppLayout**: App-wide layout with header and footer

All components are fully responsive and include loading states for optimal UX.