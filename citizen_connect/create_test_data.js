// Create test data for report flow
function createTestPhoto() {
    // Create a simple base64 image (1x1 red pixel)
    const canvas = document.createElement('canvas');
    canvas.width = 100;
    canvas.height = 100;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#ff0000';
    ctx.fillRect(0, 0, 100, 100);
    return canvas.toDataURL('image/png');
}

function createTestLocation() {
    return {
        address: "123 Test Street, Test City, TC 12345",
        lat: 40.7128,
        lon: -74.0060,
        manual: false,
        timestamp: new Date().toISOString()
    };
}

// Store test data
const testPhoto = createTestPhoto();
const testLocation = createTestLocation();

localStorage.setItem('capturedPhoto', testPhoto);
localStorage.setItem('photoTimestamp', new Date().toISOString());
localStorage.setItem('reportLocation', JSON.stringify(testLocation));
localStorage.setItem('reportedIssueLocation', testLocation.address);

console.log('✅ Test data created successfully!');
console.log('📸 Photo data length:', testPhoto.length);
console.log('📍 Location:', testLocation.address);
console.log('🔄 Redirecting to report page...');

// Redirect to report page
window.location.href = 'User UI/Report Issue Page/index.html';