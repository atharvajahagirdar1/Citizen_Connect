// Sample data for demonstration
let issuesData = [
  {
    id: "ISS-001",
    title: "Pothole on Main Street",
    description: "Large pothole causing traffic issues near intersection",
    category: "infrastructure",
    priority: "high",
    status: "in-progress",
    location: "Main St & 5th Ave",
    reportedDate: "2024-01-15",
    assignedTo: "John Smith",
    reportedBy: "citizen123",
    image: "https://via.placeholder.com/50x50/FF6B6B/FFFFFF?text=POTHOLE",
    estimatedCompletion: "2024-01-20"
  },
  {
    id: "ISS-002",
    title: "Illegal Dumping in Park",
    description: "Large amount of trash dumped in Riverside Park",
    category: "sanitation",
    priority: "medium",
    status: "assigned",
    location: "Riverside Park, Area C",
    reportedDate: "2024-01-14",
    assignedTo: "Sarah Johnson",
    reportedBy: "concerned_citizen",
    image: "https://via.placeholder.com/50x50/4ECDC4/FFFFFF?text=DUMPING",
    estimatedCompletion: "2024-01-18"
  },
  {
    id: "ISS-003",
    title: "Broken Traffic Light",
    description: "Traffic light at intersection not working properly",
    category: "traffic",
    priority: "critical",
    status: "reported",
    location: "Oak Ave & Pine St",
    reportedDate: "2024-01-16",
    assignedTo: "Not Assigned",
    reportedBy: "driver_456",
    image: "https://via.placeholder.com/50x50/FFE66D/333333?text=TRAFFIC",
    estimatedCompletion: "2024-01-17"
  }
];

let workersData = [
  {
    id: "WRK-001",
    name: "John Smith",
    role: "Infrastructure Technician",
    status: "available",
    assignedIssues: 2,
    completedIssues: 15,
    rating: 4.5,
    phone: "+1 555-0123",
    email: "john.smith@city.gov",
    department: "Public Works"
  },
  {
    id: "WRK-002",
    name: "Sarah Johnson",
    role: "Sanitation Supervisor",
    status: "busy",
    assignedIssues: 3,
    completedIssues: 28,
    rating: 4.8,
    phone: "+1 555-0124",
    email: "sarah.johnson@city.gov",
    department: "Environmental Services"
  }
];

// DOM Elements
const navLinks = document.querySelectorAll('.nav-link');
const tabContents = document.querySelectorAll('.tab-content');
const modal = document.getElementById('issueModal');
const createModal = document.getElementById('createIssueModal');
const closeBtns = document.querySelectorAll('.close');

// Initialize the portal
document.addEventListener('DOMContentLoaded', function() {
  initializeNavigation();
  loadDashboard();
  loadIssues();
  loadWorkers();
  loadAnalytics();
  setupEventListeners();
});

// Navigation functionality
function initializeNavigation() {
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetTab = this.getAttribute('data-tab');
      switchTab(targetTab);
      
      // Update active nav link
      navLinks.forEach(nav => nav.classList.remove('active'));
      this.classList.add('active');
    });
  });
}

function switchTab(tabName) {
  tabContents.forEach(tab => {
    tab.classList.remove('active');
  });
  
  const targetTab = document.getElementById(tabName);
  if (targetTab) {
    targetTab.classList.add('active');
  }
}

// Dashboard functionality
function loadDashboard() {
  updateMetrics();
  loadRecentActivity();
}

function updateMetrics() {
  const criticalIssues = issuesData.filter(issue => issue.priority === 'critical').length;
  const pendingIssues = issuesData.filter(issue => issue.status === 'reported').length;
  const inProgressIssues = issuesData.filter(issue => issue.status === 'in-progress').length;
  const resolvedIssues = issuesData.filter(issue => issue.status === 'resolved').length;

  document.getElementById('criticalIssues').textContent = criticalIssues;
  document.getElementById('pendingIssues').textContent = pendingIssues;
  document.getElementById('inProgressIssues').textContent = inProgressIssues;
  document.getElementById('resolvedIssues').textContent = resolvedIssues;
}

function loadRecentActivity() {
  const activityList = document.getElementById('recentActivityList');
  const recentActivities = [
    {
      icon: 'fas fa-exclamation-triangle',
      title: 'New Critical Issue Reported',
      description: 'Broken traffic light at Oak Ave & Pine St',
      time: '2 hours ago',
      type: 'critical'
    },
    {
      icon: 'fas fa-user-check',
      title: 'Issue Assigned',
      description: 'Pothole repair assigned to John Smith',
      time: '4 hours ago',
      type: 'assignment'
    },
    {
      icon: 'fas fa-check-circle',
      title: 'Issue Resolved',
      description: 'Illegal dumping cleaned up in Riverside Park',
      time: '6 hours ago',
      type: 'resolved'
    }
  ];

  activityList.innerHTML = recentActivities.map(activity => `
    <div class="activity-item">
      <div class="activity-icon">
        <i class="${activity.icon}"></i>
      </div>
      <div class="activity-content">
        <div class="activity-title">${activity.title}</div>
        <div class="activity-description">${activity.description}</div>
        <div class="activity-time">${activity.time}</div>
      </div>
    </div>
  `).join('');
}

// Issues functionality
function loadIssues() {
  const issuesTable = document.getElementById('issuesTable');
  
  issuesTable.innerHTML = issuesData.map(issue => `
    <div class="issue-row">
      <div class="issue-content">
        <img src="${issue.image}" alt="Issue" class="issue-image">
        <div class="issue-details">
          <h4>${issue.title}</h4>
          <p>${issue.description}</p>
          <small><i class="fas fa-map-marker-alt"></i> ${issue.location}</small>
        </div>
      </div>
      <div class="category-badge category-${issue.category}">
        ${issue.category.replace('-', ' ')}
      </div>
      <div class="priority-badge priority-${issue.priority}">
        ${issue.priority}
      </div>
      <div class="status-badge status-${issue.status}">
        ${issue.status.replace('-', ' ')}
      </div>
      <div>
        <div class="assigned-to">${issue.assignedTo}</div>
        <small class="text-muted">${issue.estimatedCompletion}</small>
      </div>
      <div class="text-muted">${issue.reportedDate}</div>
      <div class="action-buttons">
        <button class="action-btn-sm btn-view" onclick="viewIssue('${issue.id}')" title="View Details">
          <i class="fas fa-eye"></i>
        </button>
        <button class="action-btn-sm btn-edit" onclick="editIssue('${issue.id}')" title="Edit Issue">
          <i class="fas fa-edit"></i>
        </button>
        <button class="action-btn-sm btn-assign" onclick="assignIssue('${issue.id}')" title="Assign Worker">
          <i class="fas fa-user-plus"></i>
        </button>
      </div>
    </div>
  `).join('');
}

function viewIssue(issueId) {
  const issue = issuesData.find(i => i.id === issueId);
  if (!issue) return;

  const modalContent = document.getElementById('modalIssueContent');
  modalContent.innerHTML = `
    <div class="issue-detail">
      <div class="issue-header">
        <h3>${issue.title}</h3>
        <div class="issue-meta">
          <span class="priority-badge priority-${issue.priority}">${issue.priority}</span>
          <span class="status-badge status-${issue.status}">${issue.status}</span>
        </div>
      </div>
      
      <div class="issue-body">
        <div class="issue-section">
          <h4><i class="fas fa-info-circle"></i> Description</h4>
          <p>${issue.description}</p>
        </div>
        
        <div class="issue-section">
          <h4><i class="fas fa-map-marker-alt"></i> Location</h4>
          <p>${issue.location}</p>
        </div>
        
        <div class="issue-section">
          <h4><i class="fas fa-user"></i> Reported By</h4>
          <p>${issue.reportedBy} on ${issue.reportedDate}</p>
        </div>
        
        <div class="issue-section">
          <h4><i class="fas fa-user-cog"></i> Assigned To</h4>
          <p>${issue.assignedTo}</p>
          <small>Estimated completion: ${issue.estimatedCompletion}</small>
        </div>
        
        <div class="issue-section">
          <h4><i class="fas fa-image"></i> Photo Evidence</h4>
          <img src="${issue.image}" alt="Issue photo" style="max-width: 100%; border-radius: 8px;">
        </div>
      </div>
      
      <div class="issue-actions">
        <button class="btn btn-primary" onclick="updateIssueStatus('${issue.id}', 'in-progress')">
          <i class="fas fa-play"></i> Start Work
        </button>
        <button class="btn btn-success" onclick="updateIssueStatus('${issue.id}', 'resolved')">
          <i class="fas fa-check"></i> Mark Resolved
        </button>
        <button class="btn btn-secondary" onclick="assignIssue('${issue.id}')">
          <i class="fas fa-user-plus"></i> Reassign
        </button>
      </div>
    </div>
  `;

  modal.style.display = 'block';
}

function updateIssueStatus(issueId, newStatus) {
  const issue = issuesData.find(i => i.id === issueId);
  if (issue) {
    issue.status = newStatus;
    loadIssues();
    closeModal();
    showNotification(`Issue ${issueId} status updated to ${newStatus}`, 'success');
  }
}

function editIssue(issueId) {
  // Implementation for editing issue
  showNotification('Edit functionality coming soon!', 'info');
}

function assignIssue(issueId) {
  const issue = issuesData.find(i => i.id === issueId);
  if (!issue) return;

  const availableWorkers = workersData.filter(w => w.status === 'available');
  
  if (availableWorkers.length === 0) {
    showNotification('No available workers to assign', 'warning');
    return;
  }

  const workerSelect = availableWorkers.map(worker => 
    `<option value="${worker.id}">${worker.name} - ${worker.role}</option>`
  ).join('');

  const modalContent = document.getElementById('modalIssueContent');
  modalContent.innerHTML = `
    <div class="assign-issue">
      <h3>Assign Issue: ${issue.title}</h3>
      <form id="assignForm">
        <div class="form-group">
          <label>Select Worker:</label>
          <select id="workerSelect" class="form-control" required>
            <option value="">Choose a worker...</option>
            ${workerSelect}
          </select>
        </div>
        <div class="form-group">
          <label>Priority Level:</label>
          <select id="prioritySelect" class="form-control">
            <option value="critical" ${issue.priority === 'critical' ? 'selected' : ''}>Critical</option>
            <option value="high" ${issue.priority === 'high' ? 'selected' : ''}>High</option>
            <option value="medium" ${issue.priority === 'medium' ? 'selected' : ''}>Medium</option>
            <option value="low" ${issue.priority === 'low' ? 'selected' : ''}>Low</option>
          </select>
        </div>
        <div class="form-group">
          <label>Estimated Completion Date:</label>
          <input type="date" id="completionDate" class="form-control" required>
        </div>
        <div class="form-group">
          <label>Notes:</label>
          <textarea id="assignmentNotes" class="form-control" rows="3" placeholder="Add any special instructions or notes..."></textarea>
        </div>
        <div class="form-actions">
          <button type="submit" class="btn btn-primary">
            <i class="fas fa-user-plus"></i> Assign Issue
          </button>
          <button type="button" class="btn btn-secondary" onclick="closeModal()">
            Cancel
          </button>
        </div>
      </form>
    </div>
  `;

  modal.style.display = 'block';

  // Handle form submission
  document.getElementById('assignForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const workerId = document.getElementById('workerSelect').value;
    const priority = document.getElementById('prioritySelect').value;
    const completionDate = document.getElementById('completionDate').value;
    const notes = document.getElementById('assignmentNotes').value;

    if (!workerId || !completionDate) {
      showNotification('Please fill in all required fields', 'warning');
      return;
    }

    const worker = workersData.find(w => w.id === workerId);
    if (worker) {
      issue.assignedTo = worker.name;
      issue.status = 'assigned';
      issue.priority = priority;
      issue.estimatedCompletion = completionDate;
      
      loadIssues();
      closeModal();
      showNotification(`Issue assigned to ${worker.name} successfully!`, 'success');
    }
  });
}

// Workers functionality
function loadWorkers() {
  const workersTable = document.getElementById('workersTable');
  
  workersTable.innerHTML = workersData.map(worker => `
    <div class="worker-card">
      <div class="worker-header">
        <div class="worker-info">
          <h4>${worker.name}</h4>
          <p>${worker.role}</p>
          <small>${worker.department}</small>
        </div>
        <div class="worker-status status-${worker.status}">
          <i class="fas fa-circle"></i>
          ${worker.status}
        </div>
      </div>
      <div class="worker-stats">
        <div class="stat">
          <span class="stat-number">${worker.assignedIssues}</span>
          <span class="stat-label">Assigned</span>
        </div>
        <div class="stat">
          <span class="stat-number">${worker.completedIssues}</span>
          <span class="stat-label">Completed</span>
        </div>
        <div class="stat">
          <span class="stat-number">${worker.rating}</span>
          <span class="stat-label">Rating</span>
        </div>
      </div>
      <div class="worker-contact">
        <div class="contact-item">
          <i class="fas fa-phone"></i>
          <span>${worker.phone}</span>
        </div>
        <div class="contact-item">
          <i class="fas fa-envelope"></i>
          <span>${worker.email}</span>
        </div>
      </div>
      <div class="worker-actions">
        <button class="btn btn-primary btn-sm" onclick="assignWork('${worker.id}')">
          <i class="fas fa-tasks"></i> Assign Work
        </button>
        <button class="btn btn-secondary btn-sm" onclick="viewWorkerProfile('${worker.id}')">
          <i class="fas fa-user"></i> Profile
        </button>
      </div>
    </div>
  `).join('');
}

// Analytics functionality
function loadAnalytics() {
  // This would typically load charts and analytics data
  // For now, we'll create placeholder charts
  createCharts();
}

function createCharts() {
  // Category Chart
  const categoryCtx = document.getElementById('categoryChart');
  if (categoryCtx) {
    new Chart(categoryCtx, {
      type: 'doughnut',
      data: {
        labels: ['Infrastructure', 'Sanitation', 'Traffic', 'Environment', 'Public Safety'],
        datasets: [{
          data: [35, 25, 20, 15, 5],
          backgroundColor: ['#1565d8', '#28a745', '#ffc107', '#17a2b8', '#dc3545']
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom'
          }
        }
      }
    });
  }

  // Resolution Time Chart
  const resolutionCtx = document.getElementById('resolutionChart');
  if (resolutionCtx) {
    new Chart(resolutionCtx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'Average Resolution Time (days)',
          data: [5.2, 4.8, 4.1, 3.8, 3.5, 3.2],
          borderColor: '#28a745',
          backgroundColor: 'rgba(40, 167, 69, 0.1)',
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  // Volume Chart
  const volumeCtx = document.getElementById('volumeChart');
  if (volumeCtx) {
    new Chart(volumeCtx, {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'Issues Reported',
          data: [45, 52, 38, 41, 35, 29],
          backgroundColor: '#1565d8'
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  // Performance Chart
  const performanceCtx = document.getElementById('performanceChart');
  if (performanceCtx) {
    new Chart(performanceCtx, {
      type: 'radar',
      data: {
        labels: ['Response Time', 'Resolution Rate', 'Quality Score', 'Citizen Satisfaction', 'Efficiency'],
        datasets: [{
          label: 'Department Performance',
          data: [85, 87, 92, 88, 90],
          borderColor: '#1565d8',
          backgroundColor: 'rgba(21, 101, 216, 0.2)'
        }]
      },
      options: {
        responsive: true,
        scales: {
          r: {
            beginAtZero: true,
            max: 100
          }
        }
      }
    });
  }
}

// Modal functionality
function setupEventListeners() {
  closeBtns.forEach(btn => {
    btn.addEventListener('click', closeModal);
  });

  window.addEventListener('click', function(event) {
    if (event.target === modal) {
      closeModal();
    }
    if (event.target === createModal) {
      closeCreateIssueModal();
    }
  });

  // Form submissions
  document.getElementById('createIssueForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    createNewIssue();
  });
}

function closeModal() {
  modal.style.display = 'none';
}

function closeCreateIssueModal() {
  createModal.style.display = 'none';
}

function showCreateIssueModal() {
  createModal.style.display = 'block';
}

function createNewIssue() {
  const formData = new FormData(document.getElementById('createIssueForm'));
  
  const newIssue = {
    id: `ISS-${String(issuesData.length + 1).padStart(3, '0')}`,
    title: document.getElementById('issueTitle').value,
    description: document.getElementById('issueDescription').value,
    category: document.getElementById('issueCategory').value,
    priority: document.getElementById('issuePriority').value,
    status: 'reported',
    location: document.getElementById('issueLocation').value,
    reportedDate: new Date().toISOString().split('T')[0],
    assignedTo: 'Not Assigned',
    reportedBy: 'admin',
    image: 'https://via.placeholder.com/50x50/6c757d/FFFFFF?text=NEW',
    estimatedCompletion: 'Not Set'
  };

  issuesData.unshift(newIssue);
  loadIssues();
  closeCreateIssueModal();
  showNotification('New issue created successfully!', 'success');
  
  // Reset form
  document.getElementById('createIssueForm').reset();
}

// Utility functions
function showNotification(message, type = 'info') {
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
      <span>${message}</span>
    </div>
    <button class="notification-close" onclick="this.parentElement.remove()">
      <i class="fas fa-times"></i>
    </button>
  `;

  // Add styles
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : type === 'warning' ? '#ffc107' : '#17a2b8'};
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    z-index: 3000;
    display: flex;
    align-items: center;
    gap: 1rem;
    min-width: 300px;
    animation: slideInRight 0.3s ease-out;
  `;

  document.body.appendChild(notification);

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentElement) {
      notification.remove();
    }
  }, 5000);
}

// Quick action functions
function exportReports() {
  showNotification('Reports export functionality coming soon!', 'info');
}

function sendNotification() {
  showNotification('Notification system coming soon!', 'info');
}

function bulkAssign() {
  showNotification('Bulk assignment functionality coming soon!', 'info');
}

function applyFilters() {
  const searchTerm = document.getElementById('issueSearch').value.toLowerCase();
  const statusFilter = document.getElementById('statusFilter').value;
  const priorityFilter = document.getElementById('priorityFilter').value;
  const categoryFilter = document.getElementById('categoryFilter').value;

  const filteredIssues = issuesData.filter(issue => {
    const matchesSearch = !searchTerm || 
      issue.title.toLowerCase().includes(searchTerm) ||
      issue.description.toLowerCase().includes(searchTerm) ||
      issue.location.toLowerCase().includes(searchTerm);
    
    const matchesStatus = !statusFilter || issue.status === statusFilter;
    const matchesPriority = !priorityFilter || issue.priority === priorityFilter;
    const matchesCategory = !categoryFilter || issue.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesPriority && matchesCategory;
  });

  // Update the displayed issues
  const issuesTable = document.getElementById('issuesTable');
  issuesTable.innerHTML = filteredIssues.map(issue => `
    <div class="issue-row">
      <div class="issue-content">
        <img src="${issue.image}" alt="Issue" class="issue-image">
        <div class="issue-details">
          <h4>${issue.title}</h4>
          <p>${issue.description}</p>
          <small><i class="fas fa-map-marker-alt"></i> ${issue.location}</small>
        </div>
      </div>
      <div class="category-badge category-${issue.category}">
        ${issue.category.replace('-', ' ')}
      </div>
      <div class="priority-badge priority-${issue.priority}">
        ${issue.priority}
      </div>
      <div class="status-badge status-${issue.status}">
        ${issue.status.replace('-', ' ')}
      </div>
      <div>
        <div class="assigned-to">${issue.assignedTo}</div>
        <small class="text-muted">${issue.estimatedCompletion}</small>
      </div>
      <div class="text-muted">${issue.reportedDate}</div>
      <div class="action-buttons">
        <button class="action-btn-sm btn-view" onclick="viewIssue('${issue.id}')" title="View Details">
          <i class="fas fa-eye"></i>
        </button>
        <button class="action-btn-sm btn-edit" onclick="editIssue('${issue.id}')" title="Edit Issue">
          <i class="fas fa-edit"></i>
        </button>
        <button class="action-btn-sm btn-assign" onclick="assignIssue('${issue.id}')" title="Assign Worker">
          <i class="fas fa-user-plus"></i>
        </button>
      </div>
    </div>
  `).join('');

  showNotification(`Found ${filteredIssues.length} matching issues`, 'info');
}

// Add CSS for additional elements
const additionalStyles = `
  .worker-card {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    padding: 1.5rem;
    border-radius: 16px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    margin-bottom: 1rem;
    transition: all 0.3s ease;
  }

  .worker-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 16px 48px rgba(0, 0, 0, 0.15);
  }

  .worker-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1rem;
  }

  .worker-info h4 {
    margin: 0 0 0.25rem 0;
    color: #333;
    font-size: 1.1rem;
  }

  .worker-info p {
    margin: 0;
    color: #666;
    font-size: 0.9rem;
  }

  .worker-info small {
    color: #999;
    font-size: 0.8rem;
  }

  .worker-status {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.25rem 0.75rem;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 600;
  }

  .worker-status.status-available {
    background: rgba(40, 167, 69, 0.1);
    color: #28a745;
  }

  .worker-status.status-busy {
    background: rgba(255, 193, 7, 0.1);
    color: #856404;
  }

  .worker-status.status-offline {
    background: rgba(220, 53, 69, 0.1);
    color: #dc3545;
  }

  .worker-stats {
    display: flex;
    gap: 2rem;
    margin: 1rem 0;
  }

  .stat {
    text-align: center;
  }

  .stat-number {
    display: block;
    font-size: 1.5rem;
    font-weight: 700;
    color: #1565d8;
  }

  .stat-label {
    font-size: 0.8rem;
    color: #666;
  }

  .worker-contact {
    margin: 1rem 0;
  }

  .contact-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
    color: #666;
  }

  .worker-actions {
    display: flex;
    gap: 0.5rem;
  }

  .btn-sm {
    padding: 0.5rem 1rem;
    font-size: 0.8rem;
  }

  .charts-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 2rem;
    margin-bottom: 2rem;
  }

  .chart-card {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    padding: 2rem;
    border-radius: 16px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  .chart-card h3 {
    margin-bottom: 1rem;
    color: #333;
    font-size: 1.2rem;
  }

  .stats-section {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    margin-bottom: 2rem;
  }

  .stat-card {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    padding: 2rem;
    border-radius: 16px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    text-align: center;
  }

  .stat-card h4 {
    margin-bottom: 1rem;
    color: #666;
    font-size: 1rem;
  }

  .stat-value {
    font-size: 2rem;
    font-weight: 700;
    color: #1565d8;
    margin-bottom: 0.5rem;
  }

  .stat-trend {
    font-size: 0.9rem;
    color: #666;
  }

  .stat-trend.positive {
    color: #28a745;
  }

  .stat-trend.negative {
    color: #dc3545;
  }

  .workers-controls {
    display: flex;
    gap: 1rem;
    margin-bottom: 2rem;
  }

  .workers-table {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .settings-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 2rem;
  }

  .settings-card {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    padding: 2rem;
    border-radius: 16px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  .settings-card h3 {
    margin-bottom: 1.5rem;
    color: #333;
    font-size: 1.2rem;
  }

  .setting-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }

  .switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
  }

  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: .4s;
    border-radius: 34px;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: .4s;
    border-radius: 50%;
  }

  input:checked + .slider {
    background-color: #1565d8;
  }

  input:checked + .slider:before {
    transform: translateX(26px);
  }

  .text-muted {
    color: #6c757d !important;
  }

  .issue-detail {
    max-height: 70vh;
    overflow-y: auto;
  }

  .issue-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #eee;
  }

  .issue-meta {
    display: flex;
    gap: 0.5rem;
  }

  .issue-section {
    margin-bottom: 2rem;
  }

  .issue-section h4 {
    margin-bottom: 0.5rem;
    color: #333;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .issue-actions {
    display: flex;
    gap: 1rem;
    justify-content: flex-end;
    margin-top: 2rem;
    padding-top: 1rem;
    border-top: 1px solid #eee;
  }

  .assign-issue {
    max-width: 500px;
    margin: 0 auto;
  }

  .form-control {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 0.875rem;
    transition: all 0.3s ease;
  }

  .form-control:focus {
    outline: none;
    border-color: #1565d8;
    box-shadow: 0 0 0 3px rgba(21, 101, 216, 0.1);
  }

  textarea.form-control {
    resize: vertical;
    min-height: 80px;
  }

  @keyframes slideInRight {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);