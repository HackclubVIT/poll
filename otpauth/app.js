import { createClient } from '@supabase/supabase-js';
const _supabase = createClient('https://chgbsifxtupobribzviz.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNoZ2JzaWZ4dHVwb2JyaWJ6dml6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzc1MjA3MjQsImV4cCI6MTk5MzA5NjcyNH0.NMdoTHmsyUrQsNwN8EUm5srF7NZ8O4uu0_95tsSovhk');


// let email = document.getElementById('email');
// async function authotp() {
//     const { data, error } = await _supabase.auth.signInWithOtp({
//         email: email.value,
//         options: {
//             redirectTo: './hello.html', 
//         }
//     });
// };

// console.log(email.value);

async function authotp() {
    const { data, error } = await _supabase.auth.signInWithOAuth({
        provider: 'google',
    })
};


async function signout() {
    const { error } = await _supabase.auth.signOut()
};

