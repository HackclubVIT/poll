# Poll Website

Poll Website for Yellow Filter event. Winners will be announced based on majority vote.

## Get Started

1. Fork this repository

2. Clone your forked repository
```bash
git@github.com:HackclubVIT/poll.git
```

3. Create a new account in [Supabase](app.supabase.com) and create a new project. Get the *URL* and *PUBLIC_ANON_KEY* in the API section.

4. Create a new file named `config.js` inside `js/` folder and paste the following code

```js
const config = {
    SUPABASE_URL : <supabase_url>,
    API_KEY : <public_anon_key>,
}
```

5. That's all! You are good to go!

## Rules for Contributing

 - Use relative units in CSS, not absolute.
 - Use .webp format for images
 - Make the webpage responsive.
 - Inspect the page to check for multiple devices and then apply for PR.
 - Use kebab-case for css class/id names and camelCase for js variables.
 - Add separate CSS files in CSS/ folder to avoid mixing of CSS of different sections.
 - Don't `condole.log` the API_KEY in any script file.