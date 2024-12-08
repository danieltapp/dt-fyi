// src/routes/+page.server.ts
import { AtpAgent } from "@atproto/api";
import { error } from "@sveltejs/kit";

export interface Post {
  text: string;
  createdAt: string;
}

export const load = async () => {
  // Fetch Bluesky posts as a Promise
  const postsPromise = (async () => {
    const agent = new AtpAgent({ service: "https://bsky.social" });

    const username = import.meta.env.VITE_BLUESKY_USERNAME;
    const password = import.meta.env.VITE_BLUESKY_PASSWORD;

    if (!username || !password) {
      throw new Error(
        "Missing Bluesky username or password in environment variables"
      );
    }

    await agent.login({ identifier: username, password });

    const response = await agent.getAuthorFeed({
      actor: agent.session?.did || "",
    });
    return response.data.feed.map((item) => {
      const record = item.post.record as { text: string; createdAt: string };
      return {
        text: record.text,
        createdAt: record.createdAt,
      };
    });
  })();

  return { postsPromise };
};
