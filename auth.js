import { supabase } from './supabase.js';

export async function signUp(email, password, name) {
  return await supabase.auth.signUp({
    email,
    password,
    options: { data: { name } }
  });
}

export async function signIn(email, password) {
  return await supabase.auth.signInWithPassword({ email, password });
}

export async function signOut() {
  return await supabase.auth.signOut();
}
