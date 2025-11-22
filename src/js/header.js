export function initHeaderAnimation(textToType = "Daniel Tapp") {
  const typedTextElement = document.getElementById("typed-text");

  if (!typedTextElement) {
    console.error("typed-text element not found");
    return;
  }

  let displayedText = "";
  const typingSpeed = 150;

  async function typeText() {
    for (const char of textToType) {
      await new Promise((resolve) => setTimeout(resolve, typingSpeed));
      displayedText += char;
      typedTextElement.textContent = displayedText;
    }
  }

  typeText();
}
