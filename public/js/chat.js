import { CONFIG } from "./config.js";
async function sendMessageAi() {
  const inputField = document.getElementById("userInput");
  const message = inputField.value.trim();
  if (!message) return;

  addMessage(message, 'user');
  inputField.value = "";

  try {
    console.log("Sending message to AI:", message);
    
    const res = await fetch(`${CONFIG.BASE_URL}/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("token")  
      },
      body: JSON.stringify({ message })
    });
    

    const data = await res.json();
    console.log("Response from AI:", data);
    if (!res.ok || !data.response) {
      throw new Error("No response from chatbot");
    }

    addMessage(data.response, 'bot');
  } catch (error) {
    addMessage("Error: Could not connect to server.", 'bot');
    console.error("Chat error:", error);
  }

  const chatbox = document.getElementById("chatbox");
  chatbox.scrollTop = chatbox.scrollHeight;
}

// Add message to chat UI
function addMessage(message, sender) {
  const chatbox = document.getElementById("chatbox");
  const div = document.createElement("div");
  div.classList.add("message", sender);
  div.textContent = message;
  chatbox.appendChild(div);
  chatbox.scrollTop = chatbox.scrollHeight;
}

// Enter key triggers chatbot send
document.getElementById("userInput").addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault(); // Prevent form submission
    sendMessageAi();
  }
});