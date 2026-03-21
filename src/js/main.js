import { initHeaderAnimation } from "./header.js";
import { initTracktor, initCodeTab } from "./tracktor.js";
import { initStatus } from "./status.js";
import { initTabs } from "./tabs.js";

document.addEventListener("DOMContentLoaded", () => {
  initHeaderAnimation("whoami");
  initTabs();
  initTracktor();
  initCodeTab();
  initStatus();
});
