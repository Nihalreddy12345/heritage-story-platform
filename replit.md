# Heritage Stories - Family Timeline Application

## Overview

Heritage Stories is a full-stack web application designed for preserving and sharing family memories. The application allows users to create a digital timeline of their family's heritage by sharing stories, uploading multimedia content, and creating an interactive family history experience.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

The application follows a modern full-stack architecture with a clear separation between client and server components:

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized production builds  
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **UI Framework**: Radix UI components with shadcn/ui component library
- **Styling**: Tailwind CSS with custom heritage-themed color palette
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database ORM**: Drizzle ORM for type-safe database operations
- **Database**: PostgreSQL (via Neon serverless)
- **Authentication**: Replit Auth with OpenID Connect
- **Session Management**: Express sessions with PostgreSQL store
- **File Upload**: Multer middleware for handling multimedia files

## Key Components

### Authentication System
- **Provider**: Replit Auth using OpenID Connect
- **Session Storage**: PostgreSQL-backed sessions with 7-day TTL
- **Authorization**: Middleware-based route protection
- **User Management**: Automatic user creation/updates on login

### Story Management
- **Story Creation**: Rich story form with title, description, event date
- **Media Upload**: Support for images, videos, and audio files up to 50MB
- **Timeline Display**: Chronological story feed with interaction capabilities
- **Story Interactions**: Like system with database persistence

### Database Schema
- **Users**: Profile information, authentication data
- **Stories**: Story content, metadata, author relationships
- **Media Files**: File metadata and storage paths
- **Story Interactions**: User engagement tracking (likes, comments)
- **Sessions**: Authentication session persistence

### File Management
- **Storage**: Local filesystem storage in uploads directory
- **Processing**: Multer-based file validation and processing
- **Serving**: Static file serving via Express
- **Validation**: MIME type and file size restrictions

## Data Flow

1. **Authentication Flow**:
   - User initiates login via Replit Auth
   - OpenID Connect handles authentication
   - User profile stored/updated in PostgreSQL
   - Session created with PostgreSQL backing

2. **Story Creation Flow**:
   - User submits story form with optional media files
   - Server validates data using Zod schemas
   - Files processed and stored via Multer
   - Story and media records created in database
   - Timeline refreshed via React Query

3. **Timeline Display Flow**:
   - Client fetches stories with media and interaction data
   - Server joins related tables for complete story details
   - Stories rendered chronologically with media previews
   - Real-time interaction updates via optimistic UI patterns

## External Dependencies

### Database
- **Neon PostgreSQL**: Serverless PostgreSQL database
- **Connection Pooling**: Built-in connection management
- **Environment**: DATABASE_URL configuration required

### Authentication
- **Replit Auth**: OAuth 2.0/OpenID Connect provider
- **Configuration**: REPL_ID, SESSION_SECRET, ISSUER_URL required
- **Domains**: REPLIT_DOMAINS environment variable for security

### Development Tools
- **Replit Integration**: Development environment optimization
- **Error Handling**: Runtime error overlay in development
- **Hot Reload**: Vite HMR for development efficiency

## Deployment Strategy

### Build Process
- **Client Build**: Vite builds React app to dist/public
- **Server Build**: esbuild bundles Node.js server to dist/
- **Type Checking**: TypeScript compilation verification
- **Database Migration**: Drizzle Kit for schema management

### Production Configuration
- **Environment**: NODE_ENV=production
- **Static Assets**: Express serves built client files
- **Database**: Connection via DATABASE_URL
- **Sessions**: Secure cookie configuration for HTTPS
- **File Uploads**: Persistent uploads directory

### Development Workflow
- **Dev Server**: tsx runs TypeScript server directly
- **Hot Reload**: Vite middleware integrated with Express
- **Database**: Push schema changes via drizzle-kit push
- **Type Safety**: Shared schema types between client/server

The application prioritizes type safety, developer experience, and scalable architecture while maintaining simplicity in deployment and maintenance.