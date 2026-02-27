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
            const t = window.i18n ? window.i18n.t.bind(window.i18n) : (k) => k;
            const modal = document.createElement('div');
            modal.className = 'modal-overlay';
            modal.innerHTML = `
                <div class="modal-content">
                    <h3>${t('confirm_action') !== 'confirm_action' ? t('confirm_action') : 'Confirm'}</h3>
                    <p>${message}</p>
                    <div class="modal-actions">
                        <button class="btn btn-ghost" data-action="cancel">${t('btn_cancel') !== 'btn_cancel' ? t('btn_cancel') : 'Cancel'}</button>
                        <button class="btn btn-primary" data-action="confirm">${t('btn_confirm') !== 'btn_confirm' ? t('btn_confirm') : 'Confirm'}</button>
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
            const lang = (window.i18n && window.i18n.currentLang) || 'en';
            const locale = lang === 'fr' ? 'fr-FR' : 'en-US';
            return date.toLocaleDateString(locale, options);
        },

        // Format time ago
        timeAgo: function (dateString) {
            const date = new Date(dateString);
            const now = new Date();
            const seconds = Math.floor((now - date) / 1000);
            const lang = (window.i18n && window.i18n.currentLang) || 'en';

            const intervals = {
                year: 31536000,
                month: 2592000,
                week: 604800,
                day: 86400,
                hour: 3600,
                minute: 60
            };

            const unitLabels = {
                en: { year: 'year', month: 'month', week: 'week', day: 'day', hour: 'hour', minute: 'minute', ago: 'ago', just_now: 'Just now' },
                fr: { year: 'an', month: 'mois', week: 'semaine', day: 'jour', hour: 'heure', minute: 'minute', ago: 'il y a', just_now: 'À l\'instant' }
            };
            const labels = unitLabels[lang] || unitLabels.en;

            for (const [unit, secondsInUnit] of Object.entries(intervals)) {
                const interval = Math.floor(seconds / secondsInUnit);
                if (interval >= 1) {
                    const unitLabel = labels[unit];
                    const plural = (lang === 'fr' && unit !== 'mois') ? (interval > 1 ? 's' : '') : (interval > 1 ? 's' : '');
                    if (lang === 'fr') {
                        return `${labels.ago} ${interval} ${unitLabel}${interval > 1 && unit !== 'month' ? 's' : ''}`;
                    }
                    return `${interval} ${unitLabel}${interval > 1 ? 's' : ''} ${labels.ago}`;
                }
            }

            return labels.just_now;
        },

        // Update navbar based on auth state
        updateNavbar: function () {
            const currentUser = Auth.getCurrentUser();
            const navMenu = document.querySelector('.nav-menu');

            if (!navMenu) return;

            if (currentUser) {
                const dashboardLink = currentUser.role === 'user' ? 'dashboard.html' : 'company-dashboard.html';

                navMenu.innerHTML = `
                    <li><a href="index.html" class="nav-link" data-i18n="nav_home">Home</a></li>
                    <li><a href="jobs.html" class="nav-link" data-i18n="nav_jobs">Jobs</a></li>
                    ${currentUser.role === 'company' ? '<li><a href="company-post-job.html" class="nav-link" data-i18n="nav_post_job">Post Job</a></li>' : ''}
                    <li><a href="about.html" class="nav-link" data-i18n="nav_about">About</a></li>
                    <li><a href="contact.html" class="nav-link" data-i18n="nav_contact">Contact</a></li>
                    <li><a href="${dashboardLink}" class="btn btn-ghost" data-i18n="nav_overview">Dashboard</a></li>
                    <li><a href="#" class="btn btn-primary" onclick="Auth.logout(); return false;" data-i18n="nav_logout">Logout</a></li>
                    <li>
                        <div class="language-selector" style="display:flex;gap:5px;margin:0 10px;">
                            <button class="lang-btn" data-lang="en" style="background:none;border:1px solid var(--border-color);color:var(--muted-text);cursor:pointer;padding:2px 5px;font-size:0.8rem;">EN</button>
                            <button class="lang-btn" data-lang="fr" style="background:none;border:1px solid var(--border-color);color:var(--muted-text);cursor:pointer;padding:2px 5px;font-size:0.8rem;">FR</button>
                        </div>
                    </li>
                `;
            } else {
                navMenu.innerHTML = `
                    <li><a href="index.html" class="nav-link" data-i18n="nav_home">Home</a></li>
                    <li><a href="jobs.html" class="nav-link" data-i18n="nav_jobs">Jobs</a></li>
                    <li><a href="about.html" class="nav-link" data-i18n="nav_about">About</a></li>
                    <li><a href="contact.html" class="nav-link" data-i18n="nav_contact">Contact</a></li>
                    <li><a href="company-register.html" class="nav-link" data-i18n="nav_for_companies">For Companies</a></li>
                    <li>
                        <div class="language-selector" style="display:flex;gap:5px;margin:0 10px;">
                            <button class="lang-btn" data-lang="en" style="background:none;border:1px solid var(--border-color);color:var(--muted-text);cursor:pointer;padding:2px 5px;font-size:0.8rem;">EN</button>
                            <button class="lang-btn" data-lang="fr" style="background:none;border:1px solid var(--border-color);color:var(--muted-text);cursor:pointer;padding:2px 5px;font-size:0.8rem;">FR</button>
                        </div>
                    </li>
                    <li><a href="login.html" class="btn btn-ghost" data-i18n="nav_login">Login</a></li>
                    <li><a href="register.html" class="btn btn-primary" data-i18n="nav_join">Join Now</a></li>
                `;
            }

            // Re-apply i18n translations to the newly injected nav items
            if (window.i18n) {
                window.i18n.updatePage();
                window.i18n.updateLanguageButtons();
                window.i18n.attachLanguageListeners();
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
