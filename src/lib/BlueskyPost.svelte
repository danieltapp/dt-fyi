<script lang="ts">
  export let post: { text: string; createdAt: string };
</script>

<div class="post">
  <div class="content">
    <p>{post.text}</p>
    <small>{new Date(post.createdAt).toLocaleString()}</small>
  </div>
</div>

<style>
  .post {
    position: relative;
    border: 3px solid rgba(255, 255, 255, 0.6);
    border-radius: 12px;
    padding: 2rem 1.5rem 1.5rem;
    background-color: rgba(255, 255, 255, 0.1);
    text-align: center;
    max-width: 600px;
    margin: 0 auto;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  }

  .content p {
    margin: 0;
    font-size: 1.2rem;
    line-height: 1.5;
  }

  .content small {
    display: block;
    margin-top: 1rem;
    font-size: 0.9rem;
    color: rgba(255, 255, 255, 0.7);
  }
</style>
