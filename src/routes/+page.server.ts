import { AtpAgent } from "@atproto/api";

export interface Post {
  text: string;
  createdAt: string;
}

let cache: { posts: Post[]; timestamp: number } | null = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

async function getCache() {
  if (cache && Date.now() - cache.timestamp < CACHE_DURATION) {
    console.log("Returning in-memory cached posts");
    return cache.posts;
  }
  return null;
}

async function setCache(posts: Post[]) {
  console.log("Setting in-memory cache");
  cache = { posts, timestamp: Date.now() };
}

async function fetchBlueskyPosts(): Promise<Post[]> {
  const agent = new AtpAgent({ service: "https://bsky.social" });

  const username = import.meta.env.VITE_BLUESKY_USERNAME;
  const password = import.meta.env.VITE_BLUESKY_PASSWORD;
  const did = import.meta.env.VITE_DTAPP_DID;

  if (!username || !password) {
    throw new Error(
      "Missing Bluesky username or password in environment variables"
    );
  }

  await agent.login({ identifier: username, password });

  const response = await agent.getAuthorFeed({
    actor: did || "",
    filter: "posts_no_replies",
  });

  return response.data.feed.map((item) => {
    const record = item.post.record as { text: string; createdAt: string };
    return {
      text: record.text,
      createdAt: record.createdAt,
    };
  });
}

export const load = async () => {
  // Try to get cached posts
  const cachedPosts = await getCache();
  if (cachedPosts) {
    return { postsPromise: Promise.resolve(cachedPosts) };
  }

  // Fetch new posts and cache them
  const postsPromise = (async () => {
    const posts = await fetchBlueskyPosts();
    await setCache(posts);
    return posts;
  })();

  return { postsPromise };
};
