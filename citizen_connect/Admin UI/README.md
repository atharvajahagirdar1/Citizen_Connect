# Citizen Connect - Admin Portal

A comprehensive admin portal for managing civic issues, notifications, reports, and workers/volunteers.

## Features

- **Admin Authentication**: Secure login system with session management
- **Civic Issue Management**: Track and manage issues reported by citizens
- **Notification System**: Automated notifications for issue updates
- **Reports & Analytics**: Comprehensive reporting and data visualization
- **Worker/Volunteer Management**: Manage workers, schedules, and task assignments
- **Unified Dashboard**: Central hub for all admin activities

## Portal Structure

```
Admin UI/
├── Login/                          # Admin authentication
├── Dashboard/                      # Main admin dashboard
├── Civic Issue Management Portal/  # Issue tracking and management
├── Notification Auto Management/   # Automated notifications
├── Reports and Analysis/           # Analytics and reporting
├── Worker or Volenteer Management/ # Worker management system
├── server.js                       # Unified server configuration
└── package.json                    # Dependencies
```

## Quick Start

### 1. Install Dependencies

```bash
cd "Admin UI"
npm install
```

### 2. Start the Server

```bash
npm start
```

### 3. Access the Portal

Open your browser and navigate to:
- **Login**: http://localhost:3000/login
- **Dashboard**: http://localhost:3000/dashboard

### 4. Demo Credentials

- **Username**: admin
- **Password**: demo123

## Available Routes

- `/login` - Admin login page
- `/dashboard` - Main admin dashboard
- `/civic-issues` - Civic issue management portal
- `/notifications` - Notification management system
- `/reports` - Reports and analytics portal
- `/workers` - Worker/volunteer management portal

## API Endpoints

### Authentication
- `POST /api/admin/login` - Admin login

### Civic Issues
- `GET /api/issues` - Get all issues
- `PUT /api/issues/:id` - Update issue status

### Notifications
- `GET /api/notifications/rules` - Get notification rules
- `POST /api/notifications/rules` - Create notification rule

### Reports
- `GET /api/reports/analytics` - Get analytics data

### Workers
- `GET /api/workers` - Get all workers
- `POST /api/workers` - Add new worker

## Development

For development with auto-restart:

```bash
npm run dev
```

## Session Management

All portals include session management that:
- Checks for valid admin session on page load
- Redirects to login page if not authenticated
- Updates UI with admin username
- Provides logout functionality

## Data Storage

Currently uses:
- Local storage for user-reported issues
- Session storage for admin authentication
- In-memory data for demo purposes

For production deployment, integrate with a proper database system.

## Security Notes

This is a demo implementation. For production use:
- Implement proper password hashing
- Use JWT tokens or session cookies
- Add rate limiting
- Implement proper CORS configuration
- Add input validation and sanitization
- Use HTTPS
- Implement proper database security