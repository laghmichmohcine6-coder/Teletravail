(function () {
    'use strict';

    const STORAGE_KEYS = {
        USERS: 'teletravail_users',
        COMPANIES: 'teletravail_companies',
        JOBS: 'teletravail_jobs',
        APPLICATIONS: 'teletravail_applications',
        CURRENT_USER: 'teletravail_current_user'
    };

    window.Storage = {
        // Generic storage methods
        get: function (key) {
            try {
                const data = localStorage.getItem(key);
                return data ? JSON.parse(data) : null;
            } catch (e) {
                console.error('Error reading from storage:', e);
                return null;
            }
        },

        set: function (key, value) {
            try {
                localStorage.setItem(key, JSON.stringify(value));
                return true;
            } catch (e) {
                console.error('Error writing to storage:', e);
                return false;
            }
        },

        remove: function (key) {
            try {
                localStorage.removeItem(key);
                return true;
            } catch (e) {
                console.error('Error removing from storage:', e);
                return false;
            }
        },

        clear: function () {
            try {
                localStorage.clear();
                return true;
            } catch (e) {
                console.error('Error clearing storage:', e);
                return false;
            }
        },

        // Users
        getUsers: function () {
            return this.get(STORAGE_KEYS.USERS) || [];
        },

        saveUser: function (user) {
            const users = this.getUsers();
            user.id = user.id || this.generateId();
            user.role = 'user';
            user.createdAt = user.createdAt || new Date().toISOString();
            users.push(user);
            return this.set(STORAGE_KEYS.USERS, users);
        },

        getUserByEmail: function (email) {
            const users = this.getUsers();
            return users.find(u => u.email === email);
        },

        updateUser: function (userId, updates) {
            const users = this.getUsers();
            const index = users.findIndex(u => u.id === userId);
            if (index !== -1) {
                users[index] = { ...users[index], ...updates };
                return this.set(STORAGE_KEYS.USERS, users);
            }
            return false;
        },

        // Companies
        getCompanies: function () {
            return this.get(STORAGE_KEYS.COMPANIES) || [];
        },

        saveCompany: function (company) {
            const companies = this.getCompanies();
            company.id = company.id || this.generateId();
            company.role = 'company';
            company.createdAt = company.createdAt || new Date().toISOString();
            companies.push(company);
            return this.set(STORAGE_KEYS.COMPANIES, companies);
        },

        getCompanyByEmail: function (email) {
            const companies = this.getCompanies();
            return companies.find(c => c.email === email);
        },

        getCompanyById: function (id) {
            const companies = this.getCompanies();
            return companies.find(c => c.id === id);
        },

        updateCompany: function (companyId, updates) {
            const companies = this.getCompanies();
            const index = companies.findIndex(c => c.id === companyId);
            if (index !== -1) {
                companies[index] = { ...companies[index], ...updates };
                return this.set(STORAGE_KEYS.COMPANIES, companies);
            }
            return false;
        },

        // Jobs
        getJobs: function () {
            return this.get(STORAGE_KEYS.JOBS) || [];
        },

        saveJob: function (job) {
            const jobs = this.getJobs();
            job.id = job.id || this.generateId();
            job.createdAt = job.createdAt || new Date().toISOString();
            jobs.push(job);
            return this.set(STORAGE_KEYS.JOBS, jobs);
        },

        getJobById: function (id) {
            const jobs = this.getJobs();
            return jobs.find(j => j.id === id);
        },

        getJobsByCompany: function (companyId) {
            const jobs = this.getJobs();
            return jobs.filter(j => j.companyId === companyId);
        },

        updateJob: function (jobId, updates) {
            const jobs = this.getJobs();
            const index = jobs.findIndex(j => j.id === jobId);
            if (index !== -1) {
                jobs[index] = { ...jobs[index], ...updates };
                return this.set(STORAGE_KEYS.JOBS, jobs);
            }
            return false;
        },

        deleteJob: function (jobId) {
            const jobs = this.getJobs();
            const filtered = jobs.filter(j => j.id !== jobId);
            return this.set(STORAGE_KEYS.JOBS, filtered);
        },

        // Applications
        getApplications: function () {
            return this.get(STORAGE_KEYS.APPLICATIONS) || [];
        },

        saveApplication: function (application) {
            const applications = this.getApplications();

            // Check for duplicate
            const exists = applications.find(a =>
                a.userId === application.userId && a.jobId === application.jobId
            );

            if (exists) {
                return { success: false, message: 'You have already applied to this job' };
            }

            application.id = application.id || this.generateId();
            application.status = application.status || 'pending';
            application.createdAt = application.createdAt || new Date().toISOString();
            applications.push(application);

            if (this.set(STORAGE_KEYS.APPLICATIONS, applications)) {
                return { success: true, application };
            }
            return { success: false, message: 'Failed to save application' };
        },

        getApplicationsByUser: function (userId) {
            const applications = this.getApplications();
            return applications.filter(a => a.userId === userId);
        },

        getApplicationsByJob: function (jobId) {
            const applications = this.getApplications();
            return applications.filter(a => a.jobId === jobId);
        },

        getApplicationsByCompany: function (companyId) {
            const applications = this.getApplications();
            const jobs = this.getJobsByCompany(companyId);
            const jobIds = jobs.map(j => j.id);
            return applications.filter(a => jobIds.includes(a.jobId));
        },

        updateApplication: function (applicationId, updates) {
            const applications = this.getApplications();
            const index = applications.findIndex(a => a.id === applicationId);
            if (index !== -1) {
                applications[index] = { ...applications[index], ...updates };
                return this.set(STORAGE_KEYS.APPLICATIONS, applications);
            }
            return false;
        },

        // Current user session
        getCurrentUser: function () {
            return this.get(STORAGE_KEYS.CURRENT_USER);
        },

        setCurrentUser: function (user) {
            return this.set(STORAGE_KEYS.CURRENT_USER, user);
        },

        clearCurrentUser: function () {
            return this.remove(STORAGE_KEYS.CURRENT_USER);
        },

        // Utilities
        generateId: function () {
            return 'id_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        },

        // Statistics
        getStats: function () {
            return {
                totalJobs: this.getJobs().length,
                totalCompanies: this.getCompanies().length,
                totalApplications: this.getApplications().length,
                totalUsers: this.getUsers().length
            };
        }
    };
})();
