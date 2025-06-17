document.addEventListener('DOMContentLoaded', function() {
    const passwordField = document.getElementById('password');
    const generateBtn = document.getElementById('generate-btn');
    const copyBtn = document.getElementById('copy-btn');
    const lengthSlider = document.getElementById('length');
    const lengthValue = document.getElementById('length-value');
    const uppercaseCheckbox = document.getElementById('uppercase');
    const lowercaseCheckbox = document.getElementById('lowercase');
    const numbersCheckbox = document.getElementById('numbers');
    const symbolsCheckbox = document.getElementById('symbols');
    const strengthBar = document.querySelector('.strength-bar');
    const strengthText = document.getElementById('strength-text');

    // Character sets
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    // Update length value display
    lengthSlider.addEventListener('input', function() {
        lengthValue.textContent = this.value;
    });

    // Generate password
    generateBtn.addEventListener('click', function() {
        const length = lengthSlider.value;
        const includeUppercase = uppercaseCheckbox.checked;
        const includeLowercase = lowercaseCheckbox.checked;
        const includeNumbers = numbersCheckbox.checked;
        const includeSymbols = symbolsCheckbox.checked;
        
        let chars = '';
        if (includeUppercase) chars += uppercaseChars;
        if (includeLowercase) chars += lowercaseChars;
        if (includeNumbers) chars += numberChars;
        if (includeSymbols) chars += symbolChars;
        
        if (!chars) {
            alert('Please select at least one character type!');
            return;
        }
        
        let password = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * chars.length);
            password += chars[randomIndex];
        }
        
        passwordField.value = password;
        updateStrengthIndicator(password);
    });

    // Copy password to clipboard
    copyBtn.addEventListener('click', function() {
        if (!passwordField.value) {
            alert('No password to copy! Generate one first.');
            return;
        }
        
        passwordField.select();
        document.execCommand('copy');
        
        // Visual feedback
        const originalText = copyBtn.textContent;
        copyBtn.textContent = 'Copied!';
        setTimeout(() => {
            copyBtn.textContent = originalText;
        }, 2000);
    });

    // Update password strength indicator
    function updateStrengthIndicator(password) {
        // Calculate strength (simple version)
        let strength = 0;
        const length = password.length;
        
        // Length contributes up to 50% of strength
        strength += Math.min(50, (length / 20) * 50);
        
        // Character variety contributes the rest
        const hasUppercase = /[A-Z]/.test(password);
        const hasLowercase = /[a-z]/.test(password);
        const hasNumbers = /[0-9]/.test(password);
        const hasSymbols = /[^A-Za-z0-9]/.test(password);
        
        const varietyCount = [hasUppercase, hasLowercase, hasNumbers, hasSymbols].filter(Boolean).length;
        strength += (varietyCount / 4) * 50;
        
        // Update UI
        const strengthPercentage = Math.min(100, strength);
        const bar = strengthBar.querySelector('::after') || strengthBar;
        
        // Set color based on strength
        let color, text;
        if (strengthPercentage < 30) {
            color = '#e74c3c'; // Red
            text = 'Weak';
        } else if (strengthPercentage < 70) {
            color = '#f39c12'; // Orange
            text = 'Moderate';
        } else {
            color = '#2ecc71'; // Green
            text = 'Strong';
        }
        
        strengthBar.style.setProperty('--strength-color', color);
        strengthBar.querySelector('::after').style.backgroundColor = color;
        strengthBar.style.width = strengthPercentage + '%';
        strengthText.textContent = `Password Strength: ${text}`;
    }

    // Generate a password on page load
    generateBtn.click();
});