// Wait for API class to be available
function waitForAPI() {
  if (typeof OpenWebUIAPI === 'undefined') {
    setTimeout(waitForAPI, 100);
    return;
  }
  const api = new OpenWebUIAPI();
  initializeChat(api);
}

function createMessageElement(content, type) {
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${type}`;
  messageDiv.textContent = content;
  return messageDiv;
}

function createLoadingElement() {
  const loadingDiv = document.createElement('div');
  loadingDiv.className = 'message system loading';
  loadingDiv.textContent = 'Thinking...';
  return loadingDiv;
}

function initializeChat(api) {
  // Create chat icon
  const icon = document.createElement('div');
  icon.className = 'chat-icon';
  icon.innerHTML = '💬';
  
  // Create chat overlay
  const overlay = document.createElement('div');
  overlay.className = 'chat-overlay';
  overlay.innerHTML = `
    <div class="chat-header">
      <span>Chat</span>
      <button class="close-btn">×</button>
    </div>
    <div class="chat-messages">
      <div class="message system">Hello! How can I help you today?</div>
    </div>
    <div class="chat-input-container">
      <textarea 
        class="chat-input" 
        placeholder="Type your message..."
        rows="3"
      ></textarea>
    </div>
  `;
  
  // Add to page
  document.body.appendChild(icon);
  document.body.appendChild(overlay);
  
  // Get elements
  const messagesContainer = overlay.querySelector('.chat-messages');
  const input = overlay.querySelector('.chat-input');
  
  // Add event listeners
  icon.addEventListener('click', () => {
    overlay.style.display = overlay.style.display === 'flex' ? 'none' : 'flex';
    if (overlay.style.display === 'flex') {
      input.focus();
    }
  });
  
  const closeBtn = overlay.querySelector('.close-btn');
  closeBtn.addEventListener('click', () => {
    overlay.style.display = 'none';
  });
  
  async function handleMessage(message) {
    // Add user message
    messagesContainer.appendChild(createMessageElement(message, 'user'));
    
    // Add loading indicator
    const loadingElement = createLoadingElement();
    messagesContainer.appendChild(loadingElement);
    
    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    try {
      // Get response from API
      const response = await api.sendMessage(message);
      
      // Remove loading indicator
      loadingElement.remove();
      
      // Add response
      messagesContainer.appendChild(createMessageElement(response, 'system'));
      
      // Scroll to bottom again
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    } catch (error) {
      // Remove loading indicator
      loadingElement.remove();
      
      // Show error message
      messagesContainer.appendChild(
        createMessageElement('Sorry, there was an error getting a response.', 'system')
      );
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  }
  
  input.addEventListener('keypress', async (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      const message = input.value.trim();
      
      if (message) {
        input.value = '';
        await handleMessage(message);
      }
    }
  });
}

// Start the initialization process
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', waitForAPI);
} else {
  waitForAPI();
}