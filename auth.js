import { supabase } from './supabase.js'; // adjust export name/path

export async function signUp(email, password) {
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) console.error('Supabase signUp error', error);
  else console.log('Supabase signUp data', data);
  return { data, error };
}

export async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) console.error('Supabase signIn error', error);
  else console.log('Supabase signIn data', data);
  return { data, error };
}
