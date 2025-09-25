// Sample data for demonstration
let notificationRules = [
    {
        id: "RULE-001",
        name: "Critical Issue Alert",
        description: "Send immediate notification when a critical issue is reported",
        category: "issue-report",
        priority: "critical",
        status: "active",
        conditions: [
            { field: "priority", operator: "equals", value: "critical" }
        ],
        recipients: {
            reporter: true,
            assignee: true,
            supervisor: true,
            admin: true
        },
        template: "critical-issue-alert",
        channel: "all",
        delay: 0,
        enableRetry: true,
        maxRetries: 3,
        retryDelay: 15,
        createdDate: "2024-01-15",
        lastModified: "2024-01-15",
        notificationsSent: 45,
        successRate: 98
    },
    {
        id: "RULE-002",
        name: "Status Change Update",
        description: "Notify stakeholders when issue status changes",
        category: "status-update",
        priority: "medium",
        status: "active",
        conditions: [
            { field: "status", operator: "not-equals", value: "reported" }
        ],
        recipients: {
            reporter: true,
            assignee: true,
            supervisor: false,
            admin: false
        },
        template: "status-update",
        channel: "email",
        delay: 5,
        enableRetry: true,
        maxRetries: 2,
        retryDelay: 30,
        createdDate: "2024-01-10",
        lastModified: "2024-01-12",
        notificationsSent: 128,
        successRate: 95
    },
    {
        id: "RULE-003",
        name: "Assignment Notification",
        description: "Notify when issue is assigned to a worker",
        category: "assignment",
        priority: "high",
        status: "active",
        conditions: [
            { field: "assigned_to", operator: "not-equals", value: "Not Assigned" }
        ],
        recipients: {
            reporter: false,
            assignee: true,
            supervisor: true,
            admin: false
        },
        template: "assignment-notification",
        channel: "email",
        delay: 0,
        enableRetry: true,
        maxRetries: 3,
        retryDelay: 20,
        createdDate: "2024-01-08",
        lastModified: "2024-01-08",
        notificationsSent: 87,
        successRate: 97
    },
    {
        id: "RULE-004",
        name: "Overdue Reminder",
        description: "Send reminders for overdue issues",
        category: "reminder",
        priority: "medium",
        status: "inactive",
        conditions: [
            { field: "estimated_completion", operator: "less-than", value: "today" },
            { field: "status", operator: "not-equals", value: "resolved" }
        ],
        recipients: {
            reporter: true,
            assignee: true,
            supervisor: true,
            admin: true
        },
        template: "overdue-reminder",
        channel: "email",
        delay: 0,
        enableRetry: true,
        maxRetries: 2,
        retryDelay: 60,
        createdDate: "2024-01-05",
        lastModified: "2024-01-05",
        notificationsSent: 0,
        successRate: 0
    }
];

let messageTemplates = [
    {
        id: "TMPL-001",
        name: "Critical Issue Alert",
        subject: "🚨 CRITICAL: Issue {issue_id} - {issue_title}",
        content: "A critical issue has been reported:\n\nIssue ID: {issue_id}\nTitle: {issue_title}\nLocation: {issue_location}\nPriority: {issue_priority}\nStatus: {issue_status}\n\nDescription: {issue_description}\n\nThis issue requires immediate attention. Please review and take appropriate action.\n\nBest regards,\nCivic Issue Management System",
        variables: ["issue_id", "issue_title", "issue_location", "issue_priority", "issue_status", "issue_description"],
        createdDate: "2024-01-01"
    },
    {
        id: "TMPL-002",
        name: "Status Update",
        subject: "📋 Issue {issue_id} Status Updated",
        content: "The status of issue {issue_id} has been updated:\n\nIssue: {issue_title}\nNew Status: {issue_status}\nLocation: {issue_location}\nAssigned to: {assigned_worker}\n\nYou can view the full details in the system.\n\nBest regards,\nCivic Issue Management System",
        variables: ["issue_id", "issue_title", "issue_status", "issue_location", "assigned_worker"],
        createdDate: "2024-01-01"
    },
    {
        id: "TMPL-003",
        name: "Assignment Notification",
        subject: "🎯 New Issue Assignment: {issue_title}",
        content: "You have been assigned a new issue:\n\nIssue ID: {issue_id}\nTitle: {issue_title}\nPriority: {issue_priority}\nLocation: {issue_location}\nReporter: {reporter_name}\n\nPlease review this issue and take appropriate action. The estimated completion date is {completion_date}.\n\nBest regards,\nCivic Issue Management System",
        variables: ["issue_id", "issue_title", "issue_priority", "issue_location", "reporter_name", "completion_date"],
        createdDate: "2024-01-01"
    },
    {
        id: "TMPL-004",
        name: "Overdue Reminder",
        subject: "⏰ Overdue Issue Reminder: {issue_title}",
        content: "This is a reminder that issue {issue_id} is overdue:\n\nIssue: {issue_title}\nLocation: {issue_location}\nOriginal Due Date: {completion_date}\nCurrent Status: {issue_status}\nAssigned to: {assigned_worker}\n\nPlease take immediate action to resolve this issue.\n\nBest regards,\nCivic Issue Management System",
        variables: ["issue_id", "issue_title", "issue_location", "completion_date", "issue_status", "assigned_worker"],
        createdDate: "2024-01-01"
    }
];

let notificationHistory = [
    {
        id: "HIST-001",
        ruleId: "RULE-001",
        ruleName: "Critical Issue Alert",
        issueId: "ISS-003",
        timestamp: "2024-01-16T14:30:00Z",
        status: "success",
        recipients: ["citizen@email.com", "john.smith@city.gov", "supervisor@city.gov"],
        channels: ["email", "sms"],
        deliveryTime: "2.3s",
        retryCount: 0
    },
    {
        id: "HIST-002",
        ruleId: "RULE-002",
        ruleName: "Status Change Update",
        issueId: "ISS-001",
        timestamp: "2024-01-16T13:45:00Z",
        status: "success",
        recipients: ["citizen@email.com", "john.smith@city.gov"],
        channels: ["email"],
        deliveryTime: "1.8s",
        retryCount: 0
    },
    {
        id: "HIST-003",
        ruleId: "RULE-003",
        ruleName: "Assignment Notification",
        issueId: "ISS-002",
        timestamp: "2024-01-16T12:15:00Z",
        status: "failed",
        recipients: ["sarah.johnson@city.gov"],
        channels: ["email"],
        deliveryTime: "30.2s",
        retryCount: 3,
        error: "Email server timeout"
    },
    {
        id: "HIST-004",
        ruleId: "RULE-001",
        ruleName: "Critical Issue Alert",
        issueId: "ISS-004",
        timestamp: "2024-01-16T11:00:00Z",
        status: "success",
        recipients: ["citizen@email.com", "worker@city.gov", "supervisor@city.gov"],
        channels: ["email", "sms", "push"],
        deliveryTime: "3.1s",
        retryCount: 1
    }
];

// Analytics data
let analyticsData = {
    volumeByDay: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        data: [45, 52, 38, 67, 41, 29, 33]
    },
    successRateByCategory: {
        labels: ['Issue Report', 'Status Update', 'Assignment', 'Reminder', 'Escalation'],
        data: [98, 95, 97, 89, 92]
    },
    responseTime: {
        labels: ['<1s', '1-3s', '3-5s', '5-10s', '>10s'],
        data: [45, 32, 15, 6, 2]
    },
    userEngagement: {
        labels: ['Email Opened', 'SMS Read', 'Push Clicked', 'In-App Viewed'],
        data: [78, 65, 82, 91]
    }
};

// DOM Elements
let charts = {};

// Initialize the system
document.addEventListener('DOMContentLoaded', function() {
    loadDashboard();
    loadRules();
    loadTemplates();
    loadHistory();
    loadAnalytics();
    setupEventListeners();
});

// Dashboard functionality
function loadDashboard() {
    updateMetrics();
}

function updateMetrics() {
    const activeRules = notificationRules.filter(rule => rule.status === 'active').length;
    const totalNotifications = notificationHistory.length;
    const successfulNotifications = notificationHistory.filter(h => h.status === 'success').length;
    const successRate = totalNotifications > 0 ? Math.round((successfulNotifications / totalNotifications) * 100) : 0;
    const failedNotifications = notificationHistory.filter(h => h.status === 'failed').length;

    document.getElementById('activeRulesCount').textContent = activeRules;
    document.getElementById('notificationsSentCount').textContent = totalNotifications.toLocaleString();
    document.getElementById('successRate').textContent = successRate + '%';
    document.getElementById('failedAttemptsCount').textContent = failedNotifications;
}

// Rules management
function loadRules() {
    const container = document.getElementById('rulesContainer');
    container.innerHTML = notificationRules.map(rule => createRuleCard(rule)).join('');
}

function createRuleCard(rule) {
    const statusClass = rule.status === 'active' ? 'active' : rule.status === 'inactive' ? 'inactive' : 'draft';
    const priorityClass = `priority-${rule.priority}`;
    const categoryClass = `category-${rule.category}`;

    return `
        <div class="rule-card ${statusClass}" data-rule-id="${rule.id}">
            <div class="rule-header">
                <div class="rule-title">
                    <h3>${rule.name}</h3>
                    <p>${rule.description}</p>
                </div>
                <div class="rule-status ${statusClass}">
                    <i class="fas fa-circle"></i>
                    ${rule.status}
                </div>
            </div>
            
            <div class="rule-details">
                <div class="rule-detail">
                    <i class="fas fa-tag"></i>
                    <span class="category-badge ${categoryClass}">${rule.category.replace('-', ' ')}</span>
                </div>
                <div class="rule-detail">
                    <i class="fas fa-exclamation-circle"></i>
                    <span class="priority-badge ${priorityClass}">${rule.priority}</span>
                </div>
                <div class="rule-detail">
                    <i class="fas fa-paper-plane"></i>
                    <span>${rule.notificationsSent} sent</span>
                </div>
                <div class="rule-detail">
                    <i class="fas fa-percentage"></i>
                    <span>${rule.successRate}% success</span>
                </div>
                <div class="rule-detail">
                    <i class="fas fa-clock"></i>
                    <span>Delay: ${rule.delay}min</span>
                </div>
                <div class="rule-detail">
                    <i class="fas fa-calendar"></i>
                    <span>${formatDate(rule.createdDate)}</span>
                </div>
            </div>
            
            <div class="rule-actions">
                <button class="btn-icon" onclick="toggleRuleStatus('${rule.id}')" title="${rule.status === 'active' ? 'Deactivate' : 'Activate'}">
                    <i class="fas fa-${rule.status === 'active' ? 'pause' : 'play'}"></i>
                </button>
                <button class="btn-icon" onclick="testRule('${rule.id}')" title="Test Rule">
                    <i class="fas fa-bug"></i>
                </button>
                <button class="btn-icon" onclick="editRule('${rule.id}')" title="Edit Rule">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn-icon" onclick="duplicateRule('${rule.id}')" title="Duplicate Rule">
                    <i class="fas fa-copy"></i>
                </button>
                <button class="btn-icon" onclick="deleteRule('${rule.id}')" title="Delete Rule">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `;
}

function toggleRuleStatus(ruleId) {
    const rule = notificationRules.find(r => r.id === ruleId);
    if (rule) {
        rule.status = rule.status === 'active' ? 'inactive' : 'active';
        rule.lastModified = new Date().toISOString().split('T')[0];
        loadRules();
        showNotification(`Rule ${rule.status === 'active' ? 'activated' : 'deactivated'} successfully`, 'success');
        updateMetrics();
    }
}

function testRule(ruleId) {
    const rule = notificationRules.find(r => r.id === ruleId);
    if (rule) {
        document.getElementById('testResults').style.display = 'none';
        document.getElementById('testModal').style.display = 'block';
        document.getElementById('testModal').dataset.ruleId = ruleId;
    }
}

function editRule(ruleId) {
    const rule = notificationRules.find(r => r.id === ruleId);
    if (rule) {
        populateRuleForm(rule);
        document.getElementById('modalTitle').textContent = 'Edit Notification Rule';
        document.getElementById('ruleModal').style.display = 'block';
    }
}

function duplicateRule(ruleId) {
    const rule = notificationRules.find(r => r.id === ruleId);
    if (rule) {
        const newRule = {
            ...rule,
            id: `RULE-${String(notificationRules.length + 1).padStart(3, '0')}`,
            name: `${rule.name} (Copy)`,
            status: 'draft',
            createdDate: new Date().toISOString().split('T')[0],
            lastModified: new Date().toISOString().split('T')[0],
            notificationsSent: 0,
            successRate: 0
        };
        notificationRules.push(newRule);
        loadRules();
        showNotification('Rule duplicated successfully', 'success');
    }
}

function deleteRule(ruleId) {
    if (confirm('Are you sure you want to delete this rule? This action cannot be undone.')) {
        const index = notificationRules.findIndex(r => r.id === ruleId);
        if (index > -1) {
            notificationRules.splice(index, 1);
            loadRules();
            showNotification('Rule deleted successfully', 'success');
            updateMetrics();
        }
    }
}

// Templates management
function loadTemplates() {
    const container = document.getElementById('templatesGrid');
    container.innerHTML = messageTemplates.map(template => createTemplateCard(template)).join('');
}

function createTemplateCard(template) {
    return `
        <div class="template-card" data-template-id="${template.id}">
            <div class="template-header">
                <div class="template-name">
                    <h4>${template.name}</h4>
                    <small>Created: ${formatDate(template.createdDate)}</small>
                </div>
                <div class="template-actions">
                    <button class="btn-icon" onclick="editTemplate('${template.id}')" title="Edit Template">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-icon" onclick="deleteTemplate('${template.id}')" title="Delete Template">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
            
            <div class="template-preview">
                <strong>Subject:</strong> ${template.subject}<br>
                <strong>Content:</strong> ${template.content.substring(0, 100)}${template.content.length > 100 ? '...' : ''}
            </div>
            
            <div class="template-variables">
                ${template.variables.map(variable => `<span class="variable-tag">{${variable}}</span>`).join('')}
            </div>
        </div>
    `;
}

function editTemplate(templateId) {
    const template = messageTemplates.find(t => t.id === templateId);
    if (template) {
        document.getElementById('templateName').value = template.name;
        document.getElementById('templateSubject').value = template.subject;
        document.getElementById('templateContent').value = template.content;
        document.getElementById('templateModal').style.display = 'block';
    }
}

function deleteTemplate(templateId) {
    if (confirm('Are you sure you want to delete this template? This may affect existing rules.')) {
        const index = messageTemplates.findIndex(t => t.id === templateId);
        if (index > -1) {
            messageTemplates.splice(index, 1);
            loadTemplates();
            showNotification('Template deleted successfully', 'success');
        }
    }
}

function insertVariable(variable) {
    const contentField = document.getElementById('templateContent');
    const cursorPos = contentField.selectionStart;
    const textBefore = contentField.value.substring(0, cursorPos);
    const textAfter = contentField.value.substring(cursorPos);
    
    contentField.value = textBefore + variable + textAfter;
    contentField.focus();
    contentField.setSelectionRange(cursorPos + variable.length, cursorPos + variable.length);
}

// History management
function loadHistory() {
    const container = document.getElementById('historyContainer');
    container.innerHTML = notificationHistory.map(item => createHistoryItem(item)).join('');
}

function createHistoryItem(item) {
    const statusClass = item.status === 'success' ? 'success' : 'failed';
    const statusIcon = item.status === 'success' ? 'check-circle' : 'exclamation-triangle';
    const statusColor = item.status === 'success' ? '#28a745' : '#dc3545';

    return `
        <div class="history-item ${statusClass}">
            <div class="history-header">
                <div class="history-title">
                    <i class="fas fa-${statusIcon}" style="color: ${statusColor}"></i>
                    ${item.ruleName}
                </div>
                <div class="history-time">${formatTimeAgo(item.timestamp)}</div>
            </div>
            
            <div class="history-details">
                <div><strong>Issue:</strong> ${item.issueId}</div>
                <div><strong>Channels:</strong> ${item.channels.join(', ')}</div>
                <div><strong>Delivery Time:</strong> ${item.deliveryTime}</div>
                ${item.retryCount > 0 ? `<div><strong>Retries:</strong> ${item.retryCount}</div>` : ''}
                ${item.error ? `<div><strong>Error:</strong> ${item.error}</div>` : ''}
            </div>
            
            <div class="history-recipients">
                <strong>Recipients:</strong> ${item.recipients.join(', ')}
            </div>
        </div>
    `;
}

function clearHistory() {
    if (confirm('Are you sure you want to clear all notification history? This action cannot be undone.')) {
        notificationHistory = [];
        loadHistory();
        updateMetrics();
        showNotification('History cleared successfully', 'success');
    }
}

// Analytics
function loadAnalytics() {
    createCharts();
}

function createCharts() {
    // Volume Chart
    const volumeCtx = document.getElementById('volumeChart');
    if (volumeCtx) {
        charts.volume = new Chart(volumeCtx, {
            type: 'line',
            data: {
                labels: analyticsData.volumeByDay.labels,
                datasets: [{
                    label: 'Notifications Sent',
                    data: analyticsData.volumeByDay.data,
                    borderColor: '#1565d8',
                    backgroundColor: 'rgba(21, 101, 216, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false
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

    // Success Rate Chart
    const successCtx = document.getElementById('successRateChart');
    if (successCtx) {
        charts.successRate = new Chart(successCtx, {
            type: 'bar',
            data: {
                labels: analyticsData.successRateByCategory.labels,
                datasets: [{
                    label: 'Success Rate (%)',
                    data: analyticsData.successRateByCategory.data,
                    backgroundColor: [
                        'rgba(21, 101, 216, 0.8)',
                        'rgba(40, 167, 69, 0.8)',
                        'rgba(255, 193, 7, 0.8)',
                        'rgba(108, 117, 125, 0.8)',
                        'rgba(220, 53, 69, 0.8)'
                    ]
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100
                    }
                }
            }
        });
    }

    // Response Time Chart
    const responseCtx = document.getElementById('responseTimeChart');
    if (responseCtx) {
        charts.responseTime = new Chart(responseCtx, {
            type: 'doughnut',
            data: {
                labels: analyticsData.responseTime.labels,
                datasets: [{
                    data: analyticsData.responseTime.data,
                    backgroundColor: [
                        'rgba(40, 167, 69, 0.8)',
                        'rgba(21, 101, 216, 0.8)',
                        'rgba(255, 193, 7, 0.8)',
                        'rgba(255, 152, 0, 0.8)',
                        'rgba(220, 53, 69, 0.8)'
                    ]
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

    // Engagement Chart
    const engagementCtx = document.getElementById('engagementChart');
    if (engagementCtx) {
        charts.engagement = new Chart(engagementCtx, {
            type: 'radar',
            data: {
                labels: analyticsData.userEngagement.labels,
                datasets: [{
                    label: 'Engagement Rate (%)',
                    data: analyticsData.userEngagement.data,
                    borderColor: '#1565d8',
                    backgroundColor: 'rgba(21, 101, 216, 0.2)',
                    pointBackgroundColor: '#1565d8'
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

function updateAnalytics() {
    // This would typically fetch new data based on selected timeframe
    showNotification('Analytics updated for selected timeframe', 'info');
}

// Modal functionality
function setupEventListeners() {
    // Form submissions
    document.getElementById('ruleForm').addEventListener('submit', function(e) {
        e.preventDefault();
        saveRule();
    });

    document.getElementById('templateForm').addEventListener('submit', function(e) {
        e.preventDefault();
        saveTemplate();
    });

    // Modal close buttons
    document.querySelectorAll('.close-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const modal = this.closest('.modal');
            modal.style.display = 'none';
        });
    });

    // Close modals when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = 'none';
        }
    });

    // Filter controls
    document.getElementById('ruleSearch').addEventListener('input', filterRules);
    document.getElementById('statusFilter').addEventListener('change', filterRules);
    document.getElementById('categoryFilter').addEventListener('change', filterRules);

    // Date filters
    document.getElementById('startDate').addEventListener('change', filterHistory);
    document.getElementById('endDate').addEventListener('change', filterHistory);
}

function showCreateRuleModal() {
    document.getElementById('ruleForm').reset();
    document.getElementById('modalTitle').textContent = 'Create Notification Rule';
    document.getElementById('ruleModal').style.display = 'block';
}

function showTemplateModal() {
    document.getElementById('templateForm').reset();
    document.getElementById('templateModal').style.display = 'block';
}

function closeRuleModal() {
    document.getElementById('ruleModal').style.display = 'none';
}

function closeTemplateModal() {
    document.getElementById('templateModal').style.display = 'none';
}

function closeTestModal() {
    document.getElementById('testModal').style.display = 'none';
}

// Form handling
function populateRuleForm(rule) {
    document.getElementById('ruleName').value = rule.name;
    document.getElementById('ruleDescription').value = rule.description;
    document.getElementById('ruleCategory').value = rule.category;
    document.getElementById('rulePriority').value = rule.priority;
    document.getElementById('messageTemplate').value = rule.template;
    document.getElementById('deliveryChannel').value = rule.channel;
    document.getElementById('delayMinutes').value = rule.delay;
    document.getElementById('enableRetry').checked = rule.enableRetry;
    document.getElementById('maxRetries').value = rule.maxRetries;
    document.getElementById('retryDelay').value = rule.retryDelay;
    
    // Set recipients
    document.getElementById('notifyReporter').checked = rule.recipients.reporter;
    document.getElementById('notifyAssignee').checked = rule.recipients.assignee;
    document.getElementById('notifySupervisor').checked = rule.recipients.supervisor;
    document.getElementById('notifyAdmin').checked = rule.recipients.admin;
}

function saveRule() {
    const formData = new FormData(document.getElementById('ruleForm'));
    
    const newRule = {
        id: `RULE-${String(notificationRules.length + 1).padStart(3, '0')}`,
        name: document.getElementById('ruleName').value,
        description: document.getElementById('ruleDescription').value,
        category: document.getElementById('ruleCategory').value,
        priority: document.getElementById('rulePriority').value,
        status: 'active',
        conditions: [], // Would be populated from condition builder
        recipients: {
            reporter: document.getElementById('notifyReporter').checked,
            assignee: document.getElementById('notifyAssignee').checked,
            supervisor: document.getElementById('notifySupervisor').checked,
            admin: document.getElementById('notifyAdmin').checked
        },
        template: document.getElementById('messageTemplate').value,
        channel: document.getElementById('deliveryChannel').value,
        delay: parseInt(document.getElementById('delayMinutes').value),
        enableRetry: document.getElementById('enableRetry').checked,
        maxRetries: parseInt(document.getElementById('maxRetries').value),
        retryDelay: parseInt(document.getElementById('retryDelay').value),
        createdDate: new Date().toISOString().split('T')[0],
        lastModified: new Date().toISOString().split('T')[0],
        notificationsSent: 0,
        successRate: 0
    };

    notificationRules.push(newRule);
    loadRules();
    closeRuleModal();
    showNotification('Rule saved successfully', 'success');
    updateMetrics();
}

function saveTemplate() {
    const newTemplate = {
        id: `TMPL-${String(messageTemplates.length + 1).padStart(3, '0')}`,
        name: document.getElementById('templateName').value,
        subject: document.getElementById('templateSubject').value,
        content: document.getElementById('templateContent').value,
        variables: extractVariables(document.getElementById('templateContent').value),
        createdDate: new Date().toISOString().split('T')[0]
    };

    messageTemplates.push(newTemplate);
    loadTemplates();
    closeTemplateModal();
    showNotification('Template saved successfully', 'success');
}

function extractVariables(content) {
    const variableRegex = /\{([^}]+)\}/g;
    const variables = [];
    let match;
    
    while ((match = variableRegex.exec(content)) !== null) {
        variables.push(match[1]);
    }
    
    return variables;
}

// Rule testing
function runRuleTest() {
    const ruleId = document.getElementById('testModal').dataset.ruleId;
    const rule = notificationRules.find(r => r.id === ruleId);
    
    if (!rule) return;

    const testData = {
        issueStatus: document.getElementById('testIssueStatus').value,
        priority: document.getElementById('testPriority').value,
        category: document.getElementById('testCategory').value
    };

    // Simulate rule evaluation
    const conditionsMet = evaluateRuleConditions(rule, testData);
    
    const resultsDiv = document.getElementById('testResults');
    const statusDiv = document.getElementById('testStatus');
    const detailsDiv = document.getElementById('testDetails');

    resultsDiv.style.display = 'block';
    
    if (conditionsMet) {
        statusDiv.innerHTML = '<i class="fas fa-check-circle" style="color: #28a745"></i> Rule would trigger';
        statusDiv.className = 'test-status success';
        detailsDiv.innerHTML = `
            <p><strong>Conditions Met:</strong> All trigger conditions satisfied</p>
            <p><strong>Recipients:</strong> ${Object.entries(rule.recipients).filter(([_, v]) => v).map(([k, _]) => k).join(', ')}</p>
            <p><strong>Channel:</strong> ${rule.channel}</p>
            <p><strong>Template:</strong> ${rule.template}</p>
            <p><strong>Estimated Delivery:</strong> ${rule.delay > 0 ? `After ${rule.delay} minutes` : 'Immediately'}</p>
        `;
    } else {
        statusDiv.innerHTML = '<i class="fas fa-times-circle" style="color: #dc3545"></i> Rule would not trigger';
        statusDiv.className = 'test-status failed';
        detailsDiv.innerHTML = '<p><strong>Conditions:</strong> Trigger conditions not satisfied with current test data</p>';
    }
}

function evaluateRuleConditions(rule, testData) {
    // Simple rule evaluation logic
    // In a real system, this would be more sophisticated
    
    // Check if rule conditions match test data
    for (let condition of rule.conditions) {
        let conditionMet = false;
        
        switch (condition.field) {
            case 'priority':
                conditionMet = evaluateCondition(testData.priority, condition.operator, condition.value);
                break;
            case 'issue-status':
                conditionMet = evaluateCondition(testData.issueStatus, condition.operator, condition.value);
                break;
            case 'category':
                conditionMet = evaluateCondition(testData.category, condition.operator, condition.value);
                break;
        }
        
        if (!conditionMet) return false;
    }
    
    return true;
}

function evaluateCondition(actualValue, operator, expectedValue) {
    switch (operator) {
        case 'equals':
            return actualValue === expectedValue;
        case 'not-equals':
            return actualValue !== expectedValue;
        case 'contains':
            return actualValue.includes(expectedValue);
        case 'greater-than':
            return parseFloat(actualValue) > parseFloat(expectedValue);
        case 'less-than':
            return parseFloat(actualValue) < parseFloat(expectedValue);
        default:
            return false;
    }
}

// Filtering functions
function filterRules() {
    const searchTerm = document.getElementById('ruleSearch').value.toLowerCase();
    const statusFilter = document.getElementById('statusFilter').value;
    const categoryFilter = document.getElementById('categoryFilter').value;

    const filteredRules = notificationRules.filter(rule => {
        const matchesSearch = !searchTerm || 
            rule.name.toLowerCase().includes(searchTerm) ||
            rule.description.toLowerCase().includes(searchTerm);
        
        const matchesStatus = !statusFilter || rule.status === statusFilter;
        const matchesCategory = !categoryFilter || rule.category === categoryFilter;

        return matchesSearch && matchesStatus && matchesCategory;
    });

    const container = document.getElementById('rulesContainer');
    container.innerHTML = filteredRules.map(rule => createRuleCard(rule)).join('');
}

function filterHistory() {
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;

    let filteredHistory = notificationHistory;

    if (startDate) {
        filteredHistory = filteredHistory.filter(item => new Date(item.timestamp) >= new Date(startDate));
    }

    if (endDate) {
        filteredHistory = filteredHistory.filter(item => new Date(item.timestamp) <= new Date(endDate));
    }

    const container = document.getElementById('historyContainer');
    container.innerHTML = filteredHistory.map(item => createHistoryItem(item)).join('');
}

// Export functions
function exportRules() {
    const dataStr = JSON.stringify(notificationRules, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `notification-rules-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    URL.revokeObjectURL(url);
    showNotification('Rules exported successfully', 'success');
}

function exportAnalytics() {
    const analyticsReport = {
        generatedAt: new Date().toISOString(),
        metrics: {
            totalRules: notificationRules.length,
            activeRules: notificationRules.filter(r => r.status === 'active').length,
            totalNotifications: notificationHistory.length,
            successRate: notificationHistory.length > 0 ? Math.round((notificationHistory.filter(h => h.status === 'success').length / notificationHistory.length) * 100) : 0
        },
        analyticsData: analyticsData,
        topPerformingRules: notificationRules.filter(r => r.status === 'active').sort((a, b) => b.successRate - a.successRate).slice(0, 5)
    };

    const dataStr = JSON.stringify(analyticsReport, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `analytics-report-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    URL.revokeObjectURL(url);
    showNotification('Analytics report exported successfully', 'success');
}

// Utility functions
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
    });
}

function formatTimeAgo(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) return 'just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
    
    return formatDate(timestamp);
}

function showNotification(message, type = 'info') {
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

    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : type === 'warning' ? '#ffc107' : '#17a2b8'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 8px 25px rgba(0,0,0,0.2);
        z-index: 3000;
        display: flex;
        align-items: center;
        gap: 1rem;
        min-width: 300px;
        animation: slideInRight 0.3s ease-out;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Add condition builder functionality
function addCondition() {
    const conditionBuilder = document.getElementById('conditionBuilder');
    const newConditionRow = document.createElement('div');
    newConditionRow.className = 'condition-row';
    newConditionRow.innerHTML = `
        <select class="condition-field">
            <option value="">Select Field</option>
            <option value="issue-status">Issue Status</option>
            <option value="priority">Priority</option>
            <option value="category">Category</option>
            <option value="assigned-to">Assigned To</option>
            <option value="location">Location</option>
            <option value="time-elapsed">Time Elapsed</option>
        </select>
        <select class="condition-operator">
            <option value="equals">Equals</option>
            <option value="not-equals">Not Equals</option>
            <option value="contains">Contains</option>
            <option value="greater-than">Greater Than</option>
            <option value="less-than">Less Than</option>
        </select>
        <input type="text" class="condition-value" placeholder="Value">
        <button type="button" class="btn-icon" onclick="removeCondition(this)">
            <i class="fas fa-minus"></i>
        </button>
    `;
    conditionBuilder.appendChild(newConditionRow);
}

function removeCondition(button) {
    button.parentElement.remove();
}

// Add CSS for notifications
const notificationStyles = `
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
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 0.25rem;
        border-radius: 4px;
        transition: all 0.3s ease;
    }
    
    .notification-close:hover {
        background: rgba(255, 255, 255, 0.2);
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet);