(function () {
    'use strict';

    window.Guards = {
        requireAuth: function (redirectUrl = 'login.html') {
            const currentUser = Auth.getCurrentUser();
            if (!currentUser) {
                window.location.href = redirectUrl;
                return false;
            }
            return true;
        },

        requireUser: function (redirectUrl = 'login.html') {
            const currentUser = Auth.getCurrentUser();
            if (!currentUser || currentUser.role !== 'user') {
                window.location.href = redirectUrl;
                return false;
            }
            return true;
        },

        requireCompany: function (redirectUrl = 'company-login.html') {
            const currentUser = Auth.getCurrentUser();
            if (!currentUser || currentUser.role !== 'company') {
                window.location.href = redirectUrl;
                return false;
            }
            return true;
        },

        redirectIfAuthenticated: function (redirectUrl = null) {
            const currentUser = Auth.getCurrentUser();
            if (currentUser) {
                if (redirectUrl) {
                    window.location.href = redirectUrl;
                } else if (currentUser.role === 'user') {
                    window.location.href = 'dashboard.html';
                } else if (currentUser.role === 'company') {
                    window.location.href = 'company-dashboard.html';
                }
            }
        }
    };
})();
