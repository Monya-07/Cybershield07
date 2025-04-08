const API_KEY = "AIzaSyBfPWq0eva919yt7EFlUib-bT7j8KzDjfI"; // Replace with your API key
const MODEL = "gemini-1.5-pro"; // Best model for chatbot

async function sendMessage() {
    let userInput = document.getElementById("user-input").value;
    let chatBox = document.getElementById("chat-box");

    if (userInput.trim() === "") return;

    chatBox.innerHTML += `<p><strong>You:</strong> ${userInput}</p>`;
    document.getElementById("user-input").value = "";

    try {
        let response = await fetch(`https://generativelanguage.googleapis.com/v1/models/${MODEL}:generateContent?key=${API_KEY}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{ role: "user", parts: [{ text: userInput }] }],
                generationConfig: {
                    maxOutputTokens: 50, // Controls response length
                    temperature: 0.7,   // Adjusts creativity (Lower = More precise)
                    topP: 0.8           // Controls randomness
                }
            })
        });

        let data = await response.json();
        let botReply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't understand that.";

        chatBox.innerHTML += `<p><strong>Bot:</strong> ${botReply}</p>`;
        chatBox.scrollTop = chatBox.scrollHeight;
    } catch (error) {
        chatBox.innerHTML += `<p><strong>Bot:</strong> Error: Unable to fetch response.</p>`;
        console.error("Error:", error);
    }
}