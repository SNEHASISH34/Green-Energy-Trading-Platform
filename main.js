import { signIn, signUp, signOut } from './auth.js';

const signupForm = document.getElementById('signupForm');
const loginForm = document.getElementById('loginForm');
const logoutBtn = document.getElementById('logoutBtn');

async function handleSignUp(name, email, password) {
  const { data, error } = await signUp(email, password, name);
  console.log('signUp result', { data, error });
  if (error) {
    alert(error.message || JSON.stringify(error));
    return null;
  }
  if (data?.user) {
    localStorage.setItem('currentUser', JSON.stringify(data.user));
    window.location.href = 'index.html';
    return data.user;
  }
  alert('Account created. Please check your email to verify your account.');
  window.location.href = 'sign-in.html';
  return null;
}

async function handleSignIn(email, password) {
  const { data, error } = await signIn(email, password);
  console.log('signIn result', { data, error });
  if (error) {
    alert(error.message || JSON.stringify(error));
    return null;
  }
  const user = data?.user ?? data?.session?.user ?? null;
  if (!user) {
    alert('Signed in but no user object returned. Check if email verification is required.');
    return null;
  }
  localStorage.setItem('currentUser', JSON.stringify(user));
  window.location.href = 'index.html';
  return user;
}

if (signupForm) {
  signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('name')?.value?.trim() || '';
    const email = document.getElementById('email')?.value?.trim() || '';
    const password = document.getElementById('password')?.value || '';
    await handleSignUp(name, email, password);
  });
}

if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email')?.value?.trim() || '';
    const password = document.getElementById('password')?.value || '';
    await handleSignIn(email, password);
  });
}

if (logoutBtn) {
  logoutBtn.addEventListener('click', async () => {
    await signOut();
    localStorage.removeItem('currentUser');
    window.location.href = 'sign-in.html';
  });
}
