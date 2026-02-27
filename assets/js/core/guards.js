(function () {
    'use strict';

    window.Guards = {
        requireAuth: function (redirectUrl) {
            redirectUrl = redirectUrl || 'login.html';
            var currentUser = window.Auth ? Auth.getCurrentUser() : null;
            if (!currentUser) {
                window.location.href = redirectUrl;
                return false;
            }
            return true;
        },

        requireUser: function (redirectUrl) {
            redirectUrl = redirectUrl || 'login.html';
            var currentUser = window.Auth ? Auth.getCurrentUser() : null;
            if (!currentUser || currentUser.role !== 'user') {
                window.location.href = redirectUrl;
                return false;
            }
            return true;
        },

        requireCompany: function (redirectUrl) {
            redirectUrl = redirectUrl || 'company-login.html';
            var currentUser = window.Auth ? Auth.getCurrentUser() : null;
            if (!currentUser || currentUser.role !== 'company') {
                window.location.href = redirectUrl;
                return false;
            }
            return true;
        },

        redirectIfAuthenticated: function (redirectUrl) {
            redirectUrl = redirectUrl || null;
            var currentUser = window.Auth ? Auth.getCurrentUser() : null;
            if (currentUser) {
                if (redirectUrl) {
                    window.location.href = redirectUrl;
                } else if (currentUser.role === 'user') {
                    window.location.href = 'dashboard.html';
                } else if (currentUser.role === 'company') {
                    window.location.href = 'company-dashboard.html';
                }
            }
        },

        // Alias used across multiple protected pages
        redirectIfUnauthenticated: function (redirectUrl) {
            redirectUrl = redirectUrl || 'login.html';
            return this.requireAuth(redirectUrl);
        }
    };
})();
