<script lang="ts">
  import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
  import { faBluesky } from "@fortawesome/free-brands-svg-icons";
  export let posts: { text: string; createdAt: string }[];
</script>

<div class="feed-wrapper">
  <div class="feed-header">
    <FontAwesomeIcon icon={faBluesky} />
    <span class="header-text">posting through it</span>
    <FontAwesomeIcon icon={faBluesky} />
  </div>
  <div class="feed-container">
    {#if posts.length === 0}
      <p>No posts to display.</p>
    {:else}
      <ul>
        {#each posts as post}
          <li>
            <p>{post.text}</p>
            <small>{new Date(post.createdAt).toLocaleString()}</small>
          </li>
        {/each}
      </ul>
    {/if}
  </div>
</div>

<style>
  .feed-wrapper {
    position: relative;
    width: 100%;
    max-width: 800px;
    margin: 2rem 0;
    padding: 1rem;
    box-sizing: border-box;
  }

  .feed-container {
    position: relative;
    width: 100%;
    max-width: 100%;
    max-height: 400px;
    overflow-y: auto;
    overflow-x: hidden;
    border: 6px solid rgba(255, 255, 255, 0.6);
    border-radius: 12px;
    padding: 2rem 1rem;
    background-color: rgba(255, 255, 255, 0.1);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
    box-sizing: border-box;
  }

  .feed-header {
    position: absolute;
    top: -10px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    background: linear-gradient(135deg, #87ceeb, #1e90ff);
    border: 2px solid rgba(255, 255, 255, 0.6);
    border-radius: 24px;
    color: #fff;
    font-family: 'Fira Code', monospace;
    font-size: 1rem;
    z-index: 10;
    white-space: nowrap;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
  }

  .header-text {
    font-size: 1rem;
    font-weight: bold;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    margin-bottom: 2rem;
  }

  li:last-child {
    margin-bottom: 0;
  }

  p {
    font-size: 1.2rem;
    color: rgba(255, 255, 255, 0.8);
    text-align: center;
  }

  .feed-container::-webkit-scrollbar {
    width: 8px;
  }

  .feed-container::-webkit-scrollbar-thumb {
    background: linear-gradient(135deg, #87ceeb, #1e90ff);
    border-radius: 4px;
  }

  .feed-container::-webkit-scrollbar-track {
    background: transparent;
  }

  @media (max-width: 600px) {
    .feed-container {
      max-height: 300px;
      padding: 1rem 0.5rem;
    }

    .feed-wrapper {
      padding: 0.5rem;
    }

    .feed-header {
      font-size: 0.9rem;
      gap: 0.3rem;
    }

    li {
      margin-bottom: 1.5rem;
    }

    p {
      font-size: 1rem;
    }
  }
</style>
