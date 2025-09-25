const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the current directory
app.use(express.static(__dirname));

// API endpoint to save reports
app.post('/api/reports', (req, res) => {
  console.log('📋 Received report data:', req.body);
  
  try {
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
    const reportData = {
      ...req.body,
      submittedAt: new Date().toISOString(),
      id: `report_${Date.now()}`
    };
    
    fs.writeFileSync(filepath, JSON.stringify(reportData, null, 2));
    console.log('💾 Report saved to:', filename);
    
    res.json({ 
      success: true, 
      message: 'Report submitted successfully!',
      reportId: reportData.id
    });
  } catch (error) {
    console.error('❌ Error saving report:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error saving report'
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Serve index.html for the root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'Splash_Screen.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log('📁 Serving files from:', __dirname);
});

module.exports = app;