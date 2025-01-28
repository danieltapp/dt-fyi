<script lang="ts">
import { createClient } from "@supabase/supabase-js";
import { onMount } from "svelte";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

let activities = {
	books: 0,
	movies: 0,
	runs: 0,
	commits: 0,
	repositories: 0,
};

let loading = true;

onMount(async () => {
	try {
		const { data, error } = await supabase
			.from("tracktor_counts")
			.select("activity_type, count")
			.eq("year", 2025);

		if (error) throw error;

		activities = {
			books: data.find((row) => row.activity_type === "books")?.count || 0,
			movies: data.find((row) => row.activity_type === "movies")?.count || 0,
			runs: data.find((row) => row.activity_type === "runs")?.count || 0,
			commits: data.find((row) => row.activity_type === "commits")?.count || 0,
			repositories:
				data.find((row) => row.activity_type === "repositories")?.count || 0,
		};
	} catch (err) {
		console.error("Failed to fetch activity data:", err);
	} finally {
		loading = false;
	}
});
</script>

<p>
  {#if loading}
    🤔
  {:else}
    I’ve been working on this fun side project called <a href="/tracktor">Tracktor 🚜</a>, which
    aggregates data from services I use to track my activities throughout the
    year. So far in 2025, I’ve read {activities.books} {activities.books === 1 ? 'book' : 'books'} 📚, watched
    {activities.movies} movies 🎬, gone on {activities.runs} runs 🏃🏻‍♂️, and made
    {activities.commits} commits 💻 across {activities.repositories} repositories 🗂️.
  {/if}
</p>

<style>
  a {
    color: #646cff;
    text-decoration: none;
    font-weight: bold;
  }

  a:hover {
    color: #535bf2;
    text-decoration: underline;
  }

  p {
    font-size: 1.2rem;
    line-height: 1.6;
    text-align: center;
    color: rgba(255, 255, 255, 0.8);
    margin: 1rem 0;
  }

  /* Add animation for the question mark emoji */
  @keyframes bobbing {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
  }

  p:has(emoji) {
    display: inline-block;
    animation: bobbing 1s infinite ease-in-out;
  }
</style>
