import { AtpAgent } from "@atproto/api";
import fs from "fs/promises";

export interface Post {
  text: string;
  createdAt: string;
}

const CACHE_FILE = "./cache.json";
const CACHE_DURATION = 5 * 60 * 1000;

async function getCache(): Promise<Post[] | null> {
  try {
    const data = await fs.readFile(CACHE_FILE, "utf8");
    const { posts, timestamp } = JSON.parse(data);

    if (Date.now() - timestamp < CACHE_DURATION) {
      console.log("Returning cached posts from file");
      return posts;
    }
  } catch (error) {
    console.log("Cache is not available or expired:", error.message);
  }
  return null;
}

async function setCache(posts: Post[]) {
  const data = JSON.stringify({ posts, timestamp: Date.now() });
  await fs.writeFile(CACHE_FILE, data, "utf8");
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
  const cachedPosts = await getCache();
  if (cachedPosts) {
    return { postsPromise: Promise.resolve(cachedPosts) };
  }

  const postsPromise = (async () => {
    const posts = await fetchBlueskyPosts();
    await setCache(posts);
    return posts;
  })();

  return { postsPromise };
};
