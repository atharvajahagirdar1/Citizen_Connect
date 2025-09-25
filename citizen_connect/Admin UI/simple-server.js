const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

// MIME types
const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
  console.log(`Request: ${req.method} ${req.url}`);
  
  // Parse URL
  let filePath = req.url;
  
  // Route mapping
  if (filePath === '/' || filePath === '/login') {
    filePath = '/Login/index.html';
  } else if (filePath === '/dashboard') {
    filePath = '/Dashboard/index.html';
  } else if (filePath === '/civic-issues') {
    filePath = '/Civic Issue Management Portal/index.html';
  } else if (filePath === '/notifications') {
    filePath = '/Notification Auto Management/index.html';
  } else if (filePath === '/reports') {
    filePath = '/Reports and Analysis/index.html';
  } else if (filePath === '/workers') {
    filePath = '/Worker or Volenteer Management/index.html';
  } else if (filePath.startsWith('/api/')) {
    // Handle API requests
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: true, message: 'API endpoint' }));
    return;
  }
  
  // Remove leading slash and resolve path
  filePath = path.join(__dirname, filePath.replace(/^\//, ''));
  
  // Check if file exists
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.end('<h1>404 - Page Not Found</h1>');
      return;
    }
    
    // Read and serve file
    fs.readFile(filePath, (err, content) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/html' });
        res.end('<h1>500 - Internal Server Error</h1>');
        return;
      }
      
      // Determine content type
      const ext = path.extname(filePath).toLowerCase();
      const contentType = mimeTypes[ext] || 'application/octet-stream';
      
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    });
  });
});

server.listen(PORT, () => {
  console.log(`🚀 Admin Portal Server running on port ${PORT}`);
  console.log(`📊 Dashboard: http://localhost:${PORT}/dashboard`);
  console.log(`🔐 Login: http://localhost:${PORT}/login`);
  console.log(`🚨 Civic Issues: http://localhost:${PORT}/civic-issues`);
  console.log(`🔔 Notifications: http://localhost:${PORT}/notifications`);
  console.log(`📊 Reports: http://localhost:${PORT}/reports`);
  console.log(`👥 Workers: http://localhost:${PORT}/workers`);
});

module.exports = server;