export function initHeaderAnimation(textToType = "whoami") {
  const typedTextElement = document.getElementById("typed-text");
  const outputElement = document.querySelector(".terminal-output");

  if (!typedTextElement) {
    console.error("typed-text element not found");
    return;
  }

  if (outputElement) {
    outputElement.style.display = "none";
  }

  let displayedText = "";
  const typingSpeed = 150;

  async function typeText() {
    for (const char of textToType) {
      await new Promise((resolve) => setTimeout(resolve, typingSpeed));
      displayedText += char;
      typedTextElement.textContent = displayedText;
    }

    if (outputElement) {
      await new Promise((resolve) => setTimeout(resolve, 300));
      outputElement.style.display = "block";
    }
  }

  typeText();
}
