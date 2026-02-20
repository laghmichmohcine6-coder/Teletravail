(function () {
    'use strict';

    window.UI = {
        // Toast notifications
        showToast: function (message, type) {
            type = type || 'info';

            const toast = document.createElement('div');
            toast.className = `toast toast-${type}`;
            toast.innerHTML = `
                <i class="fas fa-${this.getToastIcon(type)}"></i>
                <span>${message}</span>
            `;

            document.body.appendChild(toast);

            setTimeout(() => toast.classList.add('show'), 10);

            setTimeout(() => {
                toast.classList.remove('show');
                setTimeout(() => toast.remove(), 300);
            }, 3000);
        },

        getToastIcon: function (type) {
            const icons = {
                success: 'check-circle',
                error: 'exclamation-circle',
                warning: 'exclamation-triangle',
                info: 'info-circle'
            };
            return icons[type] || 'info-circle';
        },

        // Confirmation modal
        showConfirm: function (message, onConfirm, onCancel) {
            const modal = document.createElement('div');
            modal.className = 'modal-overlay';
            modal.innerHTML = `
                <div class="modal-content">
                    <h3>Confirm Action</h3>
                    <p>${message}</p>
                    <div class="modal-actions">
                        <button class="btn btn-ghost" data-action="cancel">Cancel</button>
                        <button class="btn btn-primary" data-action="confirm">Confirm</button>
                    </div>
                </div>
            `;

            document.body.appendChild(modal);
            setTimeout(() => modal.classList.add('show'), 10);

            modal.querySelector('[data-action="confirm"]').addEventListener('click', () => {
                this.closeModal(modal);
                if (onConfirm) onConfirm();
            });

            modal.querySelector('[data-action="cancel"]').addEventListener('click', () => {
                this.closeModal(modal);
                if (onCancel) onCancel();
            });

            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeModal(modal);
                    if (onCancel) onCancel();
                }
            });
        },

        closeModal: function (modal) {
            modal.classList.remove('show');
            setTimeout(() => modal.remove(), 300);
        },

        // Loading state
        showLoading: function (element) {
            if (!element) return;
            element.classList.add('loading');
            element.disabled = true;
        },

        hideLoading: function (element) {
            if (!element) return;
            element.classList.remove('loading');
            element.disabled = false;
        },

        // Empty state
        showEmptyState: function (container, message, actionText, actionHref) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-inbox"></i>
                    <h3>${message}</h3>
                    ${actionText ? `<a href="${actionHref}" class="btn btn-primary">${actionText}</a>` : ''}
                </div>
            `;
        },

        // Format date
        formatDate: function (dateString) {
            const date = new Date(dateString);
            const options = { year: 'numeric', month: 'short', day: 'numeric' };
            return date.toLocaleDateString('en-US', options);
        },

        // Format time ago
        timeAgo: function (dateString) {
            const date = new Date(dateString);
            const now = new Date();
            const seconds = Math.floor((now - date) / 1000);

            const intervals = {
                year: 31536000,
                month: 2592000,
                week: 604800,
                day: 86400,
                hour: 3600,
                minute: 60
            };

            for (const [unit, secondsInUnit] of Object.entries(intervals)) {
                const interval = Math.floor(seconds / secondsInUnit);
                if (interval >= 1) {
                    return interval === 1 ? `1 ${unit} ago` : `${interval} ${unit}s ago`;
                }
            }

            return 'Just now';
        },

        // Update navbar based on auth state
        updateNavbar: function () {
            const currentUser = Auth.getCurrentUser();
            const navMenu = document.querySelector('.nav-menu');

            if (!navMenu) return;

            if (currentUser) {
                const dashboardLink = currentUser.role === 'user' ? 'dashboard.html' : 'company-dashboard.html';
                const dashboardText = currentUser.role === 'user' ? 'Dashboard' : 'Company Dashboard';

                navMenu.innerHTML = `
                    <li><a href="index.html" class="nav-link">Home</a></li>
                    <li><a href="jobs.html" class="nav-link">Jobs</a></li>
                    ${currentUser.role === 'company' ? '<li><a href="company-post-job.html" class="nav-link">Post Job</a></li>' : ''}
                    <li><a href="about.html" class="nav-link">About</a></li>
                    <li><a href="contact.html" class="nav-link">Contact</a></li>
                    <li><a href="${dashboardLink}" class="btn btn-ghost">${dashboardText}</a></li>
                    <li><a href="#" class="btn btn-primary" onclick="Auth.logout(); return false;">Logout</a></li>
                `;
            } else {
                navMenu.innerHTML = `
                    <li><a href="index.html" class="nav-link">Home</a></li>
                    <li><a href="jobs.html" class="nav-link">Jobs</a></li>
                    <li><a href="about.html" class="nav-link">About</a></li>
                    <li><a href="contact.html" class="nav-link">Contact</a></li>
                    <li><a href="#" class="nav-link" onclick="UI.showCompanyMenu(event)">For Companies</a></li>
                    <li><a href="login.html" class="btn btn-ghost">Login</a></li>
                    <li><a href="register.html" class="btn btn-primary">Join Now</a></li>
                `;
            }
        },

        showCompanyMenu: function (e) {
            e.preventDefault();
            const menu = document.createElement('div');
            menu.className = 'dropdown-menu';
            menu.innerHTML = `
                <a href="company-register.html">Register Company</a>
                <a href="company-login.html">Company Login</a>
                <a href="company-post-job.html">Post a Job</a>
            `;

            const rect = e.target.getBoundingClientRect();
            menu.style.top = rect.bottom + 'px';
            menu.style.left = rect.left + 'px';

            document.body.appendChild(menu);
            setTimeout(() => menu.classList.add('show'), 10);

            const closeMenu = () => {
                menu.classList.remove('show');
                setTimeout(() => menu.remove(), 300);
            };

            setTimeout(() => {
                document.addEventListener('click', closeMenu, { once: true });
            }, 100);
        }
    };

    // Add toast styles if not exists
    if (!document.getElementById('toast-styles')) {
        const style = document.createElement('style');
        style.id = 'toast-styles';
        style.textContent = `
            .toast {
                position: fixed;
                bottom: 2rem;
                right: 2rem;
                background: var(--card-bg);
                border: 1px solid var(--border-color);
                border-radius: var(--radius-md);
                padding: 1rem 1.5rem;
                display: flex;
                align-items: center;
                gap: 0.75rem;
                box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
                transform: translateX(400px);
                opacity: 0;
                transition: all 0.3s ease;
                z-index: 10000;
                min-width: 300px;
            }
            .toast.show {
                transform: translateX(0);
                opacity: 1;
            }
            .toast i {
                font-size: 1.25rem;
            }
            .toast-success { border-left: 3px solid #10b981; }
            .toast-success i { color: #10b981; }
            .toast-error { border-left: 3px solid #ef4444; }
            .toast-error i { color: #ef4444; }
            .toast-warning { border-left: 3px solid #f59e0b; }
            .toast-warning i { color: #f59e0b; }
            .toast-info { border-left: 3px solid var(--gold-accent); }
            .toast-info i { color: var(--gold-accent); }
            
            .modal-overlay {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.8);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                opacity: 0;
                transition: opacity 0.3s ease;
            }
            .modal-overlay.show {
                opacity: 1;
            }
            .modal-content {
                background: var(--card-bg);
                border: 1px solid var(--border-color);
                border-radius: var(--radius-lg);
                padding: 2rem;
                max-width: 500px;
                width: 90%;
                transform: scale(0.9);
                transition: transform 0.3s ease;
            }
            .modal-overlay.show .modal-content {
                transform: scale(1);
            }
            .modal-content h3 {
                color: var(--text-light);
                margin-bottom: 1rem;
            }
            .modal-content p {
                color: var(--muted-text);
                margin-bottom: 1.5rem;
            }
            .modal-actions {
                display: flex;
                gap: 1rem;
                justify-content: flex-end;
            }
            
            .empty-state {
                text-align: center;
                padding: 4rem 2rem;
            }
            .empty-state i {
                font-size: 4rem;
                color: var(--muted-text);
                margin-bottom: 1rem;
                opacity: 0.5;
            }
            .empty-state h3 {
                color: var(--text-light);
                margin-bottom: 1rem;
            }
            
            .dropdown-menu {
                position: fixed;
                background: var(--card-bg);
                border: 1px solid var(--border-color);
                border-radius: var(--radius-md);
                padding: 0.5rem 0;
                box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
                opacity: 0;
                transform: translateY(-10px);
                transition: all 0.3s ease;
                z-index: 1000;
            }
            .dropdown-menu.show {
                opacity: 1;
                transform: translateY(0);
            }
            .dropdown-menu a {
                display: block;
                padding: 0.75rem 1.5rem;
                color: var(--text-light);
                text-decoration: none;
                transition: background 0.2s ease;
            }
            .dropdown-menu a:hover {
                background: rgba(212, 175, 55, 0.1);
                color: var(--gold-accent);
            }
        `;
        document.head.appendChild(style);
    }
})();
