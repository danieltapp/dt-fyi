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
  const statusSection = document.getElementById("status");

  if (!statusTextElement) {
    console.error("status-typed element not found");
    return;
  }

  const typeStatus = async (text) => {
    let currentText = "";
    for (const char of text) {
      currentText += char;
      statusTextElement.textContent = currentText;
      await new Promise((resolve) => setTimeout(resolve, 75));
    }
  };

  const cycleStatuses = async () => {
    while (true) {
      const currentStatus = statuses[currentStatusIndex];
      
      if (statusSection) {
        statusSection.style.pointerEvents = "none";
      }
      
      await typeStatus(currentStatus);
      
      if (statusSection) {
        statusSection.style.pointerEvents = "auto";
      }
      
      await new Promise((resolve) => setTimeout(resolve, 3000));
      currentStatusIndex = (currentStatusIndex + 1) % statuses.length;
    }
  };

  cycleStatuses();
}
