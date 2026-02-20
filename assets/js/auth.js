/**
 * Télétravail - Authentication
 * Login and registration logic (Frontend only)
 */

// ========================================
// CREDENTIALS (Frontend only - No database)
// ========================================
const VALID_CREDENTIALS = {
    email: 'mohcine@gmail.com',
    password: 'Mohcine123!'
};

// ========================================
// LOGIN FUNCTIONALITY
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    if (loginForm) {
        initializeLoginForm(loginForm);
    }

    if (registerForm) {
        initializeRegisterForm(registerForm);
    }
});

function initializeLoginForm(form) {
    form.addEventListener('submit', handleLogin);

    // Add input animations
    const inputs = form.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('focus', (e) => {
            e.target.parentElement.classList.add('focused');
        });
        input.addEventListener('blur', (e) => {
            if (!e.target.value) {
                e.target.parentElement.classList.remove('focused');
            }
        });
    });
}

function handleLogin(e) {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const rememberMe = document.getElementById('rememberMe')?.checked || false;

    // Clear previous errors
    clearErrors();

    // Validate inputs
    if (!email || !password) {
        showError('Please fill in all fields');
        return;
    }

    if (!window.TeletravailApp.validateEmail(email)) {
        showError('Please enter a valid email address');
        return;
    }

    // Show loading state
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging in...';

    // Simulate API call delay
    setTimeout(() => {
        // Check credentials
        if (email === VALID_CREDENTIALS.email && password === VALID_CREDENTIALS.password) {
            // Success
            const userData = {
                name: 'Mohcine',
                email: email,
                loginTime: new Date().toISOString()
            };

            // Store user data
            if (rememberMe) {
                localStorage.setItem('teletravail_user', JSON.stringify(userData));
            } else {
                sessionStorage.setItem('teletravail_user', JSON.stringify(userData));
            }

            // Show success message
            showSuccess('Login successful! Redirecting...');

            // Redirect to dashboard
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1000);
        } else {
            // Failed
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
            showError('Invalid email or password. Please try again.');

            // Add shake animation to form
            const formContainer = document.querySelector('.auth-form-container');
            formContainer.classList.add('shake');
            setTimeout(() => formContainer.classList.remove('shake'), 500);
        }
    }, 1500);
}

// ========================================
// REGISTER FUNCTIONALITY
// ========================================
function initializeRegisterForm(form) {
    form.addEventListener('submit', handleRegister);

    // Password strength indicator
    const passwordInput = document.getElementById('password');
    if (passwordInput) {
        passwordInput.addEventListener('input', updatePasswordStrength);
    }

    // Confirm password validation
    const confirmPasswordInput = document.getElementById('confirmPassword');
    if (confirmPasswordInput) {
        confirmPasswordInput.addEventListener('input', validatePasswordMatch);
    }
}

function handleRegister(e) {
    e.preventDefault();

    const name = document.getElementById('name')?.value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword')?.value;
    const terms = document.getElementById('terms')?.checked;

    // Clear previous errors
    clearErrors();

    // Validate inputs
    if (!name || !email || !password || !confirmPassword) {
        showError('Please fill in all fields');
        return;
    }

    if (!window.TeletravailApp.validateEmail(email)) {
        showError('Please enter a valid email address');
        return;
    }

    if (!window.TeletravailApp.validatePassword(password)) {
        showError('Password must be at least 8 characters with uppercase, lowercase, number, and special character');
        return;
    }

    if (password !== confirmPassword) {
        showError('Passwords do not match');
        return;
    }

    if (!terms) {
        showError('Please accept the terms and conditions');
        return;
    }

    // Show loading state
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating account...';

    // Simulate API call delay
    setTimeout(() => {
        // Success (Frontend only - no actual registration)
        const userData = {
            name: name,
            email: email,
            loginTime: new Date().toISOString()
        };

        localStorage.setItem('teletravail_user', JSON.stringify(userData));

        showSuccess('Account created successfully! Redirecting...');

        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1000);
    }, 1500);
}

// ========================================
// PASSWORD STRENGTH
// ========================================
function updatePasswordStrength(e) {
    const password = e.target.value;
    const strengthIndicator = document.querySelector('.password-strength');

    if (!strengthIndicator) return;

    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;

    const strengthLevels = ['', 'weak', 'fair', 'good', 'strong', 'excellent'];
    const strengthTexts = ['', 'Weak', 'Fair', 'Good', 'Strong', 'Excellent'];

    strengthIndicator.className = `password-strength ${strengthLevels[strength]}`;
    strengthIndicator.textContent = strengthTexts[strength];
}

function validatePasswordMatch() {
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const matchIndicator = document.querySelector('.password-match');

    if (!matchIndicator) return;

    if (confirmPassword === '') {
        matchIndicator.textContent = '';
        return;
    }

    if (password === confirmPassword) {
        matchIndicator.textContent = '✓ Passwords match';
        matchIndicator.style.color = '#4CAF50';
    } else {
        matchIndicator.textContent = '✗ Passwords do not match';
        matchIndicator.style.color = '#F44336';
    }
}

// ========================================
// LOGOUT
// ========================================
function logout() {
    localStorage.removeItem('teletravail_user');
    sessionStorage.removeItem('teletravail_user');
    window.location.href = 'index.html';
}

// ========================================
// ERROR/SUCCESS HANDLING
// ========================================
function showError(message) {
    const errorContainer = document.querySelector('.error-message');
    if (errorContainer) {
        errorContainer.textContent = message;
        errorContainer.style.display = 'block';
        errorContainer.classList.add('shake');
        setTimeout(() => errorContainer.classList.remove('shake'), 500);
    } else {
        window.TeletravailApp?.showNotification(message, 'error');
    }
}

function showSuccess(message) {
    const successContainer = document.querySelector('.success-message');
    if (successContainer) {
        successContainer.textContent = message;
        successContainer.style.display = 'block';
    } else {
        window.TeletravailApp?.showNotification(message, 'success');
    }
}

function clearErrors() {
    const errorContainer = document.querySelector('.error-message');
    const successContainer = document.querySelector('.success-message');

    if (errorContainer) errorContainer.style.display = 'none';
    if (successContainer) successContainer.style.display = 'none';
}

// ========================================
// EXPORT
// ========================================
window.TeletravailAuth = {
    logout,
    VALID_CREDENTIALS
};
