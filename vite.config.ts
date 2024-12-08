import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";

console.log(
  "Environment Variables:",
  process.env.VITE_BLUESKY_USERNAME,
  process.env.VITE_BLUESKY_PASSWORD
);

export default defineConfig({
  plugins: [sveltekit()],
});
