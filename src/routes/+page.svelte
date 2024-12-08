<script>
  import Header from '$lib/Header.svelte';
  import Intro from '$lib/Intro.svelte';
  import SocialLinks from '$lib/SocialLinks.svelte';
  import Canvas from '$lib/Canvas.svelte';
  import "../app.css";
  // Uncomment the line below if you plan to include BlueskyFeed later
  // import BlueskyFeed from '$lib/BlueskyFeed.svelte';
</script>

<Canvas />
<main>
  <Header />
  <SocialLinks />
  <Intro />
  <!-- Uncomment the line below to include BlueskyFeed -->
  <!-- <BlueskyFeed /> -->
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0 1rem;
  }
</style>
