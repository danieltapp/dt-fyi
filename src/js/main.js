import { initHeaderAnimation } from "./header.js";
import { initTracktor } from "./tracktor.js";
import { initStatus } from "./status.js";

document.addEventListener("DOMContentLoaded", () => {
  initHeaderAnimation("Daniel Tapp");
  initTracktor();
  initStatus();
});
