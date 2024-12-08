<script lang="ts">
  export let data: { postsPromise: Promise<{ text: string; createdAt: string }[]> };
  import Header from '$lib/Header.svelte';
  import Intro from '$lib/Intro.svelte';
  import SocialLinks from '$lib/SocialLinks.svelte';
  import Canvas from '$lib/Canvas.svelte';
  import BlueskyFeed from '$lib/BlueskyFeed.svelte';
  import "../app.css";
</script>

<Canvas />
<main>
  <Header />
  <SocialLinks />
  <Intro />
  {#await data.postsPromise}
    <p>Loading Bluesky posts...</p>
  {:then posts}
    <BlueskyFeed posts={posts} />
  {:catch error}
    <p>Failed to load Bluesky posts: {error.message}</p>
  {/await}
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
