function sendMessage() {
    const userInput = document.getElementById('user-input');
    const conversationIdInput = document.getElementById('conversation-id');
    const message = userInput.value.trim();
    const conversationId = conversationIdInput.value.trim();

    if (message === '') {
        return;
    }

    // Add user's message to chat window
    const chatWindow = document.getElementById('chat-window');
    const userMessageElem = document.createElement('div');
    userMessageElem.className = 'message user-message';
    userMessageElem.textContent = message;
    chatWindow.appendChild(userMessageElem);

    // Clear input field
    userInput.value = '';

    // Send message to the backend with conversation ID
    fetch('/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            message: message,
            conversation_id: conversationId
        })
    })
    .then(response => response.json())
    .then(data => {
        const botResponseElem = document.createElement('div');
        botResponseElem.className = 'message bot-response';
        botResponseElem.textContent = data.response;
        chatWindow.appendChild(botResponseElem);

        // Scroll chat window to the bottom
        chatWindow.scrollTop = chatWindow.scrollHeight;
    })
    .catch(error => console.error('Error:', error));
}
