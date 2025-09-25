// Reports and Analysis Portal JavaScript

// Sample Data
const sampleData = {
    issues: [
        { id: 1, title: 'Pothole on Main St', category: 'Infrastructure', status: 'Open', priority: 'High', created: '2024-01-15', resolved: null, responseTime: 2, satisfaction: 4 },
        { id: 2, title: 'Street Light Out', category: 'Infrastructure', status: 'Resolved', priority: 'Medium', created: '2024-01-10', resolved: '2024-01-12', responseTime: 1, satisfaction: 5 },
        { id: 3, title: 'Graffiti on Building', category: 'Public Safety', status: 'In Progress', priority: 'Low', created: '2024-01-08', resolved: null, responseTime: 3, satisfaction: 3 },
        { id: 4, title: 'Illegal Parking', category: 'Traffic', status: 'Open', priority: 'Medium', created: '2024-01-05', resolved: null, responseTime: 1, satisfaction: 2 },
        { id: 5, title: 'Noise Complaint', category: 'Public Safety', status: 'Resolved', priority: 'High', created: '2024-01-03', resolved: '2024-01-04', responseTime: 0, satisfaction: 4 },
        { id: 6, title: 'Water Leak', category: 'Utilities', status: 'In Progress', priority: 'Critical', created: '2024-01-01', resolved: null, responseTime: 0, satisfaction: 1 },
        { id: 7, title: 'Broken Sidewalk', category: 'Infrastructure', status: 'Open', priority: 'Medium', created: '2023-12-28', resolved: null, responseTime: 5, satisfaction: 3 },
        { id: 8, title: 'Tree Branch Down', category: 'Environment', status: 'Resolved', priority: 'High', created: '2023-12-25', resolved: '2023-12-26', responseTime: 1, satisfaction: 5 }
    ],
    workers: [
        { id: 1, name: 'John Smith', department: 'Infrastructure', completed: 15, avgResponseTime: 2.5, satisfaction: 4.2 },
        { id: 2, name: 'Sarah Johnson', department: 'Public Safety', completed: 12, avgResponseTime: 1.8, satisfaction: 4.5 },
        { id: 3, name: 'Mike Davis', department: 'Utilities', completed: 18, avgResponseTime: 3.2, satisfaction: 3.8 },
        { id: 4, name: 'Lisa Brown', department: 'Traffic', completed: 10, avgResponseTime: 2.1, satisfaction: 4.0 },
        { id: 5, name: 'Tom Wilson', department: 'Environment', completed: 14, avgResponseTime: 1.9, satisfaction: 4.3 }
    ],
    areas: [
        { name: 'Downtown', issues: 45, resolved: 38, avgResponse: 2.1 },
        { name: 'North District', issues: 32, resolved: 28, avgResponse: 2.8 },
        { name: 'South District', issues: 28, resolved: 25, avgResponse: 1.9 },
        { name: 'East Side', issues: 41, resolved: 35, avgResponse: 2.3 },
        { name: 'West Side', issues: 35, resolved: 30, avgResponse: 2.5 }
    ],
    monthlyData: [
        { month: 'Jan', issues: 120, resolved: 105, responseTime: 2.1 },
        { month: 'Feb', issues: 135, resolved: 128, responseTime: 1.9 },
        { month: 'Mar', issues: 145, resolved: 132, responseTime: 2.3 },
        { month: 'Apr', issues: 158, resolved: 148, responseTime: 2.0 },
        { month: 'May', issues: 142, resolved: 135, responseTime: 1.8 },
        { month: 'Jun', issues: 165, resolved: 155, responseTime: 2.2 }
    ],
    categoryData: [
        { category: 'Infrastructure', count: 45, percentage: 28 },
        { category: 'Public Safety', count: 38, percentage: 24 },
        { category: 'Traffic', count: 32, percentage: 20 },
        { category: 'Utilities', count: 28, percentage: 18 },
        { category: 'Environment', count: 16, percentage: 10 }
    ]
};

// Global variables
let currentTab = 'dashboard';
let charts = {};

// Initialize the portal
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    loadDashboardData();
    setupEventListeners();
    showNotification('Reports and Analysis Portal loaded successfully!', 'success');
});

// Navigation Functions
function initializeNavigation() {
    const navTabs = document.querySelectorAll('.nav-tab');
    navTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetTab = this.dataset.tab;
            switchTab(targetTab);
        });
    });
}

function switchTab(tabName) {
    // Update active tab
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

    // Update tab content
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById(tabName).classList.add('active');

    currentTab = tabName;
    
    // Load tab-specific data
    switch(tabName) {
        case 'dashboard':
            loadDashboardData();
            break;
        case 'issue-reports':
            loadIssueReports();
            break;
        case 'performance':
            loadPerformanceAnalytics();
            break;
        case 'trends':
            loadTrendsInsights();
            break;
        case 'geographic':
            loadGeographicAnalysis();
            break;
        case 'custom':
            loadCustomReports();
            break;
    }
}

// Dashboard Functions
function loadDashboardData() {
    updateDashboardMetrics();
    createDashboardCharts();
    loadRecentActivity();
}

function updateDashboardMetrics() {
    const totalIssues = sampleData.issues.length;
    const resolvedIssues = sampleData.issues.filter(issue => issue.status === 'Resolved').length;
    const avgResponseTime = (sampleData.issues.reduce((sum, issue) => sum + issue.responseTime, 0) / totalIssues).toFixed(1);
    const satisfactionRate = ((sampleData.issues.reduce((sum, issue) => sum + issue.satisfaction, 0) / totalIssues) / 5 * 100).toFixed(0);
    const openIssues = sampleData.issues.filter(issue => issue.status === 'Open').length;
    const criticalIssues = sampleData.issues.filter(issue => issue.priority === 'Critical').length;

    const metrics = [
        { id: 'total-issues', value: totalIssues, change: '+12%', positive: true },
        { id: 'resolved-issues', value: resolvedIssues, change: '+8%', positive: true },
        { id: 'avg-response', value: `${avgResponseTime} days`, change: '-15%', positive: true },
        { id: 'satisfaction', value: `${satisfactionRate}%`, change: '+5%', positive: true },
        { id: 'open-issues', value: openIssues, change: '-3%', positive: true },
        { id: 'critical-issues', value: criticalIssues, change: '0%', positive: true }
    ];

    metrics.forEach(metric => {
        const element = document.getElementById(metric.id);
        if (element) {
            const valueElement = element.querySelector('.metric-value');
            const changeElement = element.querySelector('.metric-change');
            
            if (valueElement) valueElement.textContent = metric.value;
            if (changeElement) {
                changeElement.textContent = metric.change;
                changeElement.className = `metric-change ${metric.positive ? 'positive' : 'negative'}`;
            }
        }
    });
}

function createDashboardCharts() {
    // Issue Volume Chart
    const volumeCtx = document.getElementById('issueVolumeChart');
    if (volumeCtx) {
        if (charts.volume) charts.volume.destroy();
        charts.volume = new Chart(volumeCtx, {
            type: 'line',
            data: {
                labels: sampleData.monthlyData.map(d => d.month),
                datasets: [{
                    label: 'Issues Reported',
                    data: sampleData.monthlyData.map(d => d.issues),
                    borderColor: '#1565d8',
                    backgroundColor: 'rgba(21, 101, 216, 0.1)',
                    tension: 0.4,
                    fill: true
                }, {
                    label: 'Issues Resolved',
                    data: sampleData.monthlyData.map(d => d.resolved),
                    borderColor: '#28a745',
                    backgroundColor: 'rgba(40, 167, 69, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Monthly Issue Volume'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    // Category Distribution Chart
    const categoryCtx = document.getElementById('categoryChart');
    if (categoryCtx) {
        if (charts.category) charts.category.destroy();
        charts.category = new Chart(categoryCtx, {
            type: 'doughnut',
            data: {
                labels: sampleData.categoryData.map(d => d.category),
                datasets: [{
                    data: sampleData.categoryData.map(d => d.count),
                    backgroundColor: [
                        '#ff6b6b', '#4ecdc4', '#45b7d1', '#f39c12', '#9b59b6'
                    ]
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Issues by Category'
                    }
                }
            }
        });
    }
}

function loadRecentActivity() {
    const activityList = document.querySelector('.activity-list');
    if (!activityList) return;

    const activities = [
        { icon: 'fas fa-exclamation-triangle', title: 'New critical issue reported', time: '2 minutes ago', type: 'warning' },
        { icon: 'fas fa-check-circle', title: 'Issue #1234 resolved', time: '15 minutes ago', type: 'success' },
        { icon: 'fas fa-user-plus', title: 'New worker assigned to infrastructure', time: '1 hour ago', type: 'info' },
        { icon: 'fas fa-chart-line', title: 'Monthly report generated', time: '2 hours ago', type: 'info' },
        { icon: 'fas fa-map-marker-alt', title: 'Geographic analysis updated', time: '3 hours ago', type: 'info' }
    ];

    activityList.innerHTML = activities.map(activity => `
        <div class="activity-item">
            <div class="activity-icon ${activity.type}">
                <i class="${activity.icon}"></i>
            </div>
            <div class="activity-content">
                <div class="activity-title">${activity.title}</div>
                <div class="activity-time">${activity.time}</div>
            </div>
        </div>
    `).join('');
}

// Issue Reports Functions
function loadIssueReports() {
    loadIssueReportsTable();
    createIssueCharts();
}

function loadIssueReportsTable() {
    const tableBody = document.querySelector('#issuesTable tbody');
    if (!tableBody) return;

    tableBody.innerHTML = sampleData.issues.map(issue => `
        <tr>
            <td>#${issue.id}</td>
            <td>${issue.title}</td>
            <td><span class="status-badge ${getStatusClass(issue.status)}">${issue.status}</span></td>
            <td><span class="priority-indicator priority-${issue.priority.toLowerCase()}"></span>${issue.priority}</td>
            <td>${issue.category}</td>
            <td>${issue.created}</td>
            <td>${issue.resolved || 'N/A'}</td>
            <td>${issue.responseTime} days</td>
            <td>${issue.satisfaction}/5</td>
        </tr>
    `).join('');
}

function createIssueCharts() {
    // Status Chart
    const statusCtx = document.getElementById('statusChart');
    if (statusCtx) {
        if (charts.status) charts.status.destroy();
        const statusCounts = getStatusCounts();
        charts.status = new Chart(statusCtx, {
            type: 'bar',
            data: {
                labels: Object.keys(statusCounts),
                datasets: [{
                    label: 'Issues by Status',
                    data: Object.values(statusCounts),
                    backgroundColor: ['#28a745', '#ffc107', '#dc3545', '#6c757d']
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Issues by Status'
                    }
                }
            }
        });
    }

    // Priority Chart
    const priorityCtx = document.getElementById('priorityChart');
    if (priorityCtx) {
        if (charts.priority) charts.priority.destroy();
        const priorityCounts = getPriorityCounts();
        charts.priority = new Chart(priorityCtx, {
            type: 'pie',
            data: {
                labels: Object.keys(priorityCounts),
                datasets: [{
                    data: Object.values(priorityCounts),
                    backgroundColor: ['#dc3545', '#fd7e14', '#ffc107', '#28a745']
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Issues by Priority'
                    }
                }
            }
        });
    }

    // Resolution Timeline Chart
    const timelineCtx = document.getElementById('resolutionTimelineChart');
    if (timelineCtx) {
        if (charts.timeline) charts.timeline.destroy();
        charts.timeline = new Chart(timelineCtx, {
            type: 'line',
            data: {
                labels: sampleData.monthlyData.map(d => d.month),
                datasets: [{
                    label: 'Average Resolution Time (days)',
                    data: sampleData.monthlyData.map(d => d.responseTime),
                    borderColor: '#fd7e14',
                    backgroundColor: 'rgba(253, 126, 20, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Resolution Timeline Trend'
                    }
                }
            }
        });
    }
}

// Performance Analytics Functions
function loadPerformanceAnalytics() {
    createPerformanceCharts();
    loadPerformanceMetrics();
}

function createPerformanceCharts() {
    // Response Time Chart
    const responseCtx = document.getElementById('responseTimeChart');
    if (responseCtx) {
        if (charts.response) charts.response.destroy();
        charts.response = new Chart(responseCtx, {
            type: 'bar',
            data: {
                labels: sampleData.monthlyData.map(d => d.month),
                datasets: [{
                    label: 'Average Response Time (days)',
                    data: sampleData.monthlyData.map(d => d.responseTime),
                    backgroundColor: 'rgba(21, 101, 216, 0.8)'
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Average Response Time by Month'
                    }
                }
            }
        });
    }

    // Worker Performance Chart
    const workerCtx = document.getElementById('workerPerformanceChart');
    if (workerCtx) {
        if (charts.worker) charts.worker.destroy();
        charts.worker = new Chart(workerCtx, {
            type: 'radar',
            data: {
                labels: ['Completed Issues', 'Response Time', 'Satisfaction', 'Efficiency'],
                datasets: sampleData.workers.map(worker => ({
                    label: worker.name,
                    data: [
                        (worker.completed / 20) * 100,
                        Math.max(0, 100 - (worker.avgResponseTime / 5) * 100),
                        (worker.satisfaction / 5) * 100,
                        ((worker.completed / worker.avgResponseTime) / 10) * 100
                    ],
                    borderColor: getRandomColor(),
                    backgroundColor: 'rgba(0,0,0,0.1)'
                }))
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Worker Performance Comparison'
                    }
                }
            }
        });
    }

    // Satisfaction Chart
    const satisfactionCtx = document.getElementById('satisfactionChart');
    if (satisfactionCtx) {
        if (charts.satisfaction) charts.satisfaction.destroy();
        const satisfactionData = getSatisfactionData();
        charts.satisfaction = new Chart(satisfactionCtx, {
            type: 'doughnut',
            data: {
                labels: ['Very Satisfied', 'Satisfied', 'Neutral', 'Dissatisfied'],
                datasets: [{
                    data: Object.values(satisfactionData),
                    backgroundColor: ['#28a745', '#6c757d', '#ffc107', '#dc3545']
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'User Satisfaction Distribution'
                    }
                }
            }
        });
    }
}

function loadPerformanceMetrics() {
    const performanceGrid = document.querySelector('.performance-grid');
    if (!performanceGrid) return;

    performanceGrid.innerHTML = sampleData.workers.map(worker => `
        <div class="performance-card">
            <h4>${worker.name}</h4>
            <div class="performance-metrics">
                <div class="metric">
                    <span class="metric-label">Department:</span>
                    <span class="metric-value">${worker.department}</span>
                </div>
                <div class="metric">
                    <span class="metric-label">Completed Issues:</span>
                    <span class="metric-value">${worker.completed}</span>
                </div>
                <div class="metric">
                    <span class="metric-label">Avg Response Time:</span>
                    <span class="metric-value">${worker.avgResponseTime} days</span>
                </div>
                <div class="metric">
                    <span class="metric-label">Satisfaction:</span>
                    <span class="metric-value">${worker.satisfaction}/5</span>
                </div>
            </div>
        </div>
    `).join('');
}

// Trends & Insights Functions
function loadTrendsInsights() {
    createTrendCharts();
    loadKeyInsights();
}

function createTrendCharts() {
    // Seasonal Patterns Chart
    const seasonalCtx = document.getElementById('seasonalChart');
    if (seasonalCtx) {
        if (charts.seasonal) charts.seasonal.destroy();
        charts.seasonal = new Chart(seasonalCtx, {
            type: 'line',
            data: {
                labels: ['Winter', 'Spring', 'Summer', 'Fall'],
                datasets: [{
                    label: 'Issue Volume',
                    data: [120, 145, 165, 135],
                    borderColor: '#1565d8',
                    backgroundColor: 'rgba(21, 101, 216, 0.1)',
                    tension: 0.4,
                    fill: true
                }, {
                    label: 'Resolution Rate',
                    data: [85, 92, 88, 90],
                    borderColor: '#28a745',
                    backgroundColor: 'rgba(40, 167, 69, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Seasonal Patterns'
                    }
                }
            }
        });
    }

    // Predictive Volume Chart
    const predictiveCtx = document.getElementById('predictiveChart');
    if (predictiveCtx) {
        if (charts.predictive) charts.predictive.destroy();
        charts.predictive = new Chart(predictiveCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
                datasets: [{
                    label: 'Historical',
                    data: [120, 135, 145, 158, 142, 165, null, null, null],
                    borderColor: '#1565d8',
                    backgroundColor: 'rgba(21, 101, 216, 0.1)',
                    tension: 0.4
                }, {
                    label: 'Predicted',
                    data: [null, null, null, null, null, null, 170, 175, 180],
                    borderColor: '#fd7e14',
                    backgroundColor: 'rgba(253, 126, 20, 0.1)',
                    borderDash: [5, 5],
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Predictive Volume Analysis'
                    }
                }
            }
        });
    }
}

function loadKeyInsights() {
    const insightsContainer = document.querySelector('.insights-container');
    if (!insightsContainer) return;

    const insights = [
        {
            icon: 'fas fa-chart-line',
            title: 'Issue Volume Trend',
            description: 'Issue volume increased by 15% compared to last month, primarily due to infrastructure-related reports.',
            trend: 'up',
            color: 'warning'
        },
        {
            icon: 'fas fa-clock',
            title: 'Response Time Improvement',
            description: 'Average response time decreased by 8% this quarter, indicating improved efficiency.',
            trend: 'down',
            color: 'success'
        },
        {
            icon: 'fas fa-users',
            title: 'User Satisfaction',
            description: 'Overall satisfaction rate is 87%, with highest ratings in the Public Safety department.',
            trend: 'up',
            color: 'info'
        },
        {
            icon: 'fas fa-map-marker-alt',
            title: 'Geographic Hotspots',
            description: 'Downtown area shows highest issue density, requiring additional resource allocation.',
            trend: 'stable',
            color: 'primary'
        }
    ];

    insightsContainer.innerHTML = insights.map(insight => `
        <div class="insight-card ${insight.color}">
            <div class="insight-icon">
                <i class="${insight.icon}"></i>
            </div>
            <div class="insight-content">
                <h4>${insight.title}</h4>
                <p>${insight.description}</p>
                <div class="insight-trend trend-${insight.trend}">
                    <i class="fas fa-arrow-${insight.trend === 'up' ? 'up' : insight.trend === 'down' ? 'down' : 'right'}"></i>
                </div>
            </div>
        </div>
    `).join('');
}

// Geographic Analysis Functions
function loadGeographicAnalysis() {
    createGeographicCharts();
    loadAreaStatistics();
}

function createGeographicCharts() {
    // Geographic Distribution Chart
    const geoCtx = document.getElementById('geographicChart');
    if (geoCtx) {
        if (charts.geographic) charts.geographic.destroy();
        charts.geographic = new Chart(geoCtx, {
            type: 'bar',
            data: {
                labels: sampleData.areas.map(area => area.name),
                datasets: [{
                    label: 'Total Issues',
                    data: sampleData.areas.map(area => area.issues),
                    backgroundColor: 'rgba(21, 101, 216, 0.8)'
                }, {
                    label: 'Resolved Issues',
                    data: sampleData.areas.map(area => area.resolved),
                    backgroundColor: 'rgba(40, 167, 69, 0.8)'
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Issues by Geographic Area'
                    }
                }
            }
        });
    }
}

function loadAreaStatistics() {
    const areaStatsContainer = document.querySelector('.area-stats-container');
    if (!areaStatsContainer) return;

    areaStatsContainer.innerHTML = sampleData.areas.map(area => `
        <div class="area-stat-card">
            <h4>${area.name}</h4>
            <div class="area-metrics">
                <div class="metric">
                    <span class="metric-label">Total Issues:</span>
                    <span class="metric-value">${area.issues}</span>
                </div>
                <div class="metric">
                    <span class="metric-label">Resolved:</span>
                    <span class="metric-value">${area.resolved}</span>
                </div>
                <div class="metric">
                    <span class="metric-label">Resolution Rate:</span>
                    <span class="metric-value">${((area.resolved / area.issues) * 100).toFixed(1)}%</span>
                </div>
                <div class="metric">
                    <span class="metric-label">Avg Response Time:</span>
                    <span class="metric-value">${area.avgResponse} days</span>
                </div>
            </div>
        </div>
    `).join('');
}

// Custom Reports Functions
function loadCustomReports() {
    loadSavedReports();
    setupCustomReportBuilder();
}

function loadSavedReports() {
    const savedReportsContainer = document.querySelector('.saved-reports-container');
    if (!savedReportsContainer) return;

    const savedReports = [
        {
            id: 1,
            name: 'Monthly Performance Summary',
            type: 'Performance',
            lastRun: '2024-01-15',
            status: 'Active'
        },
        {
            id: 2,
            name: 'Infrastructure Issues Analysis',
            type: 'Category',
            lastRun: '2024-01-10',
            status: 'Active'
        },
        {
            id: 3,
            name: 'Geographic Distribution Report',
            type: 'Geographic',
            lastRun: '2024-01-08',
            status: 'Draft'
        }
    ];

    savedReportsContainer.innerHTML = savedReports.map(report => `
        <div class="saved-report-card">
            <div class="report-header">
                <h4>${report.name}</h4>
                <span class="status-badge ${getStatusClass(report.status)}">${report.status}</span>
            </div>
            <div class="report-details">
                <div class="detail">
                    <span class="label">Type:</span>
                    <span class="value">${report.type}</span>
                </div>
                <div class="detail">
                    <span class="label">Last Run:</span>
                    <span class="value">${report.lastRun}</span>
                </div>
            </div>
            <div class="report-actions">
                <button class="btn btn-primary btn-sm" onclick="runReport(${report.id})">
                    <i class="fas fa-play"></i> Run
                </button>
                <button class="btn btn-outline btn-sm" onclick="editReport(${report.id})">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button class="btn btn-outline btn-sm" onclick="deleteReport(${report.id})">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </div>
        </div>
    `).join('');
}

function setupCustomReportBuilder() {
    const builderForm = document.getElementById('customReportBuilder');
    if (builderForm) {
        builderForm.addEventListener('submit', function(e) {
            e.preventDefault();
            previewReport();
        });
    }
}

function previewReport() {
    const reportName = document.getElementById('reportName').value;
    const dataSource = document.getElementById('dataSource').value;
    const metrics = Array.from(document.getElementById('metrics').selectedOptions).map(option => option.value);
    const chartType = document.getElementById('chartType').value;
    const dateRange = document.getElementById('dateRange').value;

    if (!reportName || !dataSource || metrics.length === 0) {
        showNotification('Please fill in all required fields', 'warning');
        return;
    }

    // Simulate report preview
    const previewData = generatePreviewData(dataSource, metrics);
    showReportPreview(reportName, previewData, chartType);
}

function generatePreviewData(dataSource, metrics) {
    // Simulate data generation based on source and metrics
    return {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: metrics.map((metric, index) => ({
            label: metric,
            data: Array.from({length: 6}, () => Math.floor(Math.random() * 100) + 20),
            backgroundColor: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.8)`
        }))
    };
}

function showReportPreview(name, data, chartType) {
    const modal = document.getElementById('reportPreviewModal');
    const modalTitle = modal.querySelector('.modal-title');
    const modalBody = modal.querySelector('.modal-body');

    modalTitle.textContent = `Preview: ${name}`;
    modalBody.innerHTML = `
        <div class="chart-container">
            <canvas id="previewChart"></canvas>
        </div>
        <div class="report-summary">
            <h4>Report Summary</h4>
            <p>This report shows the selected metrics for the specified date range. The data visualization above provides insights into trends and patterns.</p>
        </div>
    `;

    modal.style.display = 'block';

    // Create preview chart
    setTimeout(() => {
        const previewCtx = document.getElementById('previewChart');
        if (previewCtx) {
            new Chart(previewCtx, {
                type: chartType,
                data: data,
                options: {
                    responsive: true,
                    plugins: {
                        title: {
                            display: true,
                            text: name
                        }
                    }
                }
            });
        }
    }, 100);
}

// Utility Functions
function getStatusClass(status) {
    switch(status.toLowerCase()) {
        case 'open': return 'warning';
        case 'resolved': return 'success';
        case 'in progress': return 'info';
        default: return 'secondary';
    }
}

function getStatusCounts() {
    const counts = {};
    sampleData.issues.forEach(issue => {
        counts[issue.status] = (counts[issue.status] || 0) + 1;
    });
    return counts;
}

function getPriorityCounts() {
    const counts = {};
    sampleData.issues.forEach(issue => {
        counts[issue.priority] = (counts[issue.priority] || 0) + 1;
    });
    return counts;
}

function getSatisfactionData() {
    const data = { 'Very Satisfied': 0, 'Satisfied': 0, 'Neutral': 0, 'Dissatisfied': 0 };
    sampleData.issues.forEach(issue => {
        if (issue.satisfaction >= 4) data['Very Satisfied']++;
        else if (issue.satisfaction >= 3) data['Satisfied']++;
        else if (issue.satisfaction >= 2) data['Neutral']++;
        else data['Dissatisfied']++;
    });
    return data;
}

function getRandomColor() {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f39c12', '#9b59b6', '#1abc9c', '#e74c3c', '#3498db'];
    return colors[Math.floor(Math.random() * colors.length)];
}

function exportData(format) {
    let data, filename;
    
    switch(currentTab) {
        case 'dashboard':
            data = sampleData.issues;
            filename = 'dashboard-report';
            break;
        case 'issue-reports':
            data = sampleData.issues;
            filename = 'issue-reports';
            break;
        case 'performance':
            data = sampleData.workers;
            filename = 'performance-analytics';
            break;
        default:
            data = sampleData.issues;
            filename = 'report';
    }

    if (format === 'csv') {
        const csv = convertToCSV(data);
        downloadFile(csv, `${filename}.csv`, 'text/csv');
    } else if (format === 'json') {
        const json = JSON.stringify(data, null, 2);
        downloadFile(json, `${filename}.json`, 'application/json');
    }

    showNotification(`Data exported as ${format.toUpperCase()}`, 'success');
}

function convertToCSV(data) {
    if (!data || data.length === 0) return '';
    
    const headers = Object.keys(data[0]);
    const csvContent = [
        headers.join(','),
        ...data.map(row => headers.map(header => row[header] || '').join(','))
    ].join('\n');
    
    return csvContent;
}

function downloadFile(content, filename, contentType) {
    const blob = new Blob([content], { type: contentType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

function printReport() {
    window.print();
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check' : type === 'warning' ? 'exclamation-triangle' : type === 'error' ? 'times-circle' : 'info'}-circle"></i>
        ${message}
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// Event Listeners
function setupEventListeners() {
    // Search functionality
    const searchInput = document.getElementById('tableSearch');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const tableRows = document.querySelectorAll('#issuesTable tbody tr');
            
            tableRows.forEach(row => {
                const text = row.textContent.toLowerCase();
                row.style.display = text.includes(searchTerm) ? '' : 'none';
            });
        });
    }

    // Filter functionality
    const filterSelects = document.querySelectorAll('select[id$="Filter"]');
    filterSelects.forEach(select => {
        select.addEventListener('change', function() {
            applyFilters();
        });
    });

    // Chart type buttons
    const chartTypeButtons = document.querySelectorAll('.btn-chart');
    chartTypeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const chartType = this.dataset.chart;
            const chartId = this.closest('.chart-container').querySelector('canvas').id;
            changeChartType(chartId, chartType);
            
            // Update active button
            this.parentElement.querySelectorAll('.btn-chart').forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Export buttons
    const exportButtons = document.querySelectorAll('[id^="export"]');
    exportButtons.forEach(button => {
        button.addEventListener('click', function() {
            const format = this.dataset.format;
            exportData(format);
        });
    });

    // Print button
    const printButton = document.getElementById('printReport');
    if (printButton) {
        printButton.addEventListener('click', printReport);
    }

    // Modal functionality
    const modalCloseButtons = document.querySelectorAll('.modal .close');
    modalCloseButtons.forEach(button => {
        button.addEventListener('click', function() {
            this.closest('.modal').style.display = 'none';
        });
    });

    // Close modal when clicking outside
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    });

    // Custom report builder
    const saveReportButton = document.getElementById('saveReport');
    if (saveReportButton) {
        saveReportButton.addEventListener('click', function() {
            saveCustomReport();
        });
    }
}

function applyFilters() {
    // Implement filter logic based on current tab
    showNotification('Filters applied successfully', 'success');
}

function changeChartType(chartId, chartType) {
    const chart = charts[chartId.replace('Chart', '')];
    if (chart) {
        chart.config.type = chartType;
        chart.update();
    }
}

function saveCustomReport() {
    const reportName = document.getElementById('reportName').value;
    if (!reportName) {
        showNotification('Please enter a report name', 'warning');
        return;
    }

    // Simulate saving report
    showNotification(`Report "${reportName}" saved successfully!`, 'success');
    
    // Close modal and reset form
    document.getElementById('reportPreviewModal').style.display = 'none';
    document.getElementById('customReportBuilder').reset();
    
    // Reload saved reports
    loadSavedReports();
}

function runReport(reportId) {
    showNotification(`Running report ${reportId}...`, 'info');
    // Simulate report execution
    setTimeout(() => {
        showNotification('Report generated successfully!', 'success');
    }, 2000);
}

function editReport(reportId) {
    showNotification(`Editing report ${reportId}...`, 'info');
    // Switch to custom reports tab and load report data
    switchTab('custom');
}

function deleteReport(reportId) {
    if (confirm('Are you sure you want to delete this report?')) {
        showNotification(`Report ${reportId} deleted`, 'success');
        loadSavedReports();
    }
}