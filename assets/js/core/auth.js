(function () {
    'use strict';

    const passwordUtil = {
        hashPassword: function (password) {
            return btoa(password);
        },
        verifyPassword: function (password, hash) {
            return btoa(password) === hash;
        }
    };

    function seedDemoAccounts() {
        const users = Storage.getUsers();
        const companies = Storage.getCompanies();

        const demoUserEmail = 'mohcine@gmail.com';
        const demoPassword = 'Mohcine123!';

        const userExists = users.find(u => u.email === demoUserEmail);
        if (!userExists) {
            const demoUser = {
                id: Storage.generateId(),
                name: 'Mohcine',
                email: demoUserEmail,
                passwordHash: passwordUtil.hashPassword(demoPassword),
                role: 'user',
                createdAt: new Date().toISOString()
            };
            users.push(demoUser);
            Storage.set('teletravail_users', users);
        }

        const companyExists = companies.find(c => c.email === demoUserEmail);
        if (!companyExists) {
            const demoCompany = {
                id: Storage.generateId(),
                companyName: 'Teletravail Demo',
                email: demoUserEmail,
                passwordHash: passwordUtil.hashPassword(demoPassword),
                website: 'https://teletravail-demo.com',
                description: 'Demo company for testing',
                role: 'company',
                createdAt: new Date().toISOString()
            };
            companies.push(demoCompany);
            Storage.set('teletravail_companies', companies);
        }
    }

    window.Auth = {
        init: function () {
            seedDemoAccounts();
        },

        registerUser: function (userData) {
            if (Storage.getUserByEmail(userData.email) || Storage.getCompanyByEmail(userData.email)) {
                return { success: false, message: 'Email already in use' };
            }

            const passwordHash = passwordUtil.hashPassword(userData.password);
            const newUser = {
                id: Storage.generateId(),
                name: userData.name,
                email: userData.email,
                passwordHash: passwordHash,
                role: 'user',
                createdAt: new Date().toISOString()
            };

            if (Storage.saveUser(newUser)) {
                return { success: true, message: 'User registered successfully' };
            }
            return { success: false, message: 'Registration failed' };
        },

        loginUser: function (email, password) {
            const user = Storage.getUserByEmail(email);
            if (!user || !passwordUtil.verifyPassword(password, user.passwordHash)) {
                return { success: false, message: 'Invalid email or password' };
            }
            Storage.setCurrentUser(user);
            return { success: true, message: 'Login successful', user: user };
        },

        registerCompany: function (companyData) {
            if (Storage.getUserByEmail(companyData.email) || Storage.getCompanyByEmail(companyData.email)) {
                return { success: false, message: 'Email already in use' };
            }

            const passwordHash = passwordUtil.hashPassword(companyData.password);
            const newCompany = {
                id: Storage.generateId(),
                companyName: companyData.companyName,
                email: companyData.email,
                passwordHash: passwordHash,
                website: companyData.website || '',
                description: companyData.description || '',
                role: 'company',
                createdAt: new Date().toISOString()
            };

            if (Storage.saveCompany(newCompany)) {
                return { success: true, message: 'Company registered successfully' };
            }
            return { success: false, message: 'Registration failed' };
        },

        loginCompany: function (email, password) {
            const company = Storage.getCompanyByEmail(email);
            if (!company || !passwordUtil.verifyPassword(password, company.passwordHash)) {
                return { success: false, message: 'Invalid email or password' };
            }
            Storage.setCurrentUser(company);
            return { success: true, message: 'Login successful', company: company };
        },

        logout: function () {
            Storage.clearCurrentUser();
            window.location.href = 'index.html';
        },

        getCurrentUser: function () {
            return Storage.getCurrentUser();
        }
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () {
            Auth.init();
        });
    } else {
        Auth.init();
    }
})();
