const { createClient } = supabase;

const _supabase = createClient(config.SUPABASE_URL, config.API_KEY);
const {
  data: { session },
} = await _supabase.auth.getSession()

const { data, error } = await _supabase.from("participants").select();

let leaderboard = data.sort((a, b) => b.votes - a.votes);
console.log(leaderboard);

let name = document.getElementsByClassName("name");
let totalVotes = document.getElementsByClassName("totalVotes");

for (let i = 0; i < leaderboard.length; i++) {
    name[i].innerHTML = leaderboard[i].name;
    totalVotes[i].innerHTML = leaderboard[i].votes;
}