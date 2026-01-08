// Application data
const appData = {
    riskAnalysis: {
        lowRisk: { percentage: 10, color: "#22C55E", label: "Low Risk" },
        mediumRisk: { percentage: 20, color: "#F59E0B", label: "Medium Risk" },
        highRisk: { percentage: 5, color: "#EF4444", label: "High Risk" }
    },
    features: ["AI-Powered", "Real-Time", "Secure"],
    navigation: {
        main: ["Home", "About"],
        auth: ["Sign In", "Sign Up"],
        dashboard: ["Home", "About", "Dashboard", "Logout"]
    },
    fileTypes: ["XLS", "XLSX"],
    sampleData: {
        patients: [
            {"id": 1, "age": 65, "condition": "Heart Failure", "riskScore": 0.8},
            {"id": 2, "age": 72, "condition": "Diabetes", "riskScore": 0.6},
            {"id": 3, "age": 58, "condition": "COPD", "riskScore": 0.7}
        ]
    }
};

// Page management
class PageManager {
    constructor() {
        this.currentPage = 'landing';
        this.pages = {
            landing: document.getElementById('landing-page'),
            dashboard: document.getElementById('dashboard-page')
        };
        this.init();
    }

    init() {
        // Initialize event listeners
        this.setupNavigationEvents();
        this.setupFileUpload();
        
        // Show landing page by default
        this.showPage('landing');
    }

    setupNavigationEvents() {
        // Dashboard button on landing page
        const dashboardBtn = document.getElementById('dashboard-btn');
        if (dashboardBtn) {
            dashboardBtn.addEventListener('click', () => {
                this.showPage('dashboard');
            });
        }

        // Logo click navigation (make logos clickable for home)
        document.querySelectorAll('.logo').forEach(logo => {
            logo.style.cursor = 'pointer';
            logo.addEventListener('click', () => {
                this.showPage('landing');
            });
        });

        // All navigation links - improved event handling
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const href = link.getAttribute('href');
                const text = link.textContent.toLowerCase();
                
                if (href === '#home' || text === 'home') {
                    this.showPage('landing');
                } else if (href === '#dashboard' || text === 'dashboard') {
                    this.showPage('dashboard');
                }
            });
        });

        // Specific handling for dashboard home link
        const homeLinks = document.querySelectorAll('a[href="#home"], .nav-link');
        homeLinks.forEach(link => {
            if (link.textContent.toLowerCase().includes('home')) {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.showPage('landing');
                });
            }
        });
    }

    setupFileUpload() {
        const uploadArea = document.getElementById('upload-area');
        const fileInput = document.getElementById('file-input');
        const browseBtn = document.getElementById('browse-btn');
        const sampleBtn = document.getElementById('sample-btn');

        if (!uploadArea || !fileInput || !browseBtn || !sampleBtn) return;

        // Drag and drop functionality
        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.classList.add('dragover');
        });

        uploadArea.addEventListener('dragleave', (e) => {
            e.preventDefault();
            uploadArea.classList.remove('dragover');
        });

        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.classList.remove('dragover');
            
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                this.handleFileSelection(files[0]);
            }
        });

        // Click to upload
        uploadArea.addEventListener('click', () => {
            fileInput.click();
        });

        // File input change
        fileInput.addEventListener('change', (e) => {
            if (e.target.files.length > 0) {
                this.handleFileSelection(e.target.files[0]);
            }
        });

        // Browse button
        browseBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            fileInput.click();
        });

        // Sample data button
        sampleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.useSampleData();
        });
    }

    showPage(pageName) {
        // Hide all pages
        Object.values(this.pages).forEach(page => {
            if (page) {
                page.classList.remove('active');
                page.classList.add('hidden');
            }
        });

        // Show selected page
        if (this.pages[pageName]) {
            this.pages[pageName].classList.remove('hidden');
            this.pages[pageName].classList.add('active');
            this.currentPage = pageName;
        }

        // Update page title
        if (pageName === 'dashboard') {
            document.title = 'Dashboard - Hospital Readmission Prediction System';
        } else {
            document.title = 'Hospital Readmission Prediction System';
        }

        console.log(`Navigated to ${pageName} page`);
    }

    handleFileSelection(file) {
        const allowedTypes = [
            'application/vnd.ms-excel',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        ];

        if (allowedTypes.includes(file.type) || file.name.match(/\.(xls|xlsx)$/i)) {
            this.processFile(file);
        } else {
            this.showNotification('Please select a valid Excel file (.xls or .xlsx)', 'error');
        }
    }

    processFile(file) {
        this.showNotification(`File "${file.name}" uploaded successfully!`, 'success');
        
        // Simulate file processing
        const uploadContent = document.querySelector('.upload-content');
        if (uploadContent) {
            uploadContent.innerHTML = `
                <svg class="upload-icon" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M20 6L9 17l-5-5"/>
                </svg>
                <h3>File uploaded successfully!</h3>
                <p>${file.name} (${this.formatFileSize(file.size)})</p>
            `;
        }

        console.log('Processing file:', file.name, 'Size:', file.size);
    }

    useSampleData() {
        this.showNotification('Loading sample data...', 'info');
        
        // Simulate loading sample data
        setTimeout(() => {
            const uploadContent = document.querySelector('.upload-content');
            if (uploadContent) {
                uploadContent.innerHTML = `
                    <svg class="upload-icon" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9 12l2 2 4-4"/>
                        <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"/>
                    </svg>
                    <h3>Sample data loaded!</h3>
                    <p>Using ${appData.sampleData.patients.length} patient records</p>
                `;
            }
            
            this.showNotification('Sample data loaded successfully!', 'success');
            console.log('Sample data loaded:', appData.sampleData.patients);
        }, 1000);
    }

    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    showNotification(message, type = 'info') {
        // Remove existing notifications
        document.querySelectorAll('.notification').forEach(notif => {
            notif.remove();
        });

        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close" aria-label="Close notification">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            </div>
        `;

        // Add notification styles if not already present
        if (!document.querySelector('.notification-styles')) {
            const styles = document.createElement('style');
            styles.className = 'notification-styles';
            styles.textContent = `
                .notification {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    z-index: 1000;
                    max-width: 400px;
                    padding: 16px;
                    border-radius: 8px;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                    animation: slideIn 0.3s ease-out;
                    backdrop-filter: blur(10px);
                }
                
                .notification--success {
                    background-color: rgba(34, 197, 94, 0.1);
                    border: 1px solid rgba(34, 197, 94, 0.3);
                    color: #059669;
                }
                
                .notification--error {
                    background-color: rgba(239, 68, 68, 0.1);
                    border: 1px solid rgba(239, 68, 68, 0.3);
                    color: #DC2626;
                }
                
                .notification--info {
                    background-color: rgba(59, 130, 246, 0.1);
                    border: 1px solid rgba(59, 130, 246, 0.3);
                    color: #2563EB;
                }
                
                .notification-content {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 12px;
                }
                
                .notification-message {
                    font-size: 14px;
                    font-weight: 500;
                }
                
                .notification-close {
                    background: none;
                    border: none;
                    cursor: pointer;
                    padding: 4px;
                    border-radius: 4px;
                    color: currentColor;
                    opacity: 0.7;
                    transition: opacity 0.2s;
                }
                
                .notification-close:hover {
                    opacity: 1;
                }
                
                @keyframes slideIn {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                
                @keyframes slideOut {
                    from {
                        transform: translateX(0);
                        opacity: 1;
                    }
                    to {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(styles);
        }

        // Add to page
        document.body.appendChild(notification);

        // Close button functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            this.removeNotification(notification);
        });

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (document.body.contains(notification)) {
                this.removeNotification(notification);
            }
        }, 5000);
    }

    removeNotification(notification) {
        notification.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }
}

// Initialize application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.pageManager = new PageManager();
});

// Handle browser back/forward buttons
window.addEventListener('popstate', (e) => {
    console.log('Navigation state changed');
});

// Export for potential use in other scripts
window.HospitalApp = {
    data: appData,
    PageManager
};