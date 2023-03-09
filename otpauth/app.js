const { createClient } = supabase;
const _supabase = createClient('https://jijzprlwetjyagxihhwo.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imppanpwcmx3ZXRqeWFneGloaHdvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzgwODEwNzgsImV4cCI6MTk5MzY1NzA3OH0.mW1x1mpvKh65UtHn_mv5G5jlc0r6K0tHqZcbJQCgYKk');



let email = document.getElementById('email');
async function authotp() {
    const { data, error } = await _supabase.auth.signInWithOtp({
        email: email.value,
        options: {
            redirectTo: './hello.html', 
        }
    });
};

console.log(email.value);


authotp();

