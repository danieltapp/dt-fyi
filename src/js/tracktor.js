import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Supabase credentials not found in environment variables");
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function initTracktor() {
  const tracktorTextElement = document.getElementById("tracktor-text");
  const loadingIndicator = document.getElementById("loading-indicator");
  const currentYear = new Date().getFullYear();

  if (!tracktorTextElement) {
    console.error("tracktor-text element not found");
    return;
  }

  try {
    const { data, error } = await supabase
      .from("tracktor_counts")
      .select("activity_type, count")
      .eq("year", currentYear);

    if (error) throw error;

    const activities = {
      books: data.find((row) => row.activity_type === "books")?.count || 0,
      movies: data.find((row) => row.activity_type === "movies")?.count || 0,
      runs: data.find((row) => row.activity_type === "runs")?.count || 0,
      commits: data.find((row) => row.activity_type === "commits")?.count || 0,
      repositories:
        data.find((row) => row.activity_type === "repositories")?.count || 0,
    };

    if (loadingIndicator) {
      loadingIndicator.remove();
    }

    const booksLabel = activities.books === 1 ? "book" : "books";
    const moviesLabel = activities.movies === 1 ? "movie" : "movies";
    const runsLabel = activities.runs === 1 ? "run" : "runs";
    const reposLabel =
      activities.repositories === 1 ? "repository" : "repositories";

    tracktorTextElement.innerHTML = `
      I've been working on this fun side project called <a href="https://tracktor-goal-dashboard.vercel.app/">Tracktor 🚜</a>, which
      aggregates data from services I use to track my activities throughout the
      year. So far in ${currentYear}, I've read ${activities.books} ${booksLabel} 📚, watched
      ${activities.movies} ${moviesLabel} 🎬, gone on ${activities.runs} ${runsLabel} 🏃🏻‍♂️, and made
      ${activities.commits} commits 💻 across ${activities.repositories} ${reposLabel} 🗂️.
    `;
  } catch (err) {
    console.error("Failed to fetch activity data:", err);
    if (loadingIndicator) {
      loadingIndicator.remove();
    }
    tracktorTextElement.textContent =
      "Failed to load activity data. Please try again later.";
  }
}
