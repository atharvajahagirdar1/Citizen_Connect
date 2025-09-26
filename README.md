# Citizen Connect
A civic engagement web application for reporting and managing community issues.

## Features
- User reporting system with photo capture and location selection
- Admin portal for issue management and analytics
- Notification system for updates
- Worker/volunteer management
- Comprehensive reporting and data visualization
- Multi-language support

## Quick Start

### Option 1: GitHub Pages (Live Demo)
Visit your GitHub Pages URL: `https://YOUR_USERNAME.github.io/citizen-connect`

### Option 2: Local Development

#### Prerequisites
- Node.js (v14 or higher)
- npm (Node Package Manager)

#### Installation

1. Clone the repository:
```bash
git clone <your-repository-url>
cd citizen-connect
```

2. Install dependencies for the Admin portal:
```bash
cd "Admin UI"
npm install
```

3. Start the server:
```bash
npm start
```

4. Open your browser and navigate to:
- **Main Application**: `http://localhost:3000`
- **Admin Portal**: `http://localhost:3000/Admin UI/Login/index.html`

### Demo Credentials
- **Username**: admin
- **Password**: demo123

## Project Structure

```
citizen-connect/
├── User UI/                    # User-facing pages
│   ├── Main UI/               # User dashboard
│   ├── Login and SignUp Page/ # Authentication
│   ├── Report Issue Page/     # Issue reporting
│   ├── Profile Page/           # User profile management
│   ├── My Issues Page/       # User's reported issues
│   ├── Notifications Page/    # User notifications
│   └── Capture Photo Page/    # Photo capture for reports
├── Admin UI/                   # Admin portal
│   ├── Login/                 # Admin authentication
│   ├── Dashboard/            # Admin dashboard
│   ├── Civic Issue Management Portal/ # Issue management
│   ├── Notification Auto Management/  # Notification system
│   ├── Reports and Analysis/        # Analytics and reporting
│   └── Worker or Volenteer Management/ # Worker management
├── server.js                  # Main Express.js server
└── Splash_Screen.html        # Application entry point
```

## Key Features

### User Features
- 📱 Responsive design for mobile and desktop
- 📸 Photo capture and upload for issue reporting
- 📍 GPS-based location selection
- 🔔 Real-time notifications
- 👤 User profile management
- 🗺️ Interactive issue tracking
- 🌐 Multi-language support

### Admin Features
- 📊 Comprehensive analytics dashboard
- 📋 Issue management and status tracking
- 👥 Worker/volunteer assignment
- 📈 Reporting and data visualization
- 🔔 Automated notification system
- 🔐 Secure authentication

## Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: Node.js, Express.js
- **Icons**: Font Awesome
- **Charts**: Chart.js (for analytics)
- **Storage**: LocalStorage, SessionStorage
- **Maps**: Google Maps API (where applicable)

## API Endpoints

### Main Server
- `POST /api/reports` - Submit new reports
- `GET /api/health` - Health check

### Admin Portal
- `POST /api/admin/login` - Admin authentication
- `GET /api/issues` - Get all issues
- `PUT /api/issues/:id` - Update issue status
- `GET /api/notifications/rules` - Get notification rules
- `GET /api/reports/analytics` - Get analytics data
- `GET /api/workers` - Get worker data

## Development

For development with auto-restart:
```bash
npm run dev
```

## Deployment Options

### Option 1: GitHub Pages (Static Hosting) - RECOMMENDED
Perfect for hosting the static HTML/CSS/JS files. **This is the easiest option!**

#### Quick Deploy Steps:
1. Push your code to GitHub
2. Go to Settings > Pages in your GitHub repository
3. Select source: Deploy from a branch
4. Choose main branch and root folder
5. Your app will be live at: `https://YOUR_USERNAME.github.io/citizen-connect`

#### Important Notes:
- Your `index.html` is already configured as the entry point
- The `.nojekyll` file prevents Jekyll processing issues
- Node.js dependencies are excluded via `.gitignore`
- All internal links use relative paths (perfect for GitHub Pages)

### Option 2: Full Deployment (Advanced)
Use platforms like Heroku, Vercel, or Railway for full Express.js backend support.

### Option 3: Hybrid Approach (Advanced)
- Host static pages on GitHub Pages
- Deploy backend server separately on a cloud platform

## Browser Support
- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

## Contributing
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License
MIT License - feel free to use and modify as needed.

## Support
For issues and questions, please create an issue in the GitHub repository.

---

**Built with ❤️ for civic engagement and community improvement.**