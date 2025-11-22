const statuses = [
  "rehabbing Achilles tendinitis (🥴)",
  "reading Shea Serrano's excellent new book, Expensive Basketball",
  "dodging the black hole of merge conflicts",
  "training to run the runDisney Princess Half Marathon",
  "messing around with DADF#AD tuning on my guitar",
  "trying to get through my watchlist on letterboxd",
  "working on some neat automations to help E2E test my stuff",
];

let currentStatusIndex = 0;

export async function initStatus() {
  const statusTextElement = document.getElementById("status-typed");

  if (!statusTextElement) {
    console.error("status-typed element not found");
    return;
  }

  const typeStatus = async (text) => {
    statusTextElement.textContent = "";
    for (const char of text) {
      statusTextElement.textContent += char;
      await new Promise((resolve) => setTimeout(resolve, 75));
    }
  };

  const cycleStatuses = async () => {
    while (true) {
      const currentStatus = statuses[currentStatusIndex];
      await typeStatus(currentStatus);
      await new Promise((resolve) => setTimeout(resolve, 3000));
      currentStatusIndex = (currentStatusIndex + 1) % statuses.length;
    }
  };

  cycleStatuses();
}
