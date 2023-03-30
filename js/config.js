
const config = {
        SUPABASE_URL : 'https://chgbsifxtupobribzviz.supabase.co',
        API_KEY : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNoZ2JzaWZ4dHVwb2JyaWJ6dml6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzc1MjA3MjQsImV4cCI6MTk5MzA5NjcyNH0.NMdoTHmsyUrQsNwN8EUm5srF7NZ8O4uu0_95tsSovhk',
    }

const toggleButton = document.getElementsByClassName('toggle-button')[0]
const navbarLinks = document.getElementsByClassName('navbar-links')[0]
const container = document.getElementsByClassName('container')[0]
    
toggleButton.addEventListener('click', () => {
    navbarLinks.classList.toggle('active')
    container.classList.toggle('active')
})
    
    