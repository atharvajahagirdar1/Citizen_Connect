const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = 3000;

// MIME types for different file extensions
const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

// Create HTTP server
const server = http.createServer((req, res) => {
  console.log(`📡 ${req.method} ${req.url}`);
  
  // Parse the URL
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  
  // Handle API endpoints
  if (pathname === '/api/reports' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    
    req.on('end', () => {
      try {
        const reportData = JSON.parse(body);
        console.log('📋 Received report data:', reportData);
        
        // Create reports directory if it doesn't exist
        const reportsDir = path.join(__dirname, 'reports');
        if (!fs.existsSync(reportsDir)) {
          fs.mkdirSync(reportsDir);
        }
        
        // Generate unique filename
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const filename = `report_${timestamp}.json`;
        const filepath = path.join(reportsDir, filename);
        
        // Save report data
        const completeReportData = {
          ...reportData,
          submittedAt: new Date().toISOString(),
          id: `report_${Date.now()}`
        };
        
        fs.writeFileSync(filepath, JSON.stringify(completeReportData, null, 2));
        console.log('💾 Report saved to:', filename);
        
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ 
          success: true, 
          message: 'Report submitted successfully!',
          reportId: completeReportData.id
        }));
      } catch (error) {
        console.error('❌ Error saving report:', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ 
          success: false, 
          message: 'Error saving report'
        }));
      }
    });
    return;
  }
  
  // Handle health check
  if (pathname === '/api/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ 
      status: 'ok', 
      timestamp: new Date().toISOString() 
    }));
    return;
  }
  
  // Serve static files
  let filePath = path.join(__dirname, pathname);
  
  // Default to index.html for directory requests
  if (pathname === '/') {
    filePath = path.join(__dirname, 'Splash_Screen.html');
  } else if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    const indexPath = path.join(filePath, 'index.html');
    if (fs.existsSync(indexPath)) {
      filePath = indexPath;
    }
  }
  
  // Check if file exists
  if (!fs.existsSync(filePath)) {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end('<h1>404 - File Not Found</h1>');
    return;
  }
  
  // Determine content type
  const ext = path.extname(filePath).toLowerCase();
  const contentType = mimeTypes[ext] || 'application/octet-stream';
  
  // Read and serve the file
  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.error('❌ Error reading file:', err);
      res.writeHead(500, { 'Content-Type': 'text/html' });
      res.end('<h1>500 - Internal Server Error</h1>');
      return;
    }
    
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
});

// Start server
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log('📁 Serving files from:', __dirname);
});

module.exports = server;