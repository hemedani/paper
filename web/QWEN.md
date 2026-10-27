# Paper Web Application - Qwen Context

## Project Overview

This is a Next.js 15 web application built with TypeScript, Tailwind CSS, and various React libraries. The application appears to be a research paper management system that allows users to search, view, and manage academic articles, publications, and related content. The interface is in Persian (RTL) and includes features for user authentication, article search, filtering, and favorites management. The application integrates with a backend built using the Lesan framework.

### Key Technologies & Libraries

- **Framework**: Next.js 15 (with Turbopack)
- **Language**: TypeScript
- **Styling**: Tailwind CSS, custom animations
- **UI Components**: Custom component hierarchy (atoms, molecules, organisms, templates)
- **Rich Text Editing**: TipTap editor suite
- **Forms**: React Hook Form with Zod validation
- **State Management**: React Context API with custom AuthContext
- **HTTP Client**: Custom paperApi service (Lesan framework integration)
- **Date Handling**: date-fns-jalali (Persian calendar support)
- **UI Elements**: Swiper (carousel), Vis Network (graph visualization)
- **Notifications**: react-hot-toast
- **Icons**: Heroicons

### Backend Integration with Lesan Framework

The application connects to a backend built with the Lesan framework. Key integration points include:

- **API Service Layer**: The `paperApi()` service handles communication with the Lesan backend
- **Response Structure**: Backend responses follow a consistent pattern with `success` and `body` properties
  - Success response: `{ success: true, body: { ...actual_data } }`
  - Error response: `{ success: false, body: { message: "error_message" } }`
- **Authentication**: JWT tokens are stored in cookies and automatically included in requests
- **Request Format**: API calls follow the pattern: `{ service, model, act, details: { set, get } }`
- **Type Safety**: Backend schemas are defined in `src/types/declarations/selectInp.ts` for type safety
- **Server Actions**: Backend operations are encapsulated in server actions in `src/app/actions/` directory

### Architecture & Structure

The application follows a component-based architecture with the following main directories:

- `src/app/` - Next.js App Router pages and server actions
- `src/components/` - Reusable UI components organized by atomic design principles
- `src/context/` - React Context providers (AuthContext)
- `src/hook/` - Custom React hooks
- `src/services/` - API services and business logic
- `src/types/` - TypeScript type definitions
- `src/utils/` - Utility functions

### Authentication System

The application implements a role-based authentication system with four user levels:
- Ghost
- Manager
- Editor
- Normal

Authentication is handled via cookies (token, national_number, user) and includes server-side initialization with client-side synchronization.

### Server Actions

The application uses Next.js server actions extensively for data fetching and mutations, organized by domain (article, author, blog, etc.) in the `/src/app/actions/` directory.

### Styling & Internationalization

- The application is fully RTL (right-to-left) in Persian
- Uses Vazir Matn font loaded locally
- Custom animations defined in globals.css
- Tailwind CSS for utility-first styling

## Building and Running

### Development
```bash
pnpm dev
```

### Production Build
```bash
pnpm build
```

### Starting Production Server
```bash
pnpm start
```

### Linting
```bash
pnpm lint
```

## Development Conventions

### Component Structure
Components are organized using atomic design principles:
- Atoms: Basic UI elements (buttons, inputs)
- Molecules: Combined atoms (input groups, cards)
- Organisms: Complex components (headers, navigation)
- Templates: Layout structures

### File Naming
- Use PascalCase for React components
- Use camelCase for utility functions
- Use kebab-case for CSS classes
- Follow Next.js convention for route files (page.tsx, layout.tsx)

### TypeScript Usage
- Strict mode enabled
- Extensive use of TypeScript interfaces and types
- Type definitions stored in `/src/types/`
- Use declared types from `src/types/declarations/selectInp.ts` for consistency with backend

### API Integration
- Centralized API service (`paperApi`) for Lesan framework communication
- Server actions for data fetching (located in `src/app/actions/`)
- Cookie-based authentication
- Structured request/response format following Lesan patterns
- Response handling: check `response.success` and access data via `response.body`

### Internationalization
- Persian (Farsi) interface
- Jalali calendar support for dates
- Right-to-left layout

### API Calls Best Practice

Use server actions located in `src/app/actions` for all backend API calls instead of direct API calls from client components. The application has organized all API operations by model (e.g., `src/app/actions/article`, `src/app/actions/author`, `src/app/actions/publication`) with standard operations like `get`, `gets`, `update`, and `count`.

Using server actions provides several benefits:

- Proper authentication handling via cookies
- Server-side execution for security-sensitive operations
- Centralized API logic that can be reused across components
- Consistent error handling and response format
- Better separation of concerns between UI and data fetching logic

Example usage:

```ts
// Instead of direct API calls from components
import { getMe } from "@/app/actions/user/getMe";

const response = await getMe({
  _id: 1,
  first_name: 1,
  last_name: 1,
  // ... other fields you want to fetch
});

// When using the response, note that backend returns data directly in response.body
// rather than response.body.data as in some other systems
if (response.success && response.body) {
  const userData = response.body; // This contains the actual data
  // ... process the user data
}
```

Note: When handling API responses, the backend typically returns the actual data directly in the `response.body` property, rather than nesting it inside `response.body.data`. Always check `response.body` directly for the data you requested.

### Important Backend Integration Notes

1. **Backend Authentication Header Format**:
   - The backend expects the JWT token in a header field called `token`
   - The token should be sent without the `Bearer` prefix
   - Example: `token: "actual-jwt-token-value"` rather than `authorization: "Bearer actual-jwt-token-value"`

2. **API Call Structure for Lesan Framework**:
   - When making API calls to the backend via the `paperApi` service, make sure to include the authentication token properly
   - The API response for `gets` (plural) operations typically includes both `data` and `metadata` fields
   - For operations that don't require pagination, the response may be directly the requested data

3. **Authentication Token Handling**:
   - Tokens are stored in cookies under the key "token"
   - When using the `paperApi` service, pass the token using the second parameter: `paperApi(undefined, { token: tokenValue })`
   - The `paperApi` service handles proper token formatting for backend compatibility

4. **Type Safety Considerations**:
   - When making API calls, the `get` parameter in the request only specifies the fields to return, not the response structure
   - Response structure is determined by the backend and may include additional fields like `metadata` for pagination

5. **Using Declared Types for Consistency**:
   - Always use the type definitions from the declarations file (e.g. `src/types/declarations/selectInp.ts`) rather than creating custom interfaces
   - Import and use the exact backend schema types (e.g. `articleSchema`, `authorSchema`, `userSchema`) to ensure consistency with the backend
   - This prevents synchronization issues and ensures type safety between frontend and backend
   - Example: Use `import { articleSchema } from "@/types/declarations/selectInp";` and then `type Article = Partial<articleSchema>;`

6. **User Access Levels**:
   - The application has different user levels with increasing permissions: Normal, Editor, Manager, and Ghost
   - The Ghost user level is the highest access level with permissions to perform all administrative tasks
   - When implementing access controls, ensure Ghost users have access to all features by including `userLevel === "Ghost"` in permission checks
   - Example: `(userLevel === "Manager" || userLevel === "Editor" || userLevel === "Ghost")` when allowing access to admin features

## Key Features

1. **Article Search & Filtering**: Advanced search with multiple filter options
2. **User Authentication**: Role-based access control
3. **Favorites Management**: Save articles to personal favorites
4. **Responsive Design**: Mobile-friendly interface
5. **Rich Text Editing**: TipTap-powered editor
6. **Visualizations**: Network graphs and data visualizations
7. **Pagination**: Efficient data loading with pagination
8. **Form Validation**: Zod-powered form validation

## Development Workflow Guidelines

### Do NOT Automatically Execute

- **DO NOT** run any development server (e.g., `pnpm dev`, etc.)
- **DO NOT** execute any build commands (e.g., `pnpm build`, etc.)
- **DO NOT** start any local servers or processes automatically

### Wait for Explicit Instructions

Only run development servers or build commands when explicitly asked. For example:

- "Please start the development server"
- "Run the build command"
- "Start the local server"

### Default Behavior

When asked about development or building, provide the commands that would be used, but do not execute them until given explicit permission.

### Exception Cases

May still:

- Analyze project structure and configuration files
- Suggest commands that could be run
- Help debug configuration issues
- Explain what different commands do

## Environment Configuration

The application includes an `.env.example` file (not shown in directory listing) that likely contains environment-specific configurations for API endpoints and other settings.

## Backend API Declaration

If you need to understand the backend API declaration and type-safety, you can read `src/types/declarations/selectInp.ts` file which includes all schemas and backend API calls.

If you encounter any problems with the structure of the Lesan library used for the backend, you can use its documentation at: https://miaadteam.github.io/lesan/