# Home Inventory Management

A modern, responsive web application for managing home inventory, built with React and Next.js. This project integrates with a Homebox-compatible API to track items, locations, and labels.

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or later)
- pnpm / npm / yarn / bun

### Installation

1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd home-inventory
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add:
   ```env
   NEXT_PUBLIC_API_BASE_URL=http://4.213.57.100:3100/api
   ```

4. Run the development server:
   ```bash
   pnpm dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🛠 Tech Stack

- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS
- **State Management**: TanStack Query (React Query)
- **API Client**: Axios
- **Icons**: Lucide React
- **Logging/Formatting**: Biome

## 🔑 Authentication

Authentication is handled via a JWT-based login system. 
- Tokens are stored in a dedicated `AuthContext` and used for all subsequent API calls via an Axios interceptor.
- You must register a user via the [Swagger API](http://4.213.57.100:3100/swagger/index.html) before logging in.

## 📂 Project Structure

- `src/app`: Next.js App Router pages and API routes.
- `src/components`: Reusable UI components.
- `src/lib`: API client, utility functions, and API service layers.
- `src/hooks`: Custom React hooks for data fetching.
- `src/context`: React Context for authentication.
- `src/types`: TypeScript definitions.

## 🎯 Tradeoffs & Next Steps

- **Client-Side vs Server-Side**: Most data fetching is done client-side using TanStack Query to leverage its excellent caching and loading state management.
- **Mobile Sidebar**: A mobile-responsive sidebar toggle is being implemented to improve the experience on smaller screens.
- **Error Handling**: Centralized error handling and retry logic are being added to all main data-fetching views.
