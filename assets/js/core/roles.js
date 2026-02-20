(function () {
    'use strict';

    window.Roles = {
        USER: 'user',
        COMPANY: 'company',

        hasRole: function (role) {
            const currentUser = Storage.getCurrentUser();
            return currentUser && currentUser.role === role;
        },

        isUser: function () {
            return this.hasRole(this.USER);
        },

        isCompany: function () {
            return this.hasRole(this.COMPANY);
        },

        getCurrentRole: function () {
            const currentUser = Storage.getCurrentUser();
            return currentUser ? currentUser.role : null;
        },

        canAccessUserDashboard: function () {
            return this.isUser();
        },

        canAccessCompanyDashboard: function () {
            return this.isCompany();
        },

        canEditJob: function (jobId) {
            if (!this.isCompany()) return false;

            const currentUser = Storage.getCurrentUser();
            const job = Storage.getJobById(jobId);

            return job && job.companyId === currentUser.id;
        },

        canDeleteJob: function (jobId) {
            return this.canEditJob(jobId);
        },

        canViewApplicants: function (jobId) {
            return this.canEditJob(jobId);
        }
    };
})();
