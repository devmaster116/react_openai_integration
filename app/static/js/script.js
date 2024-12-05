// Chat functionality
function sendMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    
    if (!message) return;
    
    fetch('/api/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
    })
    .then(response => response.json())
    .then(data => {
        const chatMessages = document.getElementById('chat-messages');
        chatMessages.innerHTML += `
            <div class="message user-message">${message}</div>
            <div class="message bot-message">${data.response}</div>
        `;
        chatMessages.scrollTop = chatMessages.scrollHeight;
        input.value = '';
    })
    .catch(error => console.error('Error:', error));
}

// Essay analysis functionality
function analyzeEssay() {
    const essayText = document.getElementById('essay-text').value.trim();
    
    if (!essayText) {
        alert('Please enter your essay text first.');
        return;
    }
    
    // Placeholder for essay analysis logic
    const results = document.getElementById('analysis-results');
    results.innerHTML = `
        <h3>Analysis Results</h3>
        <p>Essay length: ${essayText.split(' ').length} words</p>
        <p>This is a placeholder for the actual essay analysis results.</p>
    `;
}

// Add event listeners
document.addEventListener('DOMContentLoaded', function() {
    const chatInput = document.getElementById('chatInput');
    if (chatInput) {
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
});