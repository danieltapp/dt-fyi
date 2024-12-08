<script lang="ts">
  import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
  import { faGithubAlt, faLinkedin, faBluesky, faLetterboxd } from "@fortawesome/free-brands-svg-icons";

  // Define icons directly
  const icons = {
    bluesky: faBluesky,
    github: faGithubAlt,
    linkedin: faLinkedin,
    letterboxd: faLetterboxd,
  };

  export let links = {
    bluesky: "https://bsky.app/profile/danieltapp.bsky.social",
    github: "https://github.com/danieltapp",
    linkedin: "https://www.linkedin.com/in/d-tapp",
    letterboxd: "https://letterboxd.com/danieltapp",
  };
</script>

<footer>
  {#each Object.entries(links) as [key, url]}
    <a href={url} target="_blank" rel="noopener noreferrer" title={key}>
      <FontAwesomeIcon icon={icons[key]} />
    </a>
  {/each}
</footer>

<style>
  footer {
    display: flex;
    justify-content: center;
    gap: 1rem;
  }

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #444;
    color: #fff;
    text-decoration: none;
    font-size: 1.5rem;
    transition: background 0.3s ease, transform 0.2s ease;
  }

  a:hover {
    background: rgba(0, 119, 204, 0.8);
    transform: scale(1.15);
    box-shadow: 0 0 8px rgba(0, 119, 204, 0.8);
  }
</style>
