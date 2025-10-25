// Typewriter effect for hero terminal
(function() {
  const typewriterElement = document.getElementById('typewriter');

  if (!typewriterElement) return;

  const originalText = typewriterElement.textContent;
  typewriterElement.textContent = '';

  let charIndex = 0;
  const typingSpeed = 50; // milliseconds per character
  const startDelay = 500; // delay before starting

  function typeCharacter() {
    if (charIndex < originalText.length) {
      typewriterElement.textContent += originalText.charAt(charIndex);
      charIndex++;
      setTimeout(typeCharacter, typingSpeed);
    } else {
      // Add blinking cursor class when done
      typewriterElement.classList.add('cursor-blink');
    }
  }

  // Start typing after delay
  setTimeout(typeCharacter, startDelay);
})();

// Add cursor blink animation CSS dynamically
const style = document.createElement('style');
style.textContent = `
  @keyframes cursor-blink {
    0%, 49% { opacity: 1; }
    50%, 100% { opacity: 0; }
  }
  .cursor-blink::after {
    content: '_';
    animation: cursor-blink 1s infinite;
  }
`;
document.head.appendChild(style);
