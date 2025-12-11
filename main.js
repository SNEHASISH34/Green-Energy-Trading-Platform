import { signIn, signUp, signOut } from './auth.js';
import { supabase } from './supabase.js';

const signupForm = document.getElementById('signupForm');
const loginForm = document.getElementById('loginForm');
const logoutBtn = document.getElementById('logoutBtn');

if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();

        const { data, error } = await signUp(email, password, name);

        if (error) {
            alert(error.message);
            return;
        }

        alert("Account created. Check your email.");
        window.location.href = "sign-in.html";
    });
}

if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();

        const { data, error } = await signIn(email, password);

        if (error) {
            alert(error.message);
            return;
        }

        localStorage.setItem('currentUser', JSON.stringify(data.user));
        window.location.href = "index.html";
    });
}

if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
        await signOut();
        localStorage.removeItem('currentUser');
        window.location.href = "sign-in.html";
    });
}
