const API_KEY = "AIzaSyBfPWq0eva919yt7EFlUib-bT7j8KzDjfI"; // Replace with your actual API key
const MODEL = "models/gemini-pro"; // Correct model path

async function sendMessage() {
  const input = document.getElementById("user-input");
  const chatBox = document.getElementById("chat-box");
  const userText = input.value.trim();
  
  if (!userText) return;
  
  // Show user message
  chatBox.innerHTML += `<p><strong>You:</strong> ${userText}</p>`;
  input.value = "";
  
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text: userText }] }],
          generationConfig: {
            maxOutputTokens: 100,
            temperature: 0.7,
            topP: 0.8
          }
        })
      }
    );
    
    const data = await response.json();
    const botReply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Bot: I couldn't understand that.";
    
    chatBox.innerHTML += `<p><strong>Bot:</strong> ${botReply}</p>`;
    chatBox.scrollTop = chatBox.scrollHeight;
  } catch (error) {
    console.error("Fetch error:", error);
    chatBox.innerHTML += `<p><strong>Bot:</strong> Error: Unable to fetch response.</p>`;
  }
}
