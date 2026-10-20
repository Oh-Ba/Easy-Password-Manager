class PasswordManager {
    constructor() {
        this.passwords = JSON.parse(localStorage.getItem('passwords')) || [];
        this.render();
        this.attachEventListeners();
    }
    generatePassword(length = 16) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
        let password = '';
        for (let i = 0; i < length; i++) {
            password += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return password;
    }
    addPassword() {
        const site = document.getElementById('siteName').value;
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        if (!site || !username || !password) return;
        this.passwords.push({ id: Date.now(), site, username, password });
        localStorage.setItem('passwords', JSON.stringify(this.passwords));
        this.render();
        document.getElementById('siteName').value = '';
        document.getElementById('username').value = '';
        document.getElementById('password').value = '';
    }
    deletePassword(id) {
        this.passwords = this.passwords.filter(p => p.id !== id);
        localStorage.setItem('passwords', JSON.stringify(this.passwords));
        this.render();
    }
    render() {
        const list = document.getElementById('passwordsList');
        list.innerHTML = '';
        this.passwords.forEach(p => {
            const div = document.createElement('div');
            div.className = 'password-item';
            div.innerHTML = `<div class="password-site">${p.site}</div><div class="password-user">${p.username}</div><div class="password-display">${p.password}</div><button class="delete-btn" onclick="app.deletePassword(${p.id})">Delete</button>`;
            list.appendChild(div);
        });
    }
    attachEventListeners() {
        document.getElementById('generateBtn').addEventListener('click', () => {
            const pwd = this.generatePassword();
            document.getElementById('password').value = pwd;
        });
        document.getElementById('copyBtn').addEventListener('click', () => {
            const pwd = document.getElementById('password').value;
            navigator.clipboard.writeText(pwd);
            alert('Password copied!');
        });
    }
}
const app = new PasswordManager();
